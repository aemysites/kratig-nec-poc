/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the correct header row
  const headerRow = ['Columns block (columns54)'];

  // Find the two main columns
  const columns = Array.from(element.children).filter(el => el.classList.contains('ls-col') || el.classList.contains('str-column-main'));
  if (columns.length < 2) return;

  // LEFT COLUMN: navigation block
  const leftCol = columns[0];
  const nav = leftCol.querySelector('nav.nav-local');
  // Defensive: if nav not found, use leftCol
  const leftCell = nav || leftCol;

  // RIGHT COLUMN: gather all .str-outer-full > .str-inner blocks
  const rightCol = columns[1];
  const inners = rightCol.querySelectorAll('.str-outer-full > .str-inner');
  const rightCellContent = Array.from(inners);

  // Compose table rows
  const contentRow = [leftCell, rightCellContent];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
