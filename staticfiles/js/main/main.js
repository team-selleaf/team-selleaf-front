// header 부분
// 통합검색 인풋에 뭔가를 치면 x버튼이 생기게
const searchInput = document.querySelector(".hearder-inner-thirddiv-input");
const xbutton = document.querySelector(".hearder-inner-thirddiv-div");

searchInput.addEventListener("keyup", (e) => {
  xbutton.style.display = "flex";

  xbutton.addEventListener("click", (e) => {
    searchInput.value = "";
    xbutton.style.display = "none";
  });
});

// 글쓰기 버튼을 클릭하면 모달이 생성되고 다시 클릭하면 모달이 없어져야함
// 대신 화면의 다른 부분을 클릭해도 모달이 없어져야함
const modalButton = document.querySelector(".header-write-wrap");
const modal = document.querySelector(".header-post-wrap");

// modalButton.addEventListener("click", (e) => {
//   modal.classList.toggle("modalOpen");
//   //   if (modal.classList.contains("modalOpen")) {
//   //     document.addEventListener("click", (e) => {
//   //       console.log(e.target.closest("modal"));
//   //       if (!e.target.closest("modal") || modalButton.closest("modalButton")) {
//   //         modal.classList.remove("modalOpen");
//   //       }
//   //     });
//   //   }
// });

document.addEventListener("click", (e) => {
  if (!e.target.closest(".header-post-wrap")) {
    if (e.target.closest(".header-write-wrap")) {
      modal.classList.toggle("modalOpen");
      return;
    }
    modal.classList.remove("modalOpen");
  }
});

// 이런 00 찾고 있나요에 이미지에 마우스 올렸을 때 확대되게 해야함 마우스 벗어나면 축소되게
const searchimg = document.querySelectorAll(".realmain-plantRecommend-photo");
const searchAtag = document.querySelectorAll(
  ".realmain-plantRecommend-profilelink"
);

searchAtag.forEach((atag, i) => {
  atag.addEventListener("mouseover", () => {
    searchimg[i].style.transform = "scale(1.05)";
  });
});

searchAtag.forEach((atag, i) => {
  atag.addEventListener("mouseout", () => {
    searchimg[i].style.transform = "scale(1)";
  });
});

// 이런 00 찾고 있나요에 스크랩을 누르면 색이 들어오고 다시 누르면 색이 없어져야함
const scrapBtns = document.querySelectorAll(
  ".realmain-plantRecommend-scrapbutton"
);
scrapBtns.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const imgSrc = img.getAttribute("src");
    console.log(imgSrc);
    imgSrc === "../../staticfiles/images/scrap-off.png"
      ? img.setAttribute("src", "../../staticfiles/images/scrap-on.png")
      : img.setAttribute("src", "../../staticfiles/images/scrap-off.png");
  });
});

// 이런 00 찾고 있나요? 부분에 슬라이드 바 구현
const nextButton = document.querySelector(".realmain-nextbutton");
// 원데이 클래스 부분에 사진 올리면 확대되고 내리면 축소되게 만들어야함
const searchOnedayImg = document.querySelectorAll(".realmain-lecture-photo");
const searchOnedayA = document.querySelectorAll(
  ".realmain-lecture-explanationA"
);

searchOnedayA.forEach((atag, i) => {
  atag.addEventListener("mouseover", () => {
    searchOnedayImg[i].style.transform = "scale(1.05)";
  });
});

searchOnedayA.forEach((atag, i) => {
  atag.addEventListener("mouseout", () => {
    searchOnedayImg[i].style.transform = "scale(1)";
  });
});

// 원데이 클래스 인기 콘텐츠 부분에 스크랩 on off 기능
const scraplectureBtns = document.querySelectorAll(
  ".realmain-lecture-scrapbutton"
);
scraplectureBtns.forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const imgSrc = img.getAttribute("src");
    console.log(imgSrc);
    imgSrc === "../../staticfiles/images/scrap-off.png"
      ? img.setAttribute("src", "../../staticfiles/images/scrap-on.png")
      : img.setAttribute("src", "../../staticfiles/images/scrap-off.png");
  });
});
