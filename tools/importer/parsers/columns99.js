/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Find the two main columns
  const columns = getDirectChildren(element, '.ls-col, .ls-row.str-column-main');

  // Defensive: If not found, fallback to first two children
  let leftCol = columns[0] || element.children[0];
  let rightCol = columns[1] || element.children[1];

  // --- LEFT COLUMN ---
  // The left column is the navigation block
  // We'll include the entire nav-local block for resilience
  let leftContent = leftCol.querySelector('.nav-local') || leftCol;

  // --- RIGHT COLUMN ---
  // The right column is the main content
  // We'll include all direct children of .str-column-main
  // This ensures all headings, images, paragraphs, lists, etc. are included
  let rightContent = document.createElement('div');
  // Find all .str-outer > .str-inner blocks
  const mainBlocks = rightCol.querySelectorAll('.str-outer > .str-inner');
  mainBlocks.forEach(block => {
    rightContent.appendChild(block);
  });

  // --- TABLE STRUCTURE ---
  const headerRow = ['Columns block (columns99)'];
  const contentRow = [leftContent, rightContent];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
