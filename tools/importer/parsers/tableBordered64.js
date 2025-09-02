/* global WebImporter */
export default function parse(element, { document }) {
  // Find all .mod-tbl tables in order
  const tables = Array.from(element.querySelectorAll('.mod-tbl table'));
  if (!tables.length) return;

  // Find all section headings (h2.mod-hdg-l2-02) in order
  const headings = Array.from(element.querySelectorAll('h2.mod-hdg-l2-02'));

  // Compose block rows: each row is [heading, table]
  const rows = [];
  for (let i = 0; i < tables.length; i++) {
    // Defensive: headings[i] may be undefined if table has no heading
    const heading = headings[i] || '';
    rows.push([heading, tables[i]]);
  }

  // Add notices (mod-list-02.of-notice) if present
  const notices = element.querySelectorAll('.mod-list-02.of-notice');
  if (notices.length) {
    rows.push([notices.length === 1 ? notices[0] : Array.from(notices)]);
  }

  // Add extra paragraphs (p.align-left) if present
  const extraParas = element.querySelectorAll('p.align-left');
  if (extraParas.length) {
    rows.push([extraParas.length === 1 ? extraParas[0] : Array.from(extraParas)]);
  }

  // Add button lists (mod-btn-list) if present
  const btnLists = element.querySelectorAll('.mod-btn-list');
  if (btnLists.length) {
    rows.push([btnLists.length === 1 ? btnLists[0] : Array.from(btnLists)]);
  }

  // Always use the required block header
  const cells = [
    ['Table (bordered, tableBordered64)'],
    ...rows
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
