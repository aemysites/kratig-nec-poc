/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the best background image (prefer .pc, fallback to first)
  function getBackgroundImage() {
    const bgDiv = element.querySelector('.bg.image');
    if (!bgDiv) return null;
    // Prefer .pc image
    let img = bgDiv.querySelector('img.pc');
    if (!img) img = bgDiv.querySelector('img');
    return img || null;
  }

  // Helper to get the heading and subheading
  function getContentBlock() {
    const inner = element.querySelector('.inner');
    if (!inner) return null;
    const content = inner.querySelector('.content');
    if (!content) return null;
    // Heading: h1 with logo images (we want the alt text as heading)
    const h1 = content.querySelector('h1');
    let headingText = '';
    if (h1) {
      // Use the first image alt as heading text
      const img = h1.querySelector('img');
      if (img && img.alt) {
        headingText = img.alt;
      }
    }
    // Subheading: .text > p
    let subheadingText = '';
    const textDiv = content.querySelector('.text');
    if (textDiv) {
      const p = textDiv.querySelector('p');
      if (p) {
        subheadingText = p.textContent.trim();
      }
    }
    // Compose block: heading and subheading (if present)
    const block = document.createElement('div');
    if (headingText) {
      const h1El = document.createElement('h1');
      h1El.textContent = headingText;
      block.appendChild(h1El);
    }
    if (subheadingText) {
      const pEl = document.createElement('p');
      pEl.textContent = subheadingText;
      block.appendChild(pEl);
    }
    return block.childNodes.length ? block : null;
  }

  // Build table rows
  const headerRow = ['Hero (hero3)'];
  const bgImg = getBackgroundImage();
  const bgRow = [bgImg ? bgImg : ''];
  const contentBlock = getContentBlock();
  // If contentBlock is null, fallback to extracting all text from .content
  let contentRow;
  if (contentBlock) {
    contentRow = [contentBlock];
  } else {
    // Fallback: extract all text from .content
    const content = element.querySelector('.inner .content');
    let text = '';
    if (content) {
      text = content.textContent.trim();
    }
    contentRow = [text];
  }

  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
