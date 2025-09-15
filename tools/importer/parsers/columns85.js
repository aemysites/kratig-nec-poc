/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element is a <dd> with a <ul> of <li>s
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');
  if (!lis.length) return;

  // Each column is the content of a <li> (usually a <picture> with an <img>)
  const columns = lis.map(li => {
    // Use the entire <li> as the cell content for resilience
    return li;
  });

  // Build the table rows
  const headerRow = ['Columns block (columns85)'];
  const contentRow = columns;
  const tableRows = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
