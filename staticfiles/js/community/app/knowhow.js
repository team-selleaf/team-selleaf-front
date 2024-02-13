const a = document.querySelectorAll("a");
a.forEach((item) => {
  item.addEventListener("click", (e) => {});
});

let page = 1;
let isLoading = false;
async function getPosts() {
  const response = await fetch("");
  const posts = await response.json();
  return posts.reverse();
}

function appendItem(post) {
  const contentLineBox = document.querySelector(".content-line-box");
  const contentItem = document.createElement("a");
  contentItem.setAttribute("href", "#");
  contentItem.innerHTML = `
  <div class="content-item-wrap">
    <div class="content-item-container">
      <div class="content-img-box">
        <img
          src="../../../staticfiles/images/blank-image.png"
          class="content-img"
        />
        <div class="scrap-btn-box">
          <button
            type="button"
            class="scrap-btn"
          >
            <span class="scrap-icon-box">
              <img
                src="../../../staticfiles/images/scrap-off.png"
                alt=""
              />
            </span>
          </button>
        </div>
      </div>
      <p class="content-title">
        집에서 가장 바쁜 집순이의 다채로운 10평 투룸
      </p>
      <div class="content-uploader">
        <div class="uploader-img-box">
          <img
            src="../../../staticfiles/images/blank-image.png"
            class="uploader-img"
          />
        </div>
        <span class="uploader-name">다채롭솔</span>
      </div>
      <div class="content-data-box">
        <span class="content-data">
          스크랩
          <span>3</span>
        </span>
        <span class="content-data">
          조회
          <span>153</span>
        </span>
      </div>
    </div>
  </div>
  `;
  contentLineBox.appendChild(contentItem);
}
function showList() {
  const dummyArray = new Array(20).fill(0);
  dummyArray.forEach((post) => {
    appendItem(post);
  });
}
function handleScroll() {
  const scrollTop = document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const totalHeight = document.documentElement.scrollHeight;
  if (scrollTop + windowHeight >= totalHeight - 300) {
    showList();
  }
}

window.addEventListener("scroll", handleScroll);
showList();

const contentLineBox = document.querySelector(".content-line-box");
contentLineBox.addEventListener("click", (e) => {
  e.preventDefault();
  const clickedBtn = e.target.closest(".scrap-btn");
  const img = clickedBtn.querySelector("img");
  const imgSrc = img.getAttribute("src");
  imgSrc === "../../../staticfiles/images/scrap-off.png"
    ? img.setAttribute("src", "../../../staticfiles/images/scrap-on.png")
    : img.setAttribute("src", "../../../staticfiles/images/scrap-off.png");
});

const modalWraps = document.querySelectorAll(".modal-wrap");
const filterBtns = document.querySelectorAll(".filter-btn");
modalWraps.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (!e.target.closest(".modal-container")) {
      item.classList.remove("modal-open");
    }
  });
});

let targetBtn;
filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    targetBtn = e.target;
    if (e.target.getAttribute("name") === "sort") {
      modalWraps[0].classList.add("modal-open");
    } else if (e.target.getAttribute("name") === "plant") {
      modalWraps[1].classList.add("modal-open");
    } else if (e.target.getAttribute("name") === "field") {
      modalWraps[2].classList.add("modal-open");
    }
    modalWraps.forEach((item) => {
      const modalContentBtns = item.querySelectorAll(".modal-content-btn");
      modalContentBtns.forEach((modalBtn) => {
        modalBtn.addEventListener("click", (e) => {
          const filterIcon = `<span class="filter-btn-icon"></span>`;
          const targetBtnText = e.target
            .closest("button")
            .querySelector(".modal-btn-text");
          targetBtn.innerHTML = targetBtnText.innerText + filterIcon;
          modalContentBtns.forEach((prev) => {
            prev.classList.remove("modal-btn-choice");
          });
          e.target.closest("button").classList.add("modal-btn-choice");
          modalWraps.forEach((modal) => {
            modal.classList.remove("modal-open");
          });
        });
      });
    });
  });
});
