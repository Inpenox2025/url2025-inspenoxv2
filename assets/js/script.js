// ✅ Theme Toggle Function
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute("data-bs-theme") === "dark";
  html.setAttribute("data-bs-theme", isDark ? "light" : "dark");

  updateThemeIcon();
  updateNavbarTheme();
}

// ✅ Update Theme Icon
function updateThemeIcon() {
  const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";
  const iconClass = isDark ? "bi-sun-fill text-warning" : "bi-moon-fill text-dark";

  const desktopIcon = document.getElementById("themeToggleIconDesktop");
  const mobileIcon = document.getElementById("themeToggleIconMobile");

  if (desktopIcon) desktopIcon.className = `bi ${iconClass}`;
  if (mobileIcon) mobileIcon.className = `bi ${iconClass}`;
}

// ✅ Update Navbar Theme (light/dark class)
function updateNavbarTheme() {
  const navbar = document.getElementById("navbar");
  const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";

  navbar.classList.toggle("navbar-dark", isDark);
  navbar.classList.toggle("navbar-light", !isDark);
}

// ✅ Collapse Navbar
function collapseNavbar(navbarCollapse, toggler) {
  const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
  bsCollapse.hide();
  toggler.classList.remove("active");
}

// ✅ DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const navMenu = document.getElementById("navMenu");
  const toggler = document.querySelector(".custom-toggler");

  updateThemeIcon();
  updateNavbarTheme();

  // ✅ Toggle class when toggler is clicked
  if (toggler) {
    toggler.addEventListener("click", function () {
      toggler.classList.toggle("active");
    });
  }

  // ✅ Collapse on nav-link click
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 992 && navMenu.classList.contains("show")) {
        collapseNavbar(navMenu, toggler);
      }
    });
  });

  // ✅ Collapse on outside click
  document.addEventListener("click", function (e) {
    if (
      window.innerWidth < 992 &&
      navMenu.classList.contains("show") &&
      !navMenu.contains(e.target) &&
      !toggler.contains(e.target)
    ) {
      collapseNavbar(navMenu, toggler);
    }
  });

  // ✅ Collapse on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (window.innerWidth < 992 && navMenu.classList.contains("show")) {
      collapseNavbar(navMenu, toggler);
    }

    updateNavbarTheme();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-in").forEach(el => io.observe(el));
});

// ✅ Add solid background when mobile menu is open
const navMenu = document.getElementById("navMenu");

if (navMenu) {
  navMenu.addEventListener("shown.bs.collapse", () => {
    navbar.classList.add("bg-body");
    navbar.classList.remove("transparent");
  });

  navMenu.addEventListener("hidden.bs.collapse", () => {
    navbar.classList.remove("bg-body");
    navbar.classList.add("transparent");
  });
}
