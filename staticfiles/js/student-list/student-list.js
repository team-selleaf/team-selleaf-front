// 수강생 목록 조회 JS

// 검색창에 글자 입력하면 x버튼 표시, x버튼 클릭하면 내용 전체 삭제
const searchInput = document.querySelector(".hearder-inner-thirddiv-input");
const xbutton = document.querySelector(".hearder-inner-thirddiv-div");

searchInput.addEventListener("keydown", (e) => {
  xbutton.style.display = "flex";
  // 입력한 값 가져오기
  const realInput = searchInput.value.trim();
  if (realInput !== "") {
    xbutton.addEventListener("click", (e) => {
      searchInput.value = "";
      xbutton.style.display = "none";
    });
  } else {
    xbutton.style.display = "none";
  }
});
const borderinput = document.querySelector(".header-fourth-inner-thirddiv");
searchInput.addEventListener("focus", () => {
  borderinput.style.border = "1px solid #134F2C";
});
searchInput.addEventListener("blur", () => {
  borderinput.style.border = "1px solid #DADDE0";
});
