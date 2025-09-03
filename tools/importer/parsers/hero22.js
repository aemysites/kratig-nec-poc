/* global WebImporter */
export default function parse(element, { document }) {
  // Get background image from .bg.image img.pc (prefer desktop version)
  let bgImg = null;
  const bgDiv = element.querySelector('.bg.image');
  if (bgDiv) {
    bgImg = bgDiv.querySelector('img.pc') || bgDiv.querySelector('img');
  }

  // Get video poster image (should be background image, not in content row)
  let videoPosterImg = null;
  const videoContainer = element.querySelector('.nic-container.nic-video');
  if (videoContainer) {
    const videoEl = videoContainer.querySelector('video');
    let posterUrl = videoEl && videoEl.getAttribute('poster');
    if (!posterUrl) {
      const posterDiv = videoContainer.querySelector('.vjs-poster');
      if (posterDiv) {
        const bgStyle = posterDiv.style.backgroundImage;
        const match = bgStyle && bgStyle.match(/url\(["']?(.*?)["']?\)/);
        if (match && match[1]) {
          posterUrl = match[1];
        }
      }
    }
    if (posterUrl) {
      videoPosterImg = document.createElement('img');
      videoPosterImg.src = posterUrl;
      videoPosterImg.alt = 'Video poster';
      videoPosterImg.style.maxWidth = '100%';
    }
  }

  // If video poster found, use it as background image (prefer over .bg.image)
  let bgCell = videoPosterImg || bgImg || '';

  // Get headline and paragraph from content (be less specific to ensure all text is included)
  let contentCellItems = [];
  const contentBlock = element.querySelector('.nic-container .inner .content');
  if (contentBlock) {
    // Get all headings and paragraphs inside content block
    const nodes = contentBlock.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    nodes.forEach(node => {
      contentCellItems.push(node);
    });
  }

  // Table rows
  const headerRow = ['Hero (hero22)'];
  const rows = [
    headerRow,
    [bgCell],
    [contentCellItems.length > 0 ? contentCellItems : ''],
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
