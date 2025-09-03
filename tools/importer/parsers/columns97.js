/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Find the two main columns: nav (sidebar) and main content
  // The structure is: element > div.ls-col (sidebar) + div.ls-row (main)
  const columns = [];
  const children = Array.from(element.children);

  // Find sidebar (nav) and main content
  let sidebar = null;
  let main = null;
  for (const child of children) {
    if (child.classList.contains('ls-col')) {
      sidebar = child;
    } else if (child.classList.contains('ls-row')) {
      main = child;
    }
  }

  // Defensive: if not found, fallback to first/second child
  if (!sidebar && children.length > 0) sidebar = children[0];
  if (!main && children.length > 1) main = children[1];

  // Compose columns array
  if (sidebar && main) {
    columns.push(sidebar, main);
  } else if (main) {
    columns.push(main);
  } else if (sidebar) {
    columns.push(sidebar);
  }

  // Table header
  const headerRow = ['Columns block (columns97)'];
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
