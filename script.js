
const body = document.body;
const themeButton = document.getElementById("themeButton");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

const savedTheme = localStorage.getItem("studio-yumi-theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
}

function updateThemeButton() {
  const isDark = body.classList.contains("dark");
  themeButton.textContent = isDark ? "☀️" : "🌙";
  themeButton.setAttribute(
    "aria-label",
    isDark ? "Ativar tema claro" : "Ativar tema escuro"
  );
}

updateThemeButton();

themeButton.addEventListener("click", () => {
  body.classList.toggle("dark");

  const theme = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("studio-yumi-theme", theme);

  updateThemeButton();
});

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("open");

    button.setAttribute("aria-expanded", String(isOpen));
    button.querySelector("span").textContent = isOpen ? "−" : "＋";
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

document.getElementById("year").textContent = new Date().getFullYear();
