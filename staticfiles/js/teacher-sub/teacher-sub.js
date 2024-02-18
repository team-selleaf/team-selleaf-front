// 파일입력
const imgFileInput = document.querySelector("#img-file");
const prevImgBox = document.querySelector(".prev-img-box");

imgFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  console.log(file);
  prevImgBox.innerHTML = "";

  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
  }
  reader.addEventListener("load", (e) => {
    const path = e.target.result;

    // 사진 썸네일 뜨는 div
    const imgBoxElement = document.createElement("div");
    // 플러스버튼 나오는 div
    const plusBoxElement = document.createElement("div");
    // 형제선택자때문에 만든 비어있는 div
    const emptyBoxElement = document.createElement("div");

    // 각각 div에 필요한 클래스 추가
    imgBoxElement.classList.add("prev-img-box-item");
    plusBoxElement.classList.add("plus-img-box-item");
    emptyBoxElement.classList.add("empty-box");

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

    // 플러스(사진추가) 버튼
    plusBoxElement.innerHTML = `
    <input type="file" id="img-file2" name="img-file2" style="display: none" />
    <label for="img-file2" style="cursor: pointer" class="upload-btn">
    <img src="/staticfiles/images/teacher-sub/plus-btn.png"
    alt=""
    class="plus-img" />
    </label>
    `;

    prevImgBox.appendChild(imgBoxElement);
    prevImgBox.appendChild(plusBoxElement);
    prevImgBox.appendChild(emptyBoxElement);

    // 두번째부터 사진 추가
    const imgFileInput2 = document.querySelector("#img-file2");
    const plusBox = document.querySelector(".plus-img-box-item");
    const prevBox = document.querySelector(".prev-img-box-item");
    const emptyBox = document.querySelector(".empty-box");

    // 만약 사진이 하나이상 추가 되어있다면
    if (imgFileInput2) {
      imgFileInput2.addEventListener("change", (e) => {
        const file2 = e.target.files[0];
        console.log(file2);

        const reader = new FileReader();
        if (file2) {
          reader.readAsDataURL(file2);
        }

        // 첨부파일 불러올때
        reader.addEventListener("load", (e) => {
          const path2 = e.target.result;

          // 두번째 사진부터
          const imgBoxElement2 = document.createElement("div");
          imgBoxElement2.classList.add("prev-img-box-item");
          imgBoxElement2.innerHTML = `
          <img
          src="${path2}"
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

          // imgBoxElement2를 emptyBox의 이전 요소에 추가해줌(이거때문에 빈박스 만들었음)
          prevImgBox.insertBefore(imgBoxElement2, emptyBox.previousSibling);

          const imgBoxes = document.querySelectorAll(".prev-img-box-item");

          // 업로드 된 사진이 다섯장 이상이면 플러스 버튼을 삭제함
          if (imgBoxes.length > 4) {
            plusBox.remove();
          }

          const clsBtns = document.querySelectorAll(".cancel-btn");

          // 삭제버튼 눌렀을때
          clsBtns.forEach((btn, i) => {
            btn.addEventListener("click", () => {
              imgBoxes[i].remove();
              // 추가된 사진이 다섯개 미만이면 다시 플러스 표시 뜨게해줌
              if (imgBoxes.length < 6) {
                prevImgBox.appendChild(plusBoxElement);
              }
            });
          });
        });
      });
    }
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
