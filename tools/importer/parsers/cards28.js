/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element is a UL containing LIs
  if (!element || element.tagName !== 'UL') return;
  const headerRow = ['Cards (cards28)'];
  const rows = [headerRow];

  // Get all LI children (cards)
  const items = Array.from(element.children).filter((el) => el.tagName === 'LI');

  items.forEach((li) => {
    // Each LI should have an A tag wrapping image and text
    const link = li.querySelector('a');
    if (!link) return; // skip if no link

    // Find image (picture or img)
    let imageEl = link.querySelector('.image');
    if (!imageEl) {
      // fallback: look for picture/img directly
      imageEl = link.querySelector('picture,img');
    }
    // Defensive: if .image contains a picture, use that
    let imgContent = null;
    if (imageEl) {
      const pic = imageEl.querySelector('picture') || imageEl.querySelector('img') || imageEl;
      imgContent = pic;
    }

    // Find text content (span)
    const textSpan = link.querySelector('span');
    let textContent = null;
    if (textSpan) {
      // Wrap in a div for semantic grouping
      const textDiv = document.createElement('div');
      textDiv.appendChild(textSpan);
      textContent = textDiv;
    }

    // Optionally, include the link as a CTA if required (not in visual, so skip)
    // Compose row: [image, text]
    rows.push([
      imgContent || '',
      textContent || '',
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
