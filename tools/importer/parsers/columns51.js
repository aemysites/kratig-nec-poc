/* global WebImporter */
export default function parse(element, { document }) {
  // Get all columns
  const columns = Array.from(element.querySelectorAll(':scope > .oi-achievements-list-inner'));
  if (!columns.length) return;

  // Header row as required
  const headerRow = ['Columns block (columns51)'];

  // Build the columns row
  const columnsRow = columns.map((col) => {
    const colContent = [];

    // Title and subtitle (from dl)
    const dl = col.querySelector('dl');
    if (dl) {
      // Clone the dl to avoid moving it from the DOM
      const dlClone = dl.cloneNode(true);
      colContent.push(dlClone);
    }

    // Image (from .img)
    const imgDiv = col.querySelector('.img');
    if (imgDiv) {
      // Reference the picture/img directly
      const pic = imgDiv.querySelector('picture') || imgDiv.querySelector('img');
      if (pic) colContent.push(pic);
    }

    // Number/amount (from p)
    const p = col.querySelector('p');
    if (p) {
      // Clone the p to avoid moving it from the DOM
      const pClone = p.cloneNode(true);
      colContent.push(pClone);
    }

    // Return as a single cell (array of elements)
    return colContent;
  });

  // Table data
  const tableData = [headerRow, columnsRow];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(block);
}
