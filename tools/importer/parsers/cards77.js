/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Cards (cards77)'];
  const rows = [headerRow];

  // Find the list of cards (ul.list)
  const ul = element.querySelector('ul.list');
  if (!ul) return;

  // For each card (li)
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // The link wrapping the card
    const a = li.querySelector('a');
    if (!a) return;

    // The detail div contains the content
    const detail = a.querySelector('.detail');
    if (!detail) return;

    // Extract the title (b.title)
    const titleEl = detail.querySelector('b.title');
    let title = '';
    if (titleEl) {
      title = titleEl.textContent.trim();
    }

    // Extract the description (the text node after b.title and <br>)
    let description = '';
    const p = detail.querySelector('p');
    if (p) {
      let foundBr = false;
      for (const node of p.childNodes) {
        if (node.nodeName === 'BR') {
          foundBr = true;
        } else if (foundBr && node.nodeType === Node.TEXT_NODE) {
          description = node.textContent.trim();
          break;
        }
      }
    }

    // Extract the tag/category (from .tagList ul.list > li)
    let tagText = '';
    const tagLi = detail.querySelector('.tagList ul.list > li');
    if (tagLi) {
      tagText = tagLi.textContent.trim();
    }

    // Build the text cell content
    const textCell = document.createElement('div');
    // Title as strong or h3
    if (title) {
      const h = document.createElement('strong');
      h.textContent = title;
      textCell.appendChild(h);
    }
    // Description
    if (description) {
      const descP = document.createElement('p');
      descP.textContent = description;
      textCell.appendChild(descP);
    }
    // Tag/category as a badge
    if (tagText) {
      const tagDiv = document.createElement('div');
      tagDiv.textContent = tagText;
      tagDiv.style.display = 'inline-block';
      tagDiv.style.marginTop = '8px';
      tagDiv.style.fontSize = '90%';
      tagDiv.style.background = '#e9ecef';
      tagDiv.style.padding = '2px 8px';
      tagDiv.style.borderRadius = '4px';
      textCell.appendChild(tagDiv);
    }
    // Add CTA link (the card is clickable)
    if (a.href) {
      const cta = document.createElement('a');
      cta.href = a.href;
      cta.textContent = title || 'Read more';
      cta.style.display = 'none'; // Hide, as the whole card is clickable
      textCell.appendChild(cta);
    }

    // Add two columns only if there is an image/icon in the card, otherwise use one column (no images variant)
    // Check for image or icon in the card
    const img = li.querySelector('img, svg, picture');
    if (img) {
      rows.push([img.cloneNode(true), textCell]);
    } else {
      rows.push([textCell]);
    }
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
