/* global WebImporter */
export default function parse(element, { document }) {
  // Find the background image (prefer desktop)
  const bgDiv = element.querySelector('.bg');
  let bgImg = '';
  if (bgDiv) {
    const img = bgDiv.querySelector('img.pc') || bgDiv.querySelector('img');
    if (img) bgImg = img;
  }

  // Find the inner content
  const inner = element.querySelector('.inner');
  const contentEls = [];
  if (inner) {
    // Title: h2 may contain an img with alt text as heading
    const h2 = inner.querySelector('h2');
    if (h2) {
      // If h2 contains an img with alt, use alt as heading
      const imgInH2 = h2.querySelector('img');
      if (imgInH2 && imgInH2.alt) {
        const headingEl = document.createElement('h1');
        headingEl.textContent = imgInH2.alt;
        contentEls.push(headingEl);
      } else if (h2.textContent.trim()) {
        // Fallback: use h2 text
        const headingEl = document.createElement('h1');
        headingEl.textContent = h2.textContent.trim();
        contentEls.push(headingEl);
      }
    }
    // Subheading: p.text
    const subheading = inner.querySelector('p.text');
    if (subheading) {
      contentEls.push(subheading.cloneNode(true));
    }
    // CTA buttons: .button > span > a
    const buttonDiv = inner.querySelector('.button');
    if (buttonDiv) {
      const links = Array.from(buttonDiv.querySelectorAll('a'));
      if (links.length) {
        // Wrap each link in a div for layout
        const ctaContainer = document.createElement('div');
        links.forEach(link => {
          ctaContainer.appendChild(link.cloneNode(true));
        });
        contentEls.push(ctaContainer);
      }
    }
  }

  // Table rows
  const headerRow = ['Hero (hero87)'];
  const bgRow = [bgImg ? bgImg : ''];
  const contentRow = [contentEls.length ? contentEls : ''];

  const cells = [headerRow, bgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
