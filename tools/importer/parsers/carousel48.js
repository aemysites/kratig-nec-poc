/* global WebImporter */
export default function parse(element, { document }) {
  // The previous code only outputs the header row and misses extracting all text content from the source html.
  // Fix: Extract all visible text content from the element and include it in a single slide row (with two columns: image cell empty, text cell filled).

  const headerRow = ['Carousel (carousel48)'];
  const rows = [headerRow];

  // Extract all visible text content from the element (buttons and li)
  let textContent = [];
  element.querySelectorAll('button').forEach(btn => {
    const txt = btn.textContent.trim();
    if (txt) textContent.push(txt);
  });
  element.querySelectorAll('li').forEach(li => {
    const txt = li.textContent.trim();
    if (txt && !textContent.includes(txt)) textContent.push(txt);
  });

  // If any text content was found, add a single slide row with 2 columns: [ '', textContent ]
  if (textContent.length > 0) {
    rows.push(['', textContent.join(' ')]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
