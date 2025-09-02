/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all .str-outer-full blocks (main content)
  const tabBlocks = Array.from(element.querySelectorAll('.str-outer-full'));

  // Find all tab label blocks (those whose .str-inner contains h2 or h3)
  const tabIndexes = tabBlocks
    .map((block, idx) => {
      const inner = block.querySelector('.str-inner');
      if (!inner) return null;
      if (inner.querySelector('h2, h3')) return idx;
      return null;
    })
    .filter(idx => idx !== null);

  const tabs = [];
  for (let t = 0; t < tabIndexes.length; t++) {
    const startIdx = tabIndexes[t];
    const endIdx = tabIndexes[t + 1] ?? tabBlocks.length;
    const labelBlock = tabBlocks[startIdx];
    const inner = labelBlock.querySelector('.str-inner');
    let label = '';
    if (inner) {
      const h2 = inner.querySelector('h2');
      const h3 = inner.querySelector('h3');
      if (h2) label = h2.textContent.trim();
      else if (h3) label = h3.textContent.trim();
    }
    // Gather all content blocks for this tab
    const contentEls = [];
    // Include all children of labelBlock .str-inner except h2/h3
    if (inner) {
      Array.from(inner.children).forEach(child => {
        if (!child.matches('h2, h3')) contentEls.push(child);
      });
    }
    // Include all tabBlocks between startIdx+1 and endIdx
    for (let i = startIdx + 1; i < endIdx; i++) {
      const contentInner = tabBlocks[i].querySelector('.str-inner');
      if (contentInner) {
        Array.from(contentInner.children).forEach(child => {
          contentEls.push(child);
        });
      }
    }
    tabs.push([label, contentEls]);
  }

  // Table header
  const headerRow = ['Tabs (tabs92)'];
  // Table rows: [tab label, tab content]
  const tableRows = tabs.map(([label, content]) => [label, content]);
  const cells = [headerRow, ...tableRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
