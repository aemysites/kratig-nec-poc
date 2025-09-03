/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate child by class
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find((el) => el.classList.contains(className));
  }

  // 1. Header row
  const headerRow = ['Hero (hero63)'];

  // 2. Background image row
  // Find the background image: prefer the desktop image (class="pc")
  let bgImg = null;
  const bgDiv = getChildByClass(element, 'bg');
  if (bgDiv) {
    // Find the .image child if present
    const imageDiv = getChildByClass(bgDiv, 'image') || bgDiv;
    // Prefer .pc image, fallback to first img
    bgImg = imageDiv.querySelector('img.pc') || imageDiv.querySelector('img');
  }
  const bgRow = [bgImg ? bgImg : ''];

  // 3. Content row
  // Find the content area
  let contentCell = '';
  const innerDiv = getChildByClass(element, 'inner');
  if (innerDiv) {
    const extraDiv = getChildByClass(innerDiv, 'extra');
    if (extraDiv) {
      const contentDiv = getChildByClass(extraDiv, 'content');
      if (contentDiv) {
        // We'll collect the main heading, text, and CTA
        const contentParts = [];
        // Heading (h1)
        const h1 = contentDiv.querySelector('h1');
        if (h1) contentParts.push(h1);
        // Text (div.text)
        const textDiv = getChildByClass(contentDiv, 'text');
        if (textDiv) contentParts.push(textDiv);
        // CTA (div.link)
        const linkDiv = getChildByClass(contentDiv, 'link');
        if (linkDiv) contentParts.push(linkDiv);
        contentCell = contentParts;
      }
    }
  }
  const contentRow = [contentCell];

  // Compose table
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
