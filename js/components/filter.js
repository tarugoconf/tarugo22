class Filter extends HTMLElement {
  connectedCallback() {
    const form = document.querySelector("form");
    const items = document.querySelectorAll(".item");
    
    const initialParams = new URLSearchParams(document.location.search);
    
    for (const name of initialParams.keys()) {
      if (name === "title") {
        form[name].checked = true;
      }
    }
    onChange(form, items);
    
    form.addEventListener("submit", (event) => {
      onChange(form, items);
      event.preventDefault();
    });
    form.addEventListener("change", () => onChange(form, items));
    form.addEventListener("input", () => onChange(form, items));
  }
}

function onChange(form, items) {
  const data = new FormData(form);
  filter(data, items);
  const permalink = new URLSearchParams(data);
  history.pushState({}, null, `?${permalink}`);
}

function filter(data, items) {
  const tags = [];

  for (const name of data.keys()) {
    tags.push(name);
  }

  items.forEach((item) => item.hidden = !matches(item, tags));
}

function matches(item, tags) {
  if (tags.length === 0) {
    return true;
  }

  const data = JSON.parse(item.dataset.tags);

  for (const tag of tags) {
    if (data.includes(parseInt(tag))) {
      return true;
    }
  }

  return false;
}

customElements.define("tarugo-filter", Filter);
