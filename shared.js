// Big Easy Fence — shared inner-page behavior (header shadow, reveal-on-scroll, back-to-top)
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => { header.classList.toggle('scrolled', window.scrollY > 12); });
  }

  document.querySelectorAll('img[onload]').forEach(img => { if (img.complete) img.classList.add('loaded'); });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  const toTopBtn = document.getElementById('toTop');
  if (toTopBtn) {
    window.addEventListener('scroll', () => { toTopBtn.classList.toggle('show', window.scrollY > 500); });
  }

  const svcList = document.getElementById('svcList');
  if (svcList) {
    const items = [...svcList.querySelectorAll('.svc-list-item')];
    const previewImg = document.getElementById('svcPreviewImg');
    const previewTitle = document.getElementById('svcPreviewTitle');
    const previewDesc = document.getElementById('svcPreviewDesc');
    const previewLink = document.getElementById('svcPreviewLink');

    function selectItem(item) {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      previewImg.classList.remove('loaded');
      previewImg.src = item.dataset.img;
      previewImg.alt = item.dataset.title;
      previewTitle.textContent = item.dataset.title;
      previewDesc.textContent = item.dataset.desc;
      previewLink.href = item.dataset.href;
    }

    items.forEach(item => item.addEventListener('click', () => selectItem(item)));

    const svcFilters = document.querySelectorAll('.svc-filter');
    svcFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        svcFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        let firstVisible = null;
        items.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.display = show ? '' : 'none';
          if (show && !firstVisible) firstVisible = item;
        });
        if (firstVisible) selectItem(firstVisible);
      });
    });
  }

  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid) {
    const items = [...galleryGrid.querySelectorAll('.gallery-item')];
    const galleryFilters = document.querySelectorAll('.svc-filter');
    galleryFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        items.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.classList.toggle('hide', !show);
        });
      });
    });
  }

  const blogGrid = document.getElementById('blogGrid');
  if (blogGrid) {
    const items = [...blogGrid.querySelectorAll('.blog-card')];
    const blogFilters = document.querySelectorAll('.svc-filter');
    const loadMoreBtn = document.getElementById('blogLoadMore');
    const PAGE_SIZE = 12;
    let currentFilter = 'all';
    let visibleCount = PAGE_SIZE;

    function render() {
      const cats = (item) => item.dataset.category.split(' ');
      const matches = items.filter(item => currentFilter === 'all' || cats(item).includes(currentFilter));
      items.forEach(item => { item.style.display = 'none'; });
      matches.forEach((item, i) => { item.style.display = i < visibleCount ? '' : 'none'; });
      if (loadMoreBtn) loadMoreBtn.style.display = matches.length > visibleCount ? '' : 'none';
    }

    blogFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        blogFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        visibleCount = PAGE_SIZE;
        render();
      });
    });

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        visibleCount += PAGE_SIZE;
        render();
      });
    }

    render();
  }

  const styleTabs = document.getElementById('styleTabs');
  if (styleTabs) {
    const tabs = [...styleTabs.querySelectorAll('.style-tab')];
    const panels = [...document.querySelectorAll('.style-panel')];
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const style = tab.dataset.style;
        panels.forEach(p => p.classList.toggle('active', p.dataset.style === style));
      });
    });
  }
});
