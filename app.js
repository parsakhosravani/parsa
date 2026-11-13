(() => {
  document.documentElement.classList.remove("no-js");

  // fade paragraphs and photos in as they enter
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));

  // copy email
  document.querySelectorAll("[data-copy]").forEach(b => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); const t = b.textContent; b.textContent = "Copied"; setTimeout(() => b.textContent = t, 1600); } catch {}
  }));

  const bar = document.querySelector(".bar");
  const now = document.querySelector(".bar .now");
  const prog = document.querySelector(".progress");
  const rail = document.querySelector(".rail");
  const fill = rail && rail.querySelector(".fill");
  const stops = rail ? [...rail.querySelectorAll("li")] : [];
  const chapters = [...document.querySelectorAll("[data-stop]")];
  if (!bar) return;

  let ticking = false;
  function update() {
    ticking = false;
    const y = scrollY, vh = innerHeight, max = document.documentElement.scrollHeight - vh;
    prog.style.width = (max > 0 ? y / max * 100 : 0) + "%";
    bar.classList.toggle("solid", y > vh * .6);

    // which chapter are we reading?
    let idx = -1;
    chapters.forEach((c, i) => { if (c.getBoundingClientRect().top < vh * .45) idx = i; });
    const cur = chapters[idx];
    now.textContent = cur ? cur.dataset.stop : "";
    if (rail) {
      rail.classList.toggle("on", idx >= 0);
      stops.forEach((s, i) => { s.classList.toggle("done", i < idx); s.classList.toggle("here", i === idx); });
      // the line fills smoothly between stops
      if (idx >= 0 && stops[idx]) {
        const nextC = chapters[idx + 1];
        const start = cur.offsetTop, end = nextC ? nextC.offsetTop : document.documentElement.scrollHeight;
        const t = Math.min(1, Math.max(0, (y + vh * .45 - start) / (end - start)));
        const a = stops[idx].offsetTop, b = stops[idx + 1] ? stops[idx + 1].offsetTop : a;
        fill.style.height = (a + (b - a) * t) + "px";
      } else fill.style.height = "0px";
    }
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener("resize", update);
  update();
})();

(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  // reading lamp
  const lamp = document.querySelector(".lamp");
  if (lamp) {
    const sync = () => { const on = root.classList.contains("night"); lamp.setAttribute("aria-pressed", on); lamp.title = on ? "Back to daylight" : "Reading lamp"; };
    sync();
    lamp.addEventListener("click", () => {
      root.classList.toggle("night");
      try { localStorage.setItem("lamp", root.classList.contains("night") ? "1" : "0"); } catch {}
      sync();
    });
  }

  // emblems draw themselves
  document.querySelectorAll(".emb *").forEach(el => el.setAttribute("pathLength", "1"));

  // flights between chapters follow the scroll
  const flights = [...document.querySelectorAll(".transit")].map(t => {
    const line = t.querySelector(".t-line"), plane = t.querySelector(".t-plane");
    return { t, line, plane, len: line.getTotalLength() };
  });
  let busy = false;
  function fly() {
    busy = false;
    const vh = innerHeight;
    flights.forEach(f => {
      const r = f.t.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      let p = (vh * .85 - r.top) / (vh * .6);
      p = Math.min(1, Math.max(0, p));
      if (reduce) p = p > 0 ? 1 : 0;
      f.line.style.strokeDashoffset = 1 - p;
      const d = Math.max(0.001, Math.min(f.len - 0.001, p * f.len));
      const a = f.line.getPointAtLength(d), b = f.line.getPointAtLength(Math.min(f.len, d + 1));
      const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
      f.plane.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${ang})`);
    });
  }
  if (flights.length) {
    addEventListener("scroll", () => { if (!busy) { busy = true; requestAnimationFrame(fly); } }, { passive: true });
    addEventListener("resize", fly); fly();
  }

  // the lucky wheel
  document.querySelectorAll("[data-wheel]").forEach(box => {
    const prizes = JSON.parse(box.dataset.wheel), notes = JSON.parse(box.dataset.notes);
    const rot = box.querySelector(".spin-rot"), btn = box.querySelector(".spin-btn"), out = box.querySelector(".spin-out");
    let angle = 0, spins = 0;
    btn.addEventListener("click", () => {
      btn.disabled = true; out.textContent = "";
      // the house is generous: the first spin never lands on "Nothing!"
      const i = spins++ === 0 ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * prizes.length);
      const target = 360 - (i * 60 + 30) + (Math.random() * 30 - 15);
      angle += 360 * 5 + ((target - angle) % 360 + 360) % 360;
      rot.style.transform = `rotate(${angle}deg)`;
      setTimeout(() => {
        const p = prizes[i];
        const href = p.href === "__NOTE__" ? notes[Math.floor(Math.random() * notes.length)] : p.href;
        out.innerHTML = "";
        out.append(p.msg + " ");
        if (href) { const a = document.createElement("a"); a.href = href; a.textContent = p.go + " →"; out.append(a); }
        btn.disabled = false; btn.textContent = "Spin again";
      }, reduce ? 50 : 4300);
    });
  });

  // chapter five types itself
  const ty = document.querySelector("[data-type]");
  if (ty && !reduce) {
    const full = ty.textContent;
    ty.parentElement.setAttribute("aria-label", full);
    ty.textContent = "";
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let n = 0;
      const step = () => { ty.textContent = full.slice(0, ++n); if (n < full.length) setTimeout(step, 70 + Math.random() * 90); };
      setTimeout(step, 400);
    }, { threshold: .6 });
    io.observe(ty.parentElement);
  }
})();
