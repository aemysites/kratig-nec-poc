/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the horizontal media block
  const modMedia = element.querySelector('.mod-media-horizontal');
  if (!modMedia) return;

  // Get media image (prefer desktop)
  const mediaDiv = modMedia.querySelector('.media');
  let img = null;
  if (mediaDiv) {
    img = mediaDiv.querySelector('img.pc') || mediaDiv.querySelector('img');
  }

  // Get content block
  const contentDiv = modMedia.querySelector('.content');
  let heading = null;
  let subheading = null;
  if (contentDiv) {
    heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
    subheading = contentDiv.querySelector('p');
  }

  // Build table rows
  const headerRow = ['Hero (hero88)'];
  const imageRow = [img ? img : ''];
  const contentRow = [
    [heading, subheading].filter(Boolean)
  ];

  // Create block table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
