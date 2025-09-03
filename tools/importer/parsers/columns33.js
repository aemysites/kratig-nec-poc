/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a link for video iframes or video tags
  function createVideoLink(videoEl) {
    let src = videoEl.getAttribute('src');
    if (!src || src.startsWith('blob:')) {
      const poster = videoEl.getAttribute('poster') || videoEl.parentElement?.getAttribute('poster');
      const dataId = videoEl.getAttribute('data-video-id') || videoEl.parentElement?.getAttribute('data-video-id');
      if (dataId) {
        src = `https://players.brightcove.net/4598493582001/default_default/index.html?videoId=${dataId}`;
      } else if (poster) {
        src = poster;
      } else {
        src = '';
      }
    }
    if (src) {
      const a = document.createElement('a');
      a.href = src;
      a.textContent = 'Video';
      a.target = '_blank';
      return a;
    }
    return null;
  }

  // Get the two main columns: left nav and right content
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (columns.length < 2) return;
  const leftCol = columns[0];
  const rightCol = columns[1];

  // LEFT COLUMN: keep the whole nav block as is
  // RIGHT COLUMN: assemble all main content blocks
  const rightContent = [];
  // Get all direct children of rightCol
  const rightRows = Array.from(rightCol.children);
  for (const row of rightRows) {
    // Only add non-empty rows
    if (row.textContent.trim() || row.querySelector('img,video,figure')) {
      // For video blocks, replace with a link
      const videoFigure = row.querySelector('figure.mod-media-video');
      if (videoFigure) {
        const videoEl = videoFigure.querySelector('video');
        if (videoEl) {
          const link = createVideoLink(videoEl);
          if (link) {
            rightContent.push(link);
            continue;
          }
        }
      }
      // Instead of pushing the row element, push its full HTML content as a fragment
      const frag = document.createDocumentFragment();
      Array.from(row.childNodes).forEach(node => {
        frag.appendChild(node.cloneNode(true));
      });
      rightContent.push(frag);
    }
  }

  // Compose the table rows
  const headerRow = ['Columns block (columns33)'];
  const contentRow = [leftCol, rightContent];
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
