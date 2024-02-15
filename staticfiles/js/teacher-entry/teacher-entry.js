// 강사 신청 - 안내 페이지 js 파일

/*  
    ※ 자주 묻는 질문

    각 질문 제목 or 옆에 있는 버튼 클릭 시
    답변 펼쳐짐(height 100%) + 버튼 180도 회전 

    펼쳐진 상태로 다시 클릭하면 닫히게
*/

// 객체(질문 사항들) 전부 가져오기
const questions = document.querySelectorAll(".each-questions-wrap");

// 각 객체에 click 이벤트 추가
questions.forEach((item) => {
  // 질문 제목칸 객체 가져오기
  const questionTitle = item.children[0];

  // 이벤트의 대상이 될 답변과 확장버튼 역시 변수에 할당
  const answer = item.children[1];
  const expandButton = item.children[0].children[0].children[0];

  // 제목칸 - click 이벤트
  // transition 안 먹혀서 딱딱하게 변하는 문제 있음
  questionTitle.addEventListener("click", () => {
    // 현재 답변칸 height에 따라 0 or 100%의 height 부여
    answer.style.height = answer.style.height == "100%" ? 0 : "100%";

    // 확장 버튼 180도 회전
    expandButton.style.transform =
      expandButton.style.transform == "rotate(180deg)"
        ? "rotate(0deg)"
        : "rotate(180deg)";
  });
});

/*
  모달창 관련 코드 - from 결제 페이지
*/
// 강사신청 모달, 모달 표시 버튼(2개) 가져오기
const entryModal = document.querySelector(".entry-modal-wrap");
const modalBtn = document.querySelectorAll(".header-entry-button, .entry-link");

// 강사신청 모달창 표시
modalBtn.forEach((button) => {
  button.addEventListener("click", () => {
    entryModal.style.display = "block";
  });
});

// 강사신청 모달창 내 닫기 버튼
const closeBtn = document.querySelector(".close-button");

// 클릭하면 강사신청 모달창 닫힘
closeBtn.addEventListener("click", (e) => {
  entryModal.style.display = "none";
});

// 강사신청 모달 내 버튼과, 그걸 누르면 나오는 확인 모달창
const entryButton = document.querySelector(".entry-button");
const confirmModal = document.querySelector(".entry-confirm-total-wrap");

// 모달 내 신청버튼에 click 이벤트 부여
entryButton.addEventListener("click", (e) => {
  // 신청 버튼을 누를 때 확인 모달창 표시
  confirmModal.style.display = "block";

  // 신청 확인 버튼
  const confirmButton = document.querySelector(".entry-confirm");

  // 확인을 누르면 알림(alert) 표시
  confirmButton.addEventListener("click", () => {
    alert("강사자격 신청이 완료되었습니다.");

    // 신청 및 확인 모달창 숨김
    confirmModal.style.display = "none";
    entryModal.style.display = "none";
  });

  // 취소 버튼
  const cancelButton = document.querySelector(".entry-confirm-cancel");

  // 취소를 누르면 알림 없이 확인 모달창만 숨김
  cancelButton.addEventListener("click", () => {
    confirmModal.style.display = "none";
  });
});

/*
  이메일, 비밀번호 검사 및 에러 처리
*/
// 이메일, 비밀번호 입력창
const emailInput = document.querySelector(".local-input-form");
const passwordInput = document.querySelector(".password-input-form");

// 각 입력창 아래 숨겨져 있는 에러 텍스트들
const emailErrorText = document.querySelector(".email-input-area .error-text");
const passwordErrorText = document.querySelector(
  ".password-input-area .error-text"
);

// 이메일 입력창 - keyup 이벤트
emailInput.addEventListener("keyup", (e) => {
  // 값이 없다면 입력창에 에러 발생
  if (!e.target.value) {
    // error 클래스가 기존에 없었을 경우에만 추가
    if (!emailInput.classList.contains("error")) {
      emailInput.classList.add("error");
    }

    // 숨겨져 있던 에러 텍스트 표시
    emailErrorText.style.display = "block";

    // 아래쪽 이벤트 실행 안하고 이벤트 리스너 탈출
    return;
  }
  // 입력값이 뭐라도 있다면 입력창 error 클래스 제거
  emailInput.classList.remove("error");

  // 에러 텍스트 숨김
  emailErrorText.style.display = "none";
});

// 이메일 입력창 - blur 이벤트
// keyup 이벤트와 기능 동일
emailInput.addEventListener("blur", (e) => {
  if (!e.target.value) {
    if (!emailInput.classList.contains("error")) {
      emailInput.classList.add("error");
    }
    emailErrorText.style.display = "block";

    return;
  }
  emailInput.classList.remove("error");
  emailErrorText.style.display = "none";
});

// 비밀번호 입력창 - keyup 이벤트
// 이메일 입력창과 기능 동일
passwordInput.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    if (!passwordInput.classList.contains("error")) {
      passwordInput.classList.add("error");
    }
    passwordErrorText.style.display = "block";

    return;
  }
  passwordInput.classList.remove("error");
  passwordErrorText.style.display = "none";
});

// 비밀번호 입력창 - blur 이벤트
passwordInput.addEventListener("blur", (e) => {
  if (!e.target.value) {
    if (!passwordInput.classList.contains("error")) {
      passwordInput.classList.add("error");
    }
    passwordErrorText.style.display = "block";

    return;
  }
  passwordInput.classList.remove("error");
  passwordErrorText.style.display = "none";
});

// 양쪽 입력창 모두에 값이 있을 때만 신청버튼 활성화
// if (emailInput.value && passwordInput.value) {
//   entryButton.disabled = "false";
// } else {
//   entryButton.disabled = "true";
// }
