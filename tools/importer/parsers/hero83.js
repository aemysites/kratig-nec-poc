/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content column (ignore nav/sidebar)
  const mainCol = element.querySelector('.str-column-main');
  if (!mainCol) return;

  // Find the first prominent image (background)
  let bgImg = null;
  const firstFigure = mainCol.querySelector('.mod-media img');
  if (firstFigure) {
    bgImg = firstFigure.closest('figure') || firstFigure;
  }

  // Find the main heading (title)
  let title = null;
  const h2 = mainCol.querySelector('.mod-hdg-l2-02');
  if (h2) {
    title = h2.cloneNode(true);
  }

  // Find the first paragraph after the heading (subheading)
  let subheading = null;
  // Find all .str-outer blocks
  const outers = Array.from(mainCol.querySelectorAll('.str-outer'));
  // Find the index of the h2 block
  let h2Idx = outers.findIndex(o => o.querySelector('.mod-hdg-l2-02'));
  if (h2Idx > -1) {
    // Look for the first <p> after the h2 block
    for (let i = h2Idx + 1; i < outers.length; i++) {
      const para = outers[i].querySelector('p');
      if (para && para.textContent.trim()) {
        subheading = para.cloneNode(true);
        break;
      }
    }
  }

  // Find CTA button (if any)
  let cta = null;
  // Look for a button or prominent link in the mainCol
  const btnList = mainCol.querySelector('.mod-btn-list');
  if (btnList) {
    cta = btnList.cloneNode(true);
  }

  // Compose content cell
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // Table rows
  const headerRow = ['Hero (hero83)'];
  const bgImgRow = [bgImg ? bgImg.cloneNode(true) : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  // Create table and replace
  const cells = [headerRow, bgImgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
