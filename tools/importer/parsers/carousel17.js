/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find all direct slides (list-item)
  const slides = Array.from(element.querySelectorAll('.slick-track > .list-item'));
  const cells = [];
  // Header row as required
  cells.push(['Carousel (carousel17)']);

  slides.forEach((slide) => {
    // --- IMAGE CELL ---
    // Find the image inside the slide
    let imgEl = null;
    const thumb = slide.querySelector('.thumb');
    if (thumb) {
      imgEl = thumb.querySelector('img');
    }
    // Defensive: If no image, skip this slide
    if (!imgEl) return;

    // --- TEXT CELL ---
    // Compose the text cell
    const textCellContent = [];
    // Label (category) as heading
    const label = slide.querySelector('.label .text');
    if (label) {
      const labelHeading = document.createElement('div');
      labelHeading.style.fontWeight = 'bold';
      labelHeading.style.background = '#0033a0';
      labelHeading.style.color = '#fff';
      labelHeading.style.display = 'inline-block';
      labelHeading.style.padding = '2px 8px';
      labelHeading.style.marginBottom = '8px';
      labelHeading.textContent = label.textContent;
      textCellContent.push(labelHeading);
    }
    // Title (heading)
    const heading = slide.querySelector('.detail .heading');
    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      h2.style.fontSize = '1.1em';
      h2.style.margin = '8px 0 4px 0';
      textCellContent.push(h2);
    }
    // Description
    const desc = slide.querySelector('.detail .text');
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent;
      textCellContent.push(p);
    }
    // Call-to-action (link)
    const link = slide.querySelector('a.inner');
    if (link && link.href) {
      // Only add if link has an href and is not just wrapping the slide
      // Use the heading as link text if available, else fallback
      let linkText = '';
      if (heading) {
        linkText = heading.textContent;
      } else if (label) {
        linkText = label.textContent;
      } else {
        linkText = link.href;
      }
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = linkText;
      a.style.display = 'block';
      a.style.marginTop = '10px';
      textCellContent.push(a);
    }
    // Add row: [image, text cell]
    cells.push([
      imgEl,
      textCellContent
    ]);
  });

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
