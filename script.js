// Seleciona elementos
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const closeMenuButton = document.querySelector('.close-menu');

// Abre o menu ao clicar no botão hambúrguer
menuToggle.addEventListener('click', () => {
  menu.classList.add('active');
});

// Fecha o menu ao clicar no botão "X"
closeMenuButton.addEventListener('click', () => {
  menu.classList.remove('active');
});

// Fecha o menu ao clicar em qualquer link dentro do menu
menu.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    menu.classList.remove('active');
  }
});

// Fecha o menu ao clicar fora do menu
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
    menu.classList.remove('active');
  }
});
