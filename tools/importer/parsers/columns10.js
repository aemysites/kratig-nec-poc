/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the main content column (right side)
  // Find the first .str-column-main or similar main content container
  let mainCol = element.querySelector('.str-column-main');
  if (!mainCol) {
    // fallback: try to find the largest column
    const cols = element.querySelectorAll(':scope > div');
    mainCol = Array.from(cols).reduce((largest, col) => {
      if (!largest || col.textContent.length > largest.textContent.length) return col;
      return largest;
    }, null);
  }

  // Defensive: if not found, fallback to the element itself
  if (!mainCol) mainCol = element;

  // The left nav column is the first child div (with nav-local)
  let navCol = element.querySelector('.str-column-side');
  if (!navCol) {
    // fallback: try to find a nav
    navCol = element.querySelector('nav');
  }
  // Defensive: if not found, fallback to the first child
  if (!navCol) navCol = element.firstElementChild;

  // Compose the columns row: [left, right]
  const columnsRow = [navCol, mainCol];

  // Table header row as per spec
  const headerRow = ['Columns block (columns10)'];

  // Compose the table
  const cells = [
    headerRow,
    columnsRow,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
