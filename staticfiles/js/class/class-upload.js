//  필수 입력창 알람
const a = document.querySelector(".info-list-wrap");
const c = document.querySelector(".alert");
const b = document.querySelector(".product-index");

a.addEventListener("mouseover", (e) => {
  a.style.border = "2px solid black";
  a.style.borderRadius = "6px";
});
a.addEventListener("mouseout", (e) => {
  b.value == "unselected"
    ? (((a.style.border = "2px solid #c06888"), (a.style.borderRadius = "6px")),
      (c.style.display = "block"))
    : ((a.style.border = "1px solid #424242"), (c.style.display = "none"));
});

// 가이드와 필요정보 모달 접었다 펴기
const guide = document.querySelector(".off");
const guideButton = document.querySelector(".guide-button");
const require = document.querySelector(".required-off");
const requiredButton = document.querySelector("#required-info-header");

guideButton.addEventListener("click", (e) => {
  guide.classList.toggle("expended");
});

requiredButton.addEventListener("click", (e) => {
  require.classList.toggle("expended");
});

// 이미지 파일 불러오기
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

// 요일 선택창 클릭이벤트
const weekdaySelection = document.querySelectorAll(".weekday-selection");
weekdaySelection.forEach((selectedDay) => {
  selectedDay.addEventListener("click", (e) => {
    e.target.classList.toggle("select-on");
  });
});

const timeSelection = document.querySelectorAll(".time-selection");
timeSelection.forEach((selectedtime) => {
  selectedtime.addEventListener("click", (e) => {
    e.target.classList.toggle("select-on");
  });
});

// 날짜 제한
const startDate = document.querySelector(".start-date");
let today = new Date();
console.log(today);
// 오늘 이전의 날짜를 비활성화합니다.
const todayString = today.toJSON().split("T")[0];
startDate.setAttribute("min", todayString);

const endDate = document.querySelector(".end-date");
console.log(today);
// 오늘 이전의 날짜를 비활성화합니다.
endDate.setAttribute("min", todayString);

const addButton = document.querySelector(".add-button");
const addTarget = document.querySelector(".add-diy-kit");
const cancelButton = document.querySelector(".cancel-button");
addButton.addEventListener("click", (e) => {
  addTarget.style.display = "block";
});

cancelButton.addEventListener("click", (e) => {
  addTarget.style.display = "none";
});
