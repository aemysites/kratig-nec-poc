/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as header
  const headerRow = ['Columns (columns23)'];

  // Find the columns: .str-outer > .str-inner > .link > ul.list > li.col
  const strOuter = element.querySelector('.str-outer');
  let strInner, linkDiv, listUl;
  if (strOuter) {
    strInner = strOuter.querySelector('.str-inner');
    if (strInner) {
      linkDiv = strInner.querySelector('.link');
      if (linkDiv) {
        listUl = linkDiv.querySelector('ul.list');
      }
    }
  }

  // Find the SNS icons (social links)
  let snsUl = null;
  if (strInner) {
    snsUl = strInner.querySelector('ul.sns');
  }

  // Find the scroll-top link (bottom row)
  const strOuterFull = element.querySelector('.str-outer-full');
  let scrollTopP = null;
  if (strOuterFull) {
    const strInnerFull = strOuterFull.querySelector('.str-inner');
    if (strInnerFull) {
      scrollTopP = strInnerFull.querySelector('p.scroll-top');
    }
  }

  // Build the columns: 4 content columns, 1 social column
  const columns = [];
  if (listUl) {
    const colLis = Array.from(listUl.querySelectorAll(':scope > li.col'));
    colLis.forEach((colLi) => {
      // For each column, extract its content as a fragment (not empty)
      const frag = document.createElement('div');
      // Use innerHTML to ensure all text and structure is included
      frag.innerHTML = colLi.innerHTML;
      // If the column is empty, push an empty string
      columns.push(frag.innerHTML.trim() ? frag : '');
    });
  }
  if (snsUl) {
    const frag = document.createElement('div');
    frag.innerHTML = snsUl.outerHTML;
    columns.push(frag.innerHTML.trim() ? frag : '');
  }

  // If no columns found, fallback to header only
  if (columns.length === 0 || columns.every(cell => cell === '')) {
    const block = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(block);
    return;
  }

  // Second row: scroll-top link in last cell, others empty
  let secondRow = null;
  if (scrollTopP) {
    secondRow = columns.map((_, idx) => {
      if (idx === columns.length - 1) {
        const frag = document.createElement('div');
        frag.innerHTML = scrollTopP.outerHTML;
        return frag.innerHTML.trim() ? frag : '';
      }
      return '';
    });
  }

  // Compose the table rows
  const cells = [headerRow, columns];
  if (secondRow && secondRow.some(cell => cell && (cell.textContent || (cell.innerHTML && cell.innerHTML.trim())))) {
    cells.push(secondRow);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
