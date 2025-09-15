/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct .inner children (each is a column)
  const inners = Array.from(element.querySelectorAll(':scope > .inner'));

  // For each column, gather its content as an array of nodes
  const columnCells = inners.map(inner => {
    // Only include element nodes and non-empty text nodes
    return Array.from(inner.childNodes).filter(node => {
      return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
    });
  });

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns31)'];
  // Table content row: each cell is an array of nodes from each column
  const contentRow = columnCells;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
