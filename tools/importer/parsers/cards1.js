/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards1)'];
  const rows = [headerRow];

  // Get all direct card items
  const cardElements = element.querySelectorAll(':scope > .slide-item');

  cardElements.forEach((card) => {
    // --- Image cell ---
    // Find the <img> inside .image > picture
    const imageDiv = card.querySelector('.image');
    let imgEl = null;
    if (imageDiv) {
      imgEl = imageDiv.querySelector('img');
    }

    // --- Content cell ---
    // Title (dt), Description (dd), CTA (Learn more)
    const dl = card.querySelector('dl');
    let titleEl = null;
    let descEl = null;
    if (dl) {
      const dt = dl.querySelector('dt');
      const dd = dl.querySelector('dd');
      if (dt) {
        // Use <strong> for heading
        titleEl = document.createElement('strong');
        titleEl.textContent = dt.textContent.trim();
      }
      if (dd) {
        descEl = document.createElement('p');
        descEl.textContent = dd.textContent.trim();
      }
    }

    // Find CTA link ("Learn more")
    let ctaLink = null;
    const anchor = card.querySelector('a[href]');
    if (anchor) {
      // Find the .more div inside the anchor
      const moreDiv = anchor.querySelector('.more');
      if (moreDiv) {
        ctaLink = document.createElement('a');
        ctaLink.href = anchor.href;
        ctaLink.textContent = moreDiv.textContent.trim();
        if (anchor.target) {
          ctaLink.target = anchor.target;
        }
      }
    }

    // Compose content cell
    const contentParts = [];
    if (titleEl) contentParts.push(titleEl);
    if (descEl) contentParts.push(descEl);
    if (ctaLink) contentParts.push(ctaLink);

    // Add row: [image, content]
    rows.push([
      imgEl,
      contentParts
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
