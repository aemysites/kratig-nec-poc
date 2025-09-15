/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each <li>
  function extractCard(li) {
    // Image cell: find the <img> inside <div class="image">
    const imageDiv = li.querySelector('.image');
    let imageEl = null;
    if (imageDiv) {
      imageEl = imageDiv.querySelector('img');
    }

    // Text cell: description and CTA
    // Description is in <div class="text"><p>...</p></div>
    const textDiv = li.querySelector('.text');
    let description = null;
    if (textDiv) {
      description = textDiv.querySelector('p');
    }

    // CTA: The <div class="link"> contains a <a> (company name)
    const linkDiv = li.querySelector('.link');
    let cta = null;
    if (linkDiv) {
      cta = linkDiv.querySelector('a');
    }

    // Compose text cell: description + CTA (if present)
    const textCellContent = [];
    if (description) textCellContent.push(description);
    if (cta) {
      // Place CTA in a <div> for spacing if both present
      const ctaDiv = document.createElement('div');
      ctaDiv.appendChild(cta);
      textCellContent.push(ctaDiv);
    }

    return [imageEl, textCellContent];
  }

  // Find all <li> cards
  const ul = element.querySelector('ul');
  const lis = ul ? Array.from(ul.children) : [];

  // Build table rows
  const rows = [];
  // Header row as specified
  rows.push(['Cards (cards32)']);

  lis.forEach(li => {
    rows.push(extractCard(li));
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
