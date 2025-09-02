/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct children with class 'mod-media-lyt-lqd' (each card)
  const cardBlocks = Array.from(element.querySelectorAll(':scope > .mod-media-lyt-lqd'));
  const rows = [];
  const headerRow = ['Cards (cards42)'];
  rows.push(headerRow);

  cardBlocks.forEach(card => {
    // Get image (first <img> inside .media or .mod-media)
    let imageEl = '';
    let mediaDiv = card.querySelector('.media');
    if (!mediaDiv) {
      mediaDiv = card.querySelector('.mod-media');
    }
    if (mediaDiv) {
      const img = mediaDiv.querySelector('img');
      if (img) imageEl = img.cloneNode(true);
    }

    // Get text content: all content from .content as a single wrapper div
    let textCellContent = '';
    const contentDiv = card.querySelector('.content');
    if (contentDiv) {
      const wrapper = document.createElement('div');
      // Use innerHTML to preserve all content (including links, lists, etc)
      wrapper.innerHTML = contentDiv.innerHTML;
      textCellContent = wrapper;
    }

    // Add row if at least text content is present
    if (textCellContent) {
      rows.push([
        imageEl || '',
        textCellContent
      ]);
    }
  });

  // Always replace with the table (even if only header row)
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
