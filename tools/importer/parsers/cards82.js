/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract heading (with link if present) from .mod-hdg-l2-02
  function extractHeading(innerDiv) {
    if (!innerDiv) return null;
    const h2 = innerDiv.querySelector('h2');
    if (!h2) return null;
    // Clone to avoid moving from DOM
    return h2.cloneNode(true);
  }

  // Helper to extract image from .mod-media
  function extractImage(innerDiv) {
    if (!innerDiv) return null;
    const img = innerDiv.querySelector('img');
    if (img) return img.cloneNode(true);
    return null;
  }

  // Helper to extract description from .str-inner > p
  function extractDescription(innerDiv) {
    if (!innerDiv) return null;
    const p = innerDiv.querySelector('p');
    if (p) return p.cloneNode(true);
    return null;
  }

  // Helper to extract CTA link from .mod-btn-list
  function extractCTA(innerDiv) {
    if (!innerDiv) return null;
    const btnList = innerDiv.querySelector('.mod-btn-list');
    if (!btnList) return null;
    const link = btnList.querySelector('a');
    if (link) return link.cloneNode(true);
    return null;
  }

  // Find the main column containing cards
  const mainCol = element.querySelector('.str-column-main');
  if (!mainCol) return;

  // Get all .str-outer elements (each is a card section)
  const outers = Array.from(mainCol.querySelectorAll(':scope > .str-outer'));

  // We'll build cards as [image, content] for each card
  const cards = [];

  // Card 1: Heading + Image
  if (outers.length > 1) {
    const heading1 = extractHeading(outers[0].querySelector('.str-inner'));
    const image1 = extractImage(outers[1].querySelector('.str-inner'));
    if (heading1 && image1) {
      // Compose content cell
      const content = document.createElement('div');
      content.appendChild(heading1);
      cards.push([image1, content]);
    }
  }
  // Card 2: Heading + Image
  if (outers.length > 3) {
    const heading2 = extractHeading(outers[2].querySelector('.str-inner'));
    const image2 = extractImage(outers[3].querySelector('.str-inner'));
    if (heading2 && image2) {
      const content = document.createElement('div');
      content.appendChild(heading2);
      cards.push([image2, content]);
    }
  }
  // Card 3: Inquiry card (heading + description + CTA)
  if (outers.length > 6) {
    const heading3 = extractHeading(outers[4].querySelector('.str-inner'));
    const description3 = extractDescription(outers[5].querySelector('.str-inner'));
    const cta3 = extractCTA(outers[6].querySelector('.str-inner'));
    // Compose content cell
    const content = document.createElement('div');
    if (heading3) content.appendChild(heading3);
    if (description3) content.appendChild(description3);
    if (cta3) content.appendChild(cta3);
    // For cards82, always two columns: image/icon and text. If no image, use a non-breaking space.
    cards.push(['\u00A0', content]);
  }

  // Table header
  const headerRow = ['Cards (cards82)'];
  const tableRows = [headerRow];
  // Add each card row
  cards.forEach(card => {
    tableRows.push(card);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace element
  element.replaceWith(block);
}
