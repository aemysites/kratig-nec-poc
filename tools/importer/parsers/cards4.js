/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Table header row as per block name
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Select all card <li> elements
  const cards = element.querySelectorAll('ul > li');

  cards.forEach((li) => {
    // --- IMAGE CELL ---
    // Use the actual <img> element from the DOM
    let imgEl = li.querySelector('.thumb img');
    if (!imgEl) imgEl = document.createElement('span'); // Defensive fallback

    // --- TEXT CELL ---
    const textCell = [];

    // Title: <dt> inside <dl>
    const dt = li.querySelector('dl dt');
    if (dt) {
      const heading = document.createElement('strong');
      heading.textContent = dt.textContent;
      textCell.push(heading);
    }

    // Description: <dd> inside <dl>
    const dd = li.querySelector('dl dd');
    if (dd) {
      const desc = document.createElement('p');
      desc.textContent = dd.textContent;
      textCell.push(desc);
    }

    // CTA: link inside .category (if present)
    const cta = li.querySelector('.category a.site');
    if (cta) {
      textCell.push(cta);
    }

    // Add row: [image, text content]
    rows.push([imgEl, textCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
