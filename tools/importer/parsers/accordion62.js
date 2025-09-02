/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the correct header row
  const headerRow = ['Accordion (accordion62)'];

  // Find the main content column
  let mainCol = element.querySelector('.str-column-main');
  if (!mainCol) {
    // fallback: find the largest .ls-row child
    const rows = Array.from(element.querySelectorAll(':scope > .ls-row'));
    mainCol = rows.sort((a, b) => b.textContent.length - a.textContent.length)[0];
  }
  if (!mainCol) return;

  // Get all .str-outer blocks (each is a logical section)
  const outers = Array.from(mainCol.querySelectorAll(':scope > .str-outer'));

  // We'll collect accordion items as [title, content] pairs
  const accordionRows = [];
  let currentTitle = null;
  let currentContent = [];

  // Helper: flush current item if valid
  function flushItem() {
    if (currentTitle && currentContent.length) {
      // Flatten content if only one node
      accordionRows.push([
        currentTitle,
        currentContent.length === 1 ? currentContent[0] : currentContent.slice(),
      ]);
    }
    currentTitle = null;
    currentContent = [];
  }

  // Helper: is this a section heading (h2, h3, h4)?
  function isSectionHeading(el) {
    return el && (/^H[2-4]$/i.test(el.tagName));
  }

  // Helper: get the heading text (from span if present)
  function getHeadingTextEl(h) {
    const span = h.querySelector('span');
    return span ? span : h;
  }

  // Iterate over .str-outer blocks to build accordion rows
  outers.forEach((outer) => {
    const inner = outer.querySelector(':scope > .str-inner');
    if (!inner) return;
    // Find first heading in this inner
    const heading = inner.querySelector(':scope > h2, :scope > h3, :scope > h4');
    if (isSectionHeading(heading)) {
      // New section: flush previous
      flushItem();
      currentTitle = getHeadingTextEl(heading);
      // Remove the heading from inner for content
      heading.remove();
      // Add all remaining content (including figures, mod-lyt, paragraphs, etc)
      const contentEls = Array.from(inner.childNodes).filter((n) => {
        // skip empty text nodes
        if (n.nodeType === Node.TEXT_NODE) return n.textContent.trim().length > 0;
        // skip empty p
        if (n.nodeType === Node.ELEMENT_NODE && n.tagName === 'P' && n.textContent.trim().length === 0 && !n.querySelector('img')) return false;
        // include everything else
        return true;
      });
      if (contentEls.length) currentContent.push(...contentEls);
    } else {
      // Not a heading: treat as content for current section
      // Add all non-empty children (including figures, mod-lyt, paragraphs, etc)
      const contentEls = Array.from(inner.childNodes).filter((n) => {
        if (n.nodeType === Node.TEXT_NODE) return n.textContent.trim().length > 0;
        if (n.nodeType === Node.ELEMENT_NODE && n.tagName === 'P' && n.textContent.trim().length === 0 && !n.querySelector('img')) return false;
        return true;
      });
      if (contentEls.length) currentContent.push(...contentEls);
    }
  });
  // Flush last item
  flushItem();

  // Defensive: remove empty rows
  const filteredRows = accordionRows.filter(([title, content]) => {
    if (!title) return false;
    if (!content) return false;
    if (Array.isArray(content) && content.length === 0) return false;
    if (typeof content === 'string' && !content.trim()) return false;
    return true;
  });

  // Build the table
  const tableRows = [headerRow, ...filteredRows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}
