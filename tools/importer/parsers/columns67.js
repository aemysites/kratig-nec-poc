/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns (columns67)'];

  // Defensive: get all immediate children of the main block
  const topChildren = Array.from(element.children);

  // The left column is the navigation sidebar
  const leftCol = topChildren[0];
  // The right column is the main content area
  const rightCol = topChildren[1];

  // --- LEFT COLUMN ---
  // For the left column, we want to preserve the entire nav block
  // This includes the nav-local and all its content
  // We'll reference the nav element directly
  const nav = leftCol.querySelector('nav');

  // --- RIGHT COLUMN ---
  // For the right column, we want all the main content
  // We'll collect all direct children of the rightCol
  // This will include headings, paragraphs, images, buttons, etc.
  const rightContent = [];
  Array.from(rightCol.children).forEach((outerFull) => {
    // Defensive: Only process .str-outer-full blocks
    if (outerFull.classList.contains('str-outer-full')) {
      // Each .str-outer-full contains a .str-inner
      const inner = outerFull.querySelector('.str-inner');
      if (inner) {
        // If .str-inner contains a .mod-btn-list, keep the whole block
        const btnList = inner.querySelector('.mod-btn-list');
        if (btnList) {
          rightContent.push(btnList);
        } else {
          // Otherwise, push all children (paragraphs, figures, etc.)
          Array.from(inner.children).forEach((child) => {
            rightContent.push(child);
          });
        }
      }
    }
  });

  // Table second row: two columns, left is nav, right is main content
  const secondRow = [nav, rightContent];

  // Build the table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
