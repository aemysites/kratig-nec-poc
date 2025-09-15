/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate children representing columns
  const columns = Array.from(element.querySelectorAll(':scope > .nic-achievements-list-inner'));

  // Build the header row
  const headerRow = ['Columns block (columns5)'];

  // Build the columns row
  const columnsRow = columns.map((col) => {
    // We'll collect all relevant content for each column
    const colContent = [];

    // Get the <dl> (title and subtitle)
    const dl = col.querySelector('dl');
    if (dl) colContent.push(dl);

    // Get the image (picture)
    const imgDiv = col.querySelector('.img');
    if (imgDiv) colContent.push(imgDiv);

    // Get the number (<p><span>...</span></p>)
    const numP = col.querySelector('p');
    if (numP) colContent.push(numP);

    // Return all content for this column as an array
    return colContent;
  });

  // Compose the table cells
  const cells = [
    headerRow,
    columnsRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
