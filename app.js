// Live order book demo: a simulated market feed rendered the way I build real ones —
// updates are buffered and flushed once per animation frame, and only changed cells touch the DOM.
(() => {
  document.documentElement.classList.remove("no-js");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ticker
  const tape = document.getElementById("tape");
  if (tape) { const h = tape.innerHTML; tape.innerHTML = h + h + h + h; }

  // reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .1 });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));

  // copy email
  document.querySelectorAll("[data-copy]").forEach(b => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); const t = b.textContent; b.textContent = "Copied ✓"; setTimeout(() => b.textContent = t, 1600); } catch {}
  }));

  const ob = document.getElementById("ob");
  if (!ob) return;

  const LEVELS = 7, TICK = 0.05;
  const fmt = n => n.toFixed(2);
  const fmtQ = n => n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);
  let mid = 184.2, open = 184.2, last = mid, seq = 0, updates = 0, paused = false;
  const hist = Array.from({ length: 120 }, (_, i) => mid + Math.sin(i / 9) * 0.25 + (Math.random() - .5) * .1);

  const mk = (side) => {
    const body = ob.querySelector(`.${side} .rows`);
    return Array.from({ length: LEVELS }, () => {
      const r = document.createElement("div"); r.className = "ob-row";
      r.innerHTML = '<i class="ob-bar"></i><span class="p"></span><span class="sz"></span>';
      body.appendChild(r);
      return { el: r, bar: r.firstChild, p: r.children[1], q: r.children[2], price: 0, qty: 0 };
    });
  };
  const bids = mk("bid"), asks = mk("ask");
  const book = { bid: [], ask: [] };
  const rq = () => Math.round((Math.random() ** 2) * 4800 + 120);
  function rebuild() {
    const bb = Math.floor((mid - TICK / 2) / TICK) * TICK;
    for (let i = 0; i < LEVELS; i++) {
      const pb = +(bb - i * TICK).toFixed(2), pa = +(bb + TICK + i * TICK).toFixed(2);
      const ob_ = book.bid.find(l => l.price === pb), oa = book.ask.find(l => l.price === pa);
      book.bid[i] = ob_ ? { price: pb, qty: ob_.qty } : { price: pb, qty: rq() };
      book.ask[i] = oa ? { price: pa, qty: oa.qty } : { price: pa, qty: rq() };
    }
  }
  rebuild();

  const $ = s => ob.querySelector(s);
  const elLast = $(".ob-last"), elChg = $(".ob-chg"), elSpread = $("[data-spread]"), elUps = $("[data-ups]"), elFrame = $("[data-frame]"), elSeq = $("[data-seq]");
  const cv = $("canvas"), ctx = cv.getContext("2d");
  let dirty = true;

  function step() {
    if (paused) return;
    // random walk with mild mean reversion
    const drift = (open - mid) * 0.004;
    mid = Math.max(1, mid + drift + (Math.random() - .5) * TICK * 1.6);
    const n = 1 + (Math.random() * 3 | 0);
    for (let k = 0; k < n; k++) {
      const side = Math.random() < .5 ? book.bid : book.ask;
      const lvl = side[Math.random() * LEVELS | 0];
      lvl.qty = Math.max(50, Math.round(lvl.qty * (0.7 + Math.random() * 0.6)));
    }
    rebuild();
    last = Math.random() < .5 ? book.bid[0].price : book.ask[0].price;
    hist.push(last); if (hist.length > 120) hist.shift();
    seq++; updates++; dirty = true;
  }

  function paint(side, rows, data, max) {
    for (let i = 0; i < LEVELS; i++) {
      const r = rows[i], d = data[i];
      if (r.price !== d.price) { r.p.textContent = fmt(d.price); r.price = d.price; }
      if (r.qty !== d.qty) {
        if (r.qty && !reduce) { r.el.classList.remove("flash-up", "flash-down"); void r.el.offsetWidth; r.el.classList.add(d.qty > r.qty ? "flash-up" : "flash-down"); }
        r.q.textContent = fmtQ(d.qty); r.qty = d.qty;
      }
      r.bar.style.width = (d.qty / max * 100).toFixed(1) + "%";
    }
  }

  function chart() {
    const dpr = devicePixelRatio || 1, w = cv.clientWidth, h = cv.clientHeight;
    if (cv.width !== w * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
    const lo = Math.min(...hist) - .05, hi = Math.max(...hist) + .05;
    const x = i => i / (hist.length - 1) * w, y = v => h - 6 - (v - lo) / (hi - lo) * (h - 12);
    const up = last >= open, col = up ? "61,220,132" : "255,107,87";
    ctx.beginPath(); hist.forEach((v, i) => i ? ctx.lineTo(x(i), y(v)) : ctx.moveTo(0, y(v)));
    ctx.strokeStyle = `rgb(${col})`; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
    const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, `rgba(${col},.22)`); g.addColorStop(1, `rgba(${col},0)`);
    ctx.fillStyle = g; ctx.fill();
    ctx.setLineDash([3, 4]); ctx.strokeStyle = "rgba(143,150,138,.5)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, y(open)); ctx.lineTo(w, y(open)); ctx.stroke(); ctx.setLineDash([]);
  }

  let prevLast = last;
  function frame() {
    if (dirty) {
      const t0 = performance.now();
      const max = Math.max(...book.bid.map(l => l.qty), ...book.ask.map(l => l.qty));
      paint("bid", bids, book.bid, max); paint("ask", asks, book.ask, max);
      elLast.textContent = fmt(last);
      elLast.style.color = last > prevLast ? "var(--up)" : last < prevLast ? "var(--down)" : "";
      prevLast = last;
      const ch = (last - open) / open * 100;
      elChg.textContent = (ch >= 0 ? "+" : "") + ch.toFixed(2) + "%";
      elChg.className = "ob-chg " + (ch >= 0 ? "up" : "down");
      elSpread.textContent = fmt(book.ask[0].price - book.bid[0].price);
      elSeq.textContent = seq.toLocaleString();
      chart();
      elFrame.textContent = (performance.now() - t0).toFixed(2) + "ms";
      dirty = false;
    }
    requestAnimationFrame(frame);
  }

  // feed: bursts of messages, like a real stream
  const rate = reduce ? 900 : 140;
  setInterval(step, rate);
  setInterval(() => { elUps.textContent = paused ? "0" : String(updates); updates = 0; }, 1000);
  document.addEventListener("visibilitychange", () => { if (document.hidden) paused = true; else if (!userPaused) paused = false; });
  let userPaused = false;
  const btn = $(".ob-pause");
  btn.addEventListener("click", () => { userPaused = !userPaused; paused = userPaused; btn.textContent = userPaused ? "Resume" : "Pause"; btn.setAttribute("aria-pressed", userPaused); });
  addEventListener("resize", () => dirty = true);
  requestAnimationFrame(frame);
})();
