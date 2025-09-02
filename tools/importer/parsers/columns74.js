/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main columns: nav (left) and main content (right)
  const columns = [];
  // Left column: find the nav-local (menu) container
  let leftCol = null;
  let rightCol = null;
  const directChildren = element.querySelectorAll(':scope > div');
  for (const child of directChildren) {
    if (child.querySelector('.nav-local')) {
      leftCol = child;
    } else {
      rightCol = child;
    }
  }

  // Defensive: if not found, fallback to first/second child
  if (!leftCol && directChildren.length > 0) leftCol = directChildren[0];
  if (!rightCol && directChildren.length > 1) rightCol = directChildren[1];

  // Compose the columns array
  columns.push(leftCol);
  columns.push(rightCol);

  // Table header row
  const headerRow = ['Columns (columns74)'];
  // Table content row: two columns
  const contentRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
