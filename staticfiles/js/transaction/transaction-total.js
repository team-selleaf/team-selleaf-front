// 필터 1, 식물종류
// const filterButton = document.querySelector("#species");
// const filterPopup = document.querySelector("#species-list");
// filterButton.addEventListener("mouseover", (e) => {
//   filterPopup.classList.add("open");
// });
// filterButton.addEventListener("mouseout", (e) => {
//   setTimeout(() => {
//     filterPopup.classList.remove("open");
//   }, 3000);
// });

// const filterDiv = document.querySelector("#arrange");
// // const filterButton = document.querySelector(".filter-button")

// 필터 2, 정렬
const filterArrage = document.getElementById("arrange");
const filterPopupArrange = document.querySelector("#arrange-list");

filterArrage.addEventListener("click", (e) => {
  filterPopupArrange.classList.toggle("open");
});

const filterCity = document.getElementById("city");
const filterPopupCity = document.querySelector("#city-list");

filterCity.addEventListener("click", (e) => {
  filterPopupCity.classList.toggle("open");
});

// 필터 내 마우스를 올리면 색 변화
const filterModals = document.querySelectorAll(".filter-list-button");
filterModals.forEach((filterModal) => {
  filterModal.addEventListener("click", (e) => {
    filterModal.style.color = "#97A38C";
  });
  filterModal.addEventListener("mouseover", (e) => {
    filterModal.style.backgroundColor = "#97A38C";
    filterModal.style.color = "#fff";
  });
  filterModal.addEventListener("mouseout", (e) => {
    filterModal.style.backgroundColor = "#fff";
    filterModal.style.color = "rgb(85, 92, 97)";
  });
});

// 스크랩 팝업
const scrapButton = document.querySelectorAll(".scrap-button");
const scrapPopup = document.querySelector(".scrap-popup-wrap");
const scrapCancel = document.querySelector(".scrap-popup-cancel-wrap");

let timeoutId;
let animationTarget;

scrapButton.forEach((scrap) => {
  scrap.addEventListener("click", () => {
    const img = scrap.querySelector("img");
    const imgSrc = img.getAttribute("src");
    if (imgSrc === "/staticfiles/images/scrap-off.png") {
      img.setAttribute("src", "/staticfiles/images/scrap-on.png");
      animationTarget = scrapPopup;
    } else {
      img.setAttribute("src", "/staticfiles/images/scrap-off.png");
      animationTarget = scrapCancel;
    }
    animationTarget.classList.remove("hide-animation");
    animationTarget.classList.add("show-animation");
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      animationTarget.classList.remove("show-animation");
      animationTarget.classList.add("hide-animation");
    }, 3000);
  });
});
