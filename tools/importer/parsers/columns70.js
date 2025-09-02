/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Get the two main columns
  const columns = getDirectChildren(element, 'div');
  if (columns.length < 2) return; // Defensive: need at least two columns

  // --- Left column: navigation ---
  const leftCol = columns[0];
  // We'll include the entire nav block as is (for resilience)
  const nav = leftCol.querySelector('nav');

  // --- Right column: main content ---
  const rightCol = columns[1];
  // We'll collect all .str-outer > .str-inner blocks as content
  const mainContentBlocks = [];
  rightCol.querySelectorAll('.str-outer > .str-inner').forEach(inner => {
    mainContentBlocks.push(inner);
  });

  // Compose the columns row
  const columnsRow = [
    nav,
    mainContentBlocks
  ];

  // Compose the table
  const tableCells = [
    ['Columns (columns70)'], // header row
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(block);
}
