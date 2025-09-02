/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Hero (hero50)'];

  // --- Extract background image (desktop preferred, fallback to mobile) ---
  let bgImg = null;
  const bgDiv = element.querySelector('.bg');
  if (bgDiv) {
    // Prefer desktop image (class 'pc'), fallback to 'sp'
    let img = bgDiv.querySelector('img.pc') || bgDiv.querySelector('img.sp');
    if (img) {
      bgImg = img;
    }
  }

  // --- Extract content: heading, subheading, etc. ---
  let contentCell = [];
  const innerDiv = element.querySelector('.inner');
  if (innerDiv) {
    // The heading is inside .content > h2
    const h2 = innerDiv.querySelector('h2');
    if (h2) contentCell.push(h2);
    // The subheading/paragraph is inside .text > p
    const textDiv = innerDiv.querySelector('.text');
    if (textDiv) {
      // Could be multiple paragraphs, but in this case only one
      const ps = textDiv.querySelectorAll('p');
      ps.forEach(p => contentCell.push(p));
    }
  }

  // Defensive: if nothing found, add empty string
  if (contentCell.length === 0) contentCell = [''];

  // --- Build table rows ---
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell],
  ];

  // --- Create and replace ---
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
