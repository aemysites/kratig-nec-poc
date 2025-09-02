/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the UL with the column items
  const ul = element.querySelector('ul.list');
  if (!ul) return;

  // Get all LI elements (each column)
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // For each LI, extract the link (with image and text)
  const columns = lis.map(li => {
    // Each LI should contain an <a> with .img (image) and .txt (text)
    const a = li.querySelector('a.link');
    if (!a) return document.createElement('div'); // fallback empty cell
    return a;
  });

  // Table header row
  const headerRow = ['Columns block (columns35)'];
  // Table content row: one cell per column
  const contentRow = columns;

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
