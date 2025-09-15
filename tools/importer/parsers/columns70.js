/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all immediate children divs
  const mainCols = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Find the navigation/sidebar and main content column
  let navCol = null;
  let mainCol = null;
  mainCols.forEach(div => {
    if (div.querySelector('nav.nav-local')) navCol = div;
    else mainCol = div;
  });

  // Defensive: If not found, fallback to first/second
  if (!mainCol) mainCol = mainCols[1] || mainCols[0];
  if (!navCol) navCol = mainCols[0];

  // --- COLUMN 1: Sidebar Navigation ---
  // We'll include the entire navCol for resilience

  // --- COLUMN 2: Main Content ---
  // We'll include the entire mainCol for resilience

  // Table header
  const headerRow = ['Columns (columns70)'];

  // Table content row: two columns, sidebar and main content
  const contentRow = [navCol, mainCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
