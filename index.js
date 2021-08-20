function removeElement() {
  const resultsEl = document.querySelectorAll(".result-item");

  resultsEl.forEach((element) => {
    element.remove();
  });
}

function redirectToMl(data, i) {
  const titleElements = document.querySelectorAll(".result-item-title");
  const URL = data.permalink;
  titleElements[i].addEventListener("click", (e) => {
    window.open(URL);
  });
}

function showTitle(data, template) {
  const titleEl = template.content.querySelector(".result-item-title");
  titleEl.textContent = data.title;
}

function showCondition(data, template) {
  const conditionEl = template.content.querySelector(".result-item-condition");

  const condition = data.attributes[1].value;

  if (condition) {
    conditionEl.textContent = condition;
  }
}

function showImage(data, template) {
  const imageEl = template.content.querySelector(".result-item-img");
  imageEl.src = data.thumbnail;
}

function showSoldItems(data, template) {
  const soldCountEl = template.content.querySelector(
    ".result-item-sell-count-num"
  );
  soldCountEl.textContent = data.sold_quantity;
}

function showPrice(data, template) {
  const priceEl = template.content.querySelector(".result-item-price");
  priceEl.textContent = "$" + data.price;
}

function clone(container, template) {
  const clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function showResultsInPage(datita) {
  const contenedor = document.querySelector(".results");
  const template = document.querySelector("#results-template");

  const resultCountEl = document.querySelector(".results-count");
  resultCountEl.textContent = datita.length;

  datita.forEach((el, i) => {
    showTitle(el, template);
    showCondition(el, template);
    showImage(el, template);
    showSoldItems(el, template);
    showPrice(el, template);
    clone(contenedor, template);
    redirectToMl(el, i);
  });
}

function connectToApi() {
  const form = document.querySelector(".form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    removeElement();

    const valueSearch = document.querySelector(".search-input").value;
    const URL = "https://api.mercadolibre.com/sites/MLA/search?q=";
    fetch(URL + valueSearch)
      .then((response) => response.json())
      .then((data) => showResultsInPage(data.results));
  });
}

function main() {
  connectToApi();
}
main();
