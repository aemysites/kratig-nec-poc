/* global WebImporter */
export default function parse(element, { document }) {
  // Find the horizontal media block
  const modMedia = element.querySelector('.mod-media-horizontal');
  if (!modMedia) return;

  // Get the media image (prefer desktop if present)
  const mediaDiv = modMedia.querySelector('.media');
  let img = null;
  if (mediaDiv) {
    img = mediaDiv.querySelector('img.pc') || mediaDiv.querySelector('img');
  }

  // Get the content (headings, subheading)
  const contentDiv = modMedia.querySelector('.content');
  let contentElements = [];
  if (contentDiv) {
    // Collect all children (h1, p, etc.)
    contentElements = Array.from(contentDiv.childNodes).filter(node => {
      // Only include elements and non-empty text nodes
      return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
    });
  }

  // Build the table rows
  const headerRow = ['Hero (hero86)'];
  const imageRow = [img ? img : ''];
  const contentRow = [contentElements.length ? contentElements : ''];

  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
