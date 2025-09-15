/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find inner content and background image container
  const inner = element.querySelector('.inner');
  const bg = element.querySelector('.bg');

  // Header row
  const headerRow = ['Hero (hero57)'];

  // Row 2: Background image (optional)
  let bgImg = '';
  if (bg) {
    // Prefer desktop image if available, else fallback to first image
    const pcImg = bg.querySelector('img.pc');
    const firstImg = bg.querySelector('img');
    bgImg = pcImg || firstImg || '';
  }
  const bgRow = [bgImg];

  // Row 3: Content (title, subheading, CTA)
  const content = [];
  if (inner) {
    // Title (h2 with image alt text)
    const h2 = inner.querySelector('h2');
    if (h2) {
      const img = h2.querySelector('img');
      if (img && img.alt) {
        const heading = document.createElement('h1');
        heading.textContent = img.alt;
        content.push(heading);
      }
    }
    // Subheading (p.text)
    const subheading = inner.querySelector('p.text');
    if (subheading) {
      // Use textContent to ensure only text is included
      const subheadingText = document.createElement('p');
      subheadingText.textContent = subheading.textContent;
      content.push(subheadingText);
    }
    // CTA buttons (all links in .button)
    const buttonDiv = inner.querySelector('.button');
    if (buttonDiv) {
      // Instead of copying elements, extract text and href for each link
      buttonDiv.querySelectorAll('a').forEach(link => {
        const cta = document.createElement('a');
        cta.href = link.href;
        cta.textContent = link.textContent;
        content.push(cta);
      });
    }
  }
  // Ensure all text content is included in the cell
  const contentRow = [content.length ? content : ''];

  // Compose table
  const cells = [
    headerRow,
    bgRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
