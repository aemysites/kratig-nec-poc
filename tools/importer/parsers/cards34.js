/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image element from a .news-pickup-item
  function extractImage(item) {
    // Find the <img> inside the .image container
    const img = item.querySelector('.image img');
    return img || '';
  }

  // Helper to extract the text content (date, title/desc, link) from a .news-pickup-item
  function extractTextContent(item) {
    const a = item.querySelector('a');
    const dl = a ? a.querySelector('dl') : null;
    if (!dl) return '';
    const dt = dl.querySelector('dt');
    const dd = dl.querySelector('dd');

    // Compose a fragment with date (dt) and description (dd)
    const frag = document.createElement('div');
    if (dt) {
      const date = document.createElement('div');
      date.textContent = dt.textContent;
      date.style.fontSize = 'small';
      frag.appendChild(date);
    }
    if (dd) {
      const desc = document.createElement('div');
      desc.innerHTML = dd.innerHTML; // preserve <br> etc
      frag.appendChild(desc);
    }
    // Add the link as a CTA at the bottom (if present)
    if (a && a.href) {
      const cta = document.createElement('div');
      const link = document.createElement('a');
      link.href = a.href;
      link.textContent = 'Read more';
      link.target = a.target || '_self';
      cta.appendChild(link);
      cta.style.marginTop = '0.5em';
      frag.appendChild(cta);
    }
    return frag;
  }

  // Get all .news-pickup-item elements
  const items = element.querySelectorAll('.news-pickup-item');

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards34)']);

  items.forEach((item) => {
    const img = extractImage(item);
    const textContent = extractTextContent(item);
    rows.push([
      img || '',
      textContent || '',
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
