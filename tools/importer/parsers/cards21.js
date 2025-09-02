/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image element from a card
  function getImage(card) {
    // Find the .thumb div inside the <a>
    const thumb = card.querySelector('.thumb');
    if (!thumb) return null;
    // Find the <img> inside the <picture> inside .thumb
    const img = thumb.querySelector('img');
    return img || null;
  }

  // Helper to extract the text content (title, org, description, categories)
  function getTextContent(card, li) {
    // The <dl> contains org, title, description
    const dl = card.querySelector('dl');
    if (!dl) return null;
    // Clone to avoid moving out of the DOM
    const dlClone = dl.cloneNode(true);
    // The <ul class="category"> is a sibling of <a>, not inside <a>
    // So we need to find the <ul class="category"> inside the <li>
    const categoryUl = li.querySelector('ul.category');
    if (categoryUl) {
      dlClone.appendChild(categoryUl.cloneNode(true));
    }
    return dlClone;
  }

  // Find all <li> children of the main <ul>
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Build the rows: header + one row per card
  const rows = [];
  const headerRow = ['Cards (cards21)'];
  rows.push(headerRow);

  lis.forEach(li => {
    // Each <li> contains an <a> (the card), and a <ul class="category"> sibling
    const a = li.querySelector('a');
    if (!a) return;
    // Get image
    const img = getImage(a);
    // Get text content (dl + categories)
    const textContent = getTextContent(a, li);
    // Add row: [image, textContent]
    rows.push([
      img || '',
      textContent || ''
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
