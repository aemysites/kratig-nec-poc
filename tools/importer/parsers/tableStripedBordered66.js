/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all main content columns
  const mainCol = element.querySelector('.ls-row.str-column-main');
  if (!mainCol) return;

  // Find all .str-outer > .str-inner blocks in main column
  const inners = Array.from(mainCol.querySelectorAll('.str-outer > .str-inner'));

  // We'll collect all relevant content in order
  const contentBlocks = [];

  // 1. Main heading (h1)
  const mainHeading = inners.find(inner => inner.querySelector('h1'));
  if (mainHeading) {
    contentBlocks.push(mainHeading);
  }

  // 2. Top buttons (Contact, Request Evaluation)
  const btnContact = inners.find(inner => inner.querySelector('.mod-btn.of-contact'));
  const btnEval = inners.find(inner => inner.querySelector('.mod-btn.align-right:not(.of-contact)'));
  if (btnContact || btnEval) {
    const btns = [];
    if (btnContact) btns.push(btnContact);
    if (btnEval) btns.push(btnEval);
    contentBlocks.push(btns);
  }

  // 3. 产品系列 section
  const prodSeriesHeading = inners.find(inner => inner.querySelector('h2.mod-hdg-l2-02 span') && inner.textContent.includes('产品系列'));
  if (prodSeriesHeading) {
    contentBlocks.push(prodSeriesHeading);
  }
  // Table for 产品系列
  const prodSeriesTable = inners.find(inner => inner.querySelector('.mod-tbl table') && inner.textContent.includes('Products/ Options'));
  if (prodSeriesTable) {
    contentBlocks.push(prodSeriesTable);
  }
  // Notice list under 产品系列
  const prodSeriesNotice = inners.find(inner => inner.querySelector('.mod-list-02.of-notice'));
  if (prodSeriesNotice) {
    contentBlocks.push(prodSeriesNotice);
  }

  // 4. 运行环境 section
  const envHeading = inners.find(inner => inner.querySelector('h2.mod-hdg-l2-02 span') && inner.textContent.includes('运行环境'));
  if (envHeading) {
    contentBlocks.push(envHeading);
  }
  // Table for 运行环境
  const envTable = inners.find(inner => inner.querySelector('.mod-tbl table') && inner.textContent.includes('Supported Platform'));
  if (envTable) {
    contentBlocks.push(envTable);
  }

  // 5. PCB Layout CAD 工具接口 section
  const cadHeading = inners.find(inner => inner.querySelector('h2.mod-hdg-l2-02 span') && inner.textContent.includes('PCB Layout CAD'));
  if (cadHeading) {
    contentBlocks.push(cadHeading);
  }
  // Table for CAD
  const cadTable = inners.find(inner => inner.querySelector('.mod-tbl table') && inner.textContent.includes('Supported Layout CAD'));
  if (cadTable) {
    contentBlocks.push(cadTable);
  }
  // Paragraph under CAD table
  const cadPara = inners.find(inner => inner.querySelector('p.align-left'));
  if (cadPara) {
    contentBlocks.push(cadPara);
  }

  // 6. Bottom buttons (Contact NEC, Request Evaluation)
  const btnList = inners.find(inner => inner.querySelector('.mod-btn-list'));
  if (btnList) {
    contentBlocks.push(btnList);
  }

  // Compose table rows
  const headerRow = ['Table (striped, bordered, tableStripedBordered66)'];
  const rows = [headerRow];

  // Each block is a single cell in its row
  contentBlocks.forEach(block => {
    // If block is an array (multiple buttons), flatten into one cell
    if (Array.isArray(block)) {
      rows.push([block]);
    } else {
      rows.push([block]);
    }
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
