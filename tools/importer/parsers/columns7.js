/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process <dd> blocks with a <ul> of <li> containing <picture>
  if (!element || !element.querySelector('ul')) return;

  // Header row as per block guidelines
  const headerRow = ['Columns block (columns7)'];

  // Get all <li> direct children of the <ul>
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter((li) => li.tagName === 'LI');

  // For each <li>, extract its <picture> (with <img>)
  const columnCells = lis.map((li) => {
    // Defensive: Find the <picture> inside the <li>
    const picture = li.querySelector('picture');
    // If picture exists, use it; else, fallback to the whole <li>
    return picture || li;
  });

  // Build the table rows
  const cells = [
    headerRow,
    columnCells
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
