/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main content wrapper
  const wide = element.querySelector('.str-outer-wide');
  if (!wide) return;
  const inner = wide.querySelector('.str-inner');
  if (!inner) return;
  const wrap = inner.querySelector('.wrap');
  if (!wrap) return;

  // Find the <ul class="list"> and the copyright <p>
  const list = wrap.querySelector('ul.list');
  const copyright = wrap.querySelector('p.copyright');

  // Defensive: Only proceed if both are found
  if (!list || !copyright) return;

  // Prepare columns: first column is the <ul>, second column is the copyright
  const columnsRow = [list, copyright];

  // Build the table
  const headerRow = ['Columns (columns58)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
