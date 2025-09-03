/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content column
  const mainCol = element.querySelector('.str-column-main');
  if (!mainCol) return;

  // Helper: get all headings (h2/h3) in order
  const headings = Array.from(mainCol.querySelectorAll('h2.mod-hdg-l2-02, h3.mod-hdg-l3-02'));

  // Helper: get all .str-outer-full and .str-outer blocks in order
  const blocks = Array.from(mainCol.children);

  // Build accordion rows
  const rows = [['Accordion (accordion91)']];
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    // Find the parent .str-outer-full of the heading
    let headingOuter = heading.closest('.str-outer-full, .str-outer');
    // Find index of headingOuter in blocks
    let startIdx = blocks.indexOf(headingOuter);
    let endIdx = blocks.length;
    // Find next heading's parent .str-outer-full
    if (i + 1 < headings.length) {
      let nextHeadingOuter = headings[i + 1].closest('.str-outer-full, .str-outer');
      endIdx = blocks.indexOf(nextHeadingOuter);
    }
    // Collect all blocks between startIdx+1 and endIdx
    const contentBlocks = [];
    for (let j = startIdx + 1; j < endIdx; j++) {
      // Only push blocks with visible content
      const inner = blocks[j].querySelector('.str-inner');
      if (inner && inner.textContent.trim() !== '' && inner.childNodes.length > 0) {
        contentBlocks.push(inner);
      }
    }
    // Defensive: skip empty content
    if (contentBlocks.length === 0) continue;
    // Title cell: use heading (with its parent .str-inner if available)
    let titleCell = heading.closest('.str-inner') || heading;
    // Content cell: if only one block, use it directly; else, array
    let contentCell = contentBlocks.length === 1 ? contentBlocks[0] : contentBlocks;
    rows.push([titleCell, contentCell]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
