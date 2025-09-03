/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all immediate children of a given element
  function getImmediateChildren(el, selector = ':scope > *') {
    return Array.from(el.querySelectorAll(selector));
  }

  // Find the left navigation column
  const leftCol = element.querySelector('.ls-col.str-column-side');
  // Find the main content column
  const mainCol = element.querySelector('.ls-row.str-column-main');

  // Defensive: If either column is missing, abort
  if (!leftCol || !mainCol) return;

  // --- LEFT COLUMN CONTENT ---
  // We'll include the entire nav-local block as the left cell
  // This includes the menu button, title, and navigation links
  const leftContent = leftCol;

  // --- MAIN COLUMN CONTENT ---
  // We'll build up the main column content in order
  const mainContentParts = [];

  // 1. Top image (figure)
  const topFigure = mainCol.querySelector('figure.mod-media.align-left');
  if (topFigure) mainContentParts.push(topFigure);

  // 2. "The importance of Universal Design." heading and paragraph
  const impHeading = Array.from(mainCol.querySelectorAll('h2.mod-hdg-l2-02')).find(h2 => h2.textContent.trim().includes('importance of Universal Design'));
  if (impHeading) mainContentParts.push(impHeading);
  const impPara = Array.from(mainCol.querySelectorAll('p')).find(p => p.textContent.trim().startsWith('Universal Design (UD) makes products'));
  if (impPara) mainContentParts.push(impPara);

  // 3. "NECʼ s Universal Design" heading and paragraph
  const necHeading = Array.from(mainCol.querySelectorAll('h2.mod-hdg-l2-02')).find(h2 => h2.textContent.trim().includes('NECʼ s Universal Design'));
  if (necHeading) mainContentParts.push(necHeading);
  const necPara = Array.from(mainCol.querySelectorAll('p')).find(p => p.textContent.trim().startsWith('NEC is always deeply committed'));
  if (necPara) mainContentParts.push(necPara);

  // 4. History image and caption
  const historyFigure = Array.from(mainCol.querySelectorAll('figure.mod-media.align-center')).find(fig => fig.querySelector('img[alt*="history"]'));
  if (historyFigure) mainContentParts.push(historyFigure);

  // 5. PDF link (as link)
  const pdfLinkLi = mainCol.querySelector('.mod-link.of-list ul.list li');
  if (pdfLinkLi) mainContentParts.push(pdfLinkLi);

  // 6. "UD for urban developments" heading and paragraph
  const udHeading = Array.from(mainCol.querySelectorAll('h2.mod-hdg-l2-02')).find(h2 => h2.textContent.trim().includes('UD for urban developments'));
  if (udHeading) mainContentParts.push(udHeading);
  const udPara = Array.from(mainCol.querySelectorAll('p')).find(p => p.textContent.trim().startsWith('NECʼ s UD for urban developments brings'));
  if (udPara) mainContentParts.push(udPara);

  // 7. Two-column panels (Real-time analysis, Operation center solution)
  const firstPanel = Array.from(mainCol.querySelectorAll('.mod-pnl-02[data-col="2"]')).find(panel => panel.previousElementSibling && panel.previousElementSibling.textContent.includes('UD for urban developments'));
  if (firstPanel) {
    // Each .col contains a .pnl
    const cols = Array.from(firstPanel.querySelectorAll('.col'));
    cols.forEach(col => {
      mainContentParts.push(col);
    });
  }

  // 8. Urban developments image
  const urbanFigure = Array.from(mainCol.querySelectorAll('figure.mod-media.align-center')).find(fig => fig.querySelector('img[alt*="urban developments"]'));
  if (urbanFigure) mainContentParts.push(urbanFigure);

  // 9. Second two-column panel (Appropriate dissemination, Grasp the state)
  const panels = Array.from(mainCol.querySelectorAll('.mod-pnl-02[data-col="2"]'));
  if (panels.length > 1) {
    const secondPanel = panels[1];
    const cols = Array.from(secondPanel.querySelectorAll('.col'));
    cols.forEach(col => {
      mainContentParts.push(col);
    });
  }

  // --- TABLE STRUCTURE ---
  // Header row
  const headerRow = ['Columns block (columns68)'];

  // Second row: left column (nav), right column (main content)
  const secondRow = [leftContent, mainContentParts];

  // Create table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
