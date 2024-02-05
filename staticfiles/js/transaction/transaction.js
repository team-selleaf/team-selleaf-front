const scrapButton = document.querySelectorAll(".scrap-button");
const scrapPopup = document.querySelector(".scrap-popup-wrap");
const scrapCancel = document.querySelector(".scrap-popup-cancel-wrap");
console.log(scrapPopup);
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
