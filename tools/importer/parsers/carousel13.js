/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel track
  const track = element.querySelector('.slick-track');
  if (!track) return;

  // Get all slides (skip slick-cloned)
  const slides = Array.from(track.children).filter(slide => {
    return slide.classList.contains('slide') && !slide.classList.contains('slick-cloned');
  });

  // Table header
  const headerRow = ['Carousel (carousel13)'];
  const rows = [headerRow];

  slides.forEach(slide => {
    // Defensive: Find the content wrapper
    const content = slide.querySelector('.slide-content .inner, .slide-content');
    if (!content) return;

    // There are NO images in the HTML. To meet block requirements, insert a placeholder image in the first cell.
    const img = document.createElement('img');
    img.src = 'https://dummyimage.com/750x584/cccccc/000000&text=Image';
    img.alt = '';
    const leftCell = img;

    // Find date
    let date = content.querySelector('dt.date .inner');
    let dateText = date ? date.textContent.trim() : '';
    // Find link and description
    let desc = content.querySelector('dd.desc .inner');
    let link = desc ? desc.querySelector('a') : null;
    let linkText = link ? link.textContent.trim() : '';
    let linkHref = link ? link.getAttribute('href') : '';

    // Build right cell: include all text content from the source html
    const rightCell = [];
    // Add date as plain text at the top
    if (dateText) {
      const dateEl = document.createElement('div');
      dateEl.textContent = dateText;
      rightCell.push(dateEl);
    }
    // Add link (with text) as the main content
    if (link && linkText) {
      const linkEl = document.createElement('a');
      linkEl.href = linkHref;
      linkEl.textContent = linkText;
      rightCell.push(linkEl);
    }
    // Also add any additional text nodes inside desc that aren't part of the link
    if (desc) {
      Array.from(desc.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          const extra = document.createElement('div');
          extra.textContent = node.textContent.trim();
          rightCell.push(extra);
        }
      });
    }

    rows.push([leftCell, rightCell]);
  });

  // Create table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
