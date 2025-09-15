/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as required
  const headerRow = ['Hero (hero63)'];

  // --- Row 2: Background Image (optional) ---
  // The image is inside a <picture> within .img-center-wrap
  let imageRowContent = '';
  const imgWrap = element.querySelector('.img-center-wrap');
  if (imgWrap) {
    // Use the entire picture block for resilience
    const picture = imgWrap.querySelector('picture');
    if (picture) {
      imageRowContent = picture;
    }
  }

  // --- Row 3: Title, Subheading, CTA (optional) ---
  // In this example, only a caption <p class="cap"> exists
  let textRowContent = '';
  const caption = element.querySelector('p.cap');
  if (caption) {
    textRowContent = caption;
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [imageRowContent],
    [textRowContent],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
