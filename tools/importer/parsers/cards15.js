/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the list of cards
  const list = element.querySelector('.oi-future-list ul');
  if (!list) return;

  // Prepare header row
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];

  // For each card (li)
  list.querySelectorAll(':scope > li').forEach((li) => {
    // --- IMAGE CELL ---
    // Find the image (first <img> inside .thumb)
    let imageCell = null;
    const thumb = li.querySelector('.thumb');
    if (thumb) {
      // Use the picture element directly if present
      const picture = thumb.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        // fallback: use the thumb div
        imageCell = thumb;
      }
    }

    // --- TEXT CELL ---
    // Compose text content: date, title, description, CTA
    const textContent = document.createElement('div');
    // Date, title, description from <dl>
    const dl = li.querySelector('dl');
    if (dl) {
      // Date (dt)
      const dt = dl.querySelector('dt');
      if (dt) {
        const dateP = document.createElement('div');
        dateP.textContent = dt.textContent;
        dateP.style.fontSize = '0.95em';
        textContent.appendChild(dateP);
      }
      // Title (first dd)
      const dds = dl.querySelectorAll('dd');
      if (dds.length > 0) {
        const title = document.createElement('strong');
        title.textContent = dds[0].textContent;
        textContent.appendChild(title);
      }
      // Description (second dd)
      if (dds.length > 1) {
        const desc = document.createElement('div');
        desc.textContent = dds[1].textContent;
        textContent.appendChild(desc);
      }
    }
    // CTA: find the .link a.site
    const cta = li.querySelector('.link a.site');
    if (cta) {
      // Place CTA at the bottom
      const ctaDiv = document.createElement('div');
      ctaDiv.appendChild(cta);
      textContent.appendChild(ctaDiv);
    }

    // Add row: [image, textContent]
    rows.push([imageCell, textContent]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
