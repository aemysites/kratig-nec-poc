/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main container for the columns block
  const container = element.querySelector('.oi-container .inner.oi-column .content .oibm-partner-wrap');
  if (!container) return;

  // Get the <dt> (image) and <dd> (content) columns
  const dt = container.querySelector('dt');
  const dd = container.querySelector('dd');
  if (!dt || !dd) return;

  // First column: the image (as rendered, includes the picture and img)
  // Second column: all the content (heading, paragraphs, sign)
  const firstCol = dt;
  const secondCol = dd;

  // Build the table rows
  const headerRow = ['Columns (columns46)'];
  const contentRow = [firstCol, secondCol];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new block
  element.replaceWith(table);
}
