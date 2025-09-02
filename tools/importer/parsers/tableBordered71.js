/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block guidelines
  const headerRow = ['Table (bordered, tableBordered71)'];

  // Find the customer profile section
  const profileSection = element.querySelector('.str-inner:has(.mod-tbl)');
  let contentBlocks = [];
  if (profileSection) {
    // Get the heading ("Customer profile") and subheading ("National Soccer Hall of Fame")
    const heading = profileSection.previousElementSibling?.querySelector('h2, h3, h4, h5, h6');
    const subheading = profileSection.previousElementSibling?.nextElementSibling?.querySelector('h3, h4, h5, h6');
    // Get the table
    const table = profileSection.querySelector('.mod-tbl table');
    // Get the image (profile)
    const imgFigure = profileSection.querySelector('.media figure');

    // Compose a div to hold all content as per visual
    const wrapper = document.createElement('div');
    if (heading) wrapper.appendChild(heading.cloneNode(true));
    if (subheading) wrapper.appendChild(subheading.cloneNode(true));
    if (table) wrapper.appendChild(table.cloneNode(true));
    if (imgFigure) wrapper.appendChild(imgFigure.cloneNode(true));
    contentBlocks = [wrapper];
  }

  // Compose the table cells array
  // Header row first, then a single cell containing all content
  const cells = [
    headerRow,
    [contentBlocks.length ? contentBlocks[0] : '']
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
