/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate children (columns)
  const columns = Array.from(element.children);
  if (columns.length < 2) return; // Must have at least 2 columns

  // Header row: must match block name exactly
  const headerRow = ['Columns block (columns80)'];

  // For each column, gather its content
  // Left column: navigation
  // Right column: main content
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Defensive: reference existing elements, do not clone
  // Wrap each column's content in a div for clarity
  const leftContent = document.createElement('div');
  while (leftCol.childNodes.length) {
    leftContent.appendChild(leftCol.childNodes[0]);
  }

  const rightContent = document.createElement('div');
  while (rightCol.childNodes.length) {
    rightContent.appendChild(rightCol.childNodes[0]);
  }

  // Second row: two columns
  const secondRow = [leftContent, rightContent];

  // Build table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
