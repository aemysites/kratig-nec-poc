/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the UL containing the logos
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Get all LI elements (each logo)
  const lis = Array.from(ul.children).filter(el => el.tagName === 'LI');

  // Each LI contains a <picture> (with <img>), so we want to reference each LI as a column cell
  // This allows for future flexibility if LI contains more than just the image
  const columnsRow = lis.map(li => li);

  // Table header as per block guidelines
  const headerRow = ['Columns block (columns30)'];

  // Build the table data
  const cells = [
    headerRow,
    columnsRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
