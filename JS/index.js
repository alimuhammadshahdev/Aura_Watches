document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const searchStatus = document.getElementById('searchStatus');
  const searchEmpty = document.getElementById('searchEmpty');
  const productCards = Array.from(document.querySelectorAll('.premium-card'));
  const productColumns = productCards.map(function (card) {
    return card.closest('.col-sm-3');
  }).filter(Boolean);
  const productRows = Array.from(document.querySelectorAll('.container-fluid > .row.mb-3.mt-3'));

  function updateSearch(query) {
    const normalizedQuery = query.trim().toLowerCase();
    let visibleCount = 0;

    productColumns.forEach(function (column, index) {
      const cardText = productCards[index].textContent.toLowerCase();
      const isMatch = !normalizedQuery || cardText.includes(normalizedQuery);

      column.hidden = !isMatch;
      if (isMatch) {
        visibleCount += 1;
      }
    });

    productRows.forEach(function (row) {
      const hasVisibleCard = Array.from(row.querySelectorAll('.premium-card')).some(function (card) {
        return !card.closest('.col-sm-3').hidden;
      });

      row.hidden = Boolean(normalizedQuery) && !hasVisibleCard;
    });

    searchEmpty.hidden = !normalizedQuery || visibleCount > 0;

    if (searchStatus) {
      searchStatus.textContent = normalizedQuery
        ? `${visibleCount} ${visibleCount === 1 ? 'watch' : 'watches'} found for “${query.trim()}”`
        : `${productCards.length} timepieces to explore`;
    }
  }

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault();
      updateSearch(searchInput.value);

      if (searchInput.value.trim()) {
        const firstProductRow = document.querySelector('.container-fluid > .row.mb-3.mt-3');
        if (firstProductRow) {
          firstProductRow.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });

    searchInput.addEventListener('input', function () {
      updateSearch(searchInput.value);
    });

    updateSearch('');
  }

  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      formFeedback.style.display = 'block';

      if (!name || !email || !message) {
        formFeedback.textContent = 'Please fill in all fields.';
        return;
      }

      window.location.href = `mailto:info@luxurywatches.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")")}`;
      formFeedback.textContent = 'Your message is ready to send. Check your email client.';
      contactForm.reset();
    });
  }

  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    function toggleBackToTop() {
      backToTop.classList.toggle('is-visible', window.scrollY > 320);
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggleBackToTop();
  }
});
