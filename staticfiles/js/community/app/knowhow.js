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

const modalWrap = document.querySelector(".modal-wrap");
const filterBtns = document.querySelectorAll(".filter-btn");
modalWrap.addEventListener("click", (e) => {
  if (!e.target.closest(".modal-container")) {
    modalWrap.classList.remove("modal-open");
  }
});
filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.getAttribute("name") === "sort") {
      modalWrap.innerHTML = `
      <div class="modal-container">
        <div class="modal-inner">
          <div class="modal-box">
            <div class="modal-title-box">
              <div class="modal-title">정렬</div>
            </div>
            <div class="modal-content-wrap">
              <div class="modal-content-container">
                <button
                  type="button"
                  class="modal-content-btn modal-btn-choice"
                  name="latest"
                >
                  <div class="modal-btn-text-box">
                    <div class="modal-btn-text">최신순</div>
                  </div>
                </button>
                <button type="button" class="modal-content-btn" name="popularity">
                  <div class="modal-btn-text-box">
                    <div class="modal-btn-text">최근 인기순</div>
                  </div>
                </button>
                <button type="button" class="modal-content-btn" name="past">
                  <div class="modal-btn-text-box">
                    <div class="modal-btn-text">과거순</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    } else if (e.target.getAttribute("name") === "plant") {
      modalWrap.innerHTML = `
      <div class="modal-container">
      <div class="modal-inner">
        <div class="modal-box">
          <div class="modal-title-box">
            <div class="modal-title">식물 종류</div>
          </div>
          <div class="modal-content-wrap">
            <div class="modal-content-container">
              <button type="button" class="modal-content-btn" name="foliage">
                <div class="modal-btn-text-box">
                  <div class="modal-btn-text">관엽식물</div>
                </div>
              </button>
              <button type="button" class="modal-content-btn" name="coniferous">
                <div class="modal-btn-text-box">
                  <div class="modal-btn-text">침엽식물</div>
                </div>
              </button>
              <button type="button" class="modal-content-btn" name="rare">
                <div class="modal-btn-text-box">
                  <div class="modal-btn-text">희귀식물</div>
                </div>
              </button>
              <button type="button" class="modal-content-btn" name="cactus">
                <div class="modal-btn-text-box">
                  <div class="modal-btn-text">다육 선인장</div>
                </div>
              </button>
              <button type="button" class="modal-content-btn" name="terrarium">
                <div class="modal-btn-text-box">
                  <div class="modal-btn-text">테라리움</div>
                </div>
              </button>
              <button type="button" class="modal-content-btn" name="any">
                <div class="modal-btn-text-box">
                  <div class="modal-btn-text">기타</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
    } else if (e.target.getAttribute("name") === "field") {
      modalWrap.innerHTML = `
      <div class="modal-container">
        <div class="modal-inner">
          <div class="modal-box">
            <div class="modal-title-box">
              <div class="modal-title">분야</div>
            </div>
            <div class="modal-content-wrap">
              <div class="modal-content-container">
                <button type="button" class="modal-content-btn" name="foliage">
                  <div class="modal-btn-text-box">
                    <div class="modal-btn-text">식물 키우기</div>
                  </div>
                </button>
                <button type="button" class="modal-content-btn" name="coniferous">
                  <div class="modal-btn-text-box">
                    <div class="modal-btn-text">제품 추천</div>
                  </div>
                </button>
                <button type="button" class="modal-content-btn" name="rare">
                  <div class="modal-btn-text-box">
                    <div class="modal-btn-text">스타일링</div>
                  </div>
                </button>
                <button type="button" class="modal-content-btn" name="cactus">
                  <div class="modal-btn-text-box">
                    <div class="modal-btn-text">기타</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    }
    modalWrap.classList.add("modal-open");
    const modalContentBtns = modalWrap.querySelectorAll(".modal-content-btn");
    modalContentBtns.forEach((item) => {
      item.addEventListener("click", (e) => {
        const filterIcon = `<span class="filter-btn-icon"></span>`;
        btn.innerHTML =
          e.target.querySelector(".modal-btn-text").innerText + filterIcon;
        modalWrap.classList.remove("modal-open");
      });
    });
  });
});
