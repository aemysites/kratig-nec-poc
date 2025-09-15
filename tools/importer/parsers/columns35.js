/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the UL containing the columns
  const ul = element.querySelector('ul.list');
  if (!ul) return;

  // Get all LI items (each is a column)
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // For each LI, extract the anchor (with icon and text)
  const columns = lis.map(li => {
    // Each LI should contain an <a> with .link
    const a = li.querySelector('a.link');
    if (!a) return document.createTextNode('');
    // Use the anchor directly (includes icon and text)
    return a;
  });

  // Header row as specified
  const headerRow = ['Columns block (columns35)'];
  // Second row: columns side by side
  const contentRow = columns;

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
