/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main column containing the tab structure
  const mainCol = element.querySelector('.ls-row.str-column-main');
  if (!mainCol) return;

  // Find all year headings (these are the tab labels)
  const yearHeadings = Array.from(mainCol.querySelectorAll('h2.mod-hdg-l2-02'));
  if (!yearHeadings.length) return;

  // Prepare header row as per block guidelines
  const headerRow = ['Tabs (tabs79)'];
  const rows = [headerRow];

  // For each year heading, collect its tab label and content
  yearHeadings.forEach((yearHeading, idx) => {
    // Tab label: textContent of the year heading
    const tabLabel = yearHeading.textContent.trim();

    // Tab content: everything from this heading until the next year heading
    // We'll collect siblings until we hit the next h2.mod-hdg-l2-02 or end
    const tabContentEls = [];
    let node = yearHeading.parentElement.parentElement.nextElementSibling;
    while (node) {
      // If we hit another year heading, stop
      const h2 = node.querySelector && node.querySelector('h2.mod-hdg-l2-02');
      if (h2) break;
      tabContentEls.push(node);
      node = node.nextElementSibling;
    }
    // Defensive: filter out nulls
    const tabContentElsFiltered = tabContentEls.filter(Boolean);

    // If only one element, use it directly, else use array
    let tabContentCell;
    if (tabContentElsFiltered.length === 1) {
      tabContentCell = tabContentElsFiltered[0];
    } else if (tabContentElsFiltered.length > 1) {
      // Create a wrapper div to preserve structure and semantics
      const wrapper = document.createElement('div');
      tabContentElsFiltered.forEach(el => {
        if (el) wrapper.appendChild(el);
      });
      tabContentCell = wrapper;
    } else {
      tabContentCell = '';
    }

    rows.push([tabLabel, tabContentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
