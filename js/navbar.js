const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("main-menu");
const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);

// Función para alternar el menú
function toggleMenu() {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", !isExpanded);
  menu.classList.toggle("active");
  overlay.classList.toggle("active");

  // Bloquear/desbloquear scroll del body
  document.body.style.overflow = isExpanded ? "auto" : "hidden";
}

// Event listeners
menuButton.addEventListener("click", toggleMenu);

// Cerrar menú al hacer clic en overlay o presionar Escape
overlay.addEventListener("click", toggleMenu);

// Cerrar menú al hacer clic en un enlace (para SPA)
document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      toggleMenu();
    }
  });
});



