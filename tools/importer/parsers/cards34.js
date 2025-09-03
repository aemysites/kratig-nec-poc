/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the inner container if present
  let container = element;
  const inner = element.querySelector('.news-pickup-list-inner');
  if (inner) container = inner;

  // Get all card items
  const items = Array.from(container.querySelectorAll(':scope > .news-pickup-item'));

  // Build rows: header first
  const rows = [ ['Cards (cards34)'] ];

  items.forEach((item) => {
    // The link wraps the whole card
    const link = item.querySelector('a');
    if (!link) return; // skip if no link

    // Image cell: use the <picture> element (with <img> inside)
    let imageCell = '';
    const imageDiv = link.querySelector('.image');
    if (imageDiv) {
      const picture = imageDiv.querySelector('picture');
      if (picture) imageCell = picture;
    }

    // Text cell: build a fragment with date, title, description, and CTA
    const dl = link.querySelector('dl');
    let textCell;
    if (dl) {
      // dt = date, dd = description/title
      const dt = dl.querySelector('dt');
      const dd = dl.querySelector('dd');
      // Create a fragment for text
      const frag = document.createElement('div');
      if (dt) {
        const date = document.createElement('div');
        date.append(dt.cloneNode(true));
        frag.appendChild(date);
      }
      if (dd) {
        const desc = document.createElement('div');
        desc.append(dd.cloneNode(true));
        frag.appendChild(desc);
      }
      // Add CTA as a link at the bottom (if needed)
      // In this design, the whole card is a link, so we can add a 'Read more' link
      // that points to the same href, but only if the link has an href
      if (link.href) {
        const cta = document.createElement('div');
        const ctaLink = document.createElement('a');
        ctaLink.href = link.href;
        ctaLink.textContent = 'Read more';
        cta.appendChild(ctaLink);
        frag.appendChild(cta);
      }
      textCell = frag;
    } else {
      textCell = '';
    }

    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
