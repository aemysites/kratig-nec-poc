/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main inner content columns
  const inner = element.querySelector('.nic-container .inner.nic-column');
  let columns = [];
  if (inner) {
    // Only use .application and .sponsorship as columns
    const columnDivs = [
      inner.querySelector('.application'),
      inner.querySelector('.sponsorship')
    ].filter(Boolean);
    columns = columnDivs.map((col) => {
      // Create a wrapper div for each column's content
      const cellDiv = document.createElement('div');
      Array.from(col.children).forEach((child) => {
        cellDiv.appendChild(child.cloneNode(true));
      });
      return cellDiv;
    });
  }

  // Table header row
  const headerRow = ['Columns block (columns38)'];
  // Table content row: one cell per column
  const contentRow = columns;

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
