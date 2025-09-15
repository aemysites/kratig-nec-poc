/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Table (striped, bordered, tableStripedBordered59)'];
  const cells = [headerRow];

  // Find the customer profile section
  const customerProfileH2 = element.querySelector('h2.mod-hdg-l2-02 span');
  let customerProfileSection = null;
  if (customerProfileH2 && customerProfileH2.textContent.trim().toLowerCase() === 'customer profile') {
    // Find the next h3 (company name)
    let h3 = customerProfileH2.parentElement.parentElement.parentElement.nextElementSibling;
    while (h3 && !h3.querySelector('h3.mod-hdg-l3-02')) {
      h3 = h3.nextElementSibling;
    }
    if (h3) {
      const companyName = h3.querySelector('h3.mod-hdg-l3-02');
      // Find the next .mod-tbl table after this h3
      let tbl = h3.nextElementSibling;
      while (tbl && !tbl.querySelector('.mod-tbl table')) {
        tbl = tbl.nextElementSibling;
      }
      if (companyName && tbl) {
        const table = tbl.querySelector('.mod-tbl table');
        // Compose a cell with the company name and its table
        cells.push([[companyName, table]]);
      } else if (companyName) {
        cells.push([[companyName]]);
      }
    }
  }

  // Defensive: if no company found, try to find any .mod-tbl table
  if (cells.length === 1) {
    const tables = Array.from(element.querySelectorAll('.mod-tbl table'));
    tables.forEach(tbl => {
      cells.push([[tbl]]);
    });
  }

  // Defensive: if still no rows, do nothing
  if (cells.length === 1) return;

  // Create the block table
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(tableBlock);
}
