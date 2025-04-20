document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 0;
  let slidesToShow = 1;

  function updateSlidesToShow() {
    if (window.innerWidth >= 900) {
      slidesToShow = 3;
    } else if (window.innerWidth >= 600) {
      slidesToShow = 2;
    } else {
      slidesToShow = 1;
    }
  }

  function updateSlider() {
    const slideWidth = 100 / slidesToShow;
    const translateX = -currentIndex * slideWidth;
    slider.style.transform = `translateX(${translateX}%)`;

    // Deshabilitar botones cuando no hay más slides
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= slides.length - slidesToShow;
  }

  function goToPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  function goToNext() {
    if (currentIndex < slides.length - slidesToShow) {
      currentIndex++;
      updateSlider();
    }
  }

  prevBtn.addEventListener("click", goToPrev);
  nextBtn.addEventListener("click", goToNext);

  window.addEventListener("resize", function () {
    updateSlidesToShow();
    // Ajustar currentIndex para no exceder el límite
    const maxIndex = Math.max(0, slides.length - slidesToShow);
    currentIndex = Math.min(currentIndex, maxIndex);
    updateSlider();
  });

  // Inicializar
  updateSlidesToShow();
  updateSlider();
});
