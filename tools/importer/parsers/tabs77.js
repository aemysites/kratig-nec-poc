/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find all year tabs and their content
  function getYearTabs(mainCol) {
    // Find all year headings (h2.mod-hdg-l2-02)
    const yearHeadings = Array.from(mainCol.querySelectorAll('h2.mod-hdg-l2-02'));
    const tabs = [];
    yearHeadings.forEach((yearH2, idx) => {
      // Tab label is the year text
      const tabLabel = yearH2.textContent.trim();
      // Tab content: everything from this h2 until the next h2.mod-hdg-l2-02 or end
      const contentNodes = [];
      let node = yearH2.parentElement.parentElement.nextElementSibling;
      while (node) {
        // If next h2.mod-hdg-l2-02, break
        const h2 = node.querySelector && node.querySelector('h2.mod-hdg-l2-02');
        if (h2) break;
        // Add node to content
        contentNodes.push(node);
        node = node.nextElementSibling;
      }
      // Compose a wrapper for tab content
      const tabContent = document.createElement('div');
      tabContent.appendChild(yearH2.cloneNode(true));
      contentNodes.forEach(n => tabContent.appendChild(n.cloneNode(true)));
      tabs.push([tabLabel, tabContent]);
    });
    return tabs;
  }

  // Find the main column containing the tabs (ls-row.str-column-main)
  const mainCol = element.querySelector('.ls-row.str-column-main');
  if (!mainCol) return;

  // Build the table rows
  const headerRow = ['Tabs (tabs77)'];
  const tabRows = getYearTabs(mainCol);

  // Compose the table: header + tab rows
  const cells = [headerRow, ...tabRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
