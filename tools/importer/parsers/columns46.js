/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main <dl> block containing the two columns
  const dl = element.querySelector('dl.oibm-partner-wrap');
  if (!dl) return;

  // Get the two columns: <dt> (image), <dd> (content)
  const dt = dl.querySelector('dt');
  const dd = dl.querySelector('dd');
  if (!dt || !dd) return;

  // Table header row: must match the block name exactly
  const headerRow = ['Columns block (columns46)'];
  // Table content row: reference the actual elements
  const contentRow = [dt, dd];

  // Build the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
