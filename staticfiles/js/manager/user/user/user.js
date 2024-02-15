// 삭제 버튼 누르면 뜨는 모달창
document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".delete-button");
  const modalWrap = document.querySelector(".delete-modal-wrap");

  console.log(deleteButtons);

  deleteButtons.forEach(function (deleteButton) {
    deleteButton.addEventListener("click", (e) => {
      modalWrap.style.display = "flex";
    });
  });

  const cancelButton = document.querySelector(".modal-cancel button");
  const confirmButton = document.querySelector(".modal-confirm button");

  cancelButton.addEventListener("click", (e) => {
    modalWrap.style.display = "none";
  });

  confirmButton.addEventListener("click", (e) => {
    modalWrap.style.display = "none";
  });
});

//마일리지 수정 버튼 누르면 뜨는 모달창
document.addEventListener("DOMContentLoaded", function () {
  const editButtons = document.querySelectorAll("button.edit-button");
  const mileageInput = document.querySelector("input.content-detail-num");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const btnAttribute = e.target
        .closest("button")
        .getAttribute("aria-label");
      if (btnAttribute == "mileage button") {
        mileageInput.disabled = false;
        mileageInput.style.outline = "1px solid #c06888";
      }
    });
  });

  mileageInput.addEventListener("blur", () => {
    // input disabled 시키는 로직
    mileageInput.disabled = true;
    mileageInput.style.outline = "none";
  });
  // Enter를 누르면 값 확정
  mileageInput.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
      mileageInput.disabled = true;
      mileageInput.style.outline = "none";
    }
  });
});

//아래 게시물 창 버튼
const paginationBtn = document.querySelectorAll(".page-count-num");
const paginationBox = document.querySelector(".page");

paginationBox.addEventListener("click", (e) => {
  let pageBtn = e.target.closest("button.page-count-num");
  if (pageBtn) {
    paginationBtn.forEach((item) => {
      item.classList.contains("page-count-num") &&
        item.classList.remove("page-count-num-choice");
    });
    pageBtn.classList.add("page-count-num-choice");
  }
});

// 검색창 눌렀을때 검색바에 아웃라인주기
const searchBar = document.querySelector("label.search-bar");
const mileageInput = document.querySelector("input.content-detail-num");

document.addEventListener("click", (e) => {
  if (e.target.closest("label.search-bar")) {
    searchBar.classList.add("search-bar-checked");
    return;
  }
  searchBar.classList.remove("search-bar-checked");
});

const inputField = document.querySelector(".search-bar input");
const cancelButton = document.querySelector(".search-bar .cancel-logo");
const searchButton = document.querySelector(".search-bar .search-logo");

// 입력 필드에 입력 내용이 변경될 때마다 실행될 함수를 정의
function handleInputChange() {
  const inputValue = inputField.value.trim();

  if (inputValue !== "") {
    cancelButton.style.display = "flex";
    searchButton.style.display = "none";
  } else {
    cancelButton.style.display = "none";
    searchButton.style.display = "flex";
  }
}

// cancel-logo를 클릭했을 때 실행될 함수를 정의
function handleCancelClick() {
  inputField.value = "";
  cancelButton.style.display = "none";
  searchButton.style.display = "flex";
}

// 입력 필드에 이벤트 리스너를 추가
inputField.addEventListener("input", handleInputChange);

// cancel-logo에 클릭 이벤트 리스너를 추가
cancelButton.addEventListener("click", handleCancelClick);

// 강의 정보, 리뷰 정보, 수강생 목록 선택하기
const catebtns = document.querySelectorAll("#btn");
const cateUnder = document.querySelectorAll("#under");
cateUnder[0].classList.add("underbar-checked");
catebtns[0].classList.add("lecture-checked");

catebtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    catebtns.forEach((btn, i) => {
      btn.classList.remove("lecture-checked");
      cateUnder[i].classList.remove("underbar-checked");
    });
    btn.classList.add("lecture-checked");
    cateUnder[i].classList.add("underbar-checked");
  });
});

const mileageEditBtn = document.querySelector(".edit-button[");
