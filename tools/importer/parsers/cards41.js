/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the UL containing the cards
  const ul = element.querySelector('ul.list');
  if (!ul) return;

  // Get all LI elements (each card)
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Table header row
  const headerRow = ['Cards (cards41)'];
  const rows = [headerRow];

  lis.forEach(li => {
    // Each LI contains an <a.inner>
    const a = li.querySelector('a.inner');
    if (!a) return;

    // Image: find the <picture> block inside .thumb
    const thumb = a.querySelector('.thumb');
    let imageEl = null;
    if (thumb) {
      const picture = thumb.querySelector('picture');
      if (picture) {
        imageEl = picture;
      }
    }

    // Text content: heading and description inside .detail
    const detail = a.querySelector('.detail');
    let textContent = [];
    if (detail) {
      // Heading
      const heading = detail.querySelector('.heading');
      if (heading) {
        // Convert to <strong> for semantic heading
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent;
        textContent.push(strong);
      }
      // Description
      const desc = detail.querySelector('.text');
      if (desc) {
        // Use a <p> for description
        const p = document.createElement('p');
        p.textContent = desc.textContent;
        textContent.push(p);
      }
    }

    // Compose row: [image, text]
    rows.push([
      imageEl,
      textContent
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
