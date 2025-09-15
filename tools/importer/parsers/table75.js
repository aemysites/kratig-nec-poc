/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main table containing the data
  const table = element.querySelector('table');
  if (!table) return;

  // Build the header row as specified
  const headerRow = ['City (table75)'];

  // Extract all rows and columns from the table
  const rows = Array.from(table.querySelectorAll('tr'));
  // Build cells array: header row first, then each table row as an array of cell contents
  const cells = [headerRow];

  rows.forEach(row => {
    // Only process rows with td or th (skip colgroup, etc)
    const cellEls = row.querySelectorAll('td, th');
    if (cellEls.length === 0) return;
    // For each cell, get its text content (including links)
    const cellContents = Array.from(cellEls).map(cell => {
      // If cell contains links, preserve them as elements
      const links = cell.querySelectorAll('a');
      if (links.length > 0) {
        // If multiple links, include all
        return Array.from(links).map(a => a.cloneNode(true));
      }
      // Otherwise, include full cell text (including line breaks)
      return cell.innerHTML.replace(/<br\s*\/?>(\s*)/gi, '\n').replace(/<[^>]+>/g, '').trim();
    });
    // Flatten any arrays of links
    const flatContents = cellContents.flat();
    cells.push(flatContents);
  });

  // Remove the original header row(s) from the table data
  // The first two rows are headers, so skip them in the output
  // cells[1] and cells[2] are headers, so remove them
  cells.splice(1, 2);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
