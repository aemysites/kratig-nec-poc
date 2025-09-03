/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the UL containing the cards
  const ul = element.querySelector('ul.list');
  if (!ul) return;

  // Build header row
  const headerRow = ['Cards (cards94)'];
  const rows = [headerRow];

  // Get all LI items (cards)
  const lis = ul.querySelectorAll(':scope > li');

  lis.forEach((li) => {
    // Each card is an <a.inner>
    const link = li.querySelector('a.inner');
    if (!link) return;

    // Image: find the <img> inside .thumb
    const thumb = link.querySelector('.thumb');
    let imageEl = null;
    if (thumb) {
      imageEl = thumb.querySelector('img');
    }

    // Text content: heading and description
    const detail = link.querySelector('.detail');
    let textContent = [];
    if (detail) {
      // Heading
      const heading = detail.querySelector('.heading');
      if (heading) {
        // Wrap heading in <strong> for semantic emphasis
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent.trim();
        textContent.push(strong);
      }
      // Description
      const desc = detail.querySelector('.text');
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc.textContent.trim();
        textContent.push(p);
      }
    }
    // Optionally add CTA (link) if needed
    // For this block, the whole card is a link, but we do not add a CTA in the cell

    // Compose row: [image, textContent]
    rows.push([
      imageEl || '',
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
