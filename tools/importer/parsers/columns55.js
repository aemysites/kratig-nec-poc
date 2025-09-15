/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the inner structure
  const inner = element.querySelector('.str-inner');
  if (!inner) return;

  // Left column: content
  const contentWrap = inner.querySelector('.content');
  let leftContent = null;
  if (contentWrap) {
    // Use the entire content block for resilience
    leftContent = contentWrap;
  }

  // Right column: image
  const imageWrap = inner.querySelector('.image');
  let rightImage = null;
  if (imageWrap) {
    // Prefer desktop image if present, fallback to mobile
    const pcImg = imageWrap.querySelector('img.pc-show');
    const spImg = imageWrap.querySelector('img.pc-hide');
    rightImage = pcImg || spImg || imageWrap;
  }

  // Table header
  const headerRow = ['Columns block (columns55)'];
  // Table content row: left (content), right (image)
  const contentRow = [leftContent, rightImage];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
