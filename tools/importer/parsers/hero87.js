/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find background image (prefer desktop, fallback to mobile)
  let bgImg = null;
  const bgDiv = Array.from(element.children).find(child => child.classList.contains('bg'));
  if (bgDiv) {
    // Prefer .pc image, fallback to .sp
    bgImg = bgDiv.querySelector('img.pc') || bgDiv.querySelector('img.sp');
  }

  // Defensive: Find content block
  let contentBlock = null;
  const innerDiv = Array.from(element.children).find(child => child.classList.contains('inner'));
  if (innerDiv) {
    // .extra > .content
    const extraDiv = innerDiv.querySelector('.extra');
    if (extraDiv) {
      contentBlock = extraDiv.querySelector('.content');
    }
  }

  // Compose table rows
  const headerRow = ['Hero (hero87)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentBlock ? contentBlock : ''];

  // Create block table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
