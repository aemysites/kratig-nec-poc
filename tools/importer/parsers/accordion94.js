/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all direct children with a selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter((el) => el.matches(selector));
  }

  // Find the main content column (ignore nav/sidebar)
  // The main content is the div with class 'ls-row str-column-main'
  let mainContent = element.querySelector('.ls-row.str-column-main');
  if (!mainContent) return;

  // Get all direct children that are .str-outer-full (each is a content block)
  const outerBlocks = mainContent.querySelectorAll(':scope > .str-outer-full');

  // We'll collect accordion items as [title, content] pairs
  const accordionRows = [];

  // We'll keep track of the current section title and its content
  let currentTitle = null;
  let currentContent = [];

  // Helper to flush current section
  function flushSection() {
    if (currentTitle && currentContent.length) {
      accordionRows.push([
        currentTitle,
        currentContent.length === 1 ? currentContent[0] : currentContent,
      ]);
    }
    currentTitle = null;
    currentContent = [];
  }

  // Iterate through each block
  outerBlocks.forEach((block) => {
    // Find h2 or h3 as section title
    const h2 = block.querySelector('h2');
    const h3 = block.querySelector('h3');
    if (h2) {
      // New section starts, flush previous
      flushSection();
      // Use the <span> inside h2 if present, else h2 itself
      const span = h2.querySelector('span');
      currentTitle = span ? span : h2;
    } else if (h3) {
      // New subsection, flush previous
      flushSection();
      const span = h3.querySelector('span');
      currentTitle = span ? span : h3;
    } else {
      // Otherwise, treat as content for current section
      // If this block contains only whitespace, skip
      if (block.textContent.trim() === '' && !block.querySelector('img')) return;
      // If it contains a figure or image, include that
      const figure = block.querySelector('figure');
      if (figure) {
        currentContent.push(figure);
      } else {
        // Otherwise, push the .str-inner div (the content)
        const inner = block.querySelector('.str-inner');
        if (inner) {
          // If .mod-list or .mod-list-02, include the whole list
          const modList = inner.querySelector('.mod-list, .mod-list-02');
          if (modList) {
            currentContent.push(modList);
          } else {
            // Otherwise, include all children (p, small, etc)
            const children = Array.from(inner.children).filter((el) => el.tagName !== 'H2' && el.tagName !== 'H3');
            if (children.length) {
              currentContent.push(...children);
            }
          }
        }
      }
    }
  });
  // Flush last section
  flushSection();

  // Add the OpenMP note and Contact button as a final content block (if present)
  // Find .mod-list-02.of-notice (note) and .mod-btn-list (button)
  const note = mainContent.querySelector('.mod-list-02.of-notice');
  const btnList = mainContent.querySelector('.mod-btn-list');
  if (note && btnList) {
    accordionRows.push([
      'Contact',
      [note, btnList],
    ]);
  } else if (btnList) {
    accordionRows.push([
      'Contact',
      btnList,
    ]);
  }

  // Compose the table rows
  const headerRow = ['Accordion (accordion94)'];
  const tableRows = [headerRow, ...accordionRows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
