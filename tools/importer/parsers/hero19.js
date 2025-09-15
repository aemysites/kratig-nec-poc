/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the best background image (desktop preferred)
  function getBackgroundImage() {
    // Try to find desktop image first
    const bgDiv = element.querySelector('.oiiv-banner .bg');
    if (!bgDiv) return null;
    let img = null;
    // Prefer desktop (pc) image
    const pcPicture = bgDiv.querySelector('.bg-img-pc');
    if (pcPicture) {
      img = pcPicture.querySelector('img');
    }
    // Fallback to mobile (sp) image
    if (!img) {
      const spPicture = bgDiv.querySelector('.bg-img-sp');
      if (spPicture) {
        img = spPicture.querySelector('img');
      }
    }
    return img || null;
  }

  // Helper to get the content block (title, subheading, CTA)
  function getContentBlock() {
    // The .extra div contains all text and CTA
    const extra = element.querySelector('.oiiv-banner .extra');
    if (!extra) return null;
    // We'll return the whole .extra div as a single block for resilience
    return extra;
  }

  // Build table rows
  const headerRow = ['Hero (hero19)'];
  const bgImg = getBackgroundImage();
  const contentBlock = getContentBlock();

  // Defensive: If missing, use empty placeholder
  const bgRow = [bgImg ? bgImg : ''];
  const contentRow = [contentBlock ? contentBlock : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
