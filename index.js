import { locales } from "./locales.js";

(function initializeItems() {
  const list = document.getElementById("list");

  const template = list.querySelector(".item.template");

  for (const locale of locales) {
    const item = template.cloneNode(true);
    item.classList.remove("template");

    item.querySelector(".locale").textContent = locale;

    list.appendChild(item);
  }
})();

(function initializeTime() {
  const date = new Date("2025-01-02 03:04:05");

  const time = document.getElementById("time");
  time.value = `${date.toLocaleDateString("en-CA")}T${date.toLocaleTimeString(
    "en-GB"
  )}`;

  time.addEventListener("input", () => {
    const date = new Date(time.value);
    setItems(date);
  });

  setItems(date);
})();

function setItems(date) {
  const items = document.querySelectorAll(".item:not(.template)");
  items.forEach((item) => {
    const locale = item.querySelector(".locale").textContent;

    item.querySelector(".full").textContent = date.toLocaleString(locale);
    item.querySelector(".date").textContent = date.toLocaleDateString(locale);
    item.querySelector(".time").textContent = date.toLocaleTimeString(locale);
  });
}

(function initializeFilter() {
  const filter = document.getElementById("filter");

  const items = document.querySelectorAll(".item:not(.template)");
  const empty = document.getElementById("empty");

  filter.addEventListener("input", () => {
    if (filter.value.trim()) {
      const parts = filter.value.split(" ");

      let count = 0;

      items.forEach((item) => {
        const locale = item.querySelector(".locale").textContent;
        const full = item.querySelector(".full").textContent;
        const date = item.querySelector(".date").textContent;
        const time = item.querySelector(".time").textContent;

        const active = parts.every(
          (part) =>
            locale.includes(part) ||
            full.includes(part) ||
            date.includes(part) ||
            time.includes(part)
        );

        item.classList.toggle("active", active);

        if (active) {
          count++;
        }
      });

      empty.classList.toggle("active", count <= 0);
    } else {
      items.forEach((item) => {
        item.classList.add("active");
      });

      empty.classList.remove("active");
    }
  });
})();
