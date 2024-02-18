// 파일입력
const imgFileInput = document.querySelector("#img-file");
const prevImgBox = document.querySelector(".prev-img-box");

imgFileInput.addEventListener("change", (e) => {
  const files = e.target.files;
  console.log(files);
  prevImgBox.innerHTML = "";
  for (const file of files) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (e) => {
      const path = e.target.result;

      const imgBoxElement = document.createElement("div");
      imgBoxElement.classList.add("prev-img-box-item");
      imgBoxElement.innerHTML = `
      
      <img
      src="${path}"
      alt=""
      class="prev-img"
      />
      <div class="cancel-div">
      <button type="button" class="cancel-btn">
        <img
          src="/staticfiles/images/cancel.png"
          alt=""
          class="cancel-img"
          
        />
      </button>
      </div>
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
