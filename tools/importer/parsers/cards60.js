/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the list of cards
  const list = element.querySelector('ul.list');
  if (!list) return;

  // Header row as specified
  const headerRow = ['Cards (cards60)'];
  const rows = [headerRow];

  // Each card is an <li> containing an <a.inner>
  const items = list.querySelectorAll(':scope > li');
  items.forEach((li) => {
    const anchor = li.querySelector(':scope > a.inner');
    if (!anchor) return;

    // Image: inside <div class="thumb"><img ...></div>
    const thumb = anchor.querySelector('.thumb img');
    // Defensive: skip if no image
    if (!thumb) return;

    // Text content: <div class="detail"><div class="heading">...</div><div class="text">...</div></div>
    const detail = anchor.querySelector('.detail');
    let textCellContent = [];
    if (detail) {
      // Heading
      const heading = detail.querySelector('.heading');
      if (heading) {
        // Use <strong> for heading to match markdown bold
        const strong = document.createElement('strong');
        strong.innerHTML = heading.innerHTML;
        textCellContent.push(strong);
        textCellContent.push(document.createElement('br'));
      }
      // Description
      const desc = detail.querySelector('.text');
      if (desc) {
        // Add as plain text or as a <span>
        textCellContent.push(desc.textContent);
      }
    }
    // Remove trailing <br> if no description
    if (textCellContent.length && typeof textCellContent[textCellContent.length - 1] !== 'string') {
      // If last is <br> and no desc, remove
      if (textCellContent[textCellContent.length - 1].tagName === 'BR' && textCellContent.length === 2) {
        textCellContent.pop();
      }
    }
    // If only one element, don't wrap in array
    if (textCellContent.length === 1) {
      textCellContent = textCellContent[0];
    }
    rows.push([
      thumb,
      textCellContent,
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
