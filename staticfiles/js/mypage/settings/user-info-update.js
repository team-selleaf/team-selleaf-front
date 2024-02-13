// 마이페이지/설정/회원정보수정 js 파일

/*
    별명 입력란에 아무것도 입력되지 않았을 경우
    input 테두리 색, focus 되었을 때 box-shadow 색 변경

    아래쪽 user-info-error(div) 에 innerText 추가
*/

// 필요한 객체 가져오기
const nicknameInput = document.querySelector(".user-name-input-form");
const nicknameErrorWrap = document.querySelector(
  ".user-name-input-wrap .user-info-error"
);

// 출력할 메세지 변수화
const mustNeededMsg = "필수 입력 항목입니다."; // 미입력 오류
const lessThanTwoMsg = "2자 이상 입력해주세요."; // 2자 이하(1자) 오류
const moreThanFifteenMsg = "15자 이하로 입력해주세요."; // 15자 초과 오류

// 별명 정규식
const nicknameRegex = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s]{2,15}$/;

// 별명 입력창 - keyup 이벤트
// 자판 눌린 시점에서 값이 없거나, 양식에 위반되면 클래스 추가해서 테두리 색 변경
nicknameInput.addEventListener("keyup", (e) => {
  // 만약 키가 눌린 시점에 값이 없거나, 별명 양식이 안 지켜져 있을 경우
  if (!e.target.value || !nicknameRegex.test(e.target.value)) {
    // 별명 입력창에 error 클래스 추가
    // 클래스의 중첩을 막기 위해, 기존에 error 클래스가 없는지부터 확인
    if (!e.target.classList.contains("error")) {
      e.target.classList.add("error");
    }

    // 위 분기로 얻어낸 에러 메세지를 별명 입력창 아래 div 태그에 innerText로 할당
    /*
        값 없어? -> "필수 입력"

        값 있어?
        2글자 미만이야? -> "2글자 이상 입력"

        2글자 이상이야?
        15글자 초과야? -> "15글자 이하로 입력"
    */
    nicknameErrorWrap.innerText = !e.target.value
      ? mustNeededMsg
      : e.target.value.length < 2
      ? lessThanTwoMsg
      : e.target.value.length > 15
      ? moreThanFifteenMsg
      : "";

    // 아래쪽 경우의 수(값 있고 양식까지 맞춤) 실행 안하고 함수 종료
    return;
  }
  // 만약 어떤 값이라도 있고, 양식도 지킨 경우

  // 별명 입력창의 error 클래스 삭제
  e.target.classList.remove("error");

  // 에러 메시지 출력 태그의 innerText 비우기
  nicknameErrorWrap.innerText = "";
});

/*
    생년월일 입력창의 날짜 제한을 현재 시간에 따라 동적으로 변경

    한국 시간이 표준시보다 9시간 빠르기 때문에 그 점까지 반영해서
    오늘로부터 14년 전을 max로 설정
    -> Date.now() 하면 한국 표준시로 잘 가져와짐

    추가로, 직접 타자로 입력할 경우 유효성 검사도 실행할 것
*/
// 필요한 객체 가져오기
const birthInput = document.querySelector(".birth-input-form"); // 생년월일 입력창

// const korTimeDiff = 1000 * 60 * 60 * 9; // 한국 - 표준시의 시차(9시간)
let now = new Date(Date.now()); // 표준시 + 9시간 = 현재 한국 시간

/*
    max 값으로 설정할 14년 전 날짜 만들기
    
    1. 오늘 날짜를 새로운 변수에 할당
    2. 새로운 변수의 year에서 -14 하기
*/
let maxDate = now;
maxDate.setFullYear(now.getFullYear() - 14);

// 14년 전 날짜를 생년월일 입력창의 max로 설정
birthInput.max = maxDate.toISOString().substring(0, 10);

/*
    프로필 이미지 클릭 시, 컴퓨터 내 이미지 불러오기 이벤트 발생

    이미지를 불러올 경우, 이미지 삭제 버튼(image-delete-button)의
    display를 flex로 변경해서 보이게 함
*/
