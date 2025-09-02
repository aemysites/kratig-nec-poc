/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main table inside the element
  const table = element.querySelector('table');
  if (!table) return;

  // Prepare the header row as required
  const headerRow = ['Table (bordered, tableBordered73)'];

  // Extract all table rows
  const rows = Array.from(table.querySelectorAll('tr'));

  // Only use the data rows (skip the first two header rows)
  const dataRows = rows.slice(2).map(row => {
    return Array.from(row.children).map(cell => {
      // Use the text content or the full cell element if it contains HTML
      if (cell.childElementCount === 0) {
        return cell.textContent.trim();
      }
      // If the cell contains only a <p> with text, use the <p> directly
      if (
        cell.childElementCount === 1 &&
        cell.firstElementChild.tagName === 'P'
      ) {
        return cell.firstElementChild;
      }
      // Otherwise, use the cell's inner HTML as a fragment
      const fragment = document.createElement('div');
      fragment.innerHTML = cell.innerHTML;
      return Array.from(fragment.childNodes);
    });
  });

  // Compose the final cells array
  const cells = [headerRow, ...dataRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original table with the block table
  table.replaceWith(block);
}
