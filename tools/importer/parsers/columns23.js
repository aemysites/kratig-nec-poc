/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child by class
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  // Find the main content wrapper for the columns
  const strOuter = Array.from(element.querySelectorAll(':scope > .str-outer')).find(
    d => d.querySelector('.str-inner > .link')
  );
  if (!strOuter) return;

  const strInner = getChildByClass(strOuter, 'str-inner');
  if (!strInner) return;

  // Social icons (first ul.sns)
  const snsList = strInner.querySelector('ul.sns');
  // The links block (div.link > ul.list)
  const linkDiv = strInner.querySelector('div.link');
  if (!linkDiv) return;
  const columnsList = linkDiv.querySelector('ul.list');
  if (!columnsList) return;

  // Each li.col is a column
  const colLis = Array.from(columnsList.querySelectorAll(':scope > li.col'));

  // Compose columns: first cell is the four columns, last cell is the social icons
  // We'll create four cells for the four columns, and a fifth for the social icons
  const columnCells = colLis.map(li => li);
  if (snsList) {
    columnCells.push(snsList);
  }

  // Table header
  const headerRow = ['Columns block (columns23)'];
  // Table content row: one cell per column (four columns + social icons)
  const contentRow = columnCells;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
