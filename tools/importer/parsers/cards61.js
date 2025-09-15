/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as required
  const headerRow = ['Cards (cards61)'];

  // Find the image (picture or img) and the text content
  // The structure is: <div class="img-center"> <div class="img-center-wrap"> <picture>...</picture> </div> <p class="cap">...</p> </div>

  // Get the image container
  const imgWrap = element.querySelector('.img-center-wrap');
  let imageEl = null;
  if (imgWrap) {
    // Prefer the <picture> if present, else fallback to <img>
    imageEl = imgWrap.querySelector('picture') || imgWrap.querySelector('img');
  }

  // Get the caption/description
  const caption = element.querySelector('p.cap');

  // Build the card row: [image, text]
  // Defensive: if image or caption missing, still build the row
  const cardRow = [
    imageEl || '',
    caption || ''
  ];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cardRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
