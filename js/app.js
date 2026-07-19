/**
 * ============================================================
 * CAREERLAND TƏHSİL MƏRKƏZİ - Main Application
 * ============================================================
 * Single Page Application - Pure Static JavaScript
 * No backend required - Render.com Static Site compatible
 * ============================================================
 */

'use strict';

/* ============================================================
   STATE
   ============================================================ */
const state = {
  currentPage: 'home',
  prepBreadcrumb: [],   // [{id, name, type}] – navigation trail
  lastScrollY: {},      // Scroll positions per page
  teacherScrollY: 0,    // Müəllim grid scroll position before detail view
  prepScrollY: 0,       // Prep page scroll before going into sub-detail
};

/* ============================================================
   DOM HELPERS
   ============================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const el = (tag, cls = '', html = '') => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
};

/* ============================================================
   NAVIGATION
   ============================================================ */
function navigateTo(pageId, restoreScroll) {
  // Save scroll position for current page
  state.lastScrollY[state.currentPage] = window.scrollY;

  // Hide all pages
  $$('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = $(`#page-${pageId}`);
  if (!target) return;
  target.classList.add('active');
  state.currentPage = pageId;
  // Update nav
  $$('.navbar-links a, .mobile-menu a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });
  // Close mobile menu
  $('#mobile-menu').classList.remove('open');
  // Update URL hash (no reload)
  history.pushState(null, '', `#${pageId}`);

  // Scroll behaviour
  if (restoreScroll && state.lastScrollY[pageId] != null) {
    // Restore scroll position after a short delay to allow render
    requestAnimationFrame(() => {
      window.scrollTo({ top: state.lastScrollY[pageId], behavior: 'instant' });
    });
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

/* ============================================================
   PAGE BACK BUTTONS (ana səhifəyə qayıt)
   Restore scroll position to where user was before navigating away
   ============================================================ */
function initPageBackButtons() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.page-back-btn');
    if (btn) {
      e.preventDefault();
      const page = btn.dataset.page || 'home';
      // Go back to page and RESTORE scroll position
      navigateTo(page, true);
    }
  });
}

/* ============================================================
   NAVBAR SCROLL
   ============================================================ */
function initNavbar() {
  window.addEventListener('scroll', () => {
    $('#navbar').classList.toggle('scrolled', window.scrollY > 30);
    // Scroll-to-top button
    $('.scroll-top').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // Hamburger
  $('#hamburger-btn').addEventListener('click', () => {
    const menu = $('#mobile-menu');
    const isOpen = menu.classList.toggle('open');
    $('#hamburger-btn').setAttribute('aria-expanded', isOpen);
  });

  // Nav links - regular page navigation (no scroll restore for top-level nav)
  document.addEventListener('click', e => {
    const link = e.target.closest('[data-page]');
    if (link && !link.classList.contains('page-back-btn')) {
      e.preventDefault();
      navigateTo(link.dataset.page, false);
    }
  });

  // Scroll to top
  $('.scroll-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   HERO
   ============================================================ */
function initHero() {
  // Counter animation
  $$('.counter').forEach(c => {
    const target = parseInt(c.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      c.textContent = current + (c.dataset.suffix || '');
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

/* ============================================================
   NEWS / XƏBƏRLƏR
   ============================================================ */
function renderNews() {
  const grid = $('#news-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // Show ALL news on the dedicated news page
  NEWS.forEach(item => {
    const card = el('article', 'news-card');
    card.innerHTML = `
      <div class="news-card-visual ${item.colorClass}">
        <span class="news-icon">${item.icon}</span>
      </div>
      <div class="news-card-body">
        <div class="news-card-date"><i class="far fa-calendar-alt"></i>${item.date}</div>
        <h3 class="news-card-title">${item.title}</h3>
        <p class="news-card-text">${item.shortText}</p>
        <span class="news-card-link">Daha ətraflı <i class="fas fa-arrow-right"></i></span>
      </div>
    `;
    card.addEventListener('click', () => openNewsOverlay(item));
    grid.appendChild(card);
  });
}

function openNewsOverlay(item) {
  const overlay = $('#news-overlay');
  const colorMap = { purple: '#7c3aed', green: '#16a34a', orange: '#ea580c' };
  const color = colorMap[item.colorClass] || '#7c3aed';
  $('#overlay-icon').textContent = item.icon;
  $('#overlay-icon').style.background = color;
  $('#overlay-title').textContent = item.title;
  $('#overlay-date').innerHTML = `<i class="far fa-calendar-alt"></i> ${item.date}`;
  $('#overlay-body').textContent = item.fullText;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeNewsOverlay() {
  $('#news-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================================
   VACANCIES / VAKANSİYALAR
   ============================================================ */
function renderVacancies() {
  const grid = $('#vacancies-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!VACANCIES || VACANCIES.length === 0) {
    grid.innerHTML = '<p style="color:var(--gray-600);padding:40px 0;text-align:center;">Hazırda aktiv vakansiya yoxdur.</p>';
    return;
  }

  VACANCIES.forEach(vac => {
    const card = el('div', 'vacancy-card');
    card.innerHTML = `
      <div class="vacancy-card-header ${vac.colorClass}">
        <span class="vacancy-icon">${vac.icon}</span>
      </div>
      <div class="vacancy-card-body">
        <div class="vacancy-type-badge">${vac.type}</div>
        <h3 class="vacancy-card-title">${vac.title}</h3>
        <p class="vacancy-card-text">${vac.shortText}</p>
        <div class="vacancy-salary"><i class="fas fa-money-bill-wave"></i> ${vac.salary}</div>
        <button class="vacancy-detail-btn">
          Ətraflı məlumat <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    `;
    card.querySelector('.vacancy-detail-btn').addEventListener('click', () => openVacancyOverlay(vac));
    grid.appendChild(card);
  });
}

function openVacancyOverlay(vac) {
  const overlay = $('#vacancy-overlay');
  const colorMap = { purple: '#7c3aed', green: '#16a34a', orange: '#ea580c' };
  const color = colorMap[vac.colorClass] || '#7c3aed';

  $('#vacancy-overlay-icon').textContent = vac.icon;
  $('#vacancy-overlay-icon').style.background = color;
  $('#vacancy-overlay-title').textContent = vac.title;
  $('#vacancy-overlay-meta').innerHTML = `<i class="fas fa-briefcase"></i> ${vac.type} &nbsp;|&nbsp; <i class="fas fa-money-bill-wave"></i> ${vac.salary}`;

  // Convert newlines to HTML for full text
  const bodyEl = $('#vacancy-overlay-body');
  bodyEl.innerHTML = '';
  vac.fullText.split('\n').forEach(line => {
    if (line.trim() === '') {
      bodyEl.appendChild(document.createElement('br'));
    } else {
      const p = document.createElement('p');
      p.style.marginBottom = '6px';
      p.textContent = line;
      bodyEl.appendChild(p);
    }
  });

  // WhatsApp link - direct to messages
  const waBtn = $('#vacancy-whatsapp-btn');
  const waMsg = encodeURIComponent(`Salam! "${vac.title}" vakansiyası ilə bağlı müraciət etmək istəyirəm.`);
  waBtn.href = `https://wa.me/994559406018?text=${waMsg}`;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVacancyOverlay() {
  $('#vacancy-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================================
   PREPARATIONS / HAZIRLILAR
   ============================================================ */
function renderPrepCategories() {
  const container = $('#prep-main');
  if (!container) return;
  container.innerHTML = '';

  // Reset breadcrumb
  state.prepBreadcrumb = [];
  updateBreadcrumb();
  // Geri button disabled on root
  setHazirlilarBack(null);

  const grid = el('div', 'prep-categories');
  PREP_CATEGORIES.forEach(cat => {
    const card = el('div', 'prep-category-card');
    card.innerHTML = `
      <div class="prep-category-icon" style="background:${cat.bgColor}; font-size:1.8rem">${cat.icon}</div>
      <div>
        <div class="prep-category-name">${cat.name}</div>
        <div class="prep-category-desc">${cat.description}</div>
      </div>
      <div class="prep-category-arrow"><i class="fas fa-chevron-right"></i></div>
    `;
    card.addEventListener('click', () => {
      // Save scroll position before navigating deeper
      state.prepScrollY = window.scrollY;
      state.prepBreadcrumb = [{ id: cat.id, name: cat.name, type: 'category' }];
      window.scrollTo({ top: 0, behavior: 'instant' });
      renderPrepSubCategories(cat);
    });
    grid.appendChild(card);
  });
  container.appendChild(grid);
}

function renderPrepSubCategories(cat) {
  const container = $('#prep-main');
  container.innerHTML = '';

  updateBreadcrumb();

  // Update top-level Geri button to go back to categories
  setHazirlilarBack(() => {
    renderPrepCategories();
    requestAnimationFrame(() => {
      window.scrollTo({ top: state.prepScrollY, behavior: 'instant' });
    });
  });

  // Back button inside content area - same behaviour
  const back = makeBackBtn(() => {
    renderPrepCategories();
    requestAnimationFrame(() => {
      window.scrollTo({ top: state.prepScrollY, behavior: 'instant' });
    });
  }, 'Geri');
  container.appendChild(back);

  // Title
  const title = el('h2', 'section-title', `${cat.icon} ${cat.name}`);
  title.style.marginBottom = '24px';
  container.appendChild(title);

  if (cat.subCategories.length === 1 && cat.subCategories[0].teacherIds.length > 0) {
    // Only one sub-cat: go straight to teachers
    renderPrepTeachers(cat.subCategories[0], cat);
    return;
  }

  const grid = el('div', 'prep-sub-grid');
  cat.subCategories.forEach(sub => {
    const card = el('div', 'prep-sub-card');
    card.innerHTML = `
      <div style="font-size:2rem">${sub.icon}</div>
      <span>${sub.name}</span>
    `;
    card.addEventListener('click', () => {
      state.prepBreadcrumb = [
        { id: cat.id, name: cat.name, type: 'category', ref: cat },
        { id: sub.id, name: sub.name, type: 'sub', ref: sub, catRef: cat }
      ];
      window.scrollTo({ top: 0, behavior: 'instant' });
      renderPrepTeachers(sub, cat);
    });
    grid.appendChild(card);
  });
  container.appendChild(grid);
}

function renderPrepTeachers(sub, parentCat) {
  const container = $('#prep-main');
  container.innerHTML = '';

  updateBreadcrumb();

  const goBackFromTeachers = () => {
    if (state.prepBreadcrumb.length > 1) {
      state.prepBreadcrumb.pop();
      window.scrollTo({ top: 0, behavior: 'instant' });
      renderPrepSubCategories(parentCat);
    } else {
      renderPrepCategories();
      requestAnimationFrame(() => {
        window.scrollTo({ top: state.prepScrollY, behavior: 'instant' });
      });
    }
  };

  // Update top-level Geri button
  setHazirlilarBack(goBackFromTeachers);

  // Back button inside content area
  const back = makeBackBtn(goBackFromTeachers, 'Geri');
  container.appendChild(back);

  const title = el('h2', 'section-title', `${sub.icon} ${sub.name} – Müəllimlər`);
  title.style.marginBottom = '24px';
  container.appendChild(title);

  const teachers = TEACHERS.filter(t => sub.teacherIds.includes(t.id));
  if (teachers.length === 0) {
    const msg = el('div', '', '<p style="color:var(--gray-600);padding:20px 0;">Bu fənn üçün müəllim tezliklə əlavə ediləcək.</p>');
    container.appendChild(msg);
    return;
  }

  const grid = el('div', 'teachers-grid');
  teachers.forEach(t => {
    // Save scroll before going to teacher detail
    let savedScrollY = 0;
    grid.appendChild(makeTeacherCard(t, () => {
      savedScrollY = window.scrollY;
      window.scrollTo({ top: 0, behavior: 'instant' });
      renderPrepTeacherDetail(t, sub, parentCat, savedScrollY);
    }));
  });
  container.appendChild(grid);
}

function renderPrepTeacherDetail(teacher, sub, parentCat, returnScrollY) {
  const container = $('#prep-main');
  container.innerHTML = '';

  updateBreadcrumb();

  const goBackFromDetail = () => {
    state.prepBreadcrumb.pop();
    renderPrepTeachers(sub, parentCat);
    requestAnimationFrame(() => {
      window.scrollTo({ top: returnScrollY || 0, behavior: 'instant' });
    });
  };

  // Update top-level Geri button
  setHazirlilarBack(goBackFromDetail);

  // Back button - only "Geri"
  const back = makeBackBtn(goBackFromDetail, 'Geri');
  container.appendChild(back);

  container.appendChild(makeTeacherDetail(teacher));
}

/* ============================================================
   TEACHER CARD / DETAIL (shared between prep & all-teachers)
   ============================================================ */
function makeTeacherCard(teacher, onClick) {
  const card = el('div', 'teacher-card');
  const hasPhoto = teacher.photo;
  card.innerHTML = `
    <div class="teacher-card-img">
      ${hasPhoto
        ? `<img src="${teacher.photo}" alt="${teacher.name}" loading="lazy">`
        : `<div class="no-photo"><i class="fas fa-user"></i></div>`}
    </div>
    <div class="teacher-card-body">
      <div class="teacher-card-name">${teacher.name}</div>
      <div class="teacher-card-subject">${teacher.subject}</div>
      ${teacher.miqScore ? `<div class="teacher-card-score">MİQ: ${teacher.miqScore} (${teacher.miqYear})</div>` : ''}
    </div>
  `;
  card.addEventListener('click', onClick);
  return card;
}

function makeTeacherDetail(teacher) {
  const div = el('div', 'teacher-detail slide-up');

  const areas = teacher.teachingAreas.map(a => `<li style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:.9rem;color:var(--gray-700)"><i class="fas fa-check-circle" style="color:var(--purple)"></i>${a}</li>`).join('');
  const achievements = teacher.achievements.map(a => `<li style="display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:.9rem;color:var(--gray-700)"><i class="fas fa-star" style="color:var(--accent)"></i>${a}</li>`).join('');
  const subjects = teacher.subCategories.map(s => `<span class="teacher-subject-tag">${s}</span>`).join('');

  div.innerHTML = `
    <div class="teacher-detail-header">
      <div class="teacher-detail-photo">
        ${teacher.photo
          ? `<img src="${teacher.photo}" alt="${teacher.name}">`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--purple);"><i class="fas fa-user" style="font-size:3rem;color:rgba(255,255,255,0.6)"></i></div>`}
      </div>
      <div class="teacher-detail-info">
        <div class="teacher-detail-name">${teacher.name}</div>
        <div class="teacher-detail-subject">${teacher.subject} Müəllimi</div>
        <p style="color:rgba(255,255,255,0.7);font-size:.9rem;max-width:400px">${teacher.description}</p>
      </div>
    </div>
    <div class="teacher-detail-body">
      <div class="teacher-stats-row">
        <div class="teacher-stat-box">
          <div class="num">${teacher.successfulStudents}+</div>
          <div class="lbl">Uğurlu Məzun</div>
        </div>
        <div class="teacher-stat-box">
          <div class="num">${teacher.experience}</div>
          <div class="lbl">Təcrübə</div>
        </div>
        ${teacher.miqScore ? `
        <div class="teacher-stat-box">
          <div class="num">${teacher.miqScore}</div>
          <div class="lbl">MİQ Bal (${teacher.miqYear})</div>
        </div>` : ''}
        <div class="teacher-stat-box">
          <div class="num">${teacher.graduationYear}</div>
          <div class="lbl">Məzun ili</div>
        </div>
      </div>
      <div class="teacher-info-list">
        <div class="teacher-info-item">
          <i class="fas fa-university"></i>
          <span><strong>Təhsil:</strong> ${teacher.university}</span>
        </div>
        <div class="teacher-info-item">
          <i class="fas fa-briefcase"></i>
          <span><strong>İş təcrübəsi:</strong> ${teacher.experience}</span>
        </div>
      </div>
      <h4 style="margin:24px 0 12px;font-size:1rem;color:var(--gray-800)">Tədris sahələri</h4>
      <ul style="padding:0">${areas}</ul>
      <h4 style="margin:24px 0 12px;font-size:1rem;color:var(--gray-800)">Uğurlar</h4>
      <ul style="padding:0">${achievements}</ul>
      <div class="teacher-subjects-list">${subjects}</div>
    </div>
  `;
  return div;
}

/* ============================================================
   BREADCRUMB
   ============================================================ */
function updateBreadcrumb() {
  const bc = $('#prep-breadcrumb');
  if (!bc) return;
  bc.innerHTML = '';
  const home = el('span', '', 'Hazırlıqlar');
  home.style.cursor = 'pointer';
  home.style.color = 'var(--purple)';
  home.addEventListener('click', () => {
    renderPrepCategories();
    requestAnimationFrame(() => {
      window.scrollTo({ top: state.prepScrollY, behavior: 'instant' });
    });
  });
  bc.appendChild(home);

  state.prepBreadcrumb.forEach((crumb, i) => {
    const sep = el('span', 'breadcrumb-sep', '<i class="fas fa-chevron-right"></i>');
    bc.appendChild(sep);
    const span = el('span', '', crumb.name);
    if (i < state.prepBreadcrumb.length - 1) {
      span.style.cursor = 'pointer';
      span.style.color = 'var(--purple)';
    }
    bc.appendChild(span);
  });
}

/* ============================================================
   ALL TEACHERS PAGE
   - No auto scroll when opening teacher detail
   - Restore scroll position when going back
   ============================================================ */
function renderAllTeachers() {
  const grid = $('#all-teachers-grid');
  if (!grid) return;
  grid.innerHTML = '';

  TEACHERS.forEach(t => {
    const card = makeTeacherCard(t, () => {
      // Save current scroll position before showing detail
      state.teacherScrollY = window.scrollY;

      const detail = $('#teacher-detail-view');
      const gridWrap = $('#all-teachers-grid-wrap');
      detail.innerHTML = '';

      // Back button - only "Geri"
      const back = makeBackBtn(() => {
        detail.innerHTML = '';
        detail.style.display = 'none';
        gridWrap.style.display = '';
        // Restore scroll position after hiding detail - no auto scroll
        requestAnimationFrame(() => {
          window.scrollTo({ top: state.teacherScrollY, behavior: 'instant' });
        });
      }, 'Geri');
      detail.appendChild(back);
      detail.appendChild(makeTeacherDetail(t));
      detail.style.display = 'block';
      gridWrap.style.display = 'none';

      // NO automatic scroll - just go to top of page naturally
      // The page is already at the right position since we saved scroll
      // We only scroll to ensure the detail is visible (not the whole card position)
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    grid.appendChild(card);
  });
}

/* ============================================================
   GRADUATES
   ============================================================ */
function renderGraduates() {
  const grid = $('#graduates-grid');
  if (!grid) return;
  grid.innerHTML = '';

  GRADUATES.forEach(g => {
    const card = el('div', 'graduate-card');
    card.innerHTML = `
      <div class="graduate-card-img-wrap">
        ${g.photo
          ? `<img src="${g.photo}" alt="${g.name}" loading="lazy">`
          : `<div class="graduate-card-placeholder"><i class="fas fa-user"></i></div>`}
      </div>
      <div class="graduate-card-body">
        <div class="graduate-card-name">${g.name}</div>
        <div class="graduate-card-score">${g.score}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ============================================================
   GALLERY SLIDER
   ============================================================ */
const galleryState = {
  current: 0,
  total: 0,
  touchStartX: 0,
  touchStartY: 0,
  isDragging: false,
  dragStartX: 0,
  autoTimer: null
};

function renderGallery() {
  const track = $('#gallery-slider-track');
  const dotsWrap = $('#gallery-dots');
  const counter = $('#gallery-counter');
  const prevBtn = $('#gallery-prev');
  const nextBtn = $('#gallery-next');

  if (!track) return;

  const items = GALLERY;
  galleryState.total = items.length;
  galleryState.current = 0;

  // Build slides
  track.innerHTML = '';
  items.forEach((item, i) => {
    const slide = el('div', 'gallery-slider-slide');
    slide.setAttribute('data-index', i);
    slide.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" loading="${i === 0 ? 'eager' : 'lazy'}">
      <div class="gallery-slide-overlay"><i class="fas fa-search-plus"></i></div>
    `;
    slide.addEventListener('click', () => {
      if (!galleryState.isDragging) openLightbox(item.src, item.alt, i);
    });
    track.appendChild(slide);
  });

  // Build dots
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    items.forEach((_, i) => {
      const dot = el('button', 'gallery-dot' + (i === 0 ? ' active' : ''));
      dot.setAttribute('aria-label', `Şəkil ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });
  }

  updateGalleryUI();

  // Arrow buttons
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoPlay(); });

  // Touch / swipe support
  const wrap = $('#gallery-slider-wrap');
  if (wrap) {
    wrap.addEventListener('touchstart', e => {
      galleryState.touchStartX = e.touches[0].clientX;
      galleryState.touchStartY = e.touches[0].clientY;
      galleryState.isDragging = false;
    }, { passive: true });

    wrap.addEventListener('touchmove', e => {
      const dx = e.touches[0].clientX - galleryState.touchStartX;
      const dy = e.touches[0].clientY - galleryState.touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
        galleryState.isDragging = true;
      }
    }, { passive: true });

    wrap.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - galleryState.touchStartX;
      if (galleryState.isDragging && Math.abs(dx) > 40) {
        if (dx < 0) nextSlide(); else prevSlide();
        stopAutoPlay();
      }
      setTimeout(() => { galleryState.isDragging = false; }, 50);
    }, { passive: true });

    // Mouse drag
    wrap.addEventListener('mousedown', e => {
      galleryState.dragStartX = e.clientX;
      galleryState.isDragging = false;
    });
    wrap.addEventListener('mousemove', e => {
      if (e.buttons !== 1) return;
      if (Math.abs(e.clientX - galleryState.dragStartX) > 8) galleryState.isDragging = true;
    });
    wrap.addEventListener('mouseup', e => {
      const dx = e.clientX - galleryState.dragStartX;
      if (galleryState.isDragging && Math.abs(dx) > 40) {
        if (dx < 0) nextSlide(); else prevSlide();
        stopAutoPlay();
      }
      setTimeout(() => { galleryState.isDragging = false; }, 50);
    });
  }

  // Keyboard navigation when gallery is visible
  document.addEventListener('keydown', e => {
    if (state.currentPage !== 'qalerya') return;
    if (e.key === 'ArrowLeft') { prevSlide(); stopAutoPlay(); }
    if (e.key === 'ArrowRight') { nextSlide(); stopAutoPlay(); }
  });

  startAutoPlay();
}

function goToSlide(index) {
  const n = galleryState.total;
  if (n === 0) return;
  galleryState.current = ((index % n) + n) % n;
  updateGalleryUI();
}

function nextSlide() {
  goToSlide(galleryState.current + 1);
}

function prevSlide() {
  goToSlide(galleryState.current - 1);
}

function updateGalleryUI() {
  const track = $('#gallery-slider-track');
  const counter = $('#gallery-counter');
  const n = galleryState.total;
  const cur = galleryState.current;

  if (track) track.style.transform = `translateX(-${cur * 100}%)`;

  // Update dots
  $$('.gallery-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === cur);
  });

  // Update counter
  if (counter && n > 0) counter.textContent = `${cur + 1} / ${n}`;
}

function startAutoPlay() {
  stopAutoPlay();
  if (galleryState.total > 1) {
    galleryState.autoTimer = setInterval(() => {
      if (state.currentPage === 'qalerya') nextSlide();
    }, 4000);
  }
}

function stopAutoPlay() {
  if (galleryState.autoTimer) {
    clearInterval(galleryState.autoTimer);
    galleryState.autoTimer = null;
  }
}

function openLightbox(src, alt, index) {
  const lb = $('#lightbox');
  $('#lightbox-img').src = src;
  $('#lightbox-img').alt = alt || '';
  if (index !== undefined) lb.dataset.galleryIndex = index;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  $('#lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================================
   FAQ
   ============================================================ */
function renderFAQ() {
  const list = $('#faq-list');
  if (!list) return;
  list.innerHTML = '';

  FAQ.forEach((item) => {
    const div = el('div', 'faq-item');
    div.innerHTML = `
      <div class="faq-question" tabindex="0" role="button" aria-expanded="false">
        <span>${item.question}</span>
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="faq-answer">${item.answer}</div>
    `;
    const q = div.querySelector('.faq-question');
    q.addEventListener('click', () => {
      const isOpen = div.classList.contains('open');
      // Close all
      $$('.faq-item.open').forEach(f => {
        f.classList.remove('open');
        f.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        div.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
    q.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); q.click(); } });
    list.appendChild(div);
  });
}

/* ============================================================
   UTILITY
   ============================================================ */
function makeBackBtn(onClick, label) {
  const btn = el('button', 'back-btn');
  btn.innerHTML = `<i class="fas fa-arrow-left"></i> ${label || 'Geri'}`;
  btn.addEventListener('click', onClick);
  return btn;
}

/* ============================================================
   HOME NEWS GRID - max 3 items
   ============================================================ */
function renderHomeNews() {
  const homeGrid = document.getElementById('news-grid-home');
  if (!homeGrid) return;
  homeGrid.innerHTML = '';

  // Show only first 3 news items on home page
  const homeNewsItems = NEWS.slice(0, 3);
  const colorMap = { purple: '#7c3aed', green: '#16a34a', orange: '#ea580c' };

  homeNewsItems.forEach(item => {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.innerHTML = `
      <div class="news-card-visual ${item.colorClass}">
        <span class="news-icon">${item.icon}</span>
      </div>
      <div class="news-card-body">
        <div class="news-card-date"><i class="far fa-calendar-alt"></i>${item.date}</div>
        <h3 class="news-card-title">${item.title}</h3>
        <p class="news-card-text">${item.shortText}</p>
        <span class="news-card-link">Daha ətraflı <i class="fas fa-arrow-right"></i></span>
      </div>
    `;
    card.addEventListener('click', () => {
      const overlay = document.getElementById('news-overlay');
      const color = colorMap[item.colorClass] || '#7c3aed';
      document.getElementById('overlay-icon').textContent = item.icon;
      document.getElementById('overlay-icon').style.background = color;
      document.getElementById('overlay-title').textContent = item.title;
      document.getElementById('overlay-date').innerHTML = `<i class="far fa-calendar-alt"></i> ${item.date}`;
      document.getElementById('overlay-body').textContent = item.fullText;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    homeGrid.appendChild(card);
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Render all sections
  renderNews();
  renderHomeNews();
  renderPrepCategories();
  renderAllTeachers();
  renderGraduates();
  renderGallery();
  renderFAQ();
  renderVacancies();

  // Hazirlilar page - smart back button
  initHazirlilarBackBtn();
  // Muellimler page - smart back button
  initMuellimlerBackBtn();

  // Navbar
  initNavbar();

  // Page back buttons
  initPageBackButtons();

  // Hero counter animation
  initHero();

  // Overlay close
  $('#overlay-close').addEventListener('click', closeNewsOverlay);
  $('#news-overlay').querySelector('.overlay-backdrop').addEventListener('click', closeNewsOverlay);

  // Vacancy overlay close
  $('#vacancy-overlay-close').addEventListener('click', closeVacancyOverlay);
  $('#vacancy-overlay').querySelector('.overlay-backdrop').addEventListener('click', closeVacancyOverlay);

  // Lightbox close
  $('#lightbox-close').addEventListener('click', closeLightbox);
  $('#lightbox-bg').addEventListener('click', closeLightbox);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeNewsOverlay();
      closeLightbox();
      closeVacancyOverlay();
    }
  });

  // Handle initial hash
  const hash = location.hash.replace('#', '');
  if (hash && document.getElementById(`page-${hash}`)) {
    navigateTo(hash, false);
  } else {
    navigateTo('home', false);
  }

  // Browser back/forward
  window.addEventListener('popstate', () => {
    const h = location.hash.replace('#', '');
    if (h && document.getElementById(`page-${h}`)) navigateTo(h, false);
  });
});

/* ============================================================
   HAZIRLILAR - Smart Back Button
   Hazirlilar page: Geri btn state managed via setHazirlilarBack()
   ============================================================ */
function initHazirlilarBackBtn() {
  // Initial state: on root categories, Geri is disabled
  setHazirlilarBack(null);
}

/**
 * Call this whenever hazirlilar view changes.
 * @param {Function|null} fn - click handler, or null to disable
 */
function setHazirlilarBack(fn) {
  const btn = document.getElementById('hazirlilar-back-btn');
  if (!btn) return;
  if (fn === null) {
    btn.style.opacity = '0.4';
    btn.style.pointerEvents = 'none';
    btn.onclick = null;
  } else {
    btn.style.opacity = '';
    btn.style.pointerEvents = '';
    btn.onclick = fn;
  }
}

/* ============================================================
   MUELLIMLER - Smart Back Button
   ============================================================ */
function initMuellimlerBackBtn() {
  const btn = document.getElementById('muellimler-back-btn');
  if (!btn) return;

  // Default: Geri = go back (if teacher detail open, go back to grid)
  btn.innerHTML = '<i class="fas fa-arrow-left"></i> Geri';
  btn.onclick = () => {
    const detail = document.getElementById('teacher-detail-view');
    const gridWrap = document.getElementById('all-teachers-grid-wrap');
    if (detail && detail.style.display !== 'none' && detail.innerHTML !== '') {
      // Close teacher detail, restore grid
      detail.innerHTML = '';
      detail.style.display = 'none';
      gridWrap.style.display = '';
      requestAnimationFrame(() => {
        window.scrollTo({ top: state.teacherScrollY, behavior: 'instant' });
      });
    } else {
      // Already on grid - Geri = go to home
      navigateTo('home', true);
    }
  };

  // Update button state when teacher detail changes
  const observer = new MutationObserver(() => {
    const detail = document.getElementById('teacher-detail-view');
    if (detail && detail.style.display !== 'none' && detail.innerHTML !== '') {
      btn.style.opacity = '';
      btn.style.pointerEvents = '';
    } else {
      btn.style.opacity = '0.5';
      btn.style.pointerEvents = 'none';
    }
  });
  const detail = document.getElementById('teacher-detail-view');
  if (detail) observer.observe(detail, { attributes: true, childList: true, subtree: false });

  // Initial state - on grid, so dim Geri
  btn.style.opacity = '0.5';
  btn.style.pointerEvents = 'none';
}
