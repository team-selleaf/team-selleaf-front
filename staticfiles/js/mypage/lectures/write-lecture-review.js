// //  필수 입력창 알람
// const a = document.querySelector(".info-list-wrap");
// const c = document.querySelector(".alert");
// const b = document.querySelector(".product-index");

// a.addEventListener("mouseover", (e) => {
//   a.style.border = "2px solid black";
//   a.style.borderRadius = "6px";
// });
// a.addEventListener("mouseout", (e) => {
//   b.value == "unselected"
//     ? (((a.style.border = "2px solid #c06888"), (a.style.borderRadius = "6px")),
//       (c.style.display = "block"))
//     : ((a.style.border = "1px solid #424242"), (c.style.display = "none"));
// });

// 가이드와 필요정보 모달 접었다 펴기
const guide = document.querySelector(".off");
const guideButton = document.querySelector(".guide-button");
const require = document.querySelector(".required-off");
const requiredButton = document.querySelector("#required-info-header");

guideButton.addEventListener("click", (e) => {
  guide.classList.toggle("expended");
});

// requiredButton.addEventListener("click", (e) => {
//   require.classList.toggle("expended");
// });

const prevImgBox = document.querySelector(".prev-img-box");
const inputs = document.querySelectorAll("input[type=file]");

inputs.forEach((input, index) => {
  input.addEventListener("change", (e) => {
    const targetInput = e.target;
    const file = targetInput.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const path = event.target.result;
      e.target.nextElementSibling.setAttribute("src", path);
      e.target.closest(".prev-img-box-item").style.display = "block";

      const label = e.target.closest(".upload-wrap").querySelector("label");
      let count = 5;
      inputs.forEach((item) => {
        if (item.value === "") {
          label.setAttribute("for", item.id);
          count--;
        }
      });

      if (count === 5) {
        e.target.closest(".upload-wrap").querySelector("label").style.display =
          "none";
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  });
});

function hideImageAndInput(prevBox, input) {
  prevBox.style.display = "none";
  input.style.display = "none";
}

const cancelBtns = document.querySelectorAll(".cancel-btn");
cancelBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const prevBox = e.target.closest(".prev-img-box-item");
    const input = prevBox.querySelector("input");
    hideImageAndInput(prevBox, input);
    const label = e.target.closest(".upload-wrap").querySelector("label");

    input.value = "";
    let count = 5;
    inputs.forEach((item) => {
      console.log(item.value);
      if (item.value == "") {
        label.setAttribute("for", item.id);
        count--;
      }
    });
    console.log(count);
    if (count != 5) {
      e.target.closest(".upload-wrap").querySelector("label").style.display =
        "flex";
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

// 요일 선택창 클릭이벤트
const weekdaySelection = document.querySelectorAll(".weekday-selection");
weekdaySelection.forEach((selectedDay) => {
  selectedDay.addEventListener("click", (e) => {
    e.target.classList.toggle("select-on");
  });
});

// 시간 반복 클릭
const timeSelection = document.querySelectorAll(".time-selection");
timeSelection.forEach((selectedtime) => {
  selectedtime.addEventListener("click", (e) => {
    e.target.classList.toggle("select-on");
  });
});

// 날짜 제한
const startDate = document.querySelector(".start-date");
let today = new Date();

// 오늘 이전의 날짜를 비활성화합니다.
const todayString = today.toJSON().split("T")[0];
// startDate.setAttribute("min", todayString);

const endDate = document.querySelector(".end-date");
// console.log(today);
// 오늘 이전의 날짜를 비활성화합니다.
// endDate.setAttribute("min", todayString);

const plantSelections = document.querySelectorAll(".plant-selection");
plantSelections.forEach((plantSelection) => {
  plantSelection.addEventListener("click", (e) => {
    plantSelection.classList.toggle("select-on");
  });
});

// 별점 입력란
const classScoring = (e) => {
  const score = e.target.closest("svg").classList[0];

  const one = document.querySelector(".one");
  const two = document.querySelector(".two");
  const three = document.querySelector(".three");
  const four = document.querySelector(".four");
  const five = document.querySelector(".five");

  const rated = "rgb(19, 95, 44)";
  const unrated = "rgb(255, 255, 255)";

  switch (score) {
    case "one":
      one.style.fill = rated;
      two.style.fill = unrated;
      three.style.fill = unrated;
      four.style.fill = unrated;
      five.style.fill = unrated;
      break;

    case "two":
      one.style.fill = rated;
      two.style.fill = rated;
      three.style.fill = unrated;
      four.style.fill = unrated;
      five.style.fill = unrated;
      break;

    case "three":
      one.style.fill = rated;
      two.style.fill = rated;
      three.style.fill = rated;
      four.style.fill = unrated;
      five.style.fill = unrated;
      break;

    case "four":
      one.style.fill = rated;
      two.style.fill = rated;
      three.style.fill = rated;
      four.style.fill = rated;
      five.style.fill = unrated;
      break;

    case "five":
      one.style.fill = rated;
      two.style.fill = rated;
      three.style.fill = rated;
      four.style.fill = rated;
      five.style.fill = rated;
      break;
  }
};

const ratingStar = document.querySelectorAll(".icon > svg");

ratingStar.forEach((star) => {
  star.addEventListener("click", classScoring);
});
