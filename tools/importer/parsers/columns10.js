/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns
  const children = Array.from(element.children);
  let leftCol = children.find((el) => el.classList.contains('str-column-side'));
  let rightCol = children.find((el) => el.classList.contains('str-column-main'));

  // Fallbacks if not found
  if (!leftCol) leftCol = children[0];
  if (!rightCol) rightCol = children[1];

  // --- LEFT COLUMN ---
  // Use the nav-local block if present, else the whole leftCol
  let leftContent = null;
  if (leftCol) {
    // Instead of just nav, include all visible content in leftCol
    leftContent = document.createElement('div');
    Array.from(leftCol.childNodes).forEach((node) => {
      // Only include element nodes and text nodes with non-whitespace
      if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
        leftContent.appendChild(node.cloneNode(true));
      }
    });
  }

  // --- RIGHT COLUMN ---
  // Gather all .str-outer-full blocks and all other visible content
  let rightContent = document.createElement('div');
  if (rightCol) {
    // Include all children (not just .str-outer-full)
    Array.from(rightCol.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
        rightContent.appendChild(node.cloneNode(true));
      }
    });
  }

  // Table header must match the block name exactly
  const headerRow = ['Columns block (columns10)'];
  const contentRow = [leftContent, rightContent];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
