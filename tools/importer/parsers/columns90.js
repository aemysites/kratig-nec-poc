/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all top-level columns (should be two: nav and main content)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: ensure at least two columns
  const leftCol = columns[0] || null;
  const rightCol = columns[1] || null;

  // Header row as required
  const headerRow = ['Columns block (columns90)'];

  // Content row: each column as a cell
  // Use the entire left and right column elements for resilience
  const contentRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
