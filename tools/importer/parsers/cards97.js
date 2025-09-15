/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards container
  const cardsContainer = element.querySelector('.mod-box-05 .inner');
  if (!cardsContainer) return;

  // Table header row
  const headerRow = ['Cards (cards97)'];
  const rows = [headerRow];

  // Get all card columns
  const cardCols = Array.from(cardsContainer.querySelectorAll(':scope > .col'));
  cardCols.forEach((col) => {
    // Each card box
    const box = col.querySelector('.box');
    if (!box) return;

    // Image (first cell)
    let imgEl = box.querySelector('figure img');
    if (imgEl) {
      // Use the <img> element directly
    } else {
      imgEl = document.createElement('span'); // fallback empty
    }

    // Text content (second cell)
    const textContent = document.createElement('div');
    // Title
    const titleEl = box.querySelector('.mod-txt p strong');
    if (titleEl) {
      const heading = document.createElement('strong');
      heading.textContent = titleEl.textContent;
      textContent.appendChild(heading);
    }
    // Description
    // Find the first <p> after the image
    let descEl = null;
    const ps = Array.from(box.querySelectorAll('p'));
    if (ps.length > 1) {
      descEl = ps[1];
    }
    if (descEl) {
      const descP = document.createElement('p');
      descP.textContent = descEl.textContent;
      textContent.appendChild(descP);
    }
    // CTA button (optional)
    const btnLink = box.querySelector('.mod-btn .btn a');
    if (btnLink) {
      const ctaDiv = document.createElement('div');
      ctaDiv.appendChild(btnLink);
      textContent.appendChild(ctaDiv);
    }

    rows.push([imgEl, textContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
