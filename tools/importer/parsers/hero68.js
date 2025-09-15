/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the .inner and .bg containers
  const inner = element.querySelector('.inner');
  const bg = element.querySelector('.bg');

  // --- Background Image Row ---
  // Prefer the .pc image if available, else fallback to first img
  let bgImg = null;
  if (bg) {
    bgImg = bg.querySelector('img.pc') || bg.querySelector('img');
  }

  // --- Content Row ---
  // Collect heading, subheading, and CTA links
  let contentFragments = [];
  if (inner) {
    // Heading: h2 > img[alt] (use alt as heading text)
    const h2 = inner.querySelector('h2');
    if (h2) {
      const img = h2.querySelector('img[alt]');
      if (img && img.alt) {
        const heading = document.createElement('h1');
        heading.textContent = img.alt;
        contentFragments.push(heading);
      }
    }
    // Subheading(s): <p class="read"> and <p class="text">
    // Instead of pushing the elements, push their textContent as <p>
    const subRead = inner.querySelector('p.read');
    if (subRead && subRead.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = subRead.textContent;
      contentFragments.push(p);
    }
    const subText = inner.querySelector('p.text');
    if (subText && subText.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = subText.textContent;
      contentFragments.push(p);
    }
    // CTA buttons: .button > span > a
    const buttonDiv = inner.querySelector('.button');
    if (buttonDiv) {
      // Wrap all CTAs in a div for grouping
      const ctaDiv = document.createElement('div');
      ctaDiv.className = 'hero-cta';
      buttonDiv.querySelectorAll('a').forEach(a => {
        // Clone the link to avoid moving it from the DOM
        const aClone = a.cloneNode(true);
        ctaDiv.appendChild(aClone);
      });
      if (ctaDiv.childNodes.length > 0) {
        contentFragments.push(ctaDiv);
      }
    }
  }

  // --- Table Construction ---
  const headerRow = ['Hero (hero68)'];
  const bgRow = [bgImg ? bgImg : ''];
  const contentRow = [contentFragments.length ? contentFragments : ''];

  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
