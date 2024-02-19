// 파일입력
const imgFileInput = document.querySelector("#img-file");
const prevImgBox = document.querySelector(".prev-img-box");
const upContainer = document.querySelector(".upload-container");

imgFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  console.log(file);

  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
  }
  reader.addEventListener("load", (e) => {
    const path = e.target.result;

    // 사진 썸네일 뜨는 div
    const imgBoxElement = document.createElement("div");

    // 각각 div에 필요한 클래스 추가
    imgBoxElement.classList.add("prev-img-box-item");

    // 각각 div에 내부 요소 추가
    // 사진 썸네일
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
    class="cancel-img"/>
    </button>
    </div>
    `;

    prevImgBox.appendChild(imgBoxElement);

    const delBtn = document.querySelectorAll(".cancel-btn");
    const imgBoxes = document.querySelectorAll(".prev-img-box-item");

    if (imgBoxes.length > 4) {
      // 사진이 다섯장 이상일때

    } else if (imgBoxes.length < 5) {
      // 사진이 다섯만 미만일때

    }
    
    delBtn.forEach((del, i) => {
      del.addEventListener("click", () => {
        imgBoxes[i].remove();
      });
    });

  });
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
