/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the best background image (prefer .pc, fallback to first)
  function getBackgroundImage() {
    const bgDiv = element.querySelector('.bg.image');
    if (!bgDiv) return null;
    // Prefer .pc image, fallback to first img
    let img = bgDiv.querySelector('img.pc');
    if (!img) img = bgDiv.querySelector('img');
    return img || null;
  }

  // Helper to get the content block (title, subtitle)
  function getContentBlock() {
    const inner = element.querySelector('.inner');
    if (!inner) return null;
    // The content is inside .content
    const content = inner.querySelector('.content');
    if (!content) return null;
    // We'll build a fragment with the heading and text
    const frag = document.createDocumentFragment();
    // Title: h1 contains logo images, but the alt is the title
    const h1 = content.querySelector('h1');
    if (h1) {
      // Try to get the alt from any logo image
      let title = '';
      const logoImg = h1.querySelector('img');
      if (logoImg && logoImg.alt) {
        title = logoImg.alt;
      }
      // If no alt, fallback to textContent (if present)
      if (!title && h1.textContent.trim()) {
        title = h1.textContent.trim();
      }
      if (title) {
        const h = document.createElement('h1');
        h.textContent = title;
        frag.appendChild(h);
      }
    }
    // Subheading: .text > p
    const textDiv = content.querySelector('.text');
    if (textDiv) {
      // Instead of just first p, clone all children to preserve all text
      Array.from(textDiv.childNodes).forEach((node) => {
        frag.appendChild(node.cloneNode(true));
      });
    }
    return frag.childNodes.length ? frag : null;
  }

  // Build the table rows
  const headerRow = ['Hero (hero3)'];
  const bgImg = getBackgroundImage();
  const bgRow = [bgImg ? bgImg : ''];
  const contentBlock = getContentBlock();
  const contentRow = [contentBlock ? Array.from(contentBlock.childNodes) : ''];

  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
