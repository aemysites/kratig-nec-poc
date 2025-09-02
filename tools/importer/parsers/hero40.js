/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Table header row as per spec
  const headerRow = ['Hero (hero40)'];

  // No background image row for this HTML, so leave empty
  const bgImageRow = [''];

  // Gather all content for the content row
  // We'll include all children of the .lead div in the content cell
  const contentElements = Array.from(element.childNodes);

  // Defensive: filter out empty text nodes
  const filteredContent = contentElements.filter(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent.trim().length > 0;
    }
    return true;
  });

  // The content row: single cell with all content
  const contentRow = [filteredContent];

  // Compose the table data
  const tableData = [headerRow, bgImageRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
