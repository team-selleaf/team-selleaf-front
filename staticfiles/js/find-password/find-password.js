/*
    해야되는 것들

    버튼 2개 js 이벤트 리스너
*/

// 이벤트에 필요한 객체를 전부 const에 저장
const emailWrap = document.querySelector(".email-input-wrap");
const emailContainer = document.querySelector(".email-input-container");
const emailInput = document.querySelector(".email-input-area");
const emailButton = document.querySelector(".email-input-button");
const verifyButton = document.querySelector(".verify-button");

// 이벤트에 사용할 상수도 저장
const complete = "확인완료";
const valueNone = "필수 입력 항목입니다.";
const notRegistered = "등록된 이메일 주소가 아닙니다.";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

// email-input의 keyup 이벤트
emailInput.addEventListener("keyup", (e) => {
  // 만약 input 창에 value가 없다면
  if (!e.target.value) {
    // 아래에서 새로운 div를 추가하기 전에, 해당 div가 기존에 있는지 확인
    if (!document.querySelector(".not-verified")) {
      // 없다면 메세지 객체(div) 추가
      newDiv = document.createElement("div");

      // 오류 메세지 추가
      newDiv.innerText = valueNone;

      // 스타일을 받을 수 있게 클래스 추가
      newDiv.classList.add("not-verified");

      // email-input-wrap의 마지막에 추가
      emailWrap.appendChild(newDiv);
    }
    // 없다면 email-wrap의 border 스타일 변경
    emailWrap.style.border = "1px solid rgb(255, 119, 119)";

    // 이메일 버튼 기능 정지
    emailButton.disabled = true;
    return;
  }

  // 만약 어떤 값이라도 있다면
  else {
    // value가 있다면 스타일 원복
    emailWrap.style.border = "1px solid rgb(219, 219, 219)";

    // 이메일 버튼 활성화
    emailButton.disabled = false;

    // not-verifild 클래스 가진 div(에러 메세지) 삭제
    emailWrap.removeChild(document.querySelector(".not-verified"));
  }
});

// email-input의 블러 이벤트
emailInput.addEventListener("blur", (e) => {
  // 만약 value 가 없다면
  if (!e.target.value) {
    // 아래에서 새로운 div를 추가하기 전에, 해당 div가 기존에 있는지 확인
    if (!document.querySelector(".not-verified")) {
      // 없다면 메세지 객체(div) 추가
      newDiv = document.createElement("div");

      // 오류 메세지 추가
      newDiv.innerText = valueNone;

      // 스타일을 받을 수 있게 클래스 추가
      newDiv.classList.add("not-verified");

      // email-input-wrap의 마지막에 추가
      emailWrap.appendChild(newDiv);
    }
    // 없다면 email-wrap의 border 스타일 변경
    emailWrap.style.border = "1px solid rgb(255, 119, 119)";

    // 이메일 버튼 기능 정지
    emailButton.disabled = true;
    return;
  }

  // value 가 있을 때
  // 만약 어떤 값이라도 있다면
  else {
    // value가 있다면 스타일 원복
    emailWrap.style.border = "1px solid rgb(219, 219, 219)";

    // 이메일 버튼 활성화
    emailButton.disabled = false;

    // not-verifild 클래스 가진 div(에러 메세지) 삭제
    emailWrap.removeChild(document.querySelector(".not-verified"));
  }
});

// email-input-button 클릭 이벤트
emailButton.addEventListener("click", (e) => {
  // 만약 input에 입력한 값이 정규식을 만족한다면
  if (emailRegex.test(emailInput.value)) {
    // 아래쪽 인증 버튼 활성화
    verifyButton.disabled = false;

    // "확인" 버튼 안 글자를 "확인완료" 로 변경
    e.target.innerText = "확인완료";

    // input과 확인 버튼 부분 비활성화
    // wrap, input 부분 배경색 변경
    console.log(emailInput.style);
    emailWrap.style.background = "rgb(247, 248, 250)";
    emailInput.style.webkitBoxShadow = "0 0 0 30px rgb(247, 248, 250) inset";
    e.target.disabled = true;
    emailInput.disabled = true;

    return;
  }

  // 만약 조건식을 만족하지 않는다면 확인 버튼 비활성화
  e.target.disabled = true;

  // 위 이벤트들과는 다른 오류 메세지 추가
  // 아래에서 새로운 div를 추가하기 전에, 해당 div가 기존에 있는지 확인
  if (!document.querySelector(".not-verified")) {
    // 없다면 메세지 객체(div) 추가
    newDiv = document.createElement("div");

    // 오류 메세지 추가
    newDiv.innerText = notRegistered;

    // 스타일을 받을 수 있게 클래스 추가
    newDiv.classList.add("not-verified");

    // email-input-wrap의 마지막에 추가
    emailWrap.appendChild(newDiv);
  }
  // 없다면 email-wrap의 border 스타일 변경
  emailWrap.style.border = "1px solid rgb(255, 119, 119)";

  return;
});
