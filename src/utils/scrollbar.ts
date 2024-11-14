let scrollTimer: number | null = null;

const showScrollbar = () => {
  document.body.style.setProperty("--scrollbar-opacity", "1");
};

const hideScrollbar = () => {
  document.body.style.setProperty("--scrollbar-opacity", "0");
};

export const initScrollbarBehavior = () => {
  // Add CSS variable for opacity
  document.body.style.setProperty("--scrollbar-opacity", "0");

  // Add dynamic styles
  const style = document.createElement("style");
  style.textContent = `
    body::-webkit-scrollbar {
      opacity: var(--scrollbar-opacity);
      transition: opacity 0.3s ease;
    }
  `;
  document.head.appendChild(style);

  // Event listeners
  window.addEventListener("scroll", () => {
    showScrollbar();

    if (scrollTimer !== null) {
      window.clearTimeout(scrollTimer);
    }

    scrollTimer = window.setTimeout(() => {
      hideScrollbar();
    }, 1500); // Hide after 1.5 seconds of no scrolling
  });

  // Show on hover
  document.body.addEventListener("mousemove", (e) => {
    const rightEdge = window.innerWidth - 20; // 20px from right edge
    if (e.clientX > rightEdge) {
      showScrollbar();
    }
  });
};
