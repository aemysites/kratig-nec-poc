/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate children that are columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // If there are not at least 2 columns, do nothing
  if (columns.length < 2) return;

  // Header row as specified
  const headerRow = ['Columns block (columns78)'];

  // Build the second row: one cell per column
  // For each column, gather its entire content
  const contentRow = columns.map((col) => col);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
