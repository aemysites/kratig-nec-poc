/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element is a <dd> containing a <ul>
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Get all immediate <li> children (each is a column)
  const liNodes = Array.from(ul.children).filter((child) => child.tagName === 'LI');
  if (liNodes.length === 0) return;

  // Each column cell will contain the full <li> (image and any text)
  const columnsRow = liNodes.map((li) => li);

  // Table header as specified
  const headerRow = ['Columns block (columns53)'];

  // Compose table rows
  const cells = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
