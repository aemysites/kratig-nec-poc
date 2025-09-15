/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main content and background image containers
  const inner = element.querySelector('.inner');
  const bg = element.querySelector('.bg');

  // --- Background Image Row ---
  // Prefer the desktop image, fallback to mobile if needed
  let bgImg = null;
  if (bg) {
    bgImg = bg.querySelector('img.pc') || bg.querySelector('img.sp') || bg.querySelector('img');
  }
  // Only include the image element if it exists
  const bgRow = [bgImg ? bgImg : ''];

  // --- Content Row ---
  // Title: h2 contains an img with alt text as the headline
  let title = null;
  if (inner) {
    const h2 = inner.querySelector('h2');
    if (h2) {
      const img = h2.querySelector('img');
      if (img && img.alt) {
        title = document.createElement('h1');
        title.textContent = img.alt;
      }
    }
  }

  // Subheading: <p class="read">
  let subheading = null;
  if (inner) {
    const pRead = inner.querySelector('p.read');
    if (pRead) {
      subheading = document.createElement('p');
      subheading.textContent = pRead.textContent;
    }
  }

  // Additional text: <p class="text">
  let extraText = null;
  if (inner) {
    const pText = inner.querySelector('p.text');
    if (pText) {
      extraText = document.createElement('p');
      extraText.textContent = pText.textContent;
    }
  }

  // CTA Button: <div class="button"> (contains <a>)
  let cta = null;
  if (inner) {
    const buttonDiv = inner.querySelector('.button');
    if (buttonDiv) {
      // Extract the link and its text
      const a = buttonDiv.querySelector('a');
      if (a) {
        cta = document.createElement('p');
        const link = document.createElement('a');
        link.href = a.href;
        link.textContent = a.textContent;
        cta.appendChild(link);
      }
    }
  }

  // Compose content cell: order as title, subheading, extra text, CTA
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  if (extraText) contentCell.push(extraText);
  if (cta) contentCell.push(cta);

  // Table rows
  const headerRow = ['Hero (hero12)'];
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
