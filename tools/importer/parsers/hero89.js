/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Hero (hero89)'];

  // Defensive: get background image (from .bg > img.pc preferred)
  let bgImg = '';
  const bgDiv = element.querySelector('.bg');
  if (bgDiv) {
    // Prefer .pc image if present
    const img = bgDiv.querySelector('img.pc') || bgDiv.querySelector('img');
    if (img) bgImg = img;
  }

  // 2nd row: background image (optional)
  const bgRow = [bgImg];

  // 3rd row: content (headline, subheading, CTA)
  // All inside .inner
  const inner = element.querySelector('.inner');
  const content = [];
  if (inner) {
    // Headline: h2 > img[alt] (the alt is the headline text)
    const h2 = inner.querySelector('h2');
    if (h2) {
      const img = h2.querySelector('img[alt]');
      if (img && img.alt) {
        const heading = document.createElement('h1');
        heading.textContent = img.alt;
        content.push(heading);
      }
    }
    // Subheading: p.text
    const subheading = inner.querySelector('p.text');
    if (subheading) {
      // Clone to avoid removing from DOM
      content.push(subheading.cloneNode(true));
    }
    // CTA: .button > span > a (multiple CTAs)
    const buttonDiv = inner.querySelector('.button');
    if (buttonDiv) {
      // Instead of moving <a>, clone them so original DOM is untouched
      const ctaContainer = document.createElement('div');
      ctaContainer.className = 'cta-buttons';
      buttonDiv.querySelectorAll('a').forEach((a) => {
        ctaContainer.appendChild(a.cloneNode(true));
      });
      content.push(ctaContainer);
    }
  }
  // Ensure all text content is included (for flexibility)
  // If content is empty, fallback to all textContent
  if (content.length === 0 && inner) {
    const fallback = document.createElement('div');
    fallback.textContent = inner.textContent.trim();
    content.push(fallback);
  }
  const contentRow = [content];

  // Build the table
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
