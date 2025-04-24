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
document.addEventListener("DOMContentLoaded", function () {
  // Guardar la posición actual del scroll
  const scrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;

  if (window.location.hash) {
    // 1. Ocultar temporalmente el scroll para evitar parpadeos
    document.body.style.overflow = "hidden";

    // 2. Ir inmediatamente al inicio
    window.scrollTo(0, 0);

    // 3. Eliminar el hash
    history.replaceState(null, null, " ");

    // 4. Restaurar el scroll después de un breve retraso
    setTimeout(function () {
      document.body.style.overflow = "";
      // Si por alguna razón se movió, volver a asegurar posición 0
      if (window.pageYOffset !== 0) {
        window.scrollTo(0, 0);
      }
    }, 10);
  }
});
