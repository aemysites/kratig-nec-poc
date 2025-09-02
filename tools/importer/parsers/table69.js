/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['City (table69)'];

  // Find all the tables that are part of the main content column
  // Defensive: Only select tables inside .str-column-main
  const mainColumn = element.querySelector('.str-column-main');
  if (!mainColumn) return;

  // Find all .mod-tbl tables (the data tables)
  const tables = Array.from(mainColumn.querySelectorAll('.mod-tbl'));

  // For each table, also grab the paragraph above it (if any)
  // We'll collect blocks of [description, table] for each
  const contentRows = [];
  tables.forEach((tbl) => {
    // Find the closest previous .str-outer or .str-outer-full that contains a paragraph
    let desc = null;
    let outer = tbl.closest('.str-outer, .str-outer-full');
    if (outer) {
      let prev = outer.previousElementSibling;
      while (prev) {
        const p = prev.querySelector('p');
        if (p && p.textContent.trim()) {
          desc = p;
          break;
        }
        prev = prev.previousElementSibling;
      }
    }
    // Compose a fragment with description (if any) and the table
    const frag = document.createElement('div');
    if (desc) {
      frag.appendChild(desc.cloneNode(true));
    }
    frag.appendChild(tbl.querySelector('table').cloneNode(true));
    contentRows.push([frag]);
  });

  // Create the block table
  const cells = [headerRow, ...contentRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
