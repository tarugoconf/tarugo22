import Carousel from './vendor/@oom/carousel/carousel.js';
import Player from './vendor/@oom/carousel/player.js';

const button = document.querySelector('.navbar-menu-button');
const menu = document.querySelector('ul.navbar-menu');
const navbar = document.querySelector('.navbar');

//Open-close the menu
button.addEventListener('click', e => {
    menu.classList.toggle('is-open');
    e.stopPropagation();
});

//Close the menu on click in the body
document.body.addEventListener('click', e => menu.classList.remove('is-open'));

//Vimeo player
document.querySelectorAll('.video-ratio').forEach(el =>
    new Vimeo.Player('video', {
        id: el.dataset.id,
        title: false,
        byline: false,
        portrait: false,
        dnt: true,
        color: 'EBFF00'
    })
)

//Carousel
customElements.define('tarugo-carousel', Carousel);
