
  // INICIALIZAÇÃO DO SWIPER
var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 20,
  loop: true,
  breakpoints: {
    0: { // mobile
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 10,
    },
    768: { // desktop
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 20,
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


  // MENU HAMBURGUER
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  });
