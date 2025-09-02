/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the list of cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Table header row
  const headerRow = ['Cards (cards88)'];
  const rows = [headerRow];

  // Each <li> is a card
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // --- IMAGE CELL ---
    // Find the image (inside <picture> within <div class="thumb">)
    let imgEl = null;
    const thumbDiv = li.querySelector('.thumb');
    if (thumbDiv) {
      const picture = thumbDiv.querySelector('picture');
      if (picture) {
        // Use the <img> element directly
        imgEl = picture.querySelector('img');
      }
    }

    // --- TEXT CELL ---
    // Title: <dt> inside <dl>
    let titleText = '';
    const dl = li.querySelector('dl');
    if (dl) {
      const dt = dl.querySelector('dt');
      if (dt) {
        titleText = dt.textContent.trim();
      }
    }

    // CTA link: <div class="category"> <a>
    let ctaLink = null;
    const categoryDiv = li.querySelector('.category');
    if (categoryDiv) {
      const link = categoryDiv.querySelector('a');
      if (link) {
        ctaLink = link;
      }
    }

    // Build the text cell
    const textCellContent = [];
    if (titleText) {
      // Title as heading (use <strong> for semantic heading)
      const heading = document.createElement('strong');
      heading.textContent = titleText;
      textCellContent.push(heading);
    }
    if (ctaLink) {
      // Add a line break between title and link
      if (textCellContent.length > 0) {
        textCellContent.push(document.createElement('br'));
      }
      textCellContent.push(ctaLink);
    }

    // Defensive: If no image or text, skip
    if (!imgEl && textCellContent.length === 0) return;

    rows.push([
      imgEl || '',
      textCellContent.length === 1 ? textCellContent[0] : textCellContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
