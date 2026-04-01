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

  // ── 사이트별 공지 문구 (수정 후 push하면 반영) ──
  const SITE_NOTICES = {
    // studygroup: '6/30까지 모집 중',
    // mileage2026: '수시 신청 가능',
    dreamproposal: '(테스트)',
  };

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

    // 사이트별 짧은 공지 — 꿈씨패밀리 손그림 말풍선
    for (const s of SERVICES) {
      if (isActive(s.key) && SITE_NOTICES[s.key]) {
        const style2 = document.createElement('style');
        style2.textContent = `
          .pn-img-wrap { position:relative; display:inline-block; }
          .pn-speech { position:absolute; right:calc(100% + 10px); top:50%; transform:translateY(-50%); z-index:10; }
          .pn-speech-inner { position:relative; background:#fff; color:#204473; font-size:14px; font-weight:800; padding:9px 18px; border-radius:20px; border:2.5px solid #204473; white-space:nowrap; }
          .pn-speech-inner::before { content:''; position:absolute; right:-18px; top:50%; margin-top:-7px; border:8px solid transparent; border-left:10px solid #204473; }
          .pn-speech-inner::after { content:''; position:absolute; right:-14px; top:50%; margin-top:-6px; border:7px solid transparent; border-left:9px solid #fff; }
        `;
        document.head.appendChild(style2);
        setTimeout(function() {
          const titleBar = document.querySelector('.title-bar .title-inner, .title-bar, [style*="border-bottom:2px solid"]');
          if (!titleBar) return;
          const inner = titleBar.querySelector('[style*="justify-content:space-between"]') || titleBar;
          const img = inner.querySelector('img');
          if (img) {
            // img를 감싸는 wrapper 생성
            const wrap = document.createElement('div');
            wrap.className = 'pn-img-wrap';
            img.parentElement.insertBefore(wrap, img);
            wrap.appendChild(img);
            const bubble = document.createElement('div');
            bubble.className = 'pn-speech';
            bubble.innerHTML = '<div class="pn-speech-inner">📢 ' + SITE_NOTICES[s.key] + '</div>';
            wrap.appendChild(bubble);
          }
        }, 100);
        break;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
