/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each .col
  function extractCard(col) {
    // Find image
    const img = col.querySelector('a.media figure img');
    // Find title (as link)
    const titleEl = col.querySelector('a.media p b.title');
    const cardUrl = col.querySelector('a.media')?.href;
    let titleLink = null;
    if (titleEl && cardUrl) {
      titleLink = document.createElement('a');
      titleLink.href = cardUrl;
      titleLink.textContent = titleEl.textContent;
      titleLink.style.fontWeight = 'bold';
      titleLink.style.display = 'block';
      titleLink.style.marginBottom = '4px';
    }
    // Find description
    const descEl = col.querySelector('.txt p');
    // Find tag
    const tagEl = col.querySelector('.mod-list-tag ul.list li');
    let tagSpan = null;
    if (tagEl) {
      tagSpan = document.createElement('span');
      tagSpan.textContent = tagEl.textContent;
      tagSpan.style.display = 'inline-block';
      tagSpan.style.background = '#e7eaf0';
      tagSpan.style.fontSize = '12px';
      tagSpan.style.padding = '2px 8px';
      tagSpan.style.marginTop = '8px';
      tagSpan.style.borderRadius = '4px';
    }
    // Compose text cell
    const textCell = document.createElement('div');
    if (titleLink) textCell.appendChild(titleLink);
    if (descEl) textCell.appendChild(descEl);
    if (tagSpan) textCell.appendChild(tagSpan);
    // Compose row: [image, text cell]
    return [img, textCell];
  }

  // Get all cards
  const cols = element.querySelectorAll(':scope > .inner > .col');
  const rows = Array.from(cols).map(extractCard);

  // Table header
  const headerRow = ['Cards (cards20)'];
  const cells = [headerRow, ...rows];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
