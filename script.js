// Elementos do carousel
const carouselContainer = document.querySelector(".carousel-container");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slides = carouselContainer.querySelectorAll(".curso");
const totalSlides = slides.length;

// Configuração inicial
let currentSlide = 0;
let isTransitioning = false;

// Função para ir para um slide específico
function goToSlide(index) {
  if (isTransitioning) return;

  isTransitioning = true;
  currentSlide = index;

  // Garante que o índice esteja dentro dos limites
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;

  // Aplica a transição
  carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Reseta as informações abertas
  resetInfos();

  // Remove a classe de transição após a animação
  setTimeout(() => {
    isTransitioning = false;
  }, 600);
}

// Função para resetar informações abertas
function resetInfos() {
  slides.forEach((slide) => {
    const info = slide.querySelector(".info");
    const btn = slide.querySelector(".btn-info");
    if (info) info.classList.remove("show");
    if (btn) btn.textContent = "Ver detalhes do curso";
  });
}

// Eventos dos botões de navegação
prevBtn.addEventListener("click", () => {
  goToSlide(currentSlide - 1);
});

nextBtn.addEventListener("click", () => {
  goToSlide(currentSlide + 1);
});

// Navegação por teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    goToSlide(currentSlide - 1);
  } else if (e.key === "ArrowRight") {
    goToSlide(currentSlide + 1);
  }
});

// Evento para os botões "Ver detalhes do curso"
carouselContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-info")) {
    const slide = e.target.closest(".curso");
    const info = slide.querySelector(".info");
    const isOpen = info.classList.toggle("show");
    e.target.textContent = isOpen
      ? "Ocultar detalhes"
      : "Ver detalhes do curso";
  }
});

// Função para ir para a seção de detalhes específica
function goToDetails(courseIndex) {
  const detailsSection = document.getElementById("detalhe-cursos");
  const courseDetails = detailsSection.querySelectorAll(".detalhe-curso");

  if (courseDetails[courseIndex]) {
    // Scroll suave para a seção de detalhes
courseDetails[courseIndex].scrollIntoView({ behavior: "smooth", block: "center" });

    // Destaca o curso específico (opcional)
    courseDetails.forEach((detail, index) => {
      detail.style.opacity = index === courseIndex ? "1" : "0.7";
      detail.style.transform =
        index === courseIndex ? "scale(1.02)" : "scale(1)";
    });

    // Remove o destaque após 3 segundos
    setTimeout(() => {
      courseDetails.forEach((detail) => {
        detail.style.opacity = "1";
        detail.style.transform = "scale(1)";
      });
    }, 3000);
  }
}

// Adiciona botões "Ver detalhes completos" nos slides do carousel
slides.forEach((slide, index) => {
  const btnInfo = slide.querySelector(".btn-info");
  const btnDetails = document.createElement("button");
  btnDetails.className = "btn-details";
  btnDetails.textContent = "Ir para especificações";
  btnDetails.style.cssText = `
        margin-top: 10px;
        padding: 8px 24px;
        background: linear-gradient(45deg, #1DA1F2, #00cfff);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    `;

  btnDetails.addEventListener("click", () => {
    goToDetails(index);
  });

  btnDetails.addEventListener("mouseenter", () => {
    btnDetails.style.transform = "scale(1.05)";
    btnDetails.style.boxShadow = "0 4px 15px rgba(29, 161, 242, 0.4)";
  });

  btnDetails.addEventListener("mouseleave", () => {
    btnDetails.style.transform = "scale(1)";
    btnDetails.style.boxShadow = "none";
  });

  slide.appendChild(btnDetails);
});

// Eventos para os botões "Saiba Mais" dos cards UNIMAR
document.querySelectorAll(".card-pq .btn-mais").forEach((btn) => {
  btn.addEventListener("click", function () {
    // Fecha todos os outros blocos
    document.querySelectorAll(".card-pq .saiba-mais").forEach((div) => {
      if (div !== this.nextElementSibling) {
        div.classList.remove("show");
        const otherBtn = div.parentElement.querySelector(".btn-mais");
        if (otherBtn) {
          otherBtn.textContent = "Saiba Mais";
        }
      }
    });

    // Abre/fecha o bloco atual
    const info = this.nextElementSibling;
    if (info && info.classList.contains("saiba-mais")) {
      const isOpen = info.classList.toggle("show");
      this.textContent = isOpen ? "Ocultar Informações" : "Saiba Mais";
    }
  });
});

// Auto-play simples (opcional)
let autoPlayInterval;
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    if (!isTransitioning) {
      goToSlide(currentSlide + 1);
    }
  }, 4000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Pausa o auto-play quando o mouse está sobre o carousel
const carousel = document.querySelector(".carousel");
carousel.addEventListener("mouseenter", stopAutoPlay);
carousel.addEventListener("mouseleave", startAutoPlay);

// Inicia o auto-play
startAutoPlay();
