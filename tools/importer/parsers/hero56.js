/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the inner structure
  const inner = element.querySelector('.str-inner');
  if (!inner) return;

  // Get the image section (background image)
  const imageDiv = inner.querySelector('.image');
  let bgImg = null;
  if (imageDiv) {
    // Prefer desktop image if present
    bgImg = imageDiv.querySelector('.pc-show') || imageDiv.querySelector('img');
  }

  // Get the content section
  const contentDiv = inner.querySelector('.content');
  let contentBlock = null;
  if (contentDiv) {
    // Use the entire content block for resilience
    contentBlock = contentDiv;
  }

  // Table header
  const headerRow = ['Hero (hero56)'];
  // Second row: background image (optional)
  const imageRow = [bgImg ? bgImg : ''];
  // Third row: text content (title, subtitle, CTA)
  const contentRow = [contentBlock ? contentBlock : ''];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
