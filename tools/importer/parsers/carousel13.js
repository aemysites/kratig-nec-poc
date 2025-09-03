/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the carousel root
  const carousel = element.querySelector('.mod-ticker-01.js-carousel');
  if (!carousel) return;

  // Find the slides container
  const slickInner = carousel.querySelector('.slick-inner');
  if (!slickInner) return;

  // Only use non-cloned slides (avoid slick-cloned)
  const slides = Array.from(slickInner.querySelectorAll('.slide.slick-slide'))
    .filter(slide => !slide.classList.contains('slick-cloned'));

  // Build table rows
  const headerRow = ['Carousel (carousel13)'];
  const rows = [headerRow];

  slides.forEach(slide => {
    // Each slide-content > .inner > dl.mod-list-news-02 > div
    const slideContent = slide.querySelector('.slide-content .inner');
    if (!slideContent) return;
    const newsDiv = slideContent.querySelector('dl.mod-list-news-02 > div');
    if (!newsDiv) return;

    // There is NO image in this ticker block, so do not add an empty or placeholder cell
    // Only add the text cell for each slide, as a single column
    // Compose text cell: date + link as content
    const dateDiv = newsDiv.querySelector('dt.date .inner');
    const dateText = dateDiv ? dateDiv.textContent.trim() : '';
    const descDiv = newsDiv.querySelector('dd.desc .inner');
    let link = descDiv ? descDiv.querySelector('a') : null;
    let linkHref = link ? link.getAttribute('href') : '';
    let linkText = link ? link.textContent.trim() : '';

    const cellContent = [];
    if (dateText) {
      const dateElem = document.createElement('div');
      dateElem.textContent = dateText;
      dateElem.style.fontWeight = 'bold';
      cellContent.push(dateElem);
    }
    if (link && linkHref) {
      const a = link.cloneNode(true);
      cellContent.push(a);
    }

    rows.push([cellContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
