/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image element from a card
  function getCardImage(card) {
    // Find the <img> inside the <picture> inside .thumb
    const thumb = card.querySelector('.thumb');
    if (!thumb) return null;
    const img = thumb.querySelector('img');
    return img || null;
  }

  // Helper to extract the text content (title, description, categories) from a card
  function getCardText(card, categories) {
    // Find the <dt> (title) and <dd> (desc) inside <dl>
    const dl = card.querySelector('dl');
    if (!dl) return null;
    const dt = dl.querySelector('dt');
    const dd = dl.querySelector('dd');
    // Compose a fragment for the text cell
    const frag = document.createElement('div');
    if (dt) {
      const h3 = document.createElement('strong');
      h3.textContent = dt.textContent;
      frag.appendChild(h3);
    }
    if (dd) {
      // Add a <br> between title and description if both exist
      if (dt) frag.appendChild(document.createElement('br'));
      // dd may contain <br> and <strong> etc, so append as-is
      Array.from(dd.childNodes).forEach((n) => frag.appendChild(n.cloneNode(true)));
    }
    // Add categories as tags if present
    if (categories && categories.length) {
      frag.appendChild(document.createElement('br'));
      categories.forEach((cat, idx) => {
        frag.appendChild(cat.cloneNode(true));
        if (idx < categories.length - 1) frag.appendChild(document.createTextNode(' '));
      });
    }
    return frag;
  }

  // Get all <li> direct children of the main <ul>
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Compose the rows: header + one row per card
  const rows = [];
  const headerRow = ['Cards (cards84)'];
  rows.push(headerRow);

  lis.forEach(li => {
    // Each card's main content is in the first <a>
    const a = li.querySelector('a');
    if (!a) return;
    // Categories are in the next sibling <ul class="category">
    let categories = [];
    let next = a.nextElementSibling;
    if (next && next.classList.contains('category')) {
      categories = Array.from(next.querySelectorAll('li'));
    }
    // Image cell
    const img = getCardImage(a);
    // Text cell
    const text = getCardText(a, categories);
    // Add the row (image, text)
    rows.push([img, text]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
