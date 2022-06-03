import Player from "../deps/vimeo-player.es.js";

const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--color-primary");
const color = primaryColor.replace("#", "").trim();

class Video extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", () => {
      this.classList.add("is-loaded");
      new Player(this.id, {
        id: this.dataset.id,
        autoplay: true,
        title: false,
        byline: false,
        portrait: false,
        dnt: true,
        color,
      });
    }, { once: true });
  }
}

customElements.define("tarugo-video", Video);
