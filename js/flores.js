document.addEventListener("DOMContentLoaded", function () {
  // 1. Seleccionar elementos del slider
  const contenedorSlider = document.querySelector(".slider");
  const elementosSlide = document.querySelectorAll(".slide");
  const botonAnterior = document.querySelector(".prev");
  const botonSiguiente = document.querySelector(".next");

  // 2. Variables de estado
  let indiceActual = 0; // Índice del slide que se muestra primero
  let cantidadSlidesVisibles = 1; // Cuántos slides caben en el contenedor

  /**
   * Actualiza 'cantidadSlidesVisibles' según el ancho de la ventana.
   * Se encarga de definir cuántos slides se deben mostrar en distinto 'breakpoints'.
   */
  function actualizarCantidadVisibles() {
    if (window.innerWidth >= 1200) {
      cantidadSlidesVisibles = 4;
    } else if (window.innerWidth >= 900) {
      cantidadSlidesVisibles = 3;
    } else if (window.innerWidth >= 600) {
      cantidadSlidesVisibles = 2;
    } else {
      cantidadSlidesVisibles = 1;
    }
  }

  /**
   * Desplaza el contenedor de slides según 'indiceActual'.
   * Calcula el porcentaje de desplazamiento y lo aplica con CSS transform.
   * También habilita o deshabilita los botones si estamos en los extremos.
   */
  function actualizarSlider() {
    // 3. Recalcular cuántos slides podemos mostrar
    actualizarCantidadVisibles();

    // 4. Calcular porcentaje de desplazamiento (-indice * ancho de cada slide)
    const anchoSlide = 100 / cantidadSlidesVisibles;
    const desplazamiento = -indiceActual * anchoSlide;
    contenedorSlider.style.transform = `translateX(${desplazamiento}%)`;

    // 5. Habilitar o deshabilitar botones cuando alcance los extremos
    botonAnterior.disabled = indiceActual === 0;
    botonSiguiente.disabled = indiceActual >= elementosSlide.length - cantidadSlidesVisibles;
  }

  /**
   * Disminuye 'indiceActual' para mostrar el slide anterior si existe.
   */
  function irAnterior() {
    if (indiceActual > 0) {
      indiceActual--;
      actualizarSlider();
    }
  }

  /**
   * Aumenta 'indiceActual' para mostrar el siguiente slide si existe.
   */
  function irSiguiente() {
    if (indiceActual < elementosSlide.length - cantidadSlidesVisibles) {
      indiceActual++;
      actualizarSlider();
    }
  }

  // 6. Asociar eventos de click a los botones
  botonAnterior.addEventListener("click", irAnterior);
  botonSiguiente.addEventListener("click", irSiguiente);

  // 7. Al cambiar tamaño de ventana, recalcular y ajustar estados
  window.addEventListener("resize", function () {
    actualizarCantidadVisibles();
    const indiceMaximo = Math.max(0, elementosSlide.length - cantidadSlidesVisibles);
    if (indiceActual > indiceMaximo) indiceActual = indiceMaximo;
    actualizarSlider();
  });

  // 8. Inicializar slider al cargar la página
  actualizarCantidadVisibles();
  actualizarSlider();
});
