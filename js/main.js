import "./components/button.js";
import "./components/video.js";
import "./components/carousel.js";
import "./components/calendar.js";

//Close the menu on click in the body
document.body.addEventListener(
  "click",
  () => document.getElementById("menu")?.classList.remove("is-open"),
);
