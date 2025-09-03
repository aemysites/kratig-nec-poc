/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the UL containing the cards
  const ul = element.querySelector('ul.list');
  if (!ul) return;

  // Prepare header row
  const headerRow = ['Cards (cards41)'];
  const rows = [headerRow];

  // Get all LI elements (each card)
  const cards = ul.querySelectorAll(':scope > li');

  cards.forEach((li) => {
    // Find image (picture or img)
    const thumb = li.querySelector('.thumb');
    let imageEl = null;
    if (thumb) {
      // Prefer <picture> if present, else <img>
      imageEl = thumb.querySelector('picture') || thumb.querySelector('img');
    }

    // Find text content
    const detail = li.querySelector('.detail');
    let textCellContent = [];
    if (detail) {
      // Heading
      const heading = detail.querySelector('.heading');
      if (heading) {
        // Convert to <strong> for semantic heading
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent;
        textCellContent.push(strong);
      }
      // Description
      const desc = detail.querySelector('.text');
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc.textContent;
        textCellContent.push(p);
      }
    }
    // Call-to-action: use the card link if present
    const link = li.querySelector('a.inner');
    if (link && link.href) {
      // Only add CTA if the link has an href and text
      const cta = document.createElement('a');
      cta.href = link.href;
      // Use heading as CTA text if available
      const heading = detail && detail.querySelector('.heading');
      cta.textContent = heading ? heading.textContent : link.textContent || 'Learn more';
      textCellContent.push(cta);
    }

    // Compose row: image/icon, text content
    rows.push([
      imageEl,
      textCellContent
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
