/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main layout container for the two columns
  const layout = element.querySelector('.layout');
  if (!layout) return;

  // Get the two column elements: keyword (left), category (right)
  const columns = layout.querySelectorAll(':scope > div');
  if (columns.length < 2) return;

  // Prepare the header row as required
  const headerRow = ['Columns (columns47)'];

  // Prepare the columns row: each cell is the full column content
  const columnsRow = [columns[0], columns[1]];

  // Build the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
