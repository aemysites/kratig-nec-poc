/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the first img from a given element
  function getImage(el) {
    // Find the first <img> inside <picture> or directly
    const img = el.querySelector('img');
    return img || null;
  }

  // Helper to build the text cell for a card
  function buildTextCell(dl, ctaLink) {
    const frag = document.createDocumentFragment();
    if (!dl) return frag;
    // Date (dt)
    const dt = dl.querySelector('dt');
    if (dt) {
      const dateP = document.createElement('p');
      dateP.textContent = dt.textContent;
      dateP.style.margin = '0 0 4px 0';
      frag.appendChild(dateP);
    }
    // Title (first dd)
    const dds = dl.querySelectorAll('dd');
    if (dds[0]) {
      const title = document.createElement('strong');
      title.textContent = dds[0].textContent;
      frag.appendChild(title);
      frag.appendChild(document.createElement('br'));
    }
    // Description (second dd)
    if (dds[1]) {
      const descP = document.createElement('p');
      descP.textContent = dds[1].textContent;
      frag.appendChild(descP);
    }
    // CTA link
    if (ctaLink) {
      const ctaP = document.createElement('p');
      ctaP.appendChild(ctaLink);
      frag.appendChild(ctaP);
    }
    return frag;
  }

  // Find the list of cards
  const list = element.querySelector('.oi-future-list ul');
  if (!list) return;
  const cards = Array.from(list.children);

  // Build rows
  const rows = [];
  const headerRow = ['Cards (cards15)'];
  rows.push(headerRow);

  cards.forEach((li) => {
    // Image cell
    let imgEl = null;
    const thumb = li.querySelector('.thumb');
    if (thumb) {
      imgEl = getImage(thumb);
    }
    // Text cell
    // Get the <dl> inside the first <a>
    const mainLink = li.querySelector('a');
    let dl = null;
    if (mainLink) {
      dl = mainLink.querySelector('dl');
    }
    // Find CTA link (the one with class 'site' inside .link)
    let ctaLink = null;
    const linkDiv = li.querySelector('.link');
    if (linkDiv) {
      ctaLink = linkDiv.querySelector('a.site');
    }
    // Defensive: fallback to the mainLink if no .link found
    if (!ctaLink && mainLink) {
      ctaLink = mainLink.querySelector('a.site');
    }
    // Build text cell
    const textCell = buildTextCell(dl, ctaLink);
    // Compose row
    rows.push([
      imgEl ? imgEl : '',
      textCell
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
