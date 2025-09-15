/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content column (the tabs block)
  const mainCol = Array.from(element.children).find(
    el => el.classList.contains('str-column-main')
  );
  if (!mainCol) return;

  // Gather all .str-outer > .str-inner blocks in order
  const contentBlocks = Array.from(mainCol.querySelectorAll('.str-outer > .str-inner'));

  // Tab definitions: each tab is a label and a content block
  // We'll look for h2/h4 as tab labels, and group content until the next label
  const tabs = [];
  let currentLabel = null;
  let currentContent = [];

  function flushTab() {
    if (currentLabel && currentContent.length) {
      // Create a fragment for all tab content
      const frag = document.createDocumentFragment();
      currentContent.forEach(item => {
        if (Array.isArray(item)) {
          item.forEach(child => frag.appendChild(child.cloneNode(true)));
        } else {
          frag.appendChild(item.cloneNode(true));
        }
      });
      tabs.push([currentLabel.cloneNode(true), frag]);
    }
    currentLabel = null;
    currentContent = [];
  }

  for (let i = 0; i < contentBlocks.length; i++) {
    const block = contentBlocks[i];
    // Tab label candidates: h2 or h4
    const h2 = block.querySelector('h2.mod-hdg-l2-02');
    const h4 = block.querySelector('h4.mod-hdg-l4-02');
    if (h2 || h4) {
      flushTab();
      // Use the <span> inside as label if present
      const labelSpan = (h2 || h4).querySelector('span');
      currentLabel = labelSpan ? labelSpan : (h2 || h4);
      continue;
    }
    // Content blocks: paragraphs, lists, media, etc.
    // For media blocks, include both image and content
    const mediaLyt = block.querySelector('.mod-media-lyt-flt');
    if (mediaLyt) {
      // Get image and content
      const mediaImg = mediaLyt.querySelector('img');
      const mediaContent = mediaLyt.querySelector('.content');
      const mediaArr = [];
      if (mediaImg) mediaArr.push(mediaImg);
      if (mediaContent) mediaArr.push(mediaContent);
      currentContent.push(mediaArr);
      continue;
    }
    // Otherwise, add the block itself if it has content
    if (block.children.length || block.textContent.trim()) {
      // Instead of pushing the block itself, push all its children (to avoid missing text)
      if (block.children.length) {
        Array.from(block.childNodes).forEach(child => {
          // Only add elements or text nodes with content
          if (child.nodeType === 1 || (child.nodeType === 3 && child.textContent.trim())) {
            currentContent.push(child);
          }
        });
      } else {
        // If only text, create a <p> for it
        const p = document.createElement('p');
        p.textContent = block.textContent.trim();
        currentContent.push(p);
      }
    }
  }
  // Flush last tab
  flushTab();

  // Defensive: If no tabs found, fallback to all content as one tab
  if (tabs.length === 0) {
    const frag = document.createDocumentFragment();
    contentBlocks.forEach(block => {
      Array.from(block.childNodes).forEach(child => {
        if (child.nodeType === 1 || (child.nodeType === 3 && child.textContent.trim())) {
          frag.appendChild(child.cloneNode(true));
        }
      });
    });
    tabs.push(['Content', frag]);
  }

  // Table header
  const headerRow = ['Tabs (tabs98)'];
  // Table rows: each tab as [label, content]
  const tableRows = tabs.map(([label, content]) => [label, content]);
  const cells = [headerRow, ...tableRows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
