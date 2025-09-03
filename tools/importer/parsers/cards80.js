/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main column containing the cards
  const mainCol = element.querySelector('.str-column-main');
  if (!mainCol) return;

  // Find all .str-outer direct children (each is a card part)
  const outers = Array.from(mainCol.querySelectorAll(':scope > .str-outer'));

  // Prepare rows for the table
  const headerRow = ['Cards (cards80)'];
  const rows = [headerRow];

  // We'll process in pairs: [heading, image], except for the last card
  let i = 0;
  while (i < outers.length) {
    const inner = outers[i].querySelector(':scope > .str-inner');
    const h2 = inner && inner.querySelector('h2');
    if (h2) {
      // Check if next block is an image (figure)
      const nextOuter = outers[i + 1];
      let imageFigure = null;
      if (nextOuter) {
        const nextInner = nextOuter.querySelector(':scope > .str-inner');
        imageFigure = nextInner && nextInner.querySelector('figure');
      }
      if (imageFigure) {
        // Card with image and heading only
        // 1st cell: image
        // 2nd cell: heading (as is)
        rows.push([
          imageFigure,
          h2
        ]);
        i += 2;
        continue;
      } else {
        // This is the last card (Design inquiries): heading + description + CTA
        // Next outers: description (p), then CTA (mod-btn-list)
        let desc = null;
        let cta = null;
        if (outers[i + 1]) {
          const descInner = outers[i + 1].querySelector(':scope > .str-inner');
          desc = descInner && descInner.querySelector('p');
        }
        if (outers[i + 2]) {
          const ctaInner = outers[i + 2].querySelector(':scope > .str-inner');
          cta = ctaInner && ctaInner.querySelector('.mod-btn-list');
        }
        // Compose the text cell: heading + description + CTA (if present)
        const textCell = document.createElement('div');
        textCell.appendChild(h2.cloneNode(true));
        if (desc) textCell.appendChild(desc.cloneNode(true));
        if (cta) textCell.appendChild(cta.cloneNode(true));
        // No image for this card, so skip if image is mandatory
        // For cards80, image is mandatory, so do not add this card
        break;
      }
    }
    i++;
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
