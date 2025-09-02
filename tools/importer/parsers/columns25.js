/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the two main column containers
  const columns = [];
  // The structure is: section > div.nic-container > div.inner.nic-column > div.content > div.nic-appeal-inner > div.inner (x2)
  // So we want the two div.inner inside .nic-appeal-inner
  const appealInner = element.querySelector('.nic-appeal-inner');
  if (!appealInner) return;
  const innerColumns = Array.from(appealInner.querySelectorAll(':scope > .inner'));
  if (innerColumns.length < 2) return;

  // For each column, collect all content (paragraph and dl.image)
  innerColumns.forEach((col) => {
    // Defensive: get all children
    const colContent = [];
    Array.from(col.childNodes).forEach((node) => {
      // Only include elements (not text nodes)
      if (node.nodeType === 1) {
        // For dl.image, include the whole dl
        if (node.matches('dl.image')) {
          colContent.push(node);
        } else {
          colContent.push(node);
        }
      }
    });
    columns.push(colContent);
  });

  // Build table rows
  const headerRow = ['Columns (columns25)'];
  const contentRow = columns;

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
