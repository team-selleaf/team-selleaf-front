// 이미지 버튼 슬라이싱

const nextButton = document.querySelector(".scroller-ui-next");
const prevButton = document.querySelector(".scroller-ui-prev");
const target = document.querySelector(".scroller-contents-container");
const prevSvg = document.querySelector(".prev-icon");

var xdegree = 0;
nextButton.addEventListener("click", (e) => {
  xdegree -= 712;
  with (target.style) {
    transform = `translateX(${xdegree}px)`;
    transition = "transform 0.3s ease 0s";
  }
  xdegree === -2848
    ? (nextButton.style.display = "none")
    : (nextButton.style.display = "block");
  xdegree === -712 && (prevButton.style.display = "block");

  console.log(xdegree);
});

prevButton.addEventListener("click", (e) => {
  xdegree += 712;
  with (target.style) {
    transform = `translateX(${xdegree}px)`;
    transition = "transform 0.3s ease 0s";
  }
  xdegree === -2136 && (nextButton.style.display = "block");
  xdegree === 0 && (prevButton.style.display = "none");
  console.log(xdegree);
});

//스크랩 버튼
const scrapBtn = document.querySelector(".scrap-button");

scrapBtn.addEventListener("click", () => {
  const img = scrapBtn.querySelector("img");
  const imgSrc = img.getAttribute("src");
  if (imgSrc === "/staticfiles/images/scrap-off-blk.png") {
    img.setAttribute("src", "/staticfiles/images/scrap-on.png");
  } else {
    img.setAttribute("src", "/staticfiles/images/scrap-off-blk.png");
  }
});

// 비슷한 제품 스크랩 버튼

const scrapButton = document.querySelectorAll(".img-scrap-button");
// const scrapPopup = document.querySelector(".scrap-popup-wrap");
// const scrapCancel = document.querySelector(".scrap-popup-cancel-wrap");
scrapButton.forEach((scrap) => {
  scrap.addEventListener("click", () => {
    const img = scrap.querySelector("img");
    const imgSrc = img.getAttribute("src");
    if (imgSrc === "/staticfiles/images/scrap-off.png") {
      img.setAttribute("src", "/staticfiles/images/scrap-on.png");
    } else {
      img.setAttribute("src", "/staticfiles/images/scrap-off.png");
    }
    // scrapPopup.style.display == "none"
    //   ? (scrapPopup.style.display = "block")
    //   : (scrapPopup.style.display = "none");
  });
});

// 사이드 바 선택옵션 삭제
const deleteButtons = document.querySelectorAll(".sidebar-delete-button");
const deleteBtns = document.querySelectorAll(".delete-button-container");

deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", (e) => {
    const options = deleteButton.closest(".sidebar-selected-product-container");
    options.style.display = "none";
  });
});

// 물건 선택옵션 삭제

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    const selection = deleteBtn.closest(".selected-product-list-container");
    selection.style.display = "none";
  });
});

const number = document.querySelector(".counted-number");
const add = document.querySelector(".add-count");
const sub = document.querySelector(".sub-count");

const sidebarNumber = document.querySelector(".sidebar-count-number");
const sidebarAdd = document.querySelector(".sidebar-add-count");
const sidebarSub = document.querySelector(".sidebar-sub-count");

var count = 0;

add.addEventListener("click", (e) => {
  count++;
  number.innerHTML = `${count}`;
  sidebarNumber.innerHTML = `${count}`;
});

sub.addEventListener("click", (e) => {
  count == 0 ? (count = 0) : count--;
  number.innerHTML = `${count}`;
  sidebarNumber.innerHTML = `${count}`;
});

sidebarAdd.addEventListener("click", (e) => {
  count++;
  number.innerHTML = `${count}`;
  sidebarNumber.innerHTML = `${count}`;
});

sidebarSub.addEventListener("click", (e) => {
  count == 0 ? (count = 0) : count--;
  number.innerHTML = `${count}`;
  sidebarNumber.innerHTML = `${count}`;
});
