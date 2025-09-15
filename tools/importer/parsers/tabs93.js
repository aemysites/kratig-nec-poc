/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all direct children with a class
  function getDirectChildrenByClass(parent, className) {
    return Array.from(parent.children).filter((el) => el.classList.contains(className));
  }

  // Get the main content column (ignore nav/sidebar)
  const mainCol = Array.from(element.querySelectorAll(':scope > div')).find((el) => el.classList.contains('str-column-main'));
  if (!mainCol) return;

  // Each tab starts with an h2 or h3 (section heading)
  // We'll collect all str-outer(-full) > str-inner blocks as content sections
  const sections = [];
  let currentTab = null;
  let currentContent = [];

  // Flatten all .str-inner blocks in order
  const inners = mainCol.querySelectorAll('.str-inner');
  inners.forEach((inner) => {
    // Tab section heading
    const h2 = inner.querySelector('h2');
    const h3 = inner.querySelector('h3');
    if (h2 || h3) {
      // If we have a previous tab, push it
      if (currentTab && currentContent.length) {
        sections.push({ label: currentTab, content: currentContent });
      }
      // Start new tab
      currentTab = h2 || h3;
      currentContent = [];
      // Don't add heading to content, only as label
    } else {
      // Content for current tab
      // Defensive: skip empty blocks
      if (inner.childNodes.length > 0 && currentTab) {
        currentContent.push(inner);
      }
    }
  });
  // Push last tab
  if (currentTab && currentContent.length) {
    sections.push({ label: currentTab, content: currentContent });
  }

  // Build table rows
  const headerRow = ['Tabs (tabs93)'];
  const rows = [headerRow];
  sections.forEach(({ label, content }) => {
    // Defensive: if content is only one element, pass it directly, else pass array
    rows.push([
      label,
      content.length === 1 ? content[0] : content,
    ]);
  });

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
