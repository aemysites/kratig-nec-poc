/* global WebImporter */
export default function parse(element, { document }) {
  // Find the background image (row 2)
  const bgDiv = element.querySelector('.bg.image');
  let bgImg = null;
  if (bgDiv) {
    // Prefer the desktop image (class="pc"), fallback to first img
    bgImg = bgDiv.querySelector('img.pc') || bgDiv.querySelector('img');
  }

  // Find the content block (row 3)
  const contentDiv = element.querySelector('.content');

  // Compose the table rows
  const headerRow = ['Hero (hero65)'];
  const bgRow = [bgImg ? bgImg : '']; // Reference the actual <img> element if present
  const contentRow = [contentDiv ? contentDiv : '']; // Reference the actual <div class="content"> if present

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
