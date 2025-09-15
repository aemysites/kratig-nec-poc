/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main wrapper for the columns content
  // The structure is: .seg-secondary > .str-outer-wide > .str-inner > .wrap
  let wrap = element.querySelector('.str-outer-wide .str-inner .wrap');
  if (!wrap) {
    // fallback: try to find .wrap anywhere inside
    wrap = element.querySelector('.wrap');
  }
  if (!wrap) {
    // fallback: just use the element itself
    wrap = element;
  }

  // Find the <ul class="list"> and <p class="copyright">
  const list = wrap.querySelector('ul.list');
  const copyright = wrap.querySelector('p.copyright');

  // Defensive: if not found, create empty fallback
  const listCol = list || document.createElement('div');
  const copyrightCol = copyright || document.createElement('div');

  // Table header row as required
  const headerRow = ['Columns (columns58)'];
  // Table content row: two columns, first is the list, second is copyright
  const contentRow = [listCol, copyrightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
