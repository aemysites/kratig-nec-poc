/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element is a <dl>
  if (!element || element.tagName !== 'DL') return;

  // Table header row
  const headerRow = ['City (table26)'];

  // Gather rows: each <dt> and its corresponding <dd>
  const rows = [];
  const children = Array.from(element.children);
  for (let i = 0; i < children.length; i++) {
    const dt = children[i];
    if (dt.tagName === 'DT') {
      const dd = children[i + 1];
      if (dd && dd.tagName === 'DD') {
        // Defensive: If dd has class 'external-link', use its <a> child directly
        if (dd.classList.contains('external-link')) {
          const link = dd.querySelector('a');
          rows.push([dt.textContent.trim(), link ? link : dd]);
        } else {
          rows.push([dt.textContent.trim(), dd]);
        }
        i++; // Skip the <dd> we just processed
      }
    }
  }

  // Build the table data: header row, then each data row
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
