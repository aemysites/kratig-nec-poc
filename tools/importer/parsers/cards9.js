/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCard(col) {
    // Get image (mandatory)
    let img = col.querySelector('.media img');
    // Defensive: fallback to any img in media
    if (!img) {
      const figure = col.querySelector('.media figure');
      if (figure) img = figure.querySelector('img');
    }

    // Get text content
    const txtDiv = col.querySelector('.txt');
    let title, desc, cta;
    if (txtDiv) {
      // Title: first span.fs-03 inside first p
      const firstP = txtDiv.querySelector('p');
      if (firstP) {
        const spanTitle = firstP.querySelector('.fs-03');
        if (spanTitle) {
          title = document.createElement('strong');
          title.textContent = spanTitle.textContent;
        }
        // Description: everything in first p except the span
        let descText = firstP.innerHTML.replace(spanTitle ? spanTitle.outerHTML : '', '').replace(/<br>/g, '\n');
        desc = document.createElement('div');
        desc.innerHTML = descText;
      }
      // CTA: link in second p
      const ctaP = txtDiv.querySelectorAll('p')[1];
      if (ctaP) {
        const link = ctaP.querySelector('a');
        if (link) {
          cta = document.createElement('div');
          cta.appendChild(link);
        }
      }
    }
    // Compose text cell
    const textCell = document.createElement('div');
    if (title) textCell.appendChild(title);
    if (desc) textCell.appendChild(desc);
    if (cta) textCell.appendChild(cta);

    return [img, textCell];
  }

  // Get all columns (cards)
  const cols = element.querySelectorAll('.col');
  const rows = [];
  const headerRow = ['Cards (cards9)'];
  rows.push(headerRow);

  cols.forEach(col => {
    rows.push(extractCard(col));
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
