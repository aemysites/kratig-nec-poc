/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main visual image (background)
  const imageDiv = Array.from(element.querySelectorAll(':scope > div')).find(div => div.classList.contains('image'));
  let bgImg = null;
  if (imageDiv) {
    // Prefer desktop image if present
    bgImg = imageDiv.querySelector('img.pc-show') || imageDiv.querySelector('img');
  }

  // Defensive: Find the content block
  const innerDiv = Array.from(element.querySelectorAll(':scope > div')).find(div => div.classList.contains('str-inner'));
  let contentBlock = null;
  if (innerDiv) {
    const contentDiv = innerDiv.querySelector('.content');
    if (contentDiv) {
      contentBlock = contentDiv.querySelector('.content-inner');
    }
  }

  // Compose the text and CTA
  let textAndCta = [];
  if (contentBlock) {
    // Title (h1)
    const h1 = contentBlock.querySelector('h1');
    if (h1) {
      textAndCta.push(h1);
    }
    // CTA (download button)
    const cta = contentBlock.querySelector('p.mod-btn');
    if (cta) {
      textAndCta.push(cta);
    }
  }

  // Table rows
  const headerRow = ['Hero (hero56)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [textAndCta.length ? textAndCta : ''];

  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
