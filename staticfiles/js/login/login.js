/*
    email, pw 입력란

    이메일 input 클릭하면 처음에는 하늘색의 굵은 반투명 outline 추가
        -> 이벤트 리스너 click
        -> focus-visible 클래스 추가

    다만, blur 되었을 때, 값이 아무것도 없다면 테두리 빨갛게 변경(아마 red?)
        -> 이 때 다시 input 클릭하면 위의 클릭 이벤트로 나오는
           굵은 테두리가 빨간색으로 변경


    비밀번호 input을 클릭하면 마찬가지로 해당 부분만 하늘색의 굵은 반투명 outline 추가

    단, blur 되었을 때에는 이메일과 비밀번호 input 모두 테두리 빨갛게 변경

    이 상태에서 클릭했을 때에는 비밀번호 input 만 빨간색 굵은 반투명 테두리 추가 
*/

// email, password input 객체를 상수에 할당
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");

// 로그인 버튼(submit) 객체 가져옴
const loginButton = document.querySelector(".login-button");

// email input을 클릭했을 때의 이벤트 리스너
// 스타일은 CSS쪽에서 클래스 선택자로 추가
emailInput.addEventListener("click", (e) => {
  e.target.classList.toggle("focus-visible");
});

// email input에 값을 입력했을 때의 이벤트 리스너
// 스타일은 CSS쪽에서 클래스 선택자로 추가
emailInput.addEventListener("keyup", (e) => {
  // 값이 있는지 검사
  if (e.target.value) {
    // email-blur 클래스가 있는지(테두리 빨간색인지) 검사
    if (e.target.classList.contains("email-blur")) {
      e.target.classList.remove("email-blur");
      e.target.classList.remove("focus-visible");
      return;
    }

    // 없다면 focus-visible 클래스가 있는지 검사
    if (!e.target.classList.contains("focus-visible")) {
      // 없을 때 추가
      e.target.classList.add("focus-visible");
    }
    return;
  }

  // 값이 없는(없어진) 경우, 엔터를 입력했는지 검사
});

// email input이 blur 되었을 때의 이벤트 리스너
// 위 클릭으로 추가된 클래스는 삭제되고, 새로운 클래스 추가
emailInput.addEventListener("blur", (e) => {
  // 만약 값이 아무것도 없으면
  if (!e.target.value) {
    // email-blur 있는지 확인하고, 없을 때 추가
    e.target.classList.contains("email-blur")
      ? ""
      : e.target.classList.add("email-blur");
  }
  // 값 유무 상관 없이 blur 되면 삭제
  e.target.classList.remove("focus-visible");
});

// password-input도 같은 방식으로 진행
// password-input을 클릭했을 때의 이벤트 리스너
passwordInput.addEventListener("click", (e) => {
  e.target.classList.toggle("focus-visible");
});

// password-input에 입력했을 때의 이벤트 리스너
passwordInput.addEventListener("keyup", (e) => {
  // password-input에 값 있는지 검사 - 있다면 password-input에만 실행
  if (e.target.value) {
    // blur 있는지 검사 - 있다면 blur, focus 제거
    if (e.target.classList.contains("password-blur")) {
      e.target.classList.remove("password-blur");
      e.target.classList.remove("focus-visible");
      return;
    }

    // 만약 키를 뗀 시점에서 값이 없다면, focus-visible 있는지 확인
    if (!e.target.classList.contains("focus-visible")) {
      // 없으면 추가
      e.target.classList.add("focus-visible");
      return;
    }
  }

  // 값이 없는(없어진) 경우, blur 있는지 검사 - 없으면 추가
  if (e.target.classList.contains("password-blur")) {
    e.target.classList.add("password-blur");
  }
  // 나중에 엔터 입력 이벤트 추가할 것
});

// password input이 blur 되었을 때의 이벤트 리스너
// email input에도 blur 속성 추가!
passwordInput.addEventListener("blur", (e) => {
  // 일단 focus-visible 클래스 제거
  e.target.classList.remove("focus-visible");

  // 값 있는지 검사 필요 - 없을 때의 경우
  if (!e.target.value) {
    // password-blur 있는지 검사 - 없을 때만 추가
    if (!e.target.classList.contains("password-blur")) {
      e.target.classList.add("password-blur");
    }

    // 위와는 별개로(이벤트 리스너 함수 종료 안 하고) 이메일 input 쪽 값 있는지 검사
    if (!emailInput.value) {
      // 만약 값이 없으면 이쪽도 blur(기존에 없었으면) 추가
      emailInput.classList.contains("email-blur")
        ? ""
        : emailInput.classList.add("email-blur");
      return;
    }
    // 이메일 input에 값이 있으면 그냥 리턴 - email쪽 이벤트 리스너에서 처리
    return;
  }

  // 비밀번호 input에 무슨 값이든 있을 때의 경우, 일단 blur 삭제
  e.target.classList.remove("password-blur");

  // 마찬가지로 이메일 input에 값 있는지 검사 - 없을 때만 blur 추가
  if (!emailInput.value) {
    // 기존 blur 여부 확인하고 - blur 없을 때만 추가
    emailInput.classList.contains("email-blur")
      ? ""
      : emailInput.classList.add("email-blur");
    return;
  }
  // 없으면 추가 작업 안 함
});

/*
    다른 SNS 로그인 아이콘

    mouseover 되면 아이콘 색깔 뿌얘짐
        -> img 태그에 opacity 적용

    mouseout 되면 원상복구
*/
const images = document.querySelectorAll(".login-with-sns-wrap > img");

images.forEach((image) => {
  image.addEventListener("mouseover", (e) => {
    e.target.style.opacity = 0.6;
  });

  image.addEventListener("mouseout", (e) => {
    e.target.style.opacity = 1;
  });
});

/*
    footer 쪽 bucketplace~ 글자(a 태그)

    mouseover 되면 text-decoration 다시 생김
        -> text-decoration: underline

    mouseout 되면 원상복구
*/
const aNonDecoration = document.querySelector("footer a");

// mouseover 이벤트 추가
aNonDecoration.addEventListener("mouseover", (e) => {
  e.target.style.textDecorationLine = "underline";
});

// mouseout 이벤트 추가
aNonDecoration.addEventListener("mouseout", (e) => {
  e.target.style.textDecorationLine = "none";
});

// 현재 남은 것들
// 일부 텍스트 및 svg 아이콘 사이 간격
// 비회원 주문 조회 삭제
