/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as per block guidelines
  const headerRow = ['Hero (hero40)'];

  // No background image in this block, so row 2 is empty
  const imageRow = [''];

  // Row 3: All content from the .lead block
  // We'll include all children in order for resilience
  const contentChildren = Array.from(element.childNodes);

  // Defensive: filter out empty text nodes
  const contentNodes = contentChildren.filter(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent.trim().length > 0;
    }
    return true;
  });

  const contentRow = [contentNodes];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
