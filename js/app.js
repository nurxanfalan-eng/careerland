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
function navigateTo(pageId) {
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
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Update URL hash (no reload)
  history.pushState(null, '', `#${pageId}`);
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
    $('#mobile-menu').classList.toggle('open');
  });

  // Nav links
  document.addEventListener('click', e => {
    const link = e.target.closest('[data-page]');
    if (link) {
      e.preventDefault();
      navigateTo(link.dataset.page);
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
   PREPARATIONS / HAZIRLILAR
   ============================================================ */
function renderPrepCategories() {
  const container = $('#prep-main');
  if (!container) return;
  container.innerHTML = '';

  // Reset breadcrumb
  state.prepBreadcrumb = [];
  updateBreadcrumb();

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
      state.prepBreadcrumb = [{ id: cat.id, name: cat.name, type: 'category' }];
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

  // Back button
  const back = makeBackBtn(() => renderPrepCategories());
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

  // Back
  const back = makeBackBtn(() => {
    if (state.prepBreadcrumb.length > 1) {
      state.prepBreadcrumb.pop();
      renderPrepSubCategories(parentCat);
    } else {
      renderPrepCategories();
    }
  });
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
    grid.appendChild(makeTeacherCard(t, () => {
      renderPrepTeacherDetail(t, sub, parentCat);
    }));
  });
  container.appendChild(grid);
}

function renderPrepTeacherDetail(teacher, sub, parentCat) {
  const container = $('#prep-main');
  container.innerHTML = '';

  updateBreadcrumb();

  const back = makeBackBtn(() => {
    state.prepBreadcrumb.pop();
    renderPrepTeachers(sub, parentCat);
  });
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
  home.addEventListener('click', renderPrepCategories);
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
   ============================================================ */
function renderAllTeachers() {
  const grid = $('#all-teachers-grid');
  if (!grid) return;
  grid.innerHTML = '';

  TEACHERS.forEach(t => {
    const card = makeTeacherCard(t, () => {
      // Show teacher detail inline
      const detail = $('#teacher-detail-view');
      detail.innerHTML = '';
      const back = makeBackBtn(() => {
        detail.innerHTML = '';
        detail.style.display = 'none';
        grid.style.display = 'grid';
        $('#all-teachers-grid-wrap').style.display = '';
      });
      detail.appendChild(back);
      detail.appendChild(makeTeacherDetail(t));
      detail.style.display = 'block';
      grid.style.display = 'none';
      $('#all-teachers-grid-wrap').style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      ${g.photo
        ? `<img src="${g.photo}" alt="${g.name}" loading="lazy">`
        : `<div style="height:220px;background:linear-gradient(135deg,var(--purple),var(--purple-light));display:flex;align-items:center;justify-content:center"><i class="fas fa-user" style="font-size:4rem;color:rgba(255,255,255,0.5)"></i></div>`}
      <div class="graduate-card-body">
        <div class="graduate-card-name">${g.name}</div>
        <div class="graduate-card-score">${g.score}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ============================================================
   GALLERY
   ============================================================ */
function renderGallery() {
  const grid = $('#gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';

  GALLERY.forEach((item, idx) => {
    const div = el('div', 'gallery-item');
    div.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" loading="lazy">
      <div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>
    `;
    div.addEventListener('click', () => openLightbox(item.src, item.alt));
    grid.appendChild(div);
  });
}

function openLightbox(src, alt) {
  const lb = $('#lightbox');
  $('#lightbox-img').src = src;
  $('#lightbox-img').alt = alt;
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

  FAQ.forEach((item, i) => {
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
function makeBackBtn(onClick) {
  const btn = el('button', 'back-btn');
  btn.innerHTML = `<i class="fas fa-arrow-left"></i> Geri`;
  btn.addEventListener('click', onClick);
  return btn;
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Render all sections
  renderNews();
  renderPrepCategories();
  renderAllTeachers();
  renderGraduates();
  renderGallery();
  renderFAQ();

  // Navbar
  initNavbar();

  // Hero counter animation
  initHero();

  // Overlay close
  $('#overlay-close').addEventListener('click', closeNewsOverlay);
  $('#news-overlay').querySelector('.overlay-backdrop').addEventListener('click', closeNewsOverlay);

  // Lightbox close
  $('#lightbox-close').addEventListener('click', closeLightbox);
  $('#lightbox-bg').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeNewsOverlay();
      closeLightbox();
    }
  });

  // Handle initial hash
  const hash = location.hash.replace('#', '');
  if (hash && document.getElementById(`page-${hash}`)) {
    navigateTo(hash);
  } else {
    navigateTo('home');
  }

  // Browser back/forward
  window.addEventListener('popstate', () => {
    const h = location.hash.replace('#', '');
    if (h && document.getElementById(`page-${h}`)) navigateTo(h);
  });
});
