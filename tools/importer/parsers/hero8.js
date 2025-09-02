/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const inner = element.querySelector('.str-inner');
  if (!inner) return;

  // Get the best image (prefer desktop if present)
  const imageContainer = inner.querySelector('.image');
  let imgEl = null;
  if (imageContainer) {
    imgEl = imageContainer.querySelector('.pc-show') || imageContainer.querySelector('img');
  }

  // Find the heading (h1)
  const contentInner = inner.querySelector('.content-inner');
  let heading = null;
  if (contentInner) {
    heading = contentInner.querySelector('h1');
  }

  // Table rows as per block spec
  const headerRow = ['Hero (hero8)'];
  const imageRow = [imgEl ? imgEl : ''];
  const contentRow = [heading ? heading : ''];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
