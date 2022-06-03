import "./components/button.js";
import "./components/video.js";

//Close the menu on click in the body
document.body.addEventListener(
  "click",
  () => document.getElementById("menu")?.classList.remove("is-open"),
);
