/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find all top-level columns
  const colNodes = Array.from(element.querySelectorAll(':scope > ul > li.col'));
  // If no columns found, do nothing
  if (!colNodes.length) return;

  // Header row as specified
  const headerRow = ['Columns (columns18)'];

  // Each column cell: include the full column node (title + list)
  const columnsRow = colNodes.map((col) => col);

  // Build table data
  const tableData = [headerRow, columnsRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(block);
}
