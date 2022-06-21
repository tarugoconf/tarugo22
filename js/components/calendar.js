class Calendar extends HTMLElement {
  connectedCallback() {
    const days = this.querySelectorAll(".calendar-day");
    let index = 1;
    days[index].classList.add("is-front");

    days.forEach((day, i) => {
      day.addEventListener("click", () => setCurrent(i));
    });

    function setCurrent(newIndex) {
      days[index].classList.remove("is-front");
      index = newIndex;
      days[index].classList.add("is-front");

      if (index === 0) {
        days[2].classList.add("is-back");
      } else {
        days[2].classList.remove("is-back");
      }

      if (index === 2) {
        days[0].classList.add("is-back");
      } else {
        days[0].classList.remove("is-back");
      }
    }
  }
}

customElements.define("tarugo-calendar", Calendar);
