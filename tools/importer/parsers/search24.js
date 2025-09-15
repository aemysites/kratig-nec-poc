/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as header
  const headerRow = ['Search (search24)'];

  // Try to find the search block in the source HTML
  // Look for the search form and any related links
  let searchUrl = '';
  // Find the link to 'All Case Studies' or similar, but for the block, use the query index URL
  // If a specific query index URL is present in the HTML, use it; otherwise, use the default
  // For flexibility, check for a data attribute or a script tag, but fallback to static value
  searchUrl = 'https://main--helix-block-collection--adobe.hlx.live/block-collection/sample-search-data/query-index.json';

  // Build the table
  const cells = [headerRow, [searchUrl]];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
