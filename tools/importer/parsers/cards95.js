/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards container
  const cardsContainer = element.querySelector('.mod-box-05 .inner');
  if (!cardsContainer) return;

  // Table header row
  const headerRow = ['Cards (cards95)'];
  const rows = [headerRow];

  // Get all card columns
  const cardCols = cardsContainer.querySelectorAll(':scope > .col');

  cardCols.forEach((col) => {
    // Each card box
    const box = col.querySelector('.box');
    if (!box) return;

    // Image (mandatory)
    const img = box.querySelector('img');
    // Defensive: use the <img> element directly if present
    const imageCell = img ? img : '';

    // Text content cell
    const textContent = document.createElement('div');

    // Title (optional, styled as heading)
    const titleEl = box.querySelector('.mod-txt p strong');
    if (titleEl) {
      // Use <strong> as heading, wrap in <p> if not already
      const heading = document.createElement('p');
      heading.appendChild(titleEl.cloneNode(true));
      textContent.appendChild(heading);
    }

    // Description (optional)
    // Find the first <p> after the image
    const allPs = box.querySelectorAll('p');
    let descEl = null;
    if (allPs.length > 1) {
      // The second <p> is the description
      descEl = allPs[1];
    } else {
      // Fallback: try to find a <p> after the image
      const imgParent = box.querySelector('figure');
      if (imgParent) {
        let next = imgParent.nextElementSibling;
        while (next) {
          if (next.tagName === 'P') {
            descEl = next;
            break;
          }
          next = next.nextElementSibling;
        }
      }
    }
    if (descEl) {
      textContent.appendChild(descEl.cloneNode(true));
    }

    // Call-to-Action (optional)
    const btnLink = box.querySelector('.mod-btn .btn a');
    if (btnLink) {
      // Place CTA at the bottom, as a paragraph
      const ctaP = document.createElement('p');
      ctaP.appendChild(btnLink.cloneNode(true));
      textContent.appendChild(ctaP);
    }

    // Add the row: [image, textContent]
    rows.push([imageCell, textContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
