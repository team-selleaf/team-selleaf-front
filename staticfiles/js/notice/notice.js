const items = document.querySelectorAll(".list-inner-box");

items.forEach((item) => {
  const item1 = item.querySelector("h3.list-inner");
  const item2 = item.querySelector("span.question-text");
  const item3 = item.querySelector("span.question-v");
  const item4 = item.querySelector("div.question");

  item.addEventListener("click", (e) => {
    item1.classList.toggle("list-inner-open");
    item2.classList.toggle("question-text-open");
    item3.classList.toggle("question-v-open");
    item4.classList.toggle("question-open");
  });
});
