/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content column
  const mainColumn = element.querySelector('.str-column-main');
  if (!mainColumn) return;

  // Always start with the required header row
  const rows = [];
  rows.push(['Table (bordered, tableBordered52)']);

  // Helper: extract content from a node, preserving <br>, <img>, and <a>
  function extractContent(node) {
    if (!node) return '';
    if (node.nodeType === 3) return node.textContent; // text node
    if (node.tagName === 'BR') return '\n';
    if (node.tagName === 'IMG') {
      const img = document.createElement('img');
      img.src = node.src;
      img.alt = node.alt || '';
      return img;
    }
    if (node.tagName === 'A') {
      const a = document.createElement('a');
      a.href = node.href || '';
      a.innerHTML = '';
      node.childNodes.forEach(child => {
        const content = extractContent(child);
        if (typeof content === 'string') {
          a.innerHTML += content;
        } else if (content instanceof HTMLElement) {
          a.appendChild(content);
        }
      });
      return a;
    }
    // For other elements, recursively extract children
    let out = [];
    node.childNodes.forEach(child => {
      const content = extractContent(child);
      if (typeof content === 'string') {
        out.push(content);
      } else if (content instanceof HTMLElement) {
        out.push(content);
      }
    });
    // If only one element and it's an HTMLElement, return it directly
    if (out.length === 1 && out[0] instanceof HTMLElement) {
      return out[0];
    }
    // Otherwise, join strings and ignore HTMLElements' outerHTML
    return out.map(item => {
      if (typeof item === 'string') return item;
      if (item instanceof HTMLElement) return item.outerHTML;
      return '';
    }).join('').trim();
  }

  // Find all .str-outer-full > .str-inner in order
  const blocks = Array.from(mainColumn.querySelectorAll('.str-outer-full > .str-inner'));
  blocks.forEach(block => {
    // Section headings
    const h2 = block.querySelector('h2');
    const h3 = block.querySelector('h3');
    if (h2) rows.push([extractContent(h2)]);
    if (h3) rows.push([extractContent(h3)]);
    // Paragraphs (include all, not just first)
    block.querySelectorAll('p').forEach(p => {
      rows.push([extractContent(p)]);
    });
    // Tables
    const table = block.querySelector('.mod-tbl > table');
    if (table) {
      Array.from(table.querySelectorAll('tr')).forEach(tr => {
        // Get all th and td, including those with colspan
        const ths = Array.from(tr.querySelectorAll('th'));
        const tds = Array.from(tr.querySelectorAll('td'));
        // If th and td, treat as label/value row
        if (ths.length && tds.length) {
          const label = extractContent(ths[0]);
          // If td has colspan, include all tds
          const value = tds.map(td => extractContent(td));
          rows.push([label, ...value]);
        } else if (!ths.length && tds.length) {
          rows.push(tds.map(td => extractContent(td)));
        }
      });
    }
  });

  // Insert the block table
  const tableBlock = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(tableBlock);
}
