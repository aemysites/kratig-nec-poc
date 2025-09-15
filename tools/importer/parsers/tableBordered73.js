/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Table (bordered, tableBordered73)'];

  // Find the customer profile section
  const profileSection = element.querySelector('.str-inner:has(.mod-tbl)');
  let rows = [headerRow];

  if (profileSection) {
    // Get the profile heading and subheading
    const heading = profileSection.querySelector('h2, h3');
    const subheading = profileSection.querySelector('h3 + div, h2 + div');
    let profileName = '';
    if (heading) {
      profileName = heading.textContent.trim();
    }
    if (profileName) {
      rows.push([profileName]);
    }

    // Parse the table rows into cells
    const profileTable = profileSection.querySelector('.mod-tbl table');
    if (profileTable) {
      const tableRows = Array.from(profileTable.querySelectorAll('tbody > tr'));
      for (const tr of tableRows) {
        const cells = [];
        const th = tr.querySelector('th');
        const td = tr.querySelector('td');
        if (th && td) {
          // For the URL row, extract the link
          if (th.textContent.trim().toLowerCase() === 'url') {
            const a = td.querySelector('a');
            if (a) {
              cells.push('URL');
              cells.push(a.href);
            } else {
              cells.push(th.textContent.trim());
              cells.push(td.textContent.trim());
            }
          } else {
            cells.push(th.textContent.trim());
            cells.push(td.textContent.trim());
          }
        }
        if (cells.length) rows.push(cells);
      }
    }
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new block table
  element.replaceWith(block);
}
