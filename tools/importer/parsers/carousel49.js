/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract slide info from mod-media-lyt-flt blocks
  function extractSlide(modMediaLytFlt) {
    // Get image (first img in .media)
    const img = modMediaLytFlt.querySelector('.media img');
    // Get text content (all children of .content)
    const contentDiv = modMediaLytFlt.querySelector('.content');
    let textContent = [];
    if (contentDiv) {
      // Instead of just direct children, grab all content (including text nodes)
      // and preserve structure (e.g., paragraphs, line breaks)
      textContent = Array.from(contentDiv.childNodes).filter(node => {
        // Only include elements and text nodes with non-whitespace
        if (node.nodeType === 1) return true;
        if (node.nodeType === 3 && node.textContent.trim()) return true;
        return false;
      });
      // If nothing found, fallback to textContent
      if (textContent.length === 0 && contentDiv.textContent.trim()) {
        textContent = [document.createTextNode(contentDiv.textContent.trim())];
      }
    }
    return [img, textContent];
  }

  // Find all slide blocks in the element
  const slides = [];
  // Defensive: select all .mod-media-lyt-flt blocks at any depth
  const modMediaLytFlts = element.querySelectorAll('.mod-media-lyt-flt');
  modMediaLytFlts.forEach(modMediaLytFlt => {
    const [img, textContent] = extractSlide(modMediaLytFlt);
    if (!img) return;
    // Try to find a heading before this block (h3)
    let heading = null;
    let prev = modMediaLytFlt.previousElementSibling;
    while (prev && !heading) {
      if (prev.matches('div') && prev.querySelector('h3')) {
        heading = prev.querySelector('h3');
        break;
      }
      prev = prev.previousElementSibling;
    }
    // Compose text cell: heading (if found), then textContent
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (textContent.length) cellContent.push(...textContent);
    // Try to find a CTA link after this block (mod-link ul.list li a)
    let cta = null;
    let next = modMediaLytFlt.nextElementSibling;
    while (next && !cta) {
      if (next.classList && next.classList.contains('mod-link')) {
        const link = next.querySelector('ul.list li a');
        if (link) cta = link;
        break;
      }
      next = next.nextElementSibling;
    }
    if (cta) cellContent.push(cta);
    // Add slide row: [image, cellContent]
    slides.push([img, cellContent]);
  });

  // Table header
  const headerRow = ['Carousel (carousel49)'];
  const cells = [headerRow, ...slides];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
