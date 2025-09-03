/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main table containing the tabular data
  const tableWrapper = element.querySelector('.tblScroll-01');
  let table;
  if (tableWrapper) {
    table = tableWrapper.querySelector('table');
  } else {
    table = element.querySelector('table');
  }
  if (!table) return;

  // Prepare the header row as required
  const headerRow = ['Table (bordered, tableBordered79)'];

  // Build the cells array: first row is header, then each table row as an array of cell text/html
  const cells = [headerRow];

  // Only use the rows inside <tbody>
  const tbody = table.querySelector('tbody');
  const rows = tbody ? Array.from(tbody.rows) : Array.from(table.rows);

  // Skip the first row (table header), only add data rows
  rows.slice(1).forEach((tr) => {
    const cellEls = Array.from(tr.children);
    const cellContents = cellEls.map(cell => {
      // Instead of innerHTML, use a fragment to preserve all text and links, including nested elements
      const frag = document.createDocumentFragment();
      Array.from(cell.childNodes).forEach(node => {
        frag.appendChild(node.cloneNode(true));
      });
      return frag;
    });
    cells.push(cellContents);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
