/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getImmediateChildren(parent, selector) {
    return Array.from(parent.children).filter((child) => child.matches(selector));
  }

  // Get the two main columns: left nav and right content
  const columns = [];

  // Left column: navigation menu
  const leftCol = element.querySelector('.ls-col.str-column-side');
  if (leftCol) {
    columns.push(leftCol);
  }

  // Right column: main content
  const rightCol = element.querySelector('.ls-row.str-column-main');
  if (rightCol) {
    columns.push(rightCol);
  }

  // Defensive: If columns not found, fallback to immediate children
  if (columns.length !== 2) {
    const divs = getImmediateChildren(element, 'div');
    if (divs.length >= 2) {
      columns.length = 0;
      columns.push(divs[0], divs[1]);
    }
  }

  // Table header
  const headerRow = ['Columns block (columns54)'];
  // Table content row: two columns
  const contentRow = columns;

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
