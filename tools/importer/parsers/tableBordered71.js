/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Table (bordered, tableBordered71)'];

  // Find all .mod-tbl > table.tbl-01 elements (the actual data tables)
  const tables = Array.from(element.querySelectorAll('.mod-tbl > table.tbl-01'));
  if (!tables.length) return;

  // Helper to get all relevant description text blocks before each table
  function getDescriptions(table) {
    const descriptions = [];
    let node = table.parentElement;
    while (node && node !== element) {
      // Look for previous siblings with .str-inner containing <p> or <span>
      let sibling = node.previousElementSibling;
      while (sibling) {
        if (sibling.classList.contains('str-inner')) {
          // Get all <p> and <span> text
          Array.from(sibling.querySelectorAll('p, span')).forEach(el => {
            const txt = el.textContent.trim();
            if (txt) descriptions.unshift(txt);
          });
        }
        sibling = sibling.previousElementSibling;
      }
      node = node.parentElement;
    }
    return descriptions;
  }

  // For each table, extract its rows as arrays of cell text, and prepend all description blocks
  let allRows = [headerRow];
  tables.forEach(table => {
    const descs = getDescriptions(table);
    descs.forEach(desc => {
      allRows.push([desc]);
    });
    // Extract all rows as arrays of cell text
    const tableRows = Array.from(table.querySelectorAll('tr')).map(tr => {
      return Array.from(tr.children).map(cell => cell.textContent.trim().replace(/\s+/g, ' '));
    });
    tableRows.forEach(rowArr => {
      allRows.push([rowArr.join(' | ')]);
    });
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(allRows, document);

  // Replace the first .mod-tbl with the block
  const firstModTbl = element.querySelector('.mod-tbl');
  if (firstModTbl) {
    firstModTbl.replaceWith(block);
  }
}
