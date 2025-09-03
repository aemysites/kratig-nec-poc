/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure we have the expected structure
  if (!element || !document) return;

  // Header row for the block table
  const headerRow = ['Hero (hero11)'];

  // --- Extract background image ---
  // The background image is inside .image > img.pc-show (desktop)
  let bgImgEl = null;
  const imageDiv = Array.from(element.querySelectorAll(':scope > div.str-inner > div.image'))[0];
  if (imageDiv) {
    // Prefer desktop image if present
    bgImgEl = imageDiv.querySelector('img.pc-show') || imageDiv.querySelector('img');
  }
  // Defensive: fallback if not found
  const imageRow = [bgImgEl ? bgImgEl : ''];

  // --- Extract content (headline, subheading, logo) ---
  // Content is inside .content-inner > h1.hdg
  let contentCell = document.createElement('div');
  const contentInner = element.querySelector('.content-inner');
  if (contentInner) {
    const h1 = contentInner.querySelector('h1.hdg');
    if (h1) {
      // Compose headline and subheading
      // Headline: <b class="type">
      const headline = h1.querySelector('b.type');
      if (headline) contentCell.appendChild(headline);
      // Subheading: <span class="clientName">
      const clientName = h1.querySelector('span.clientName');
      if (clientName) {
        // Add a line break between headline and clientName if both exist
        if (headline) contentCell.appendChild(document.createElement('br'));
        contentCell.appendChild(clientName);
      }
      // Logo: <span class="logo"> (may contain <img>)
      const logoSpan = h1.querySelector('span.logo');
      if (logoSpan && logoSpan.querySelector('img[src]')) {
        // Add a line break before logo if headline or clientName exists
        if (headline || clientName) contentCell.appendChild(document.createElement('br'));
        contentCell.appendChild(logoSpan);
      }
    }
  }
  const contentRow = [contentCell];

  // Compose the table rows
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
