/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the inner content and background image container
  const inner = element.querySelector('.inner');
  const bg = element.querySelector('.bg');

  // Header row
  const headerRow = ['Hero (hero57)'];

  // Row 2: Background image (optional)
  let bgImg = null;
  if (bg) {
    // Prefer desktop image if available, else fallback to first image
    const pcImg = bg.querySelector('img.pc');
    const fallbackImg = bg.querySelector('img');
    bgImg = pcImg || fallbackImg;
  }
  const bgRow = [bgImg ? bgImg : ''];

  // Row 3: Content (title, subheading, CTA)
  let contentEls = [];
  if (inner) {
    // Title: h2 may contain an img (decorative), but visually it's the headline text
    const h2 = inner.querySelector('h2');
    if (h2) {
      // If h2 contains an img with alt text, use alt as heading
      const h2Img = h2.querySelector('img');
      if (h2Img && h2Img.alt) {
        const heading = document.createElement('h1');
        heading.textContent = h2Img.alt;
        contentEls.push(heading);
      }
      // If h2 has text nodes, include them as heading (for flexibility)
      const h2Text = h2.childNodes;
      h2Text.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          const heading = document.createElement('h1');
          heading.textContent = node.textContent.trim();
          contentEls.push(heading);
        }
      });
    }
    // Subheading: paragraph with class 'text'
    const subheading = inner.querySelector('p.text');
    if (subheading) {
      contentEls.push(subheading.cloneNode(true));
    }
    // CTA buttons: links inside .button
    const buttonDiv = inner.querySelector('.button');
    if (buttonDiv) {
      // Each span contains an <a>
      const ctaLinks = Array.from(buttonDiv.querySelectorAll('a'));
      if (ctaLinks.length) {
        // Wrap links in a div for layout
        const ctaContainer = document.createElement('div');
        ctaLinks.forEach(link => ctaContainer.appendChild(link.cloneNode(true)));
        contentEls.push(ctaContainer);
      }
    }
  }
  // Ensure all text content is included in any cell
  const contentRow = [contentEls.length ? contentEls : ''];

  // Build table
  const cells = [headerRow, bgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
