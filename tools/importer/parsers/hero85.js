/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the best background image (prefer .pc, fallback to .sp)
  function getBackgroundImage(bgDiv) {
    if (!bgDiv) return null;
    // Prefer .pc image
    let img = bgDiv.querySelector('img.pc');
    if (!img) {
      img = bgDiv.querySelector('img.sp');
    }
    return img || null;
  }

  // Find the .bg div for background image
  const bgDiv = element.querySelector('.bg');
  const bgImg = getBackgroundImage(bgDiv);

  // Find the content block (headline, subheading)
  let contentBlock = null;
  const innerDiv = element.querySelector('.inner');
  if (innerDiv) {
    const extraDiv = innerDiv.querySelector('.extra');
    if (extraDiv) {
      contentBlock = extraDiv.querySelector('.content');
    }
  }

  // Defensive: if contentBlock is not found, fallback to element
  if (!contentBlock) {
    contentBlock = element;
  }

  // Build the table rows
  const headerRow = ['Hero (hero85)'];
  const bgRow = [bgImg ? bgImg : ''];
  const contentRow = [contentBlock];

  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
