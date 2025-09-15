/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main content area for the columns block
  // The structure is: .mod-media-lyt-lqd > .content (text) and .media (image)
  const modMediaLyt = element.querySelector('.mod-media-lyt-lqd');
  if (!modMediaLyt) return;

  // Get the two columns: left (image), right (content)
  const contentDiv = modMediaLyt.querySelector('.content');
  const mediaDiv = modMediaLyt.querySelector('.media');

  // Defensive: ensure both columns exist
  if (!contentDiv || !mediaDiv) return;

  // The image is inside .media > figure > span > a > img
  let imageEl = null;
  const imgLink = mediaDiv.querySelector('a');
  if (imgLink) {
    imageEl = imgLink.querySelector('img');
  } else {
    imageEl = mediaDiv.querySelector('img');
  }

  // For the left column, use the image element if found
  const leftCell = imageEl ? imageEl : '';

  // For the right column, use the entire contentDiv (contains all text, links, etc)
  const rightCell = contentDiv;

  // Build the table rows
  const headerRow = ['Columns block (columns36)'];
  const contentRow = [leftCell, rightCell];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
