/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element is a <dl>
  if (!element || element.tagName !== 'DL') return;

  // Always use the required header row
  const headerRow = ['Table (table26)'];
  const rows = [headerRow];

  // Collect all <dt> and <dd> pairs
  const dts = Array.from(element.querySelectorAll(':scope > dt'));
  const dds = Array.from(element.querySelectorAll(':scope > dd'));

  // Defensive: ensure pairs are matched
  const numRows = Math.min(dts.length, dds.length);
  for (let i = 0; i < numRows; i++) {
    const dt = dts[i];
    const dd = dds[i];
    rows.push([dt, dd]);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
