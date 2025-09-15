/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul class="list"> containing all cards
  const list = element.querySelector('ul.list');
  if (!list) return;

  // Table header: exactly one column
  const headerRow = ['Cards (cards96)'];
  const rows = [headerRow];

  // For each <li> (card)
  list.querySelectorAll(':scope > li').forEach((li) => {
    const anchor = li.querySelector(':scope > a.inner');
    if (!anchor) return;

    // Image: <img> inside .thumb
    const thumb = anchor.querySelector('.thumb');
    let imgEl = null;
    if (thumb) {
      imgEl = thumb.querySelector('img');
    }

    // Text content: heading and description inside .detail
    const detail = anchor.querySelector('.detail');
    const textContent = [];
    if (detail) {
      const heading = detail.querySelector('.heading');
      if (heading) {
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent.trim();
        textContent.push(strong);
      }
      const desc = detail.querySelector('.text');
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc.textContent.trim();
        textContent.push(p);
      }
    }

    // Row: [image, textContent]
    rows.push([
      imgEl,
      textContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
