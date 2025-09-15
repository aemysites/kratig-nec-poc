/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all direct children
  const children = Array.from(element.children);

  // Find the image block (picture inside .img-center-wrap)
  let imageBlock = null;
  for (const child of children) {
    if (child.classList.contains('img-center-wrap')) {
      // Use the whole wrap (contains <picture>)
      imageBlock = child;
      break;
    }
    // Defensive: sometimes the wrap may be missing, fallback to <picture>
    if (child.tagName === 'PICTURE') {
      imageBlock = child;
      break;
    }
  }

  // Find the caption (p.cap)
  let caption = null;
  for (const child of children) {
    if (child.tagName === 'P' && child.classList.contains('cap')) {
      caption = child;
      break;
    }
  }

  // Compose the column cell
  const columnCell = [];
  if (imageBlock) columnCell.push(imageBlock);
  if (caption) columnCell.push(caption);

  // Table header
  const headerRow = ['Columns block (columns62)'];
  // Table content row (single column)
  const contentRow = [columnCell];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
