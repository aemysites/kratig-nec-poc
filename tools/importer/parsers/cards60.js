/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards list
  const cardsList = element.querySelector('ul.list');
  if (!cardsList) return;

  // Header row as required
  const headerRow = ['Cards (cards60)'];
  const rows = [headerRow];

  // For each card (li)
  cardsList.querySelectorAll(':scope > li').forEach((li) => {
    // Find the anchor containing the card content
    const anchor = li.querySelector(':scope > a.inner');
    if (!anchor) return;

    // Image (first cell)
    const thumb = anchor.querySelector('.thumb img');
    let imgEl = null;
    if (thumb) {
      imgEl = thumb;
    }

    // Text content (second cell)
    const detail = anchor.querySelector('.detail');
    let textContent = [];
    if (detail) {
      // Heading (title)
      const heading = detail.querySelector('.heading');
      if (heading) {
        // Use <strong> for heading
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent.trim();
        textContent.push(strong);
      }
      // Description (text)
      const desc = detail.querySelector('.text');
      if (desc) {
        // Add a <div> for description, if present
        const descDiv = document.createElement('div');
        descDiv.textContent = desc.textContent.trim();
        textContent.push(descDiv);
      }
    }

    // Compose row: [image, text content]
    rows.push([
      imgEl,
      textContent
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
