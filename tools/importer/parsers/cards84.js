/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image (picture or img) from a card
  function extractImage(card) {
    // The image is inside: <div class="image"> <picture>...</picture> </div>
    const imageDiv = card.querySelector('.image');
    if (imageDiv) {
      // Return the <picture> if present, else the <img>
      const pic = imageDiv.querySelector('picture');
      if (pic) return pic;
      const img = imageDiv.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Helper to extract the text content (description, CTA link) from a card
  function extractTextContent(card) {
    // The text is inside <div class="text"> <p>...</p> </div>
    const textDiv = card.querySelector('.text');
    // The CTA is in <div class="link"> <span> <a ...>...</a> </span> </div>
    const linkDiv = card.querySelector('.link');
    // Compose a container for the text cell
    const container = document.createElement('div');
    if (textDiv) {
      // Move the <p> (or all children) into the container
      Array.from(textDiv.childNodes).forEach((node) => {
        container.appendChild(node.cloneNode(true));
      });
    }
    if (linkDiv) {
      // Add a <br> for spacing if text exists
      if (container.childNodes.length > 0) {
        container.appendChild(document.createElement('br'));
      }
      // Move the <a> (inside <span>) into the container
      const a = linkDiv.querySelector('a');
      if (a) {
        container.appendChild(a.cloneNode(true));
      }
    }
    return container;
  }

  // Find all the cards (slide-item)
  const cards = element.querySelectorAll(':scope > .slide-item');

  // Build the table rows
  const rows = [];
  // Header row as per requirements
  rows.push(['Cards (cards84)']);

  cards.forEach((card) => {
    const image = extractImage(card);
    const textContent = extractTextContent(card);
    rows.push([
      image || '',
      textContent
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
