/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Always use the correct block name header
  const headerRow = ['Columns (columns51)'];

  // Find all direct children columns
  const columns = Array.from(element.querySelectorAll(':scope > .oi-achievements-list-inner'));
  if (!columns.length) return;

  // Each column cell contains the actual DOM node (not clone)
  const contentRow = columns.map((col) => col);

  // Create the table with the block header and the content row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
