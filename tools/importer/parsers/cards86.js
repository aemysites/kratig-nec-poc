/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and is a container of cards
  if (!element || !element.querySelectorAll) return;

  // Table header row
  const headerRow = ['Cards (cards86)'];
  const rows = [headerRow];

  // Get all card elements (slide-item)
  const cardEls = element.querySelectorAll(':scope > .slide-item');

  cardEls.forEach(cardEl => {
    // Find image (first cell)
    let imgEl = cardEl.querySelector('.image picture, .image img');
    // Prefer <picture> if present, else <img>
    if (imgEl && imgEl.tagName === 'PICTURE') {
      // Use the <picture> element directly
    } else if (imgEl && imgEl.tagName === 'IMG') {
      // Use the <img> element directly
    } else {
      imgEl = null; // fallback
    }

    // Find text content (second cell)
    const textDiv = cardEl.querySelector('.text');
    // Defensive: if missing, fallback to empty
    let textContent = [];
    if (textDiv) {
      // Usually contains a <p>
      const p = textDiv.querySelector('p');
      if (p) textContent.push(p);
    }

    // Find CTA link (usually in .link, but sometimes inside .text)
    let ctaLink = cardEl.querySelector('.link a');
    if (ctaLink) {
      textContent.push(document.createElement('br'));
      textContent.push(ctaLink);
    }

    // Compose row: [image, textContent]
    const row = [imgEl, textContent];
    rows.push(row);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block
  element.replaceWith(block);
}
