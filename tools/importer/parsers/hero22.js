/* global WebImporter */
export default function parse(element, { document }) {
  // Get background image (prefer desktop)
  let bgImg = null;
  const bgDiv = element.querySelector('.bg.image');
  if (bgDiv) {
    bgImg = bgDiv.querySelector('img.pc') || bgDiv.querySelector('img');
  }

  // Get all main content (headings, paragraphs)
  const contentDiv = element.querySelector('.nic-container .inner .content');
  let contentCell = [];
  if (contentDiv) {
    // Collect all children (not just h2 and p)
    Array.from(contentDiv.children).forEach(child => {
      // If child is a wrapper, get its children
      if (child.children.length > 0) {
        Array.from(child.children).forEach(grandchild => {
          contentCell.push(grandchild);
        });
      } else {
        contentCell.push(child);
      }
    });
  }

  // Get video (Brightcove)
  const videoDiv = element.querySelector('.nic-container.nic-video');
  if (videoDiv) {
    const videoId = videoDiv.getAttribute('data-video-id');
    const accountId = videoDiv.getAttribute('data-account');
    if (videoId && accountId) {
      const videoUrl = `https://players.brightcove.net/${accountId}/default_default/index.html?videoId=${videoId}`;
      const videoLink = document.createElement('a');
      videoLink.href = videoUrl;
      videoLink.textContent = 'Watch video';
      videoLink.target = '_blank';
      videoLink.rel = 'noopener noreferrer';
      contentCell.push(document.createElement('br'));
      contentCell.push(videoLink);
    }
  }

  // Compose table
  const headerRow = ['Hero (hero22)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell.length > 0 ? contentCell : ''];
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
