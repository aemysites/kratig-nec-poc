/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as per block guidelines
  const headerRow = ['Hero (hero45)'];

  // Row 2: Background image (none in this HTML)
  const imageRow = ['']; // No image present

  // Row 3: Content: Heading, Subheading, CTA
  // Find the main content container
  let contentEls = [];

  // Find the h2, subheading p, and CTA link
  // The structure is:
  // <div class="title-c2">
  //   <div class="h2default">
  //     <h2>...</h2>
  //     <p class="lead">...</p>
  //   </div>
  //   <div class="link">
  //     <a ...>...</a>
  //   </div>
  // </div>

  // Get h2 and p.lead
  const h2default = element.querySelector('.h2default');
  if (h2default) {
    const h2 = h2default.querySelector('h2');
    if (h2) contentEls.push(h2);
    const lead = h2default.querySelector('p.lead');
    if (lead) contentEls.push(lead);
  }

  // Get CTA link
  const linkDiv = element.querySelector('.link');
  if (linkDiv) {
    const cta = linkDiv.querySelector('a');
    if (cta) contentEls.push(cta);
  }

  // Compose the content row
  const contentRow = [contentEls];

  // Build the table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
