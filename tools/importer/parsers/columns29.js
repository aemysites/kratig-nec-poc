/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the inner column container
  const inner = element.querySelector('.inner');
  if (!inner) return;

  // Get the left column (title + description)
  const leftCol = inner.querySelector('.h2scroll');
  // Get the right column (link)
  const rightCol = inner.querySelector('.link');

  // Defensive: ensure both columns exist
  if (!leftCol || !rightCol) return;

  // Table header row
  const headerRow = ['Columns block (columns29)'];
  // Table content row: two columns side by side
  const contentRow = [leftCol, rightCol];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
