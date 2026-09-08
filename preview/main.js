/* ============================================================
   乃 -NANJI- / main.js
   ・スクロールリビール（0.85s / easeOutQuart / 0.15s刻みの遅延）
   ・ヒーロー画像のフェードイン
   ・ヘッダーの状態切り替え
   ・BASE 商品ウィジェットの展開
   イージングと duration の根拠は SPEC.md §1-2 を参照。
============================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------
     preload 解除
     CSS 側で .preload * { transition:none } を効かせている。
     load を待つと地図 iframe に引きずられて来ないことがあるため、
     DOMContentLoaded ＋ 保険のタイムアウトで外す。
  -------------------------------------------------------- */
  function unlock() {
    document.documentElement.classList.remove('preload');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      requestAnimationFrame(unlock);
    });
  } else {
    requestAnimationFrame(unlock);
  }
  setTimeout(unlock, 1200); // 保険

  /* --------------------------------------------------------
     ヒーロー画像
     読み終わってから出す。キャッシュ済みなら complete が真。
  -------------------------------------------------------- */
  var heroMedia = document.querySelector('.hero__media');
  if (heroMedia) {
    var heroImg = heroMedia.querySelector('img');
    var showHero = function () { heroMedia.classList.add('is-loaded'); };
    if (heroImg) {
      if (heroImg.complete && heroImg.naturalWidth > 0) showHero();
      else {
        heroImg.addEventListener('load', showHero);
        heroImg.addEventListener('error', showHero); // 失敗しても暗幕だけは出す
      }
    }
  }

  /* --------------------------------------------------------
     ヘッダー
     ヒーローの上にいる間は白抜き、抜けたら白地＋罫線。
  -------------------------------------------------------- */
  var hd = document.getElementById('hd');
  var hero = document.querySelector('.hero');
  function updateHeader() {
    if (!hd) return;
    var y = window.pageYOffset;
    hd.classList.toggle('is-scrolled', y > 20);
    if (hero) {
      // ヒーロー下端からヘッダー高さぶん手前で切り替える
      var limit = hero.offsetHeight - hd.offsetHeight - 40;
      hd.classList.toggle('is-over-hero', y < limit);
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader);
  updateHeader();

  /* --------------------------------------------------------
     モバイルナビ
  -------------------------------------------------------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------------
     スクロールリビール
     遅延は CSS の [data-delay] が持つ。JS は is-in を足すだけ。
     一度出したら監視を外す（戻したときに再生し直さない）。
  -------------------------------------------------------- */
  var targets = document.querySelectorAll('[data-reveal],[data-reveal-clip]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* --------------------------------------------------------
     ページ内スクロール
     ヘッダーぶんのオフセットを引く。
  -------------------------------------------------------- */
  var easeOutQuart = function (t) { return 1 - Math.pow(1 - t, 4); };
  function scrollToY(y, dur) {
    var start = window.pageYOffset, diff = y - start, t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      window.scrollTo(0, start + diff * easeOutQuart(p));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = hd ? hd.offsetHeight : 60;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      scrollToY(Math.max(top, 0), 900);
    });
  });

  /* --------------------------------------------------------
     BASE 商品ウィジェット
     下の配列は GitHub Actions が BASE の sitemap.xml から
     1時間毎に自動で書き換える。手で編集しないこと。
  -------------------------------------------------------- */
  // NANJI_PRODUCTS_START
  var NANJI_PRODUCTS = [
    '153040253',
    '140474987',  ];
  // NANJI_PRODUCTS_END

  var storeGrid = document.getElementById('storeGrid');
  if (storeGrid && NANJI_PRODUCTS.length) {
    NANJI_PRODUCTS.forEach(function (id) {
      var f = document.createElement('iframe');
      f.src = 'https://nanji2025.base.shop/items/' + id + '/widget/';
      f.width = 240;
      f.height = 380;
      f.scrolling = 'no';
      f.loading = 'lazy';
      f.title = '乃 -NANJI- の商品';
      storeGrid.appendChild(f);
    });
  }
})();
