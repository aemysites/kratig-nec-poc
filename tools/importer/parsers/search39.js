/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Search (search39)'];

  // The second row should contain the absolute URL to the query index
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.live/block-collection/sample-search-data/query-index.json';

  // Extract all visible text content from the source html, including text from child elements
  let allText = '';
  // Get all text from headings, list items, and input placeholder
  const heading = element.querySelector('.hdg span');
  if (heading) {
    allText += heading.textContent.trim() + '\n';
  }
  const listItems = element.querySelectorAll('ul li');
  listItems.forEach(li => {
    allText += li.textContent.trim() + '\n';
  });
  const input = element.querySelector('input[placeholder]');
  if (input) {
    allText += input.getAttribute('placeholder').trim() + '\n';
  }
  allText = allText.trim();

  // Compose the second row cell
  const urlCell = [allText ? `${queryIndexUrl}\n${allText}` : queryIndexUrl];

  // Compose the table data
  const cells = [
    headerRow,
    urlCell,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
