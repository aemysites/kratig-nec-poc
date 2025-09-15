/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Table (bordered, tableBordered52)'];
  const rows = [headerRow];

  // Find the main content area
  let mainCol = element.querySelector('.str-column-main');
  if (!mainCol) {
    mainCol = element.querySelector('[id*="col-2-row-1"]');
  }
  if (!mainCol) return;

  // Gather all .str-outer-full and .str-outer blocks in order
  const contentBlocks = Array.from(mainCol.querySelectorAll('.str-outer-full, .str-outer'));

  // Helper to get all text content (including <br> as line breaks)
  function getTextWithLineBreaks(node) {
    let text = '';
    node.childNodes.forEach(child => {
      if (child.nodeType === 3) {
        text += child.textContent;
      } else if (child.nodeName === 'BR') {
        text += '\n';
      } else {
        text += getTextWithLineBreaks(child);
      }
    });
    return text;
  }

  let pendingHeading = null;
  contentBlocks.forEach(block => {
    const inner = block.querySelector('.str-inner');
    if (!inner) return;
    // Find heading (h2 or h3)
    const heading = inner.querySelector('h2, h3');
    if (heading) {
      pendingHeading = heading.cloneNode(true);
      return;
    }
    // If table present
    const table = inner.querySelector('table');
    if (table) {
      // Clone the table so we don't mutate the original DOM
      const tableClone = table.cloneNode(true);
      if (pendingHeading) {
        rows.push([[pendingHeading, tableClone]]);
        pendingHeading = null;
      } else {
        rows.push([tableClone]);
      }
      return;
    }
    // If paragraph present
    const para = inner.querySelector('p');
    if (para && para.textContent.trim()) {
      // Get all text including line breaks
      const paraText = getTextWithLineBreaks(para).replace(/\n+/g, '\n').trim();
      if (pendingHeading) {
        // Combine heading and paragraph in one cell
        const cell = document.createElement('div');
        cell.appendChild(pendingHeading.cloneNode(true));
        cell.appendChild(document.createElement('br'));
        cell.appendChild(document.createTextNode(paraText));
        rows.push([cell]);
        pendingHeading = null;
      } else {
        rows.push([paraText]);
      }
      return;
    }
    // If only heading left (no table or para follows), flush it
    if (pendingHeading) {
      rows.push([pendingHeading]);
      pendingHeading = null;
    }
  });
  // If a heading was left at the end, flush it
  if (pendingHeading) {
    rows.push([pendingHeading]);
  }

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
