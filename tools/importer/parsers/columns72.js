/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: convert non-image iframes to links
  function convertIframesToLinks(root) {
    root.querySelectorAll('iframe').forEach(iframe => {
      // Only convert if not inside a <picture> or <img>
      const isImageIframe = iframe.closest('picture') || iframe.closest('img');
      if (!isImageIframe && iframe.src) {
        const a = document.createElement('a');
        a.href = iframe.src;
        a.textContent = iframe.src;
        iframe.replaceWith(a);
      }
    });
  }

  // Find left (sidebar) and right (main) columns
  const leftCol = element.querySelector('.ls-col.str-column-side');
  const rightCol = element.querySelector('.ls-row.str-column-main');

  // Defensive: if columns not found, fallback to direct children
  let columns = [];
  if (leftCol && rightCol) {
    columns = [leftCol, rightCol];
  } else {
    columns = Array.from(element.children).filter(
      el => el.classList.contains('ls-col') || el.classList.contains('ls-row')
    );
    if (columns.length < 2) {
      columns = [element];
    }
  }

  // Clone columns and convert iframes to links
  const contentRow = columns.map(col => {
    const clone = col.cloneNode(true);
    convertIframesToLinks(clone);
    return clone;
  });

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns72)'];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
