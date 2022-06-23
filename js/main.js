import "./components/button.js";
import "./components/video.js";
import "./components/carousel.js";
import "./components/calendar.js";

//Close the menu on click in the body
document.body.addEventListener(
  "click",
  () => document.getElementById("menu")?.classList.remove("is-open"),
);

//Scroll class to add/remove the class "is-scrolled"
const body = document.body;

if (body.classList.contains("needs-scroll")) {
  addEventListener("scroll", scrollNav);
  scrollNav();
}

function scrollNav() {
  if (window.scrollY > 10) {
    body.classList.add("is-scrolled");
  } else {
    body.classList.remove("is-scrolled");
  }
}