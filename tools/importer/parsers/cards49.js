/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a mod-media-lyt-flt block
  function extractCard(modMediaLytFlt) {
    // Get image (first img inside .media)
    const mediaDiv = modMediaLytFlt.querySelector('.media');
    let imageEl = null;
    if (mediaDiv) {
      imageEl = mediaDiv.querySelector('img');
    }
    // Get card title (previous h3)
    let titleEl = null;
    let prev = modMediaLytFlt;
    while (prev && (!titleEl)) {
      prev = prev.previousElementSibling;
      if (prev && prev.querySelector && prev.classList.contains('str-inner')) {
        const h3 = prev.querySelector('h3');
        if (h3) {
          titleEl = h3;
        }
      }
    }
    // Get description (all content inside .content)
    const contentDiv = modMediaLytFlt.querySelector('.content');
    let descEls = [];
    if (contentDiv) {
      // Push all children (not just <p>) to capture all text
      descEls = Array.from(contentDiv.childNodes).filter(node => {
        // Only include element nodes and text nodes with non-empty text
        return (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim()));
      });
    }
    // Get CTA (next .mod-link ul.list li a)
    let ctaEl = null;
    let next = modMediaLytFlt.parentElement.parentElement.nextElementSibling;
    if (next && next.querySelector) {
      const linkDiv = next.querySelector('.mod-link ul.list li a');
      if (linkDiv) {
        ctaEl = linkDiv;
      }
    }
    // Compose text cell
    const textCell = [];
    if (titleEl) textCell.push(titleEl);
    if (descEls.length) textCell.push(...descEls);
    if (ctaEl) textCell.push(ctaEl);
    return [imageEl, textCell];
  }

  // Find all card blocks
  const cardBlocks = Array.from(element.querySelectorAll('.mod-media-lyt-flt'));
  const rows = cardBlocks.map(extractCard);

  // Table header
  const headerRow = ['Cards (cards49)'];
  const cells = [headerRow, ...rows];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
