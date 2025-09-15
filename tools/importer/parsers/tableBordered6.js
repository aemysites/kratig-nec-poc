/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content column (ignore nav/sidebar)
  const mainCol = element.querySelector('.ls-row.str-column-main');
  if (!mainCol) return;

  // Find the specifications table
  const specsTable = mainCol.querySelector('table');
  if (!specsTable) return;

  // Table header row (block name)
  const headerRow = ['Table (bordered, tableBordered6)'];

  // Extract all rows from the table
  const rows = Array.from(specsTable.querySelectorAll('tr'));
  const contentRows = rows.map(tr => {
    // For each row, extract all cells (th or td) as their text/html content (not as elements)
    return Array.from(tr.children).map(cell => {
      // Use innerHTML to preserve formatting (bold, etc.), but do not wrap in extra elements
      return cell.innerHTML.trim();
    });
  });

  // Compose the final table: header row + all table rows
  const cells = [headerRow, ...contentRows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
