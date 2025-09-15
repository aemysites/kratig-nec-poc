/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image from a card column
  function getImage(col) {
    const img = col.querySelector('.media img');
    if (img) return img;
    return null;
  }

  // Helper to extract the text content (title, description, link)
  function getTextContent(col) {
    const txtDiv = col.querySelector('.txt');
    if (!txtDiv) return null;
    // We'll use the whole .txt div for resilience
    return txtDiv;
  }

  // Find all card columns
  // The structure is: ... > .mod-pnl-02 > .inner > .col
  const cols = element.querySelectorAll('.mod-pnl-02 > .inner > .col');

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards9)']);

  // For each card, add a row: [image, text content]
  cols.forEach((col) => {
    const img = getImage(col);
    const text = getTextContent(col);
    // Defensive: only add if both present
    if (img && text) {
      rows.push([img, text]);
    }
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
