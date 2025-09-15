/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the list of cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');
  if (!lis.length) return;

  // Header row as specified
  const headerRow = ['Cards (cards90)'];
  const rows = [headerRow];

  lis.forEach(li => {
    // --- Image cell ---
    // Find the image inside the thumb div
    let imgEl = null;
    const thumbDiv = li.querySelector('.thumb');
    if (thumbDiv) {
      imgEl = thumbDiv.querySelector('img');
    }
    // Defensive: If no image, skip this card
    if (!imgEl) return;

    // --- Text cell ---
    // Title: from <dt> inside <dl>
    let titleText = '';
    const dt = li.querySelector('dl dt');
    if (dt) {
      titleText = dt.textContent.trim();
    }
    // Link: from .category a.external
    let linkEl = null;
    const categoryDiv = li.querySelector('.category');
    if (categoryDiv) {
      linkEl = categoryDiv.querySelector('a.external');
    }
    // Defensive: If no link, skip this card
    if (!linkEl) return;

    // Compose text cell
    // Title as <strong>
    const titleElem = document.createElement('strong');
    titleElem.textContent = titleText;
    // Description: none in source, so skip
    // Text cell: title + link
    const textCell = [titleElem, document.createElement('br'), linkEl];

    // Add row: [image, text cell]
    rows.push([imgEl, textCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
