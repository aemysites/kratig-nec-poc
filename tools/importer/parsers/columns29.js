/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the inner column container
  const inner = element.querySelector('.inner');
  if (!inner) return;

  // Get the two main column elements
  // First column: heading and lead
  const h2scroll = inner.querySelector('.h2scroll');
  // Second column: link
  const linkDiv = inner.querySelector('.link');

  // Defensive: ensure both columns exist
  if (!h2scroll || !linkDiv) return;

  // Table header row
  const headerRow = ['Columns block (columns29)'];

  // Table content row: two columns
  const contentRow = [h2scroll, linkDiv];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
