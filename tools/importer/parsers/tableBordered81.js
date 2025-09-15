/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main table block
  const tableOuter = element.querySelector('.tblScroll-01');
  const table = tableOuter && tableOuter.querySelector('table');
  if (!table) return;

  // Always use the block name as the header row
  const cells = [['Table (bordered, tableBordered81)']];

  // Get all table rows
  const rows = Array.from(table.querySelectorAll('tr'));
  if (rows.length === 0) return;

  // For each table row (skip the first, which is the table's own header)
  for (let i = 1; i < rows.length; i++) {
    const tr = rows[i];
    // Only select direct td children (not nested)
    const tds = Array.from(tr.children).filter(child => child.tagName.toLowerCase() === 'td');
    // Only keep the first three tds (corresponding to the three columns in the table)
    const mainTds = tds.slice(0, 3);
    const rowCells = mainTds.map(td => {
      // If the cell contains a list, preserve the list
      const ul = td.querySelector('ul');
      if (ul) {
        return ul;
      }
      // If the cell contains a link, preserve the link
      const a = td.querySelector('a');
      if (a && a.textContent.trim()) {
        return a;
      }
      // Otherwise, preserve all text content (including line breaks)
      return td.innerHTML.trim() ? td.cloneNode(true) : '';
    });
    // Only push row if it has at least one non-empty cell
    if (rowCells.length > 0 && rowCells.some(cell => {
      if (typeof cell === 'string') return cell.trim() !== '';
      if (cell && cell.textContent) return cell.textContent.trim() !== '';
      return false;
    })) {
      cells.push(rowCells);
    }
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
