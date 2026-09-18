
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menuToggleBtn');
  const navMenu = document.getElementById('navMenu');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => navMenu.classList.toggle('open'));
  }

  const searchInput = document.getElementById('localitySearch');
  const filterPills = document.querySelectorAll('.filter-pill');
  const localityCards = document.querySelectorAll('.locality-card');
  let currentProvince = 'all';
  let searchTerm = '';

  function filterCards() {
    localityCards.forEach(card => {
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const prov = (card.getAttribute('data-province') || '').toLowerCase();
      const crops = (card.getAttribute('data-crops') || '').toLowerCase();
      const matchesProv = (currentProvince === 'all') || (prov === currentProvince);
      const matchesSearch = !searchTerm || name.includes(searchTerm) || crops.includes(searchTerm) || prov.includes(searchTerm);
      card.style.display = (matchesProv && matchesSearch) ? 'flex' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      filterCards();
    });
  }

  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentProvince = pill.getAttribute('data-filter') || 'all';
        filterCards();
      });
    });
  }

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const matrixSearch = document.getElementById('matrixSearch');
  if (matrixSearch) {
    matrixSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('.data-table tr');
      rows.forEach((r, idx) => {
        if (idx === 0) return;
        const text = r.innerText.toLowerCase();
        r.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }
});

function copyPre(btn) {
  const card = btn.closest('.cropwat-card');
  if (!card) return;
  const pre = card.querySelector('.cropwat-pre');
  if (!pre) return;
  const text = pre.innerText || pre.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerText;
    btn.innerText = '¡Copiado!';
    btn.style.backgroundColor = '#059669';
    btn.style.color = 'white';
    setTimeout(() => {
      btn.innerText = orig;
      btn.style.backgroundColor = '';
      btn.style.color = '';
    }, 2000);
  });
}
