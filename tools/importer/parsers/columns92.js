/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get all immediate children that represent columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // There should be two columns: left nav and main content
  // Column 1: left nav
  let leftCol = columns[0];
  // Column 2: main content
  let rightCol = columns[1];

  // Defensive: If structure changes, fallback to empty divs
  if (!leftCol) leftCol = document.createElement('div');
  if (!rightCol) rightCol = document.createElement('div');

  // Table header row
  const headerRow = ['Columns (columns92)'];
  // Table content row: two columns side by side
  const contentRow = [leftCol, rightCol];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
