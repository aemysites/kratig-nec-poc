/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find all immediate column elements
  const colElements = Array.from(element.querySelectorAll(':scope > ul > li.col'));
  // If not found, fallback to any child li.col
  if (colElements.length === 0) {
    // Try to find columns deeper
    const fallbackCols = Array.from(element.querySelectorAll('li.col'));
    if (fallbackCols.length > 0) {
      colElements.push(...fallbackCols);
    }
  }
  // If still not found, fallback to the whole element
  if (colElements.length === 0) {
    colElements.push(element);
  }

  // Header row as specified
  const headerRow = ['Columns block (columns18)'];

  // Each column cell: reference the full li.col element (preserves structure, links, etc)
  const columnsRow = colElements.map((colEl) => colEl);

  // Build table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
