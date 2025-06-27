const nav = document.querySelector(".nav-links")
const menu = document.querySelector(".burger")
const links = document.querySelectorAll(".menu-link")
const main = document.querySelector('main')
const slider = document.querySelector('.recipes-section')
const cards = Array.from(slider.children);
const header = document.querySelector('header')

// Menu burger
menu.addEventListener("click",() => {
nav.classList.toggle("active")
main.classList.toggle('active');
})

links.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.toggle('active');
    main.classList.toggle('active');

  });
});

//Défilement carrousel "ondrag"

document.querySelector('.arrow-btn').addEventListener('click', () => {
  document.querySelector('#concept').scrollIntoView({ behavior: 'smooth' });
});

//Carrousel

for (let i = 0; i < 3; i++) {
  const clone = cards[i].cloneNode(true);
  slider.appendChild(clone);
}

for (let i = cards.length - 3; i < cards.length; i++) {
  const clone = cards[i].cloneNode(true);
  slider.insertBefore(clone, slider.firstChild);
}
slider.scrollLeft = slider.children[0].offsetWidth * 3;

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});

slider.addEventListener('scroll', () => {
  const cardWidth = slider.children[0].offsetWidth;
  if (slider.scrollLeft <= cardWidth * 1) {
    // scroll très à gauche (clone début), replacer vers la fin réelle
    slider.scrollLeft += cardWidth * cards.length;
  } else if (slider.scrollLeft >= cardWidth * (cards.length + 3)) {
    // scroll très à droite (clone fin), replacer vers le début réel
    slider.scrollLeft -= cardWidth * cards.length;
  }
});