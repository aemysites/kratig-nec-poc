/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element || !document) return;

  // Header row as per block spec
  const headerRow = ['Cards (cards1)'];
  const rows = [headerRow];

  // Get all immediate card elements
  const cards = element.querySelectorAll(':scope > .slide-item');

  cards.forEach(card => {
    // Find the image (first cell)
    let imageEl = null;
    const imageDiv = card.querySelector('.image');
    if (imageDiv) {
      // Use the whole image block (picture/img)
      imageEl = imageDiv;
    }

    // Find the text content (second cell)
    // We'll create a fragment to hold title, description, CTA
    const textFrag = document.createElement('div');

    // Title (dt inside dl)
    const dt = card.querySelector('dl > dt');
    if (dt) {
      // Use strong for heading style
      const strong = document.createElement('strong');
      strong.textContent = dt.textContent;
      textFrag.appendChild(strong);
    }

    // Description (dd inside dl)
    const dd = card.querySelector('dl > dd');
    if (dd) {
      // Add a <p> for description
      const p = document.createElement('p');
      p.textContent = dd.textContent;
      textFrag.appendChild(p);
    }

    // CTA (the link is the <a> wrapping the card)
    const a = card.querySelector('a');
    if (a) {
      // Find the 'more' div inside the link
      const moreDiv = a.querySelector('.more');
      if (moreDiv) {
        // Create a link for CTA
        const cta = document.createElement('a');
        cta.href = a.href;
        cta.textContent = moreDiv.textContent;
        if (a.target) cta.target = a.target;
        cta.rel = 'noopener noreferrer';
        // Add some spacing if needed
        textFrag.appendChild(cta);
      }
    }

    // Add the row: [image, text]
    rows.push([imageEl, textFrag]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
