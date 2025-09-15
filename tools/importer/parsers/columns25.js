/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two column containers inside .nic-appeal-inner
  const appealInner = element.querySelector('.nic-appeal-inner');
  if (!appealInner) return;
  const innerDivs = Array.from(appealInner.querySelectorAll(':scope > .inner'));
  if (innerDivs.length < 2) return;

  // Each innerDiv is a column: collect its content as a fragment
  const columns = innerDivs.map((colDiv) => {
    const frag = document.createDocumentFragment();
    Array.from(colDiv.childNodes).forEach((node) => {
      frag.appendChild(node.cloneNode(true));
    });
    return frag;
  });

  // Build the table rows
  const headerRow = ['Columns block (columns25)'];
  const contentRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
