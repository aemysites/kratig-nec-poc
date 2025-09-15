/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as per block guidelines
  const headerRow = ['Cards (cards43)'];

  // Find the image (picture or img)
  // The image is inside a .img-center-wrap > picture
  const imgWrap = element.querySelector('.img-center-wrap');
  let imageEl = null;
  if (imgWrap) {
    imageEl = imgWrap.querySelector('picture') || imgWrap.querySelector('img');
  }

  // Find the text content (person info)
  // The text is in <p class="person">
  const textEl = element.querySelector('p.person');

  // Build the card row: [image, text]
  const cardRow = [imageEl, textEl];

  // Compose the table
  const tableCells = [headerRow, cardRow];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
