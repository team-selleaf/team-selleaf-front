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
  dropBoxes[0].classList.toggle("open");
});

dropBoxRequired.addEventListener("click", () => {
  downArrowIcon[1].classList.toggle("down-arrow-open");
  dropBoxes[1].classList.toggle("open");
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
const cancel = document.querySelector(".cancel");
imgFileInput.addEventListener("change", (e) => {
  const [file] = e.target.files;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", (e) => {
    const path = e.target.result;
    cancel.style.display = "block";
    path.includes("image")
      ? ((prevImgBox.style.backgroundImage = `url(${path})`),
        (prevImgBox.style.zIndex = "5"))
      : (prevImgBox.style.backgroundImage = `url('images/attach.png')`);
  });
});
cancel.addEventListener("click", (e) => {
  prevImgBox.style.backgroundImage = "";
  prevImgBox.style.zIndex = "-5";
  e.target.style.display = "none";
  imgFileInput.value = "";
});

const tag = document.querySelector(".tag");
const tagInput = document.querySelector(".tag-input");
const tagList = document.querySelector(".tag-list");
const emptyValue = document.querySelector(".empty-value");
tagInput.addEventListener("keyup", (e) => {
  let value = e.target.value;
  if (e.keyCode === 13 && e.target.value) {
    const itemCount = tagList.querySelectorAll(".tag-list > span").length + 1;
    if (itemCount <= 5) {
      e.target.value = "";
      const tagItem = document.createElement("span");
      tagItem.classList.add("tag");
      tagItem.innerHTML = `
      <span class="tag-text">
        ${value}
      </span>
      <img
        src="../../staticfiles/images/cancel.png"
        class="tag-cancel"
        width="15px"
        height="15px"
        alt=""
      />`;
      tagList.appendChild(tagItem);
      const tags = document.querySelectorAll(".tag");
      tags.forEach((item) => {
        const canceltag = item.querySelector(".tag-cancel");
        canceltag.addEventListener("click", () => {
          item.remove();
        });
      });
    }
  }
  if (!tagInput.value && itemCount == 0) {
    tagInput.style.border = "1px solid red";
    emptyValue.style.display = "block";
  } else {
    tagInput.style.border = "";
    emptyValue.style.display = "none";
  }
});
tagInput.addEventListener("focus", (e) => {
  e.target.style.boxShadow = "0 0 0 3px rgba(53,197,240,.3)";
});
tagInput.addEventListener("blur", (e) => {
  e.target.style.boxShadow = "";
});
