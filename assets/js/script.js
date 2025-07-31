document.addEventListener("DOMContentLoaded", () => {
  // THEME FUNCTIONS
  function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon();
    updateNavbarTheme();
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";
    const iconClass = isDark ? "bi-sun-fill text-warning" : "bi-moon-fill text-dark";
    const desktopIcon = document.getElementById("themeToggleIconDesktop");
    const mobileIcon = document.getElementById("themeToggleIconMobile");

    if (desktopIcon) desktopIcon.className = `bi ${iconClass}`;
    if (mobileIcon) mobileIcon.className = `bi ${iconClass}`;
  }

  function updateNavbarTheme() {
    const navbar = document.getElementById("navbar");
    const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";

    if (navbar) {
      navbar.classList.toggle("navbar-dark", isDark);
      navbar.classList.toggle("navbar-light", !isDark);
    }
  }

  // INITIALIZE THEME
  setTheme(getPreferredTheme());

  // LISTEN TO SYSTEM THEME CHANGES
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const systemTheme = e.matches ? 'dark' : 'light';
      setTheme(systemTheme);
    }
  });

  // TOGGLE THEME BUTTON
  const themeToggleBtn = document.getElementById("themeToggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // NAVBAR TOGGLE + COLLAPSE
  const navbar = document.getElementById("navbar");
  const navMenu = document.getElementById("navMenu");
  const toggler = document.querySelector(".custom-toggler");

  function collapseNavbar(navbarCollapse, toggler) {
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
    bsCollapse.hide();
    if (toggler) toggler.classList.remove("active");
  }

  // Toggle icon class on toggler click
  if (toggler) {
    toggler.addEventListener("click", () => {
      toggler.classList.toggle("active");
    });
  }

  // Collapse on nav-link click
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992 && navMenu?.classList.contains("show")) {
        collapseNavbar(navMenu, toggler);
      }
    });
  });

  // Collapse on outside click
  document.addEventListener("click", (e) => {
    if (
      window.innerWidth < 992 &&
      navMenu?.classList.contains("show") &&
      !navMenu.contains(e.target) &&
      !toggler.contains(e.target)
    ) {
      collapseNavbar(navMenu, toggler);
    }
  });

  // Collapse on scroll + navbar style
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    if (window.innerWidth < 992 && navMenu?.classList.contains("show")) {
      collapseNavbar(navMenu, toggler);
    }

    updateNavbarTheme();
  });

  // Intersection Observer for fade-in
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-in").forEach(el => io.observe(el));

  // Menu background when opened
  if (navMenu) {
    navMenu.addEventListener("shown.bs.collapse", () => {
      navbar?.classList.add("bg-body");
      navbar?.classList.remove("transparent");
    });

    navMenu.addEventListener("hidden.bs.collapse", () => {
      navbar?.classList.remove("bg-body");
      navbar?.classList.add("transparent");
    });
  }
});
