/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the banner block
  const banner = element.querySelector('.oiiv-banner');
  if (!banner) return;

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero19)'];

  // --- BACKGROUND IMAGE ROW ---
  // Try to find a background image (prefer desktop, fallback to mobile)
  let bgImg = null;
  const bgDiv = banner.querySelector('.bg');
  if (bgDiv) {
    // Prefer desktop image
    const pcPicture = bgDiv.querySelector('.bg-img-pc img');
    const spPicture = bgDiv.querySelector('.bg-img-sp img');
    bgImg = pcPicture || spPicture || null;
  }
  const bgRow = [bgImg ? bgImg : ''];

  // --- CONTENT ROW ---
  // Find the extra content (headings, paragraph, CTA)
  const extraDiv = banner.querySelector('.extra');
  let contentItems = [];
  if (extraDiv) {
    // Heading (h3)
    const heading = extraDiv.querySelector('h3');
    if (heading) contentItems.push(heading);
    // Subheading (p)
    const subheading = extraDiv.querySelector('p');
    if (subheading) contentItems.push(subheading);
    // CTA (link)
    const linkDiv = extraDiv.querySelector('.link');
    if (linkDiv) {
      const cta = linkDiv.querySelector('a');
      if (cta) contentItems.push(cta);
    }
  }
  const contentRow = [contentItems.length ? contentItems : ''];

  // --- BUILD TABLE ---
  const cells = [headerRow, bgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
