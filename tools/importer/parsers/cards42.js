/* global WebImporter */
export default function parse(element, { document }) {
  // Find all top-level .mod-media-lyt-lqd blocks (each is a card)
  const cardBlocks = Array.from(element.querySelectorAll(':scope > .mod-media-lyt-lqd'));

  // Table header row
  const headerRow = ['Cards (cards42)'];
  const rows = [headerRow];

  cardBlocks.forEach(cardBlock => {
    // Get image (first .media img inside this card)
    let imageEl = null;
    const mediaDiv = cardBlock.querySelector('.media');
    if (mediaDiv) {
      const img = mediaDiv.querySelector('img');
      if (img) imageEl = img;
    }

    // Get content (the .content div)
    let textContent = null;
    const contentDiv = cardBlock.querySelector('.content');
    if (contentDiv) {
      // Create a fragment and append all children of .content
      const frag = document.createDocumentFragment();
      Array.from(contentDiv.children).forEach(child => {
        frag.appendChild(child.cloneNode(true));
      });
      textContent = frag;
    }

    // Add row if image and text content are present
    if (imageEl && textContent && textContent.childNodes.length > 0) {
      rows.push([
        imageEl,
        textContent
      ]);
    }
  });

  // Create the block table if there is at least one card row
  if (rows.length > 1) {
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
  }
}
