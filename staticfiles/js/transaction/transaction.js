const scrapButton = document.querySelectorAll(".scrap-button");
const scrapPopup = document.querySelector(".scrap-popup-wrap");
const scrapCancel = document.querySelector(".scrap-popup-cancel-wrap");
scrapButton.forEach((scrap) => {
  scrap.addEventListener("click", () => {
    const img = scrap.querySelector("img");
    const imgSrc = img.getAttribute("src");
    if (imgSrc === "/staticfiles/images/scrap-off.png") {
      img.setAttribute("src", "/staticfiles/images/scrap-on.png");
    } else {
      img.setAttribute("src", "/staticfiles/images/scrap-off.png");
    }
    scrapPopup.style.display == "none"
      ? (scrapPopup.style.display = "block")
      : (scrapPopup.style.display = "none");
  });
});

const letter = document.querySelector(".popular-detail-link");

letter.addEventListener("mouseover", (e) => {
  e.target.style.opacity = "30%";
});

letter.addEventListener("mouseout", (e) => {
  e.target.style.opacity = "100%";
});

const newDetail = document.querySelector("#new-detail-link");
newDetail.addEventListener("mouseover", (e) => {
  e.target.style.opacity = "30%";
});

newDetail.addEventListener("mouseout", (e) => {
  e.target.style.opacity = "100%";
});

const images = document.querySelector(".image");

images.forEach((image, i) => {
  image.addEventListener("mouseover", (e) => {
    image[i].style.transform = "scale(1.05)";
  });
});
