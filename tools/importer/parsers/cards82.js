/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image element from a card
  function extractImage(card) {
    // Find the <img> inside the .thumb div
    const thumb = card.querySelector('.thumb');
    if (thumb) {
      const img = thumb.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Helper to extract the text content (title, desc, categories, CTA) from a card
  function extractTextContent(card, linkHref) {
    // The <dl> contains <dt> (title) and <dd> (desc)
    const dl = card.querySelector('dl');
    let titleEl = null;
    let descEl = null;
    if (dl) {
      const dt = dl.querySelector('dt');
      if (dt) {
        titleEl = document.createElement('strong');
        titleEl.textContent = dt.textContent.trim();
      }
      const dd = dl.querySelector('dd');
      if (dd) {
        descEl = dd.cloneNode(true);
      }
    }
    // Categories are in the next sibling <ul class="category">
    let categories = [];
    let categoryUl = card.parentElement.querySelector('ul.category');
    if (categoryUl) {
      categories = Array.from(categoryUl.querySelectorAll('li')).map(li => {
        const span = document.createElement('span');
        span.textContent = li.textContent.trim();
        span.style.display = 'inline-block';
        span.style.marginRight = '4px';
        span.style.background = '#eaeaea';
        span.style.padding = '2px 8px';
        span.style.borderRadius = '4px';
        span.style.fontSize = '12px';
        return span;
      });
    }
    // If the card's <a> has an href, make a CTA link (if external)
    let cta = null;
    if (linkHref) {
      cta = document.createElement('a');
      cta.href = linkHref;
      cta.textContent = 'Learn more';
      cta.target = '_blank';
      cta.style.display = 'inline-block';
      cta.style.marginTop = '8px';
    }
    // Compose the text cell content
    const content = [];
    if (titleEl) content.push(titleEl);
    if (descEl) {
      if (content.length) content.push(document.createElement('br'));
      content.push(descEl);
    }
    if (categories.length) {
      content.push(document.createElement('br'));
      content.push(...categories);
    }
    if (cta) {
      content.push(document.createElement('br'));
      content.push(cta);
    }
    return content;
  }

  // Find all <li> cards in the main <ul>
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Build the table rows
  const rows = [];
  const headerRow = ['Cards (cards82)'];
  rows.push(headerRow);

  lis.forEach(li => {
    // The card's <a> contains the image and text
    const a = li.querySelector('a');
    if (!a) return;
    const image = extractImage(a);
    // Text content: title, desc, categories, CTA
    // The CTA should use the <a> href if present
    const textContent = extractTextContent(a, a.getAttribute('href'));
    rows.push([
      image || '',
      textContent
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
