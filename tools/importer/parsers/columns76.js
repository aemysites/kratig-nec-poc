/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main columns: left (nav) and right (main content)
  const children = Array.from(element.children);
  const leftCol = children[0];
  const rightCol = children[1];

  // Block header row as required
  const headerRow = ['Columns block (columns76)'];
  // Table content row: left and right columns (reference, do not clone)
  const contentRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new block
  element.replaceWith(table);
}
