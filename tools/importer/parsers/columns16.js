/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .wrap element that contains the content
  const wrap = element.querySelector('.wrap') || element;

  // Find the navigation list (footer links)
  const listEl = wrap.querySelector('ul.list');
  // Find the copyright paragraph
  const copyrightEl = wrap.querySelector('p.copyright');

  // Defensive: if elements are missing, use empty divs to preserve columns
  const leftCol = listEl || document.createElement('div');
  const rightCol = copyrightEl || document.createElement('div');

  // Table header row as per block guidelines
  const headerRow = ['Columns block (columns16)'];
  // Table content row: two columns, referencing the actual DOM elements
  const contentRow = [leftCol, rightCol];

  // Build the columns block table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
