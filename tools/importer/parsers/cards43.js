/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row as per spec
  const headerRow = ['Cards (cards43)'];

  // Find image (picture preferred)
  let imageCell = null;
  const wrap = element.querySelector('.img-center-wrap');
  if (wrap) {
    const picture = wrap.querySelector('picture');
    if (picture) {
      imageCell = picture;
    } else {
      const img = wrap.querySelector('img');
      if (img) imageCell = img;
    }
  }

  // Find text cell (the .person paragraph)
  let textCell = null;
  const person = element.querySelector('p.person');
  if (person) {
    textCell = person;
  }

  // Only create the block if both image and text are present
  if (!imageCell || !textCell) return;

  // Compose table rows
  const rows = [
    headerRow,
    [imageCell, textCell]
  ];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
