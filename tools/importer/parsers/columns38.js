/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns container
  const inner = element.querySelector('.nic-container .inner.nic-column');
  if (!inner) return;

  // Find the two column content blocks: .application and .sponsorship
  const application = inner.querySelector('.application');
  const sponsorship = inner.querySelector('.sponsorship');
  if (!application || !sponsorship) return;

  // Table header row: must match block name exactly
  const headerRow = ['Columns block (columns38)'];
  // Table content row: each cell is a reference to the respective column element
  const contentRow = [application, sponsorship];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
