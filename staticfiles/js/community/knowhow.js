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
  contentItem.classList.add("similar-post-box");
  contentItem.innerHTML = `
  <div class="content-item-wrap">
    <div class="content-item-container">
        <div class="content-img-box">
        <img
            src="../../staticfiles/images/blank-image.png"
            class="content-img"
        />
        <div class="scrap-btn-box">
            <button
            type="button"
            aria-label="scrap 토글 버튼"
            class="scrap-btn"
            >
            <span class="scrap-icon-box">
                <img
                src="../../staticfiles/images/scrap-off.png"
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
            src="../../staticfiles/images/blank-image.png"
            class="uploader-img"
            />
        </div>
        <span class="uploader-name">다채롭솔</span>
        </div>
        <div class="content-data-box">
        <span class="content-data"
            >스크랩 <span>3</span></span
        >
        <span class="content-data"
            >조회 <span>153</span></span
        >
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

const scrapBtns = document.querySelectorAll(".scrap-btn");
scrapBtns.forEach((item) => {
  item.addEventListener("click", (e) => {
    const img = item.querySelector("img");
    const imgSrc = img.getAttribute("src");
    imgSrc === "../../staticfiles/images/scrap-off.png"
      ? img.setAttribute("src", "../../staticfiles/images/scrap-on.png")
      : img.setAttribute("src", "../../staticfiles/images/scrap-off.png");
  });
});

const filterItems = document.querySelectorAll(".filter-item");
filterItems.forEach((item) => {
  const modal = item.querySelector(".filter-modal");
  item.addEventListener("mouseenter", () => {
    modal.classList.add("open");
  });
  item.addEventListener("mouseleave", () => {
    modal.classList.remove("open");
  });

  const modalMenuBtns = item.querySelectorAll(".modal-menu-btn");
  modalMenuBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      modalMenuBtns.forEach((btn) => {
        btn.classList.remove("choice");
      });
      e.target.closest(".modal-menu-btn").classList.add("choice");
    });
  });
});
