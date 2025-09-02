// Seleciona elementos do carousel
const wrapper = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let cursos = wrapper.querySelectorAll('.curso');
const totalCursos = cursos.length;

// Clona o primeiro e o último slide para criar efeito de loop infinito
const firstClone = cursos[0].cloneNode(true);
const lastClone = cursos[totalCursos - 1].cloneNode(true);

firstClone.classList.add('clone');
lastClone.classList.add('clone');

wrapper.appendChild(firstClone);
wrapper.insertBefore(lastClone, cursos[0]);

let currentIndex = 1; // Começa no primeiro slide real
let allSlides = wrapper.querySelectorAll('.curso');
const slideWidth = 100; // Largura de cada slide em %

wrapper.style.transform = `translateX(-${slideWidth * currentIndex}%)`;

let isTransitioning = false; // Evita múltiplas transições ao mesmo tempo

// Fecha todos os blocos de informações e reseta texto dos botões no carousel
function resetInfos() {
    allSlides.forEach(slide => {
        const info = slide.querySelector('.info');
        const btn = slide.querySelector('.btn-info');
        if (info) info.classList.remove('show');
        if (btn) btn.textContent = 'Mais informações';
    });
}

// Função para ir para um slide específico
function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    wrapper.style.transition = 'transform 0.6s ease-in-out';
    wrapper.style.transform = `translateX(-${slideWidth * index}%)`;
    currentIndex = index;
    resetInfos();
}

// Evento ao terminar a transição do carousel
wrapper.addEventListener('transitionend', () => {
    allSlides = wrapper.querySelectorAll('.curso');
    // Se estiver em um clone, volta para o slide real correspondente sem animação
    if (allSlides[currentIndex].classList.contains('clone')) {
        wrapper.style.transition = 'none';
        if (currentIndex === 0) {
            currentIndex = totalCursos;
        } else if (currentIndex === allSlides.length - 1) {
            currentIndex = 1;
        }
        wrapper.style.transform = `translateX(-${slideWidth * currentIndex}%)`;
    }
    isTransitioning = false;
});

// Botão próximo do carousel
nextBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    goToSlide(currentIndex + 1);
});

// Botão anterior do carousel
prevBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    goToSlide(currentIndex - 1);
});

// Delegação de evento para os botões "Mais informações" do carousel
wrapper.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-info')) {
        const slide = e.target.closest('.curso');
        const info = slide.querySelector('.info');
        const isOpen = info.classList.toggle('show');
        e.target.textContent = isOpen ? 'Ocultar Informações' : 'Mais informações';
    }
});

// Botão "Saiba Mais" dos cards fora do carousel
document.querySelectorAll('.card-pq .btn-mais').forEach((btn) => {
  btn.addEventListener('click', function() {
    // Fecha todos os outros blocos de informação e reseta texto dos outros botões
    document.querySelectorAll('.card-pq .saiba-mais').forEach(div => {
      if (div !== this.nextElementSibling) {
        div.classList.remove('show');
        const otherBtn = div.parentElement.querySelector('.btn-mais');
        if (otherBtn) {
          otherBtn.textContent = 'Saiba Mais';
          otherBtn.classList.remove('open');
        }
      }
    });
    // Abre/fecha o bloco de informação do card clicado e alterna texto/classe do botão
    const info = this.nextElementSibling;
    if (info && info.classList.contains('saiba-mais')) {
      const isOpen = info.classList.toggle('show');
      this.textContent = isOpen ? 'Ocultar Informações' : 'Saiba Mais';
      this.classList.toggle('open', isOpen);
    }
  });
});