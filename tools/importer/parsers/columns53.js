/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as per block requirements
  const headerRow = ['Columns block (columns53)'];

  // Find the <ul> containing the columns (should be the only child of <dd>)
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Each <li> is a column; collect their content
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');
  // Defensive: skip if no columns
  if (lis.length === 0) return;

  // For each column, grab the entire <li> content (usually a <picture> with an <img>)
  const columnsRow = lis.map(li => {
    // Use the <picture> or the entire <li> if not present
    const pic = li.querySelector('picture');
    return pic || li;
  });

  // Compose the table rows
  const rows = [headerRow, columnsRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
