/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and has expected structure
  if (!element || !element.querySelectorAll) return;

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Find all <li> cards
  const cardElements = element.querySelectorAll('ul > li');

  cardElements.forEach((li) => {
    // Image: Find <img> inside <picture> inside .thumb
    const thumbDiv = li.querySelector('.thumb');
    let imageEl = null;
    if (thumbDiv) {
      imageEl = thumbDiv.querySelector('img');
    }

    // Text content: Title (dt), Description (dd), CTA (category link)
    const dl = li.querySelector('dl');
    let titleEl = null;
    let descEl = null;
    if (dl) {
      const dt = dl.querySelector('dt');
      if (dt) {
        // Use <strong> for heading
        titleEl = document.createElement('strong');
        titleEl.textContent = dt.textContent.trim();
      }
      const dd = dl.querySelector('dd');
      if (dd) {
        descEl = document.createElement('p');
        descEl.textContent = dd.textContent.trim();
      }
    }

    // CTA link: .category .site
    let ctaEl = null;
    const categoryLink = li.querySelector('.category .site');
    if (categoryLink) {
      // Clone the link to avoid moving it from the original DOM
      ctaEl = categoryLink.cloneNode(true);
    }

    // Compose text cell contents
    const textCellContent = [];
    if (titleEl) textCellContent.push(titleEl);
    if (descEl) textCellContent.push(descEl);
    if (ctaEl) textCellContent.push(ctaEl);

    // Add row: [image, text]
    rows.push([
      imageEl,
      textCellContent
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block
  element.replaceWith(block);
}
