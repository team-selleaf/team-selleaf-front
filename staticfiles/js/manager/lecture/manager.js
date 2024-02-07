// 삭제 버튼 누르면 뜨는 모달창
document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.querySelectorAll(".edit-button");
  const modalWrap = document.querySelector(".delete-modal-wrap");

  editButton[2].addEventListener("click", function () {
    modalWrap.style.display = "flex";
  });

  const cancelButton = document.querySelector(".modal-cancel button");
  const confirmButton = document.querySelector(".modal-confirm button");

  cancelButton.addEventListener("click", function () {
    modalWrap.style.display = "none";
  });

  confirmButton.addEventListener("click", function () {
    modalWrap.style.display = "none";
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

// 글쓰기 버튼을 클릭하면 모달이 생성되고 다시 클릭하면 모달이 없어져야함
// 대신 화면의 다른 부분을 클릭해도 모달이 없어져야함
const modalButton = document.querySelector("button.list-order");
const modal = document.querySelector(".list-order-function");
const modalUl = document.querySelector("ul.list-order-function");
const modalSvg = document.querySelector("svg.list-order");

document.addEventListener("click", (e) => {
  if (e.target.closest("button.list-order")) {
    modal.style.display = "block";
    modalSvg.style.transform = "rotate(180deg)";
    modalButton.classList.add("border-color");
  } else {
    if (e.target.classList.contains("list-order-function")) {
      modal.style.display = "block";
      return;
    }
    modal.style.display = "none";
    modalSvg.style.transform = "rotate(360deg)";
    modalButton.classList.remove("border-color");
  }
});

// 순서 정렬 박스에서 선택한 값이 위에 선택하기
const modalBtns = modal.querySelectorAll("button.function-latest");
modalBtns.forEach((modalBtn) => {
  modalBtn.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    const order1 = document.querySelector(".order-1");
    order1.innerText = btn.innerText;
  });
});

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
