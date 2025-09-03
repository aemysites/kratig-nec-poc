/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the inner layout containing the two columns
  const layout = element.querySelector('.layout');
  if (!layout) return;

  // Get the two main column containers
  const keywordCol = layout.querySelector('.keyword');
  const categoryCol = layout.querySelector('.category');
  if (!keywordCol || !categoryCol) return;

  // Header row as required
  const headerRow = ['Columns (columns47)'];

  // Second row: two columns side by side
  // Reference the entire keywordCol and categoryCol blocks
  const contentRow = [keywordCol, categoryCol];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
