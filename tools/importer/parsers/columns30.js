/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing the logos
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Get all <li> elements (each contains a logo)
  const lis = Array.from(ul.children).filter(child => child.tagName === 'LI');

  // Each column should be a single logo (picture or image) in its own cell
  const contentRow = lis.map(li => {
    const picture = li.querySelector('picture');
    if (picture) return picture;
    const img = li.querySelector('img');
    if (img) return img;
    return li;
  });

  // Table header row: must be a single column with the block name
  const headerRow = ['Columns block (columns30)'];

  // Build the table: header row, then one row with each logo in its own cell
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
