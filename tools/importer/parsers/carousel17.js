/* global WebImporter */
export default function parse(element, { document }) {
  // Get all visible slides (not clones)
  const slides = Array.from(element.querySelectorAll('.slick-track > .list-item.slide'));
  if (!slides.length) return;

  // Table header as per block spec
  const headerRow = ['Carousel (carousel17)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // First cell: image only
    let imageEl = null;
    const thumb = slide.querySelector('.thumb');
    if (thumb) {
      imageEl = thumb.querySelector('img');
    }

    // Second cell: text content (title, description, CTA)
    const detail = slide.querySelector('.detail');
    const content = [];
    if (detail) {
      // Title (heading)
      const heading = detail.querySelector('.heading');
      if (heading) {
        const h2 = document.createElement('h2');
        h2.textContent = heading.textContent.trim();
        content.push(h2);
      }
      // Description
      const desc = detail.querySelector('.text');
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc.textContent.trim();
        content.push(p);
      }
    }
    // CTA: link (the <a.inner> itself)
    const ctaLink = slide.querySelector('a.inner');
    if (ctaLink && ctaLink.href) {
      // Only add CTA if link text is not already present
      let ctaText = '';
      if (detail && detail.querySelector('.heading')) {
        ctaText = detail.querySelector('.heading').textContent.trim();
      } else {
        ctaText = ctaLink.textContent.trim();
      }
      // Only add if not already present as heading
      if (ctaText && (!content.length || content[0].textContent !== ctaText)) {
        const a = document.createElement('a');
        a.href = ctaLink.href;
        a.textContent = ctaText;
        content.push(a);
      }
    }

    // Compose row: [image, text content]
    rows.push([
      imageEl,
      content.length === 1 ? content[0] : content
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
