const button = document.querySelector('.navbar-menu-button');
const menu = document.querySelector('.navbar-menu');
const navbar = document.querySelector('.navbar');

//Open-close the menu
button.addEventListener('click', e => menu.classList.toggle('is-open'));

//Close the menu on click in the body
document.body.addEventListener('click', e => menu.classList.remove('is-open'));
navbar.addEventListener('click', e => e.stopPropagation());

//Vimeo player
const player = new Vimeo.Player('video', {
    title: false,
    byline: false,
    portrait: false,
    dnt: true,
    color: 'EBFF00'
});
