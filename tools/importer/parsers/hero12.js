/* global WebImporter */
export default function parse(element, { document }) {
  // Find background image (prefer desktop, fallback to mobile)
  let bgImg = null;
  const bgDiv = element.querySelector('.bg');
  if (bgDiv) {
    bgImg = bgDiv.querySelector('img.pc') || bgDiv.querySelector('img.sp');
  }

  // Find inner content
  const innerDiv = element.querySelector('.inner');
  let contentEls = [];
  if (innerDiv) {
    // Title (h2 > img[alt])
    const h2 = innerDiv.querySelector('h2');
    let titleEl = null;
    if (h2 && h2.querySelector('img[alt]')) {
      // Create heading element with alt text
      const img = h2.querySelector('img[alt]');
      titleEl = document.createElement('h1');
      titleEl.textContent = img.getAttribute('alt');
    }
    if (titleEl) contentEls.push(titleEl);

    // Subheading (p.read)
    const subheading = innerDiv.querySelector('p.read');
    if (subheading) contentEls.push(subheading.cloneNode(true));

    // Additional text (p.text)
    const extraText = innerDiv.querySelector('p.text');
    if (extraText) contentEls.push(extraText.cloneNode(true));

    // CTA button (div.button)
    const buttonDiv = innerDiv.querySelector('.button');
    if (buttonDiv) contentEls.push(buttonDiv.cloneNode(true));
  }

  // Table rows
  const headerRow = ['Hero (hero12)'];
  const imageRow = [bgImg ? bgImg.cloneNode(true) : ''];
  const contentRow = [contentEls.length ? contentEls : ''];

  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
