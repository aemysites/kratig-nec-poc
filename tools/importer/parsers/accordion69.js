/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all immediate child divs
  const topDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Find the main content column (str-column-main)
  const mainCol = topDivs.find(div => div.classList.contains('str-column-main'));
  if (!mainCol) return;

  // Get all .str-outer > .str-inner blocks inside mainCol
  const sections = Array.from(mainCol.querySelectorAll('.str-outer > .str-inner'));

  // Prepare accordion rows
  const rows = [];

  // Header row
  rows.push(['Accordion (accordion69)']);

  // We'll iterate through sections, pairing each h2 with its following content
  let i = 0;
  while (i < sections.length) {
    const sec = sections[i];
    // If section contains h2, it's an accordion title
    const h2 = sec.querySelector('h2');
    if (h2) {
      // Title cell: use h2
      const titleCell = h2;
      // Content cell: gather all following sections until next h2 or end
      const contentEls = [];
      let j = i + 1;
      while (j < sections.length && !sections[j].querySelector('h2')) {
        // For media blocks, include both text and images
        const mediaBlock = sections[j].querySelector('.mod-media-lyt-lqd, .mod-media');
        if (mediaBlock) {
          // If media layout, include both .content and .media
          const content = mediaBlock.querySelector('.content');
          if (content) contentEls.push(content);
          const media = mediaBlock.querySelector('.media, figure');
          if (media) contentEls.push(media);
        } else {
          // Otherwise, include the whole section
          // Remove <hr> elements unless followed by Section Metadata
          const hr = sections[j].querySelector('hr');
          if (hr) {
            // Only include <hr> if followed by Section Metadata (not present here)
            // So skip this section
            j++;
            continue;
          }
          contentEls.push(sections[j]);
        }
        j++;
      }
      // Defensive: if no content, skip row
      if (contentEls.length === 0) {
        // Sometimes the next section is just a <p>, include it
        if (sections[i+1] && sections[i+1].querySelector('p')) {
          contentEls.push(sections[i+1]);
          j = i + 2;
        }
      }
      rows.push([titleCell, contentEls.length === 1 ? contentEls[0] : contentEls]);
      i = j;
    } else {
      i++;
    }
  }

  // Replace original element with block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
