class Buttons extends HTMLElement {
  connectedCallback() {
    this.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.click(button);
      });
    });
  }

  click(button) {
    const { action, target } = button.dataset;

    switch (action) {
      case "close":
        close(target, button);
        break;

      case "open":
        open(this, target);
        break;

      case "toggle":
        toggle(target);
        break;
    }
  }
}

function close(target, button) {
  const dialog = target
    ? document.getElementById(target)
    : button.closest("dialog");

  if (dialog) {
    dialog.close();
  }
}

function open(root, target) {
  const dialog = target
    ? document.getElementById(target)
    : root.parentElement.querySelector("dialog");

  if (dialog) {
    dialog.showModal();
  }
}

function toggle(target, button) {
  const element = target ? document.getElementById(target) : button;

  element.classList.toggle("is-open");
}

customElements.define("tarugo-buttons", Buttons);
