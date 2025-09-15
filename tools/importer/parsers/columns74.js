/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: replace iframes with links (except images)
  function replaceIframesWithLinks(root) {
    const iframes = root.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
      const src = iframe.getAttribute('src');
      if (src) {
        const a = document.createElement('a');
        a.href = src;
        a.textContent = 'Facebook Share';
        iframe.replaceWith(a);
      }
    });
  }

  // Helper to get immediate children divs
  const getImmediateDivs = (el) => Array.from(el.querySelectorAll(':scope > div'));

  // Get left and right columns
  const columns = getImmediateDivs(element);
  if (columns.length < 2) return;

  // LEFT COLUMN (sidebar)
  const leftCol = columns[0].cloneNode(true);
  replaceIframesWithLinks(leftCol);

  // RIGHT COLUMN (main)
  const rightCol = columns[1].cloneNode(true);
  replaceIframesWithLinks(rightCol);

  // Table header
  const headerRow = ['Columns block (columns74)'];
  // Table content row: left and right columns
  const contentRow = [leftCol, rightCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
