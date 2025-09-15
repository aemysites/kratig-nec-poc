/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Search (search39)'];

  // The second row must contain the absolute URL to the query index
  // Per block spec, this is always:
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.live/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = queryIndexUrl;
  link.textContent = queryIndexUrl;

  // Table cells array (only 2 rows, per block spec)
  const cells = [
    headerRow,
    [link],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
