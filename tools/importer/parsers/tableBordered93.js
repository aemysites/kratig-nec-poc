/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all main content blocks (ignore nav/sidebar)
  // The main content is inside .ls-row.str-column-main
  const mainContent = element.querySelector('.ls-row.str-column-main');
  if (!mainContent) return;

  // Find all .str-outer-full > .str-inner blocks
  const blocks = Array.from(mainContent.querySelectorAll('.str-outer-full > .str-inner'));

  // We'll collect each model's section as a single cell
  const modelSections = [];

  let currentSection = [];
  blocks.forEach((block) => {
    // If this block is a model heading (h2.mod-hdg-l2-02)
    const h2 = block.querySelector('h2.mod-hdg-l2-02');
    if (h2) {
      // If we have a previous section, push it
      if (currentSection.length) {
        modelSections.push(currentSection);
        currentSection = [];
      }
    }
    // Always add block to current section if it's not empty
    if (block.children.length > 0) {
      currentSection.push(block);
    }
  });
  // Push last section
  if (currentSection.length) {
    modelSections.push(currentSection);
  }

  // Defensive: filter out any empty sections
  const filteredSections = modelSections.filter(sec => sec.length > 0);

  // Compose the table rows
  const cells = [];
  // Header row
  cells.push(['Table (bordered, tableBordered93)']);
  // Each section as a single cell (array of elements)
  filteredSections.forEach(section => {
    cells.push([section]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
