/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as per block requirements
  const headerRow = ['Columns block (columns7)'];

  // Find the <ul> containing the columns
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Each <li> is a column; collect their content
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');
  if (lis.length === 0) return;

  // For each <li>, extract its content (usually a <picture> with <img>)
  const columns = lis.map(li => {
    // Defensive: if <li> has children, use them; else, use the <li> itself
    if (li.children.length > 0) {
      // If there's only one child (e.g., <picture>), use that
      if (li.children.length === 1) {
        return li.firstElementChild;
      } else {
        // Otherwise, return all children as an array
        return Array.from(li.children);
      }
    }
    return li;
  });

  // Build the table rows
  const rows = [
    headerRow,
    columns
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
