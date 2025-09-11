
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


  // FUNÇÃO PARA ABRIR E FECHAR O MODAL
  function openModal(titulo, zap = false) {
    var modal = document.querySelector(".modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.querySelector('[name="interesse"]').value = titulo;
    modal.querySelector(".modal-title").innerHTML = titulo;
    var form = modal.querySelector("form");
    if (zap) {
      form.setAttribute("data-zap", "sim");
    } else {
      form.removeAttribute("data-zap");
    }
  }
  function closeModal() {
    var modal = document.querySelector(".modal");
    modal.classList.add("hidden");
  }


  // MODAL DE IMAGEM
  function openImageModal(src) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    modalImage.src = src;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // trava scroll
  }

  function closeImageModal() {
    const modal = document.getElementById("imageModal");
    modal.classList.add("hidden");
    document.body.style.overflow = ""; // libera scroll
  }

  // Fechar clicando fora da imagem
  document.getElementById("imageModal").addEventListener("click", function (e) {
    if (e.target === this) {
      closeImageModal();
    }
  });

  // Fechar com ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeImageModal();
    }
  });
