/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content column (the tabs content)
  const mainCol = element.querySelector('.str-column-main');
  if (!mainCol) return;

  // Find all tab headings (h2.mod-hdg-l2-02)
  const tabHeadings = Array.from(mainCol.querySelectorAll('h2.mod-hdg-l2-02'));
  if (!tabHeadings.length) return;

  // Prepare header row
  const headerRow = ['Tabs (tabs2)'];
  const rows = [headerRow];

  // For each tab heading, collect its label and content
  tabHeadings.forEach((heading, idx) => {
    const tabLabel = heading.textContent.trim();
    // Find the .str-outer containing this heading
    let outer = heading.closest('.str-outer');
    let tabContentEls = [];
    let current = outer.nextElementSibling;
    while (current && !current.querySelector('h2.mod-hdg-l2-02')) {
      // Only include .str-inner children
      const inner = current.querySelector('.str-inner');
      if (inner) tabContentEls.push(inner);
      current = current.nextElementSibling;
    }
    // Remove empty tab content (should not happen)
    if (tabContentEls.length === 0) return;
    // If only one element, use it directly, else use array
    const tabContent = tabContentEls.length === 1 ? tabContentEls[0] : tabContentEls;
    rows.push([tabLabel, tabContent]);
  });

  // Only create the block if there are at least two rows (header + at least one tab)
  if (rows.length > 1) {
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
  }
}
