/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a .col element
  function extractCard(col) {
    // Image: .pnl .media figure img
    const img = col.querySelector('.pnl .media figure img');
    // Title: .pnl .media p > .title
    const titleEl = col.querySelector('.pnl .media p .title');
    // Description: .pnl .txt p
    const descEl = col.querySelector('.pnl .txt p');
    // Tag: .mod-list-tag ul li (optional)
    const tagEl = col.querySelector('.mod-list-tag ul li');
    // Link: .pnl .media (the <a>)
    const linkEl = col.querySelector('.pnl .media');

    // Build image cell: just the <img> element
    let imageCell = img;

    // Build text cell
    const textCell = document.createElement('div');
    // Title as strong link
    if (titleEl && linkEl) {
      const link = document.createElement('a');
      link.href = linkEl.href;
      link.textContent = titleEl.textContent;
      link.style.fontWeight = 'bold';
      link.style.textDecoration = 'underline';
      textCell.appendChild(link);
    }
    // Description
    if (descEl) {
      const descP = document.createElement('div');
      descP.textContent = descEl.textContent;
      textCell.appendChild(document.createElement('br'));
      textCell.appendChild(descP);
    }
    // Tag
    if (tagEl) {
      const tagDiv = document.createElement('div');
      tagDiv.appendChild(tagEl.cloneNode(true));
      textCell.appendChild(tagDiv);
    }
    return [imageCell, textCell];
  }

  // Get all direct .col children (cards)
  const cols = element.querySelectorAll(':scope > .inner > .col');
  const rows = [];
  // Header row
  rows.push(['Cards (cards20)']);
  // Card rows
  cols.forEach(col => {
    rows.push(extractCard(col));
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
