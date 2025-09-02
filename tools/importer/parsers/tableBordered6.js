/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main content column (right side)
  const mainCol = element.querySelector('.str-column-main');
  if (!mainCol) return;

  // Table header row as per requirements
  const headerRow = ['Table (bordered, tableBordered6)'];
  const rows = [headerRow];

  // Find the product title (h2)
  const title = mainCol.querySelector('h2');
  // Find the main image figure (with figcaption)
  const figure = mainCol.querySelector('figure');
  // Find the intro/description paragraph (first p after image)
  let description = null;
  const paragraphs = mainCol.querySelectorAll('p');
  if (paragraphs.length) {
    description = paragraphs[0];
  }

  // Find the specifications table (the only table in this block)
  const table = mainCol.querySelector('table');

  // Compose the content cell: title, image, description, and table
  const content = [];
  if (title) content.push(title.cloneNode(true));
  if (figure) content.push(figure.cloneNode(true));
  if (description) content.push(description.cloneNode(true));
  if (table) content.push(table.cloneNode(true));

  // Only add the row if there is content
  if (content.length) {
    rows.push([content]);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
