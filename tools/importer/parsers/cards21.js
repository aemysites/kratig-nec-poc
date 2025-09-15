/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each <li>
  function extractCard(li) {
    // Find image (first <img> in .thumb)
    const img = li.querySelector('.thumb img');
    // Find text content
    const dl = li.querySelector('dl');
    if (!dl) return null;
    // Title: first <dt.org> (organization), second <dt> (title)
    const org = dl.querySelector('dt.org');
    const title = dl.querySelectorAll('dt')[1];
    const desc = dl.querySelector('dd');
    // Categories: <ul.category> > <li>
    const categoryList = li.querySelector('ul.category');
    let categories = [];
    if (categoryList) {
      categories = Array.from(categoryList.querySelectorAll('li')).map(cat => {
        const span = document.createElement('span');
        span.textContent = cat.textContent;
        span.className = 'card-category';
        return span;
      });
    }
    // Compose text cell
    const textCell = [];
    if (org) {
      const orgDiv = document.createElement('div');
      orgDiv.className = 'card-org';
      orgDiv.textContent = org.textContent;
      textCell.push(orgDiv);
    }
    if (title) {
      const titleDiv = document.createElement('div');
      titleDiv.className = 'card-title';
      titleDiv.textContent = title.textContent;
      textCell.push(titleDiv);
    }
    if (desc) {
      textCell.push(desc);
    }
    if (categories.length > 0) {
      const catDiv = document.createElement('div');
      catDiv.className = 'card-categories';
      categories.forEach(cat => catDiv.appendChild(cat));
      textCell.push(catDiv);
    }
    return [img, textCell];
  }

  // Get all cards
  const cards = Array.from(element.querySelectorAll('ul > li')).map(extractCard).filter(Boolean);

  // Table header
  const headerRow = ['Cards (cards21)'];
  // Table rows: each card is a row with [image, text]
  const tableRows = cards.map(card => [card[0], card[1]]);
  const cells = [headerRow, ...tableRows];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
