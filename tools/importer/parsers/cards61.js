/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row must match the target block name exactly
  const headerRow = ['Cards (cards61)'];

  // Find the image (picture preferred)
  let imageEl = element.querySelector('picture');
  if (!imageEl) {
    imageEl = element.querySelector('img');
  }
  // Defensive: if no image found, create a placeholder
  if (!imageEl) {
    imageEl = document.createElement('div');
    imageEl.textContent = '[Image missing]';
  }

  // Find the text content (caption)
  let textEl = element.querySelector('.cap');
  if (!textEl) {
    textEl = element.querySelector('p');
  }
  // Defensive: if no text found, create a placeholder
  if (!textEl) {
    textEl = document.createElement('div');
    textEl.textContent = '[Description missing]';
  }

  // Build the table rows: header, then one row for this card
  const rows = [
    headerRow,
    [imageEl, textEl],
  ];

  // Create the block table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
