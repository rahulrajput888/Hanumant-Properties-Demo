/* ==========================================================================
   HANUMANT PROPERTIES — shared site script (multi-page)
   ========================================================================== */
(function () {
  "use strict";

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mqMobile = window.matchMedia("(max-width: 820px)");
  var mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");
  var isMobile = function () { return mqMobile.matches; };
  var isFine = function () { return mqFine.matches; };

  /* ------------------------------------------------------------- 1. storage */
  var mem = {};
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return mem[k] || null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { mem[k] = v; } }
  };

  /* -------------------------------------------------------------- 2. loader */
  (function loader() {
    var el = $("#loader");
    if (!el) { document.documentElement.classList.add("is-ready"); return; }
    var count = $("#loaderCount"), t0 = null;
    function tick(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / 2000, 1);
      if (count) count.textContent = Math.round(p * 100) + "%";
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    var t = setTimeout(function () {
      el.classList.add("is-done");
      document.documentElement.classList.add("is-ready");
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 700);
    }, 2000);
    window.addEventListener("pagehide", function () { clearTimeout(t); });
  })();

  /* ----------------------------------------------------- 3. page transition */
  (function transitions() {
    var wipe = $("#wipe");
    if (!wipe) return;
    var word = $(".wipe__word", wipe);
    var LABELS = {
      "index.html": "Home", "listings.html": "Listings", "services.html": "Services",
      "emi.html": "EMI Calculator", "about.html": "About Us", "contact.html": "Contact"
    };
    function samePage(file) {
      var here = location.pathname.split("/").pop() || "index.html";
      return file === here;
    }
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a") : null;
      if (!a) return;
      var href = a.getAttribute("href");
      if (!href) return;
      if (a.target === "_blank" || a.hasAttribute("download") || a.dataset.noWipe !== undefined) return;
      if (/^(https?:|mailto:|tel:|#|javascript:)/.test(href)) return;
      if (!/\.html($|[?#])/.test(href)) return;
      var file = href.split(/[?#]/)[0].split("/").pop();
      if (samePage(file)) return;
      e.preventDefault();
      wipe.classList.add("on");
      if (word) word.textContent = LABELS[file] || "Hanumant Properties";
      setTimeout(function () { window.location.href = href.split("#")[0]; }, reduce ? 40 : 560);
    }, true);
    window.addEventListener("pageshow", function () { wipe.classList.remove("on"); });
  })();

  /* -------------------------------------------------- 4. theme + chrome */
  var root = document.documentElement;
  function setTheme(t, announce) {
    root.setAttribute("data-theme", t);
    store.set("hp_theme", t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#0C1220" : "#F6F5F2");
    $$(".theme-toggle").forEach(function (b) { b.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode"); });
    if (announce) toast(t === "dark" ? "Dark mode on" : "Light mode on");
  }
  var savedTheme = store.get("hp_theme");
  setTheme(savedTheme === "dark" ? "dark" : "light", false);
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".theme-toggle")) setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
  });

  var header = $("#header"), fab = $("#fab"), ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-stuck", y > 8);
    if (fab) fab.classList.toggle("show", y > 560);
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  if (fab) fab.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });

  /* ------------------------------------------------------------ 5. drawer */
  var drawer = $("#drawer"), burger = $("#burger");
  function openDrawer() { if (!drawer) return; drawer.classList.add("open"); if (burger) { burger.classList.add("is-open"); burger.setAttribute("aria-expanded", "true"); burger.setAttribute("aria-label", "Close menu"); } document.body.classList.add("no-scroll"); }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("open");
    if (burger) { burger.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Open menu"); }
    var m = $("#propModal");
    if (!(m && m.classList.contains("open"))) document.body.classList.remove("no-scroll");
  }
  if (burger) burger.addEventListener("click", function () { drawer.classList.contains("open") ? closeDrawer() : openDrawer(); });
  if (drawer) drawer.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) closeDrawer();
    var a = e.target.closest ? e.target.closest("a") : null;
    if (a && /\.html/.test(a.getAttribute("href") || "")) closeDrawer();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var m = $("#propModal");
    if (m && m.classList.contains("open")) closeModal();
    else if (drawer && drawer.classList.contains("open")) closeDrawer();
  });

  (function markActive() {
    var here = location.pathname.split("/").pop() || "index.html";
    $$(".nav a, .drawer__links a, .mbar a").forEach(function (a) {
      var f = (a.getAttribute("href") || "").split(/[?#]/)[0].split("/").pop();
      if (f && f === here) a.setAttribute("aria-current", "page");
    });
  })();

  /* ------------------------------------------------------------ 6. motion */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: isMobile() ? 0.12 : 0.18, rootMargin: isMobile() ? "0px 0px -8% 0px" : "0px 0px -12% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else revealEls.forEach(function (el) { el.classList.add("is-in"); });

  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = reduce ? 0 : (isMobile() ? 1100 : 1500), t0 = null;
    function frame(ts) {
      if (!t0) t0 = ts;
      var p = dur ? Math.min((ts - t0) / dur, 1) : 1;
      el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  var counters = $$("[data-count]");
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (ens) {
      ens.forEach(function (en) { if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  } else counters.forEach(runCounter);

  var swaps = $$(".rotator .swap"), rIdx = 0, rTimer = null;
  function rotate() {
    if (reduce || swaps.length < 2) return;
    swaps[rIdx].classList.remove("on"); swaps[rIdx].classList.add("off");
    rIdx = (rIdx + 1) % swaps.length;
    swaps[rIdx].classList.remove("off"); swaps[rIdx].classList.add("on");
  }
  function startRotate() { if (!rTimer && !reduce && swaps.length) rTimer = setInterval(rotate, isMobile() ? 2400 : 2600); }
  function stopRotate() { clearInterval(rTimer); rTimer = null; }
  startRotate();
  document.addEventListener("visibilitychange", function () { document.hidden ? stopRotate() : startRotate(); });

  var filterBox = $("#filterForm"), filterToggle = $("#filterToggle"), filterBody = $("#filterBody");
  function setFilterCollapsed(c) {
    if (!filterBox) return;
    filterBox.classList.toggle("is-collapsed", c);
    filterToggle.setAttribute("aria-expanded", String(!c));
    filterBody.style.maxHeight = c ? "0px" : (filterBody.scrollHeight + 60) + "px";
  }
  function syncMobileUI() {
    if (!filterBox) return;
    if (isMobile()) { if (!filterBox.hasAttribute("data-init")) { setFilterCollapsed(true); filterBox.setAttribute("data-init", "1"); } }
    else { filterBox.classList.remove("is-collapsed"); filterBody.style.maxHeight = "none"; closeDrawer(); }
  }
  if (filterToggle) filterToggle.addEventListener("click", function () { setFilterCollapsed(!filterBox.classList.contains("is-collapsed")); });
  syncMobileUI();
  var rz;
  window.addEventListener("resize", function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      syncMobileUI();
      if (filterBox && isMobile() && !filterBox.classList.contains("is-collapsed")) filterBody.style.maxHeight = (filterBody.scrollHeight + 60) + "px";
    }, 180);
  });

  $$(".faq").forEach(function (faq) {
    var btn = $(".faq__q", faq), ans = $(".faq__a", faq);
    btn.addEventListener("click", function () {
      var open = faq.classList.contains("is-open");
      $$(".faq").forEach(function (f) { f.classList.remove("is-open"); $(".faq__q", f).setAttribute("aria-expanded", "false"); $(".faq__a", f).style.maxHeight = "0px"; });
      if (!open) { faq.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); ans.style.maxHeight = (ans.scrollHeight + 10) + "px"; }
    });
  });

  var qv = $("#quotesViewport"), qIdxEl = $("#quoteIdx");
  if (qv && qIdxEl) {
    var qt;
    qv.addEventListener("scroll", function () {
      clearTimeout(qt);
      qt = setTimeout(function () {
        var cards = $$(".quote", qv); if (!cards.length) return;
        var vr = qv.getBoundingClientRect(), mid = vr.left + vr.width / 2, best = 0, bd = Infinity;
        cards.forEach(function (c, i) { var r = c.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = i; } });
        qIdxEl.textContent = ("0" + (best + 1)).slice(-2);
      }, 90);
    }, { passive: true });
  }

  $$(".cards, .quotes-viewport").forEach(function (row) {
    row.addEventListener("scroll", function () { var h = $(".swipe-hint"); if (h) h.style.display = "none"; }, { passive: true, once: true });
  });

  /* --------------------------------------------------- 7. listings engine */
  var grid = $("#cardsGrid");
  var TYPE_LABEL = { plot: "Plot", flat: "Flat", floor: "Builder Floor", kothi: "Kothi", shop: "Shop / Office" };
  var LISTINGS = window.HP_LISTINGS || [];
  var saved = [];
  try { saved = JSON.parse(store.get("hp_saved") || "[]") || []; } catch (e) { saved = []; }

  function inr(n) { return "₹" + Number(n).toLocaleString("en-IN"); }
  function shortPrice(l) {
    if (l.purpose === "rent") return inr(l.price);
    var v = l.price, s;
    if (v >= 10000000) s = (v / 10000000).toFixed(2).replace(/\.00$/, "") + " Cr";
    else if (v >= 100000) s = (v / 100000).toFixed(2).replace(/\.00$/, "") + " L";
    else s = Number(v).toLocaleString("en-IN");
    return "₹" + s;
  }
  function fadeInImages(scope) {
    $$("img", scope).forEach(function (im) {
      if (im.complete && im.naturalWidth) { im.classList.add("is-loaded"); return; }
      im.addEventListener("load", function () { im.classList.add("is-loaded"); });
      im.addEventListener("error", function () { im.classList.add("is-loaded"); });
    });
  }
  function cardHTML(l, i) {
    var isSaved = saved.indexOf(l.id) > -1;
    var badge = l.purpose === "rent" ? '<span class="badge badge--rent">For Rent</span>' : '<span class="badge badge--sale">For Sale</span>';
    var specs = [];
    if (l.area) specs.push(l.area + " " + l.areaUnit);
    if (l.bedrooms) specs.push(l.bedrooms + " BHK");
    if (l.bathrooms) specs.push(l.bathrooms + " Bath");
    specs.push(TYPE_LABEL[l.type]);
    var t = l.title.replace(/&amp;/g, "and");
    return '' +
      '<article class="card card__anim" data-id="' + l.id + '" data-purpose="' + l.purpose + '" data-type="' + l.type + '" data-loc="' + l.locality + '" data-price="' + l.price + '" data-area="' + l.area + '" data-order="' + l.order + '" style="animation-delay:' + (i * 60) + 'ms">' +
        '<div class="card__art">' +
          '<img src="' + l.img + '" alt="' + l.alt + '" width="820" height="512" loading="' + (i < 3 ? "eager" : "lazy") + '" decoding="async" />' + badge +
          '<button class="card__save' + (isSaved ? " on" : "") + '" type="button" aria-label="Save ' + t + ' to shortlist" aria-pressed="' + isSaved + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4.7L5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="card__body">' +
          '<h3 class="card__title">' + l.title + '</h3>' +
          '<span class="card__loc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.4"/></svg>' + l.locality + '</span>' +
          '<div class="card__specs">' + specs.map(function (s) { return '<span class="spec">' + s + '</span>'; }).join("") + '</div>' +
          '<div class="card__foot">' +
            '<span class="price">' + shortPrice(l) + '<small>' + (l.purpose === "rent" ? "per month" : "expected") + '</small></span>' +
            '<span class="card__acts">' +
              '<button class="mini-btn js-details" type="button" aria-label="View details of ' + t + '">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg></button>' +
              '<a class="mini-btn mini-btn--wa" href="https://wa.me/919871314014?text=' + encodeURIComponent("Hi Hanumant Properties, I am interested in: " + t + " (" + l.locality + ").") + '" target="_blank" rel="noopener" aria-label="WhatsApp about ' + t + '">' +
                '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.2c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.7-.1-1.6-.5-3.6-2-4.8-4-.5-.8-.9-1.7-.9-2.4 0-.7.4-1.3.8-1.6.2-.2.4-.2.6-.2h.4c.2 0 .3.1.5.5l.6 1.4c0 .2 0 .3-.1.4l-.4.5c-.1.2-.2.3-.1.5.4.8 1.6 2 2.6 2.4.2.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.5-.1l1.4.7c.4.2.5.3.5.5s0 .8-.2 1.1Z"/></svg></a>' +
            '</span>' +
          '</div>' +
        '</div>' +
      '</article>';
  }
  function renderCards(list) {
    if (!grid) return;
    grid.innerHTML = list.map(cardHTML).join("");
    fadeInImages(grid);
    var none = list.length === 0, es = $("#emptyState");
    if (es) es.hidden = !none;
    grid.hidden = none;
    renderSavedState();
  }
  function renderSavedState() {
    var sc = $("#savedCount"); if (sc) sc.textContent = saved.length;
    var sn = $("#savedNote"); if (sn) sn.style.display = saved.length ? "block" : "none";
    $$(".js-saved-count").forEach(function (el) { el.textContent = saved.length; el.classList.toggle("on", saved.length > 0); });
  }
  var state = { q: "", purpose: "all", type: "all", loc: "all", sort: "featured" };
  function applyFilters() {
    if (!grid || !LISTINGS.length) return;
    var out = LISTINGS.filter(function (l) {
      if (state.purpose !== "all" && l.purpose !== state.purpose) return false;
      if (state.type !== "all" && l.type !== state.type) return false;
      if (state.loc !== "all" && l.locality !== state.loc) return false;
      if (state.q) {
        var hay = (l.title + " " + l.locality + " " + TYPE_LABEL[l.type] + " " + (l.features || []).join(" ")).toLowerCase();
        if (hay.indexOf(state.q.toLowerCase()) === -1) return false;
      }
      return true;
    });
    if (state.sort === "low") out.sort(function (a, b) { return a.price - b.price; });
    if (state.sort === "high") out.sort(function (a, b) { return b.price - a.price; });
    if (state.sort === "area") out.sort(function (a, b) { return b.area - a.area; });
    if (state.sort === "featured") out.sort(function (a, b) { return a.order - b.order; });
    var lim = grid.getAttribute("data-limit");
    if (lim) out = out.slice(0, parseInt(lim, 10));
    renderCards(out);
    var rc = $("#resultCount"); if (rc) rc.textContent = out.length + (out.length === 1 ? " option" : " options");
    if (isMobile() && grid.scrollTo) grid.scrollTo({ left: 0, behavior: "smooth" });
  }
  var fSearch = $("#fSearch"), fPurpose = $("#fPurpose"), fType = $("#fType"), fLoc = $("#fLoc"), fSort = $("#fSort"), deb;
  if (fSearch) fSearch.addEventListener("input", function () { clearTimeout(deb); deb = setTimeout(function () { state.q = fSearch.value.trim(); applyFilters(); }, 180); });
  if (fPurpose) fPurpose.addEventListener("change", function () { state.purpose = fPurpose.value; applyFilters(); });
  if (fType) fType.addEventListener("change", function () { state.type = fType.value; syncChips(state.type === "all" ? "all" : state.type); applyFilters(); });
  if (fLoc) fLoc.addEventListener("change", function () { state.loc = fLoc.value; applyFilters(); });
  if (fSort) fSort.addEventListener("change", function () { state.sort = fSort.value; applyFilters(); });
  function syncChips(v) { $$("[data-chip]").forEach(function (b) { b.classList.toggle("is-on", b.getAttribute("data-chip") === v); }); }
  var chipRow = $("#chipRow");
  if (chipRow) chipRow.addEventListener("click", function (e) {
    var b = e.target.closest("[data-chip]"); if (!b) return;
    var v = b.getAttribute("data-chip");
    state.type = v; if (fType) fType.value = v; syncChips(v); applyFilters();
  });
  var clearBtn = $("#clearFilters");
  if (clearBtn) clearBtn.addEventListener("click", function () {
    if (fSearch) fSearch.value = ""; if (fPurpose) fPurpose.value = "all"; if (fType) fType.value = "all";
    if (fLoc) fLoc.value = "all"; if (fSort) fSort.value = "featured";
    state = { q: "", purpose: "all", type: "all", loc: "all", sort: "featured" };
    syncChips("all"); applyFilters(); toast("Filters reset");
  });
  if (grid) grid.addEventListener("click", function (e) {
    var saveBtn = e.target.closest(".card__save");
    if (saveBtn) {
      var id = saveBtn.closest(".card").getAttribute("data-id"), idx = saved.indexOf(id);
      if (idx > -1) { saved.splice(idx, 1); saveBtn.classList.remove("on"); saveBtn.setAttribute("aria-pressed", "false"); toast("Removed from shortlist"); }
      else { saved.push(id); saveBtn.classList.add("on"); saveBtn.setAttribute("aria-pressed", "true"); toast("Saved to shortlist ✓"); }
      store.set("hp_saved", JSON.stringify(saved)); renderSavedState(); return;
    }
    var det = e.target.closest(".js-details");
    if (det) openDetails(det.closest(".card").getAttribute("data-id"));
  });

  /* ------------------------------------------------ 7b. details modal */
  var modal = $("#propModal"), modalTitle = $("#modalTitle"), modalBody = $("#modalBody"), lastFocus = null;
  function openDetails(id) {
    if (!modal) return;
    var l = LISTINGS.filter(function (x) { return x.id === id; })[0]; if (!l) return;
    lastFocus = document.activeElement;
    modalTitle.textContent = TYPE_LABEL[l.type] + " · " + l.locality;
    modalBody.innerHTML = '' +
      '<div style="border:1px solid var(--line);border-radius:var(--radius-sm);overflow:hidden;background:var(--surface-2)">' +
        '<img src="' + l.img + '" alt="' + l.alt + '" style="width:100%;display:block;aspect-ratio:16/10;object-fit:cover" />' +
      '</div>' +
      '<h3 style="font-size:clamp(21px,2.4vw,28px);margin:20px 0 8px">' + l.title + '</h3>' +
      '<p style="color:var(--muted);font-size:14.6px">' + l.notes + '</p>' +
      '<div class="kv">' +
        '<div><span>Price</span><b>' + shortPrice(l) + (l.purpose === "rent" ? " /month" : "") + '</b></div>' +
        '<div><span>Purpose</span><b>' + (l.purpose === "rent" ? "For Rent" : "For Sale") + '</b></div>' +
        '<div><span>Area</span><b>' + l.area + " " + l.areaUnit + '</b></div>' +
        '<div><span>Configuration</span><b>' + (l.bedrooms ? l.bedrooms + " BHK · " + l.bathrooms + " bath" : "Open / as per plan") + '</b></div>' +
        '<div><span>Floor</span><b>' + l.floor + '</b></div>' +
        '<div><span>Facing / Age</span><b>' + l.facing + " · " + l.age + '</b></div>' +
      '</div>' +
      '<p class="eyebrow" style="margin-bottom:12px">Highlights</p>' +
      '<div class="card__specs" style="margin-bottom:22px">' + (l.features || []).map(function (f) { return '<span class="spec">' + f + '</span>'; }).join("") + '</div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
        '<a class="btn btn--accent" style="flex:1 1 200px" href="tel:+919871314014">Call about this property</a>' +
        '<a class="btn btn--ghost" style="flex:1 1 200px" target="_blank" rel="noopener" href="https://wa.me/919871314014?text=' + encodeURIComponent("Hi, I saw this on your website: " + l.title.replace(/&amp;/g, "and") + " (" + l.id + ") at " + l.locality + ". Please share more details.") + '">WhatsApp details</a>' +
      '</div>' +
      '<p class="form__note" style="margin-top:14px">Demo listing data — connect your live inventory to make this real.</p>';
    fadeInImages(modalBody);
    modal.classList.add("open");
    document.body.classList.add("no-scroll");
    var cb = $("[data-close]", modal); if (cb) cb.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    if (!(drawer && drawer.classList.contains("open"))) document.body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (modal) modal.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) closeModal(); });

  /* ------------------------------------------------------------- 8. EMI */
  var eA = $("#emiAmount"), eR = $("#emiRate"), eT = $("#emiTenure");
  function calcEMI() {
    if (!eA) return;
    var P = +eA.value, annual = +eR.value, years = +eT.value;
    var r = annual / 12 / 100, n = years * 12;
    var emi = r > 0 ? (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : P / n;
    var total = emi * n, interest = total - P;
    $("#emiAmountVal").textContent = "₹ " + P.toLocaleString("en-IN");
    $("#emiRateVal").textContent = annual.toFixed(1) + "%";
    $("#emiTenureVal").textContent = years + (years === 1 ? " year" : " years");
    $("#emiOut").innerHTML = inr(Math.round(emi)) + '<span>/mo</span>';
    $("#emiTotal").textContent = inr(Math.round(total));
    $("#emiMonths").textContent = n + " months";
    $("#legPrincipal").textContent = inr(P);
    $("#legInterest").textContent = inr(Math.round(interest));
    var pct = (P / total) * 100;
    $("#barPrincipal").style.width = pct.toFixed(1) + "%";
    $("#barInterest").style.width = (100 - pct).toFixed(1) + "%";
  }
  if (eA) { [eA, eR, eT].forEach(function (el) { el.addEventListener("input", calcEMI); }); calcEMI(); }

  /* ----------------------------------------------------------- 9. forms */
  var form = $("#enquiryForm"), okMsg = $("#okMsg");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#cName").value.trim(), phone = $("#cPhone").value.replace(/\D/g, "");
    if (name.length < 2) { $("#cName").focus(); toast("Please enter your name"); return; }
    if (phone.length !== 10) { $("#cPhone").focus(); toast("Please enter a valid 10-digit mobile number"); return; }
    var text = "Hi Hanumant Properties,\nName: " + name + "\nMobile: " + phone +
      "\nPurpose: " + $("#cPurpose").value + "\nProperty type: " + $("#cType").value +
      ($("#cMsg").value.trim() ? "\nDetails: " + $("#cMsg").value.trim() : "");
    okMsg.classList.add("show");
    toast("Enquiry ready — opening WhatsApp");
    try { window.open("https://wa.me/919871314014?text=" + encodeURIComponent(text), "_blank"); } catch (err) {}
    form.reset();
  });

  /* ------------------------------------------------- 10. desktop extras */
  var glow = $("#cursorGlow");
  if (isFine() && !reduce) {
    window.addEventListener("mousemove", function (e) {
      if (glow) { glow.classList.add("on"); glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }
    }, { passive: true });
    var TILT_SEL = ".card, .svc, .quote, .shot, .tile", tiltTarget = null;
    document.addEventListener("mousemove", function (e) {
      if (!isFine()) return;
      var el = e.target.closest ? e.target.closest(TILT_SEL) : null;
      if (tiltTarget && tiltTarget !== el) { tiltTarget.style.setProperty("--rx", "0deg"); tiltTarget.style.setProperty("--ry", "0deg"); }
      tiltTarget = el; if (!el) return;
      var r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
      el.style.setProperty("--ry", (((e.clientX - r.left) / r.width - 0.5) * 3).toFixed(2) + "deg");
      el.style.setProperty("--rx", ((-((e.clientY - r.top) / r.height - 0.5)) * 3).toFixed(2) + "deg");
    }, { passive: true });
    document.addEventListener("mousemove", function (e) {
      var b = e.target.closest ? e.target.closest(".btn") : null; if (!b) return;
      var r = b.getBoundingClientRect();
      b.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      b.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    }, { passive: true });
  }

  /* ---------------------------------------------------------- 11. toast */
  var toastEl = $("#toast"), toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }
  window.hpToast = toast;

  $$(".js-year").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  renderSavedState();
  applyFilters();
})();
