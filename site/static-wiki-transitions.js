(function () {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transitionDuration = 120;
  const transitionKey = "cyberMingContentTransition";
  const ready = () => {
    document.body.classList.add("page-ready");
    root.classList.remove("page-leaving");
    if (takeTransitionFlag()) {
      root.classList.add("page-arriving");
      requestAnimationFrame(() => root.classList.remove("page-arriving"));
    } else {
      root.classList.remove("page-arriving");
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(ready), { once: true });
  } else {
    requestAnimationFrame(ready);
  }

  window.addEventListener("pageshow", () => {
    root.classList.remove("page-leaving");
    requestAnimationFrame(ready);
  });

  if (reduceMotion) return;

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    if (!(event.target instanceof Element)) return;

    const link = event.target.closest("a[href]");
    if (!link || link.target && link.target !== "_self" || link.hasAttribute("download")) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    const destination = new URL(link.href, window.location.href);
    if (!isSameSite(destination) || isSameDocumentHash(destination)) return;

    event.preventDefault();
    setTransitionFlag();
    root.classList.remove("page-arriving");
    root.classList.add("page-leaving");
    window.setTimeout(() => {
      window.location.href = destination.href;
    }, transitionDuration);
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

  function setTransitionFlag() {
    try {
      window.sessionStorage.setItem(transitionKey, "1");
    } catch {
      // Storage can be unavailable in hardened browser contexts.
    }
  }

  function takeTransitionFlag() {
    try {
      const value = window.sessionStorage.getItem(transitionKey);
      window.sessionStorage.removeItem(transitionKey);
      return value === "1";
    } catch {
      return false;
    }
  }
}());
