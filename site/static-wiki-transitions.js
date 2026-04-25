(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ready = () => document.body.classList.add("page-ready");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(ready), { once: true });
  } else {
    requestAnimationFrame(ready);
  }

  window.addEventListener("pageshow", () => {
    document.body.classList.remove("page-leaving");
    requestAnimationFrame(ready);
  });

  if (reduceMotion) return;

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const link = event.target.closest("a[href]");
    if (!link || link.target && link.target !== "_self" || link.hasAttribute("download")) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    const destination = new URL(link.href, window.location.href);
    if (!isSameSite(destination) || isSameDocumentHash(destination)) return;

    event.preventDefault();
    document.body.classList.remove("page-ready");
    document.body.classList.add("page-leaving");
    window.setTimeout(() => {
      window.location.href = destination.href;
    }, 170);
  });

  function isSameSite(url) {
    const current = window.location;
    if (!["file:", "http:", "https:"].includes(url.protocol)) return false;
    return url.protocol === current.protocol && url.host === current.host;
  }

  function isSameDocumentHash(url) {
    const current = new URL(window.location.href);
    current.hash = "";
    const next = new URL(url.href);
    next.hash = "";
    return current.href === next.href && url.hash;
  }
}());
