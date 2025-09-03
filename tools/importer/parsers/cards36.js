/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main card container
  let cardContainer = element;
  // Try to find the inner section with the card content
  const section = cardContainer.querySelector('section.mod-box');
  if (section) cardContainer = section;

  // Find the card layout wrapper
  let cardLayout = cardContainer.querySelector('.mod-media-lyt-lqd');
  if (!cardLayout) cardLayout = cardContainer;

  // Get image (first image in the media area)
  let imageEl = null;
  const mediaDiv = cardLayout.querySelector('.media');
  if (mediaDiv) {
    const img = mediaDiv.querySelector('img');
    if (img) imageEl = img;
  }

  // Get text content (the .content div)
  let textContentEl = null;
  const contentDiv = cardLayout.querySelector('.content');
  if (contentDiv) {
    // Defensive: Remove any image inside text content (shouldn't be there)
    const imgsInContent = contentDiv.querySelectorAll('img');
    imgsInContent.forEach(img => img.remove());
    textContentEl = contentDiv;
  }

  // Build the table rows
  const headerRow = ['Cards (cards36)'];
  const rows = [headerRow];

  // Only add card if both image and text are present
  if (imageEl && textContentEl) {
    rows.push([imageEl, textContentEl]);
  } else {
    // Fallback: If only one is present, still add the row
    rows.push([imageEl || '', textContentEl || '']);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
