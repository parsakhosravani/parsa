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
