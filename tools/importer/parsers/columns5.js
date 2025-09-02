/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate children with class 'nic-achievements-list-inner'
  const inners = Array.from(element.querySelectorAll(':scope > .nic-achievements-list-inner'));
  if (!inners.length) return;

  // Build the header row as required
  const headerRow = ['Columns block (columns5)'];

  // Each column cell is the content of one '.nic-achievements-list-inner'
  // We want to preserve the structure, so we can just use the inner divs directly
  const columnsRow = inners;

  // Build the table data
  const tableData = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
