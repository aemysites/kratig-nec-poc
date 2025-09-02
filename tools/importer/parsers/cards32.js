/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> inside the block
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Table header row
  const headerRow = ['Cards (cards32)'];
  const rows = [headerRow];

  // Each <li> is a card
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Image cell: find <img> inside <picture> inside .image
    let imageCell = null;
    const imageDiv = li.querySelector(':scope > a > .image');
    if (imageDiv) {
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      }
    }

    // Text cell: contains description and CTA link
    const textCellContent = [];
    // Description: <div class="text"><p>...</p></div>
    const textDiv = li.querySelector(':scope > a > .text');
    if (textDiv) {
      const p = textDiv.querySelector('p');
      if (p) {
        textCellContent.push(p);
      }
    }
    // CTA link: <div class="link"><span><a ...></a></span></div>
    const linkDiv = li.querySelector(':scope > .link');
    if (linkDiv) {
      const link = linkDiv.querySelector('a');
      if (link) {
        textCellContent.push(link);
      }
    }

    // Defensive: fallback to empty cell if missing
    rows.push([
      imageCell || document.createElement('div'),
      textCellContent.length ? textCellContent : document.createElement('div'),
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
