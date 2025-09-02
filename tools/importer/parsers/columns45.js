/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all direct children
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // First column: left content (title and subtitle)
  let leftContent = null;
  let rightContent = null;

  // Find the .h2default (left) and .link (right)
  children.forEach((child) => {
    if (child.classList.contains('h2default')) {
      leftContent = child;
    } else if (child.classList.contains('link')) {
      rightContent = child;
    }
  });

  // Fallbacks if structure changes
  if (!leftContent) {
    leftContent = document.createElement('div');
    leftContent.textContent = '';
  }
  if (!rightContent) {
    rightContent = document.createElement('div');
    rightContent.textContent = '';
  }

  // Table header
  const headerRow = ['Columns block (columns45)'];
  // Table content row: two columns
  const contentRow = [leftContent, rightContent];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
