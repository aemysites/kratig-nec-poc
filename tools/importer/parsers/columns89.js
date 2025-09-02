/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element exists
  if (!element) return;

  // 1. Header row as per requirements
  const headerRow = ['Columns block (columns89)'];

  // 2. Find all immediate children with class 'noff-achievements-list-inner' (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > .noff-achievements-list-inner'));

  // Defensive: If no columns found, do nothing
  if (!columns.length) return;

  // 3. For each column, collect its content as a single cell
  //    (We reference the entire inner block for resilience)
  const contentRow = columns.map(col => col);

  // 4. Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // 5. Replace the original element with the new table
  element.replaceWith(table);
}
