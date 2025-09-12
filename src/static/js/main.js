
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




//Formulario

  // MASCARA TELEFONE
  function mascara(o, f) {
    v_obj = o;
    v_fun = f;
    setTimeout("execmascara()", 1);
  }
  function execmascara() {
    v_obj.value = v_fun(v_obj.value);
  }
  function mtel(v) {
    v = v.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    return v;
  }
  function id(el) {
    return document.getElementById(el);
  }
  window.onload = function () {
    document.querySelectorAll(".telefone").forEach((tel) => {
      tel.addEventListener("keyup", function () {
        mascara(this, mtel);
      });
    });
  };

  // ENVIO DO FORMULÁRIO
  document.querySelectorAll(".form-cadastro").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let textForm = form.querySelector(".text-form");
      if (textForm) {
        form.querySelector(".text-form").classList.add("hidden");
      }

      let loadForm = form.querySelector(".load-form");
      if (loadForm) {
        form.querySelector(".load-form").classList.remove("hidden");
      }

      var formData = new FormData(this);
      var jsonData = Object.fromEntries(formData.entries());

      if (!jsonData["email"]) {
        var telefoneNumerico = jsonData["telefone"].replace(/\D/g, "");
        jsonData["email"] = `${telefoneNumerico}@sememail.com`;
      }

      jsonData["empreendimento"] = "Punta Cana Lagoon";
      jsonData["communications"] = true;

      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);

      var isZap = !!this.getAttribute("data-zap");

      jsonData["origem"] = urlParams.get("utm_source") || "direct";
      jsonData["meio"] = urlParams.get("utm_medium") || "direct";
      jsonData["campanha"] = urlParams.get("utm_campaign") || "direct";
      jsonData["origem"] += this.getAttribute("data-zap") ? "_zap" : "";

      console.log("Dados do formulário:", jsonData);

      let url = "https://acheiinterativa.com.br/portal/cadastro/punta/index.php";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro na requisiÃ§Ã£o: ${response.statusText}`);
          }
          return response.text();
        })
        .then((res) => {
          if (textForm) {
            form.querySelector(".text-form").classList.remove("hidden");
          }

          if (loadForm) {
            form.querySelector(".load-form").classList.add("hidden");
          }

          if (isZap) {
            let dataJson = "";

            try {
              dataJson = JSON.parse(res);

              if (dataJson && dataJson.wpp_link) {
                window.location.href = `${dataJson.wpp_link}`;
              }
            } catch (error) {
              window.location.href = `./agradecimento`;
            }
          } else {
            if (
              jsonData["interesse"].toUpperCase() === "BAIXAR BOOK" ||
              jsonData["interesse"].toUpperCase().includes("BOOK")
            ) {
              window.location.href = `./baixar-book/${queryString}${
                queryString ? "&book=sim" : "?book=sim"
              }`;
            } else if (jsonData["interesse"].toUpperCase() === "BAIXE A PLANTA") {
              window.location.href = `./agradecimento/${queryString}${
                queryString ? "&book=sim" : "?planta=sim"
              }`;
            } else {
              window.location.href = `./agradecimento/${queryString}`;
            }
          }
        })
        .catch((error) => {
          alert("Ocorreu um erro ao enviar o formulário. Tente novamente.");
          console.log(error);

          if (textForm) {
            form.querySelector(".text-form").classList.remove("hidden");
          }

          if (loadForm) {
            form.querySelector(".load-form").classList.add("hidden");
          }
        });
    });
  });