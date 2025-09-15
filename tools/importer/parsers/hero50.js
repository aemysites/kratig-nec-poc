/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get the best background image (prefer .pc, fallback to .sp)
  function getBackgroundImage() {
    const bgDiv = element.querySelector('.bg');
    if (!bgDiv) return null;
    let img = bgDiv.querySelector('img.pc');
    if (!img) {
      img = bgDiv.querySelector('img.sp');
    }
    return img || null;
  }

  // Helper: get the content block (title, subheading)
  function getContentBlock() {
    // The structure is: .oiiv-future-kv > .inner > .extra > .content
    const inner = element.querySelector('.inner');
    if (!inner) return null;
    const extra = inner.querySelector('.extra');
    if (!extra) return null;
    const content = extra.querySelector('.content');
    if (!content) return null;
    return content;
  }

  // 1. Header row
  const headerRow = ['Hero (hero50)'];

  // 2. Background image row
  const bgImg = getBackgroundImage();
  const bgRow = [bgImg ? bgImg : ''];

  // 3. Content row (title, subheading, etc)
  const contentBlock = getContentBlock();
  const contentRow = [contentBlock ? contentBlock : ''];

  // Compose table
  const cells = [
    headerRow,
    bgRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
