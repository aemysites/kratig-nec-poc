/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Table (bordered, tableBordered95)'];
  const cells = [headerRow];

  // Find the main content column (the right side)
  let mainCol = element.querySelector('.ls-row.str-column-main');
  if (!mainCol) {
    mainCol = element;
  }

  // Get all the .str-outer-full > .str-inner children
  const sections = mainCol.querySelectorAll('.str-outer-full > .str-inner');

  let i = 0;
  while (i < sections.length) {
    const section = sections[i];
    // Look for h2 with type name
    const h2 = section.querySelector('h2');
    if (h2) {
      // Start a new block for this type
      const typeBlock = [];
      // Clone and push the h2
      typeBlock.push(h2.cloneNode(true));
      i++;
      // Next: h3 Basic Core Specifications
      if (i < sections.length) {
        const coreSpecSection = sections[i];
        const h3Core = coreSpecSection.querySelector('h3');
        if (h3Core) {
          typeBlock.push(h3Core.cloneNode(true));
        }
        i++;
        // Next: table for core specs
        if (i < sections.length) {
          const coreTableSection = sections[i];
          const coreTable = coreTableSection.querySelector('table');
          if (coreTable) {
            typeBlock.push(coreTable.cloneNode(true));
          }
          i++;
        }
      }
      // Next: h3 Basic Processor Specifications
      if (i < sections.length) {
        const procSpecSection = sections[i];
        const h3Proc = procSpecSection.querySelector('h3');
        if (h3Proc) {
          typeBlock.push(h3Proc.cloneNode(true));
        }
        i++;
        // Next: table for processor specs
        if (i < sections.length) {
          const procTableSection = sections[i];
          const procTable = procTableSection.querySelector('table');
          if (procTable) {
            typeBlock.push(procTable.cloneNode(true));
          }
          i++;
        }
      }
      // Instead of pushing elements, create a div and append all nodes for full text content
      const div = document.createElement('div');
      typeBlock.forEach(node => div.appendChild(node));
      cells.push([div]);
    } else {
      i++;
    }
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
