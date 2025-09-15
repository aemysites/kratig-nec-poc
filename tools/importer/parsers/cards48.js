/* global WebImporter */
export default function parse(element, { document }) {
  // Only parse if this is the slick-dots-wrap block
  if (!element || !element.classList.contains('slick-dots-wrap')) return;

  // Block header as required
  const headerRow = ['Cards (cards48)'];

  // Extract all li > button as cards
  const rows = [headerRow];
  const lis = element.querySelectorAll('ul.slick-dots > li');
  lis.forEach(li => {
    const btn = li.querySelector('button');
    if (btn && btn.textContent.trim()) {
      // Only use button text in the second cell, single column for no images variant
      rows.push([btn.textContent.trim()]);
    }
  });

  // Only add the control button as a card if it has meaningful text
  const controlBtn = element.querySelector('button.btn-control');
  if (controlBtn && controlBtn.textContent.trim()) {
    rows.push([controlBtn.textContent.trim()]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
