/* global WebImporter */
export default function parse(element, { document }) {
  // Use the correct block name as the header row
  const headerRow = ['Cards (cards75, no images)'];
  const rows = [headerRow];

  // Find all list items representing cards
  const cardItems = element.querySelectorAll('ul.list > li');

  cardItems.forEach((li) => {
    // Each card is wrapped in an <a>
    const link = li.querySelector('a');
    if (!link) return;

    // Card detail container
    const detail = link.querySelector('.detail');
    if (!detail) return;

    // Title (inside <b class="title">)
    const titleElem = detail.querySelector('b.title');
    let titleText = '';
    if (titleElem) {
      titleText = titleElem.textContent.trim();
    }

    // Description (the <br> is between title and description)
    const p = detail.querySelector('p');
    let descText = '';
    if (p) {
      let foundBr = false;
      descText = Array.from(p.childNodes).map((node) => {
        if (node.nodeName === 'BR') {
          foundBr = true;
          return '';
        }
        if (foundBr) {
          return node.textContent || '';
        }
        return '';
      }).join('').trim();
    }

    // Tag(s) (category) - inside .tagList ul.list > li
    let tagText = '';
    const tagList = detail.querySelector('.tagList ul.list');
    if (tagList) {
      const tagLi = tagList.querySelector('li');
      if (tagLi) {
        tagText = tagLi.textContent.trim();
      }
    }

    // Compose text cell: Title (strong), description, tag
    const textCell = document.createElement('div');
    if (titleText) {
      const titleDiv = document.createElement('strong');
      titleDiv.textContent = titleText;
      textCell.appendChild(titleDiv);
    }
    if (descText) {
      const descDiv = document.createElement('div');
      descDiv.textContent = descText;
      textCell.appendChild(descDiv);
    }
    if (tagText) {
      const tagDiv = document.createElement('div');
      tagDiv.textContent = tagText;
      tagDiv.className = 'card-tag';
      textCell.appendChild(tagDiv);
    }
    if (link && link.href) {
      const ctaDiv = document.createElement('div');
      const ctaLink = document.createElement('a');
      ctaLink.href = link.href;
      ctaLink.textContent = 'Learn more';
      ctaDiv.appendChild(ctaLink);
      textCell.appendChild(ctaDiv);
    }

    // Only one column per row for 'no images' variant
    rows.push([textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
