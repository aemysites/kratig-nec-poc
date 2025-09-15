/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the inner wrapper
  const inner = element.querySelector('.str-inner') || element;

  // Find the image container
  const imageContainer = inner.querySelector('.image');
  let heroImage = null;
  if (imageContainer) {
    // Prefer desktop image if available
    heroImage = imageContainer.querySelector('img.pc-show') || imageContainer.querySelector('img');
  }

  // Find the content container
  const contentContainer = inner.querySelector('.content-inner') || inner.querySelector('.content') || inner;
  // Find the headline (h1)
  const headline = contentContainer.querySelector('h1') || contentContainer.querySelector('h2') || contentContainer.querySelector('h3');

  // Table rows
  const headerRow = ['Hero (hero8)'];
  const imageRow = [heroImage ? heroImage : ''];
  const contentRow = [headline ? headline : ''];

  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
