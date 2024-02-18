const dropBoxGuide = document.querySelector("#drop-box-guide");
const dropBoxRequired = document.querySelector("#drop-box-required");
const downArrowIcon = document.querySelectorAll(".down-arrow");
const dropBoxes = document.querySelectorAll(".expanded");
const titleInput = document.querySelector(".title-input");
const titleInputCount = document.querySelector(".count");
const contentTextArea = document.querySelector(".content-text-area");
const textInputContainer = document.querySelector(
  ".content-text-input-container"
);

const markIconWrap = document.querySelector(".mark-icon-wrap");

dropBoxGuide.addEventListener("click", () => {
  downArrowIcon[0].classList.toggle("down-arrow-open");
  dropBoxes[0].classList.toggle("guide-open");
});

dropBoxRequired.addEventListener("click", () => {
  downArrowIcon[1].classList.toggle("down-arrow-open");
  dropBoxes[1].classList.toggle("required-open");
});

titleInput.addEventListener("keyup", (e) => {
  titleInputCount.innerText = 0;
  e.target.value && (titleInputCount.innerText = e.target.value.length);
});

textInputContainer.addEventListener("click", () => {
  contentTextArea.focus();
});

contentTextArea.addEventListener("click", () => {
  markIconWrap.classList.add("wrap-open");
});

const imgFileInput = document.querySelector("#img-file");
const prevImgBox = document.querySelector(".prev-img-box");

let imgflieArr = [];

imgFileInput.addEventListener("change", (e) => {
  const files = e.target.files;
  console.log(files);
  prevImgBox.innerHTML = "";
  for (const file of files) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      const path = e.target.result;
      imgflieArr.push(path);
      const imgBoxElement = document.createElement("div");
      imgBoxElement.classList.add("prev-img-box-item");
      imgBoxElement.innerHTML = `
      <img
      src="${path}"
      alt=""
      class="prev-img"
      />
      <button type="button" class="cancel-btn">
        <img
          src="../../../staticfiles/images/cancel.png"
          alt=""
          width="24px"
          height="24px"
        />
      </button>
      `;
      prevImgBox.appendChild(imgBoxElement);
      // const cancelBtn = document.querySelector(".cancel-btn");
      // cancelBtn.addEventListener("click", (e) => {
      //   console.log(e.target);
      //   const prevImgBox = e.target.closest(".prev-img-box-item");
      //   document.removeChild(prevImgBox);
      // });
    });
  }
  // console.log(imgflieArr);
});
//미리보기 이미지 스크롤 마우스로
let isMouseDown = false;
let startX, scrollLeft;

prevImgBox.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  prevImgBox.classList.add("active");

  startX = e.pageX - prevImgBox.offsetLeft;
  scrollLeft = prevImgBox.scrollLeft;
});

prevImgBox.addEventListener("mouseleave", () => {
  isMouseDown = false;
  prevImgBox.classList.remove("active");
});

prevImgBox.addEventListener("mouseup", () => {
  isMouseDown = false;
  prevImgBox.classList.remove("active");
});

prevImgBox.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return;

  e.preventDefault();
  const x = e.pageX - prevImgBox.offsetLeft;
  const walk = (x - startX) * 1;
  prevImgBox.scrollLeft = scrollLeft - walk;
});

const tagInput = document.querySelector(".tag-input");
const tagList = document.querySelector(".tag-list");
const emptyValue = document.querySelector(".empty-value");
tagInput.addEventListener("keyup", (e) => {
  let value = e.target.value;
  if (e.keyCode === 13 && e.target.value) {
    const items = tagList.querySelectorAll(".tag-list > span");
    if (items.length + 1 <= 5) {
      e.target.value = "";
      const tagItem = document.createElement("span");
      tagItem.classList.add("tag");
      tagItem.innerHTML = `
      <span class="tag-left-line">#</span>
        <div class="tag-inner">
          <span class="tag-text">
            ${value}
          </span>
          <button type="button" class="tag-cancel-btn">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="#a2a9b4"
              viewBox="0 0 14 14"
              width="10px"
              height="10px"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        `;
      tagList.appendChild(tagItem);
      const tags = document.querySelectorAll(".tag");
      tags.forEach((item) => {
        const canceltag = item.querySelector(".tag-cancel-btn");
        canceltag.addEventListener("click", () => {
          item.remove();
        });
      });
    }
  }
});
tagInput.addEventListener("focus", (e) => {
  e.target.style.boxShadow = "0 0 0 3px rgba(53,197,240,.3)";
});
tagInput.addEventListener("blur", (e) => {
  e.target.style.boxShadow = "";
});

const urlInput = document.querySelectorAll(".url-input");

urlInput.forEach((item) => {
  item.addEventListener("focus", (e) => {
    e.target.style.boxShadow = "0 0 0 3px rgba(53,197,240,.3)";
  });
  item.addEventListener("blur", (e) => {
    e.target.style.boxShadow = "";
  });
});
const requiredInfoItemInner = document.querySelector(
  ".required-info-item-inner"
);
const guideText = document.querySelector(".guide-text");
const requiredInfoInner = document.querySelectorAll(".required-info-inner");

function appendItem() {
  const insertItem = document.createElement("div");
  insertItem.classList.add("double-item-box");
  insertItem.innerHTML = `
  <div class="double-input-wrap">
    <div class="double-input-left-box">
      <input
        class="url-input"
        value=""
        placeholder="URL 주소를 입력해주세요."
      />
    </div>
  </div>
  <div class="tag-double-input-box">
    <div class="tag-double-input-right-box">
      <input
        class="url-input"
        value=""
        placeholder="표시할 내용"
      />
    </div>
    <div class="add-and-delete-box">
      <button
        type="button"
        title="삭제"
        class="add-and-delete-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="29"
          viewBox="-3 -11 29 29"
          class="icon"
        >
          <path
            d="M10.8 2.8H5.7c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h11.6c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-6.5z"
            stroke="#525B61"
            stroke-width="0.5"
          ></path>
        </svg>
      </button>
    </div>
  </div>
    `;

  const parentElement = guideText.parentNode;
  parentElement.insertBefore(insertItem, guideText);
}

const recommendedBox = requiredInfoInner[4];
recommendedBox.addEventListener("click", (e) => {
  const doubleItemBox = document.querySelectorAll(".double-item-box");
  const btnItem = e.target.closest("button");
  const itemTitle = btnItem.getAttribute("title");
  if (itemTitle === "추가") {
    if (doubleItemBox.length >= 3) return;
    appendItem();
  }
  if (itemTitle === "삭제") {
    e.target.closest(".double-item-box").remove();
  }
});
