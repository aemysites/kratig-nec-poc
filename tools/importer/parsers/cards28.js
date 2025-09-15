/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process <ul> with <li> children
  if (!element || !element.querySelectorAll) return;
  const lis = element.querySelectorAll(':scope > li');
  if (!lis.length) return;

  // Header row as specified
  const headerRow = ['Cards (cards28)'];
  const rows = [headerRow];

  lis.forEach((li) => {
    // Find the <a> inside the <li>
    const a = li.querySelector('a');
    if (!a) return;

    // Find the image container
    const imageDiv = a.querySelector('.image');
    let imgEl = null;
    if (imageDiv) {
      imgEl = imageDiv.querySelector('img');
    }
    // Defensive: If no image, skip this card
    if (!imgEl) return;

    // Find the text span
    const span = a.querySelector('span');
    let textContent = null;
    if (span) {
      // Wrap the text in a <strong> for heading style, as in the markdown example
      const strong = document.createElement('strong');
      strong.innerHTML = span.innerHTML;
      textContent = strong;
    }

    // Compose the row: [image, text]
    const row = [imgEl, textContent];
    rows.push(row);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
