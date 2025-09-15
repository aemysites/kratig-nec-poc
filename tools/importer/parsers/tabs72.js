/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row: block name only, one column
  const headerRow = ['Tabs (tabs72)'];
  const rows = [headerRow];

  // Get tab labels from nav-local
  const navLocal = element.querySelector('.nav-local');
  let tabLabels = [];
  if (navLocal) {
    const labelLinks = navLocal.querySelectorAll('ul.list > li > span > a');
    tabLabels = Array.from(labelLinks).map(a => a.textContent.trim());
  }
  if (!tabLabels.length) return;

  // Get all tab content containers (simulate all tabs, not just visible)
  // For this HTML, only one tab's content is present (mainCol)
  const mainCol = element.querySelector('.str-column-main');
  if (!mainCol) return;

  // Collect all content blocks in mainCol
  const contentBlocks = mainCol.querySelectorAll('.str-outer > .str-inner');
  if (!contentBlocks.length) return;

  // Compose a container for the tab's content
  const tabContentContainer = document.createElement('div');
  contentBlocks.forEach(block => {
    // Instead of appending only the block, append its children to preserve all text
    Array.from(block.childNodes).forEach(child => {
      tabContentContainer.appendChild(child.cloneNode(true));
    });
  });

  // Ensure all text content is included
  rows.push([
    tabLabels[0],
    tabContentContainer
  ]);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
