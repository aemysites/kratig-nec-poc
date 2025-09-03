/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children with class 'inner'
  const inners = Array.from(element.querySelectorAll(':scope > .inner'));
  // Build columns for the second row
  const columns = inners.map(inner => {
    // For each .inner, collect all children (text, dl, etc.)
    // We'll preserve the structure and reference existing nodes
    const nodes = [];
    inner.childNodes.forEach(node => {
      // Only include non-empty text nodes and elements
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim().length > 0) {
          nodes.push(node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        nodes.push(node);
      }
    });
    return nodes;
  });
  // Table structure: header row, then one row with columns
  const cells = [
    ['Columns block (columns31)'],
    columns
  ];
  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(block);
}
