var menuButton = document.getElementById('burger-btn');
var menu = document.getElementById('menu');

menuButton.addEventListener('click', function() {
  document.querySelector('body').classList.toggle('fixed');
  menuButton.classList.toggle('active');
  menu.classList.toggle('right-0');
  console.log(0);
});