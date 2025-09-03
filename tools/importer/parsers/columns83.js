/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and is a <dd>
  if (!element || element.tagName !== 'DD') return;

  // Find the <ul> containing the columns
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Get all immediate <li> children (each is a column)
  const columns = Array.from(ul.children).filter(child => child.tagName === 'LI');

  // Defensive: if no columns, abort
  if (columns.length === 0) return;

  // Table header row
  const headerRow = ['Columns block (columns83)'];

  // Table content row: each cell is the full <li> (image + text)
  const contentRow = columns.map(li => li);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
