/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children that represent columns
  const innerBlocks = Array.from(element.querySelectorAll(':scope > .noff-achievements-list-inner'));

  // Build the header row with the exact block name
  const headerRow = ['Columns (columns91)'];

  // Build the columns row
  const columnsRow = innerBlocks.map((col) => {
    // Gather all direct children for each column
    // Get dt (title), image, and p (description/value)
    const dt = col.querySelector('dt');
    const imgDiv = col.querySelector('.img');
    const p = col.querySelector('p');

    // Compose a fragment for the column
    const frag = document.createElement('div');
    if (dt) frag.appendChild(dt);
    if (imgDiv) frag.appendChild(imgDiv);
    if (p) frag.appendChild(p);
    return frag;
  });

  // Compose the table
  const cells = [
    headerRow,
    columnsRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
