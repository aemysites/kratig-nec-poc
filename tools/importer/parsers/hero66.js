/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find inner content and background image container
  const inner = element.querySelector('.inner');
  const bg = element.querySelector('.bg');

  // --- Row 1: Header ---
  const headerRow = ['Hero (hero66)'];

  // --- Row 2: Background Image (optional) ---
  let bgImgEl = null;
  if (bg) {
    // Prefer desktop image if present, else fallback to first image
    bgImgEl = bg.querySelector('img.pc') || bg.querySelector('img');
  }
  const bgRow = [bgImgEl ? bgImgEl : ''];

  // --- Row 3: Content (title, subheading, CTA) ---
  const contentEls = [];
  if (inner) {
    // Title (h2 with image)
    const h2 = inner.querySelector('h2');
    if (h2) contentEls.push(h2);
    // Subheading (p.read)
    const subheading = inner.querySelector('p.read');
    if (subheading) contentEls.push(subheading);
    // Additional text (p.text)
    const text = inner.querySelector('p.text');
    if (text) contentEls.push(text);
    // CTA buttons (div.button)
    const buttonDiv = inner.querySelector('div.button');
    if (buttonDiv) contentEls.push(buttonDiv);
  }
  const contentRow = [contentEls];

  // --- Assemble table ---
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(table);
}
