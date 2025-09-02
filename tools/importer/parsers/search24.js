/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as the header
  const headerRow = ['Search (search24)'];

  // Try to find the actual query index URL from the HTML if present
  let queryIndexUrl = '';
  // Look for a link in the search area (if present)
  const searchBox = element.querySelector('.mod-box-search');
  if (searchBox) {
    // Sometimes a link to the query index is present, but if not, use the default
    const link = searchBox.querySelector('a[href^="http"]');
    if (link) {
      queryIndexUrl = link.href;
    }
  }
  // Fallback to the default sample if not found
  if (!queryIndexUrl) {
    queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.live/block-collection/sample-search-data/query-index.json';
  }

  const urlCell = [queryIndexUrl];

  // Build the table
  const cells = [
    headerRow,
    urlCell,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
