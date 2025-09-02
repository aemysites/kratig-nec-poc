/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get the inner wrapper
  const inner = element.querySelector('.str-inner');
  if (!inner) return;

  // Get left column: content
  const content = inner.querySelector('.content');
  // Get right column: image
  const imageDiv = inner.querySelector('.image');

  // Defensive: If either column missing, abort
  if (!content || !imageDiv) return;

  // Table header row
  const headerRow = ['Columns block (columns55)'];

  // Table content row: left and right columns
  const contentRow = [content, imageDiv];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element with block table
  element.replaceWith(table);
}
