/**
 * 대전관광공사 조직혁신 포털 - 공통 네비게이션
 * 모든 사이트의 <head> 안에 아래 한 줄을 추가하면 됩니다:
 * <script src="https://djto-sp.github.io/djto-innovation/portal-nav.js"></script>
 */
(function () {
  const SERVICES = [
    { label: '학습동아리',    url: 'https://djto-sp.github.io/djto-studygroup/',   key: 'studygroup',   color: '#16a34a' },
    { label: '변화관리마일리지', url: 'https://djto-sp.github.io/djto-mileage2026/',  key: 'mileage2026',  color: '#e8610a' },
    { label: '혁신드림제안',  url: 'https://djto-sp.github.io/djto-dreamproposal/', key: 'dreamproposal', color: '#2d5499' },
  ];

  const path = window.location.href;
  const isActive = (key) => path.includes(key);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500;700&display=swap');
    #djto-innovation-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 99999;
      background: #1e3a6e;
      box-shadow: 0 2px 12px rgba(0,0,0,0.25);
      font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    }
    #djto-innovation-nav .pn-wrap {
      max-width: 1200px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 16px; height: 46px;
    }
    #djto-innovation-nav .pn-home {
      display: flex; align-items: center; gap: 8px;
      color: #fff; text-decoration: none; font-size: 13px; font-weight: 700;
      white-space: nowrap; flex-shrink: 0;
    }
    #djto-innovation-nav .pn-label { display: inline; }
    #djto-innovation-nav .pn-links {
      display: flex; align-items: center; gap: 2px;
    }
    #djto-innovation-nav .pn-links a {
      color: rgba(255,255,255,0.72); text-decoration: none;
      font-size: 13px; font-weight: 500;
      padding: 5px 12px; border-radius: 20px;
      transition: all .18s;
    }
    #djto-innovation-nav .pn-links a:hover { color: #fff; background: rgba(255,255,255,0.12); }
    #djto-innovation-nav .pn-links a.pn-active {
      color: #fff; font-weight: 700;
    }
    @media (max-width: 520px) {
      #djto-innovation-nav .pn-label { display: none; }
      #djto-innovation-nav .pn-links a { padding: 5px 8px; font-size: 12px; }
    }
  `;

  const linksHtml = SERVICES.map(s =>
    `<a href="${s.url}" data-key="${s.key}" data-color="${s.color}" class="${isActive(s.key) ? 'pn-active' : ''}">${s.label}</a>`
  ).join('');

  function inject() {
    // 스타일
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // 네비게이션 HTML
    const nav = document.createElement('div');
    nav.innerHTML = `
      <div id="djto-innovation-nav">
        <div class="pn-wrap">
          <a href="https://djto-sp.github.io/djto-innovation/" class="pn-home">
            <span class="pn-label">대전관광공사 <span style="color:#FAC766">지식경영관리 통합 포털</span></span>
          </a>
          <div class="pn-links">${linksHtml}</div>
        </div>
      </div>
    `;
    document.body.insertBefore(nav.firstElementChild, document.body.firstChild);

    // 활성 링크 색상 적용
    document.querySelectorAll('#djto-innovation-nav .pn-links a').forEach(a => {
      if (a.classList.contains('pn-active')) {
        a.style.background = a.dataset.color;
      }
    });

    // 기존 콘텐츠가 네비 뒤에 가리지 않도록 body 상단 패딩 추가
    document.body.style.paddingTop = '46px';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  // ── 팝업 ──
  const POPUP_API = 'https://script.google.com/macros/s/AKfycbz09Zkvveie1252E4ZO9MD6qe7XKYj7npGNmv4R8NwwFJhx0xG59c7d7HcQJxM92AhGiA/exec';
  const POPUP_KEY = 'djto_popup_dismiss_';

  function currentSiteKey() {
    for (const s of SERVICES) { if (isActive(s.key)) return s.key; }
    if (path.includes('innovation')) return 'portal';
    return 'portal';
  }

  function showPopup(p) {
    const dismissKey = POPUP_KEY + p.id;
    const dismissed = localStorage.getItem(dismissKey);
    if (dismissed) {
      const today = new Date().toISOString().slice(0,10);
      if (dismissed === today) return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'djto-popup-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:999998;display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML = `
      <div style="background:#fff;border-radius:16px;padding:28px 24px;width:90%;max-width:460px;box-shadow:0 20px 60px rgba(0,0,0,.25);font-family:\'Noto Sans KR\',sans-serif;">
        <div style="font-size:17px;font-weight:800;color:#1e3a6e;margin-bottom:14px;line-height:1.4;">${p.title.replace(/</g,'&lt;')}</div>
        <div style="font-size:14px;color:#334;line-height:1.8;white-space:pre-wrap;max-height:300px;overflow-y:auto;">${p.content.replace(/</g,'&lt;')}</div>
        <div style="display:flex;gap:10px;margin-top:20px;">
          <button id="djto-popup-today" style="flex:1;padding:10px;border:1.5px solid #dde5f0;border-radius:10px;background:#f8fafc;color:#64748b;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;">오늘 하루 닫기</button>
          <button id="djto-popup-close" style="flex:1;padding:10px;border:none;border-radius:10px;background:#1e3a6e;color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;">닫기</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    document.getElementById('djto-popup-close').onclick = function() { overlay.remove(); };
    document.getElementById('djto-popup-today').onclick = function() {
      localStorage.setItem(dismissKey, new Date().toISOString().slice(0,10));
      overlay.remove();
    };
  }

  function loadPopups() {
    const siteKey = currentSiteKey();
    fetch(POPUP_API + '?action=getPopups')
      .then(function(r) { return r.json(); })
      .then(function(popups) {
        if (!Array.isArray(popups)) return;
        popups.forEach(function(p) {
          const sites = (p.sites || 'all').split(',').map(function(s) { return s.trim(); });
          if (sites.indexOf('all') >= 0 || sites.indexOf(siteKey) >= 0) {
            showPopup(p);
          }
        });
      })
      .catch(function() {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPopups);
  } else {
    setTimeout(loadPopups, 500);
  }
})();
