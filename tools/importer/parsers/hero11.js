/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row must match target block name exactly
  const headerRow = ['Hero (hero11)'];

  // Extract background image: prefer .pc-show, fallback to first .image img
  let imageEl = element.querySelector('.image .pc-show');
  if (!imageEl) {
    imageEl = element.querySelector('.image img');
  }
  // Reference the actual image element from the DOM, not a clone or URL string
  const imageRow = [imageEl ? imageEl : ''];

  // Extract headline and subheading structure
  // The headline is in .content-inner > h1.hdg
  let headlineCell = '';
  const contentInner = element.querySelector('.content-inner');
  if (contentInner) {
    const h1 = contentInner.querySelector('h1.hdg');
    if (h1) {
      // Reference the actual h1 element (preserves formatting and children)
      headlineCell = h1;
    }
  }
  const contentRow = [headlineCell ? headlineCell : ''];

  // Compose table: 1 column, 3 rows
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // Create the table using DOMUtils (not markdown)
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
