// 회원가입 페이지 용 js
/*
    클래스 add, remove를 이용한 스타일 변화


    ※ 모든 input란

    - keyup, blur

        각 input 별 조건(정규식)을 만족하지 않으면
        특정 태그에 .error 클래스 toggle

        .error에 대한 스타일 관리는 css에서


        -> 입력창 위 label 태그 텍스트와 border-color,
           focus 되었을 때의 box-shadow 색 변경
           + 각 input의 wrap 아래에 빨간색 경고 텍스트(div) 추가
           
           맨 아래 이용약관은 label 텍스트와
           terms-container의 border 색만 변경
*/

/*
    ※ 이메일

    - keyup, blur

        앞쪽 직접 입력란과 뒤쪽 드롭박스(선택해주세요 or 직접 입력에 값 없을 때)중 하나라도 값이 없을 경우
            -> 양쪽과 label 텍스트에 .error 추가, 이메일 인증버튼에 .enabled 클래스 remove

            * 나중에는 keyup 이벤트로 실시간으로 데이터 송수신해서 띄우기


        값이 뭐라도 생기면 아래쪽 인증버튼에 .enabled 클래스 toggle
            -> border와 color, background-color 변경

        * 드롭박스 쪽 직접입력
            -> 이거 선택하면 input 창으로 바뀌는 건 어떻게 하는 건가...
                해당 option 안에 input 태그를 넣나?
*/
// 이벤트에 사용할 상수 저장
const emailText = document.querySelector(".email-input-text");
const emailInput = document.querySelector(".email-form-control:nth-child(1)"); // 정확히 input 태그를 찍어줘야 됨
const emailDrop = document.querySelector(".email-input-domain");

// 오류 시 메시지(div) 추가에 필요 - wrap 아레의 마지막 요소로 추가 예정
const emailWrap = document.querySelector(".email-input-wrap");

// 이메일 인증 버튼도 조작해야되기 때문에 미리 가져옴
const emailVerifyBtn = document.querySelector(".email-verify-button");

// 양쪽 입력창 모두에 적용(forEach)하기 위한 상수
const emailForm = document.querySelectorAll(".email-form-control");

// 입력창 별로 error 발생 시, 추가되는 div에 넣을 텍스트들을 미리 저장
const emailFormErrorMsg = "이메일 형식이 올바르지 않습니다."; // email input에 값 없을 때
const alreadyRegisteredMsg =
  "이미 가입한 이메일입니다. '이메일 로그인'으로 로그인해주세요."; // 기존 회원일 때
const snsAlreadyRegisteredMsg =
  "이미 간편가입으로 가입된 이메일입니다. 위쪽의 버튼을 눌러 로그인해주세요."; // 이미 간편가입 된 회원일 때

// 이메일 입력창에 대한 keyup 이벤트 생성
emailInput.addEventListener("keyup", (e) => {
  // 만약 키가 눌린 시점에 아무런 값이 없다면
  if (!e.target.value) {
    // 입력창과 드롭박스 모두에 error 클래스 추가
    emailForm.forEach((form) => {
      // error 클래스의 중첩을 막기 위해, 기존에 error 클래스가 없는지부터 확인
      if (!form.classList.contains("error")) {
        form.classList.add("error");
      }
    });

    // label 태그(텍스트)에도 error 클래스 없는 거 확인하고 추가
    if (!emailText.classList.contains("error")) {
      emailText.classList.add("error");
    }

    // 나중에 이메일 인증 버튼 작업할 때 여기에서 enabled 클래스 삭제
    emailVerifyBtn.classList.remove("enabled");

    // email-input-wrap의 맨 아래에 div 요소(에러 메세지 = not-avaliable 클래스) 추가
    // 추가하기 전에 wrap 안에 .not-avaliable 요소 있는지 확인
    if (!document.querySelector(".email-input-wrap .not-available")) {
      // 새로운 div 요소 생성
      const newDiv = document.createElement("div");

      // 오류 메세지 추가 - 지금은 형식 오류만
      newDiv.innerText = emailFormErrorMsg;

      // 스타일을 받을 수 있게 클래스 추가
      newDiv.classList.add("not-available");

      // email-input-wrap의 맨 마지막에 추가
      emailWrap.appendChild(newDiv);
    }

    // 아래쪽 경우의 수(값 있는 경우) 실행 안하고 함수 종료
    return;
  }
  // 만약 어떤 값이라도 있는 경우
  // 나중에는 DB랑 연결 - DB에 저장되지 않은 값일 경우

  // 입력창과 드롭박스 모두 error 클래스 삭제
  emailForm.forEach((form) => {
    form.classList.remove("error");
  });

  // label 태그에서도 삭제
  emailText.classList.remove("error");

  // 나중에 이메일 인증 버튼 작업할 때 여기에서 enabled 클래스 추가
  // 위에서 error 클래스 추가한 것처럼, 여기에서도 기존에 enabled 클래스가 있었는지 확인
  if (!emailVerifyBtn.classList.contains("enabled")) {
    // 기존에 없었을 경우에만 추가
    emailVerifyBtn.classList.add("enabled");
  }

  // 입력창 아래의 에러 메세지(not-available 클래스 가진 div) 삭제
  // 있을 경우에만 삭제 - 조건식 없으면 에러 발생
  // 추가 - 어디 안에 있는 .not-available인지 정확하게 집어줘야 됨
  if (document.querySelector(".email-input-wrap .not-available")) {
    emailWrap.removeChild(
      document.querySelector(".email-input-wrap .not-available")
    );
  }
});

// 이메일 입력창에 대한 blur 이벤트 생성
emailInput.addEventListener("blur", (e) => {
  // 만약 blur 된 시점에 아무런 값이 없다면
  if (!e.target.value) {
    // 입력창과 드롭박스 모두에 error 클래스 추가
    emailForm.forEach((form) => {
      // error 클래스의 중첩을 막기 위해, 기존에 error 클래스가 없는지부터 확인
      if (!form.classList.contains("error")) {
        form.classList.add("error");
      }
    });

    // label 태그(텍스트)에도 error 클래스 없는 거 확인하고 추가
    if (!emailText.classList.contains("error")) {
      emailText.classList.add("error");
    }

    // 나중에 이메일 인증 버튼 작업할 때 여기에서 enabled 클래스 삭제
    emailVerifyBtn.classList.remove("enabled");

    // email-input-wrap의 맨 아래에 div 요소(에러 메세지 = not-avaliable 클래스) 추가
    // 추가하기 전에 wrap 안에 .not-avaliable 요소 있는지 확인
    if (!document.querySelector(".email-input-wrap .not-available")) {
      // 새로운 div 요소 생성
      const newDiv = document.createElement("div");

      // 오류 메세지 추가 - 지금은 형식 오류만
      newDiv.innerText = emailFormErrorMsg;

      // 스타일을 받을 수 있게 클래스 추가
      newDiv.classList.add("not-available");

      // email-input-wrap의 맨 마지막에 추가
      emailWrap.appendChild(newDiv);
    }

    // 아래쪽 경우의 수(값 있는 경우) 실행 안하고 함수 종료
    return;
  }
  // 만약 어떤 값이라도 있는 경우
  // 나중에는 DB랑 연결 - DB에 저장되지 않은 값일 경우

  // 입력창과 드롭박스 모두 error 클래스 삭제
  emailForm.forEach((form) => {
    form.classList.remove("error");
  });

  // label 태그에서도 삭제
  emailText.classList.remove("error");

  // 나중에 이메일 인증 버튼 작업할 때 여기에서 enabled 클래스 추가
  // 위에서 error 클래스 추가한 것처럼, 여기에서도 기존에 enabled 클래스가 있었는지 확인
  if (!emailVerifyBtn.classList.contains("enabled")) {
    // 기존에 없었을 경우에만 추가
    emailVerifyBtn.classList.add("enabled");
  }

  // 입력창 아래의 에러 메세지(not-available 클래스 가진 div) 삭제
  if (document.querySelector(".email-input-wrap .not-available")) {
    emailWrap.removeChild(
      document.querySelector(".email-input-wrap .not-available")
    );
  }
});

/*
    ※ 이메일 인증 버튼

        위 이메일 이벤트로 인해 .enabled 속성이 있을 경우에만(if) 이벤트 실행
        -> 나중에 DB랑 통신할 때 작성? 
*/

/*
    ※ 비밀번호

    - keyup, blur

        정규식(0-9,a-z,A-Z / 8자리 이상 + 15자리 이하) 만족 안 하면 .error 추가
        만족하는 즉시 .error 삭제
*/
// 이벤트 처리에 필요한 객체들을 상수에 저장
const passwordInput = document.querySelector(".password-input");
const passwordText = document.querySelector(".password-text");
const passwordWrap = document.querySelector(".password-wrap");

// 비밀번호 양식 선언
const passwordRegex = /^[A-Za-z0-9]{8,15}$/;

// 오류 메세지 저장
const mustNeededMsg = "필수 입력 항목입니다."; // 미입력 오류
const passwordErrorMsg =
  "비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다."; // 비밀번호 양식 오류

// 비밀번호 입력창에 대한 keyup 이벤트 생성
passwordInput.addEventListener("keyup", (e) => {
  // 만약 키가 눌린 시점에 비밀번호 양식이 안 지켜져 았다면
  if (!e.target.value || !passwordRegex.test(e.target.value)) {
    // password-input에 error 클래스 추가
    // error 클래스의 중첩을 막기 위해, 기존에 error 클래스가 없는지부터 확인
    if (!e.target.classList.contains("error")) {
      e.target.classList.add("error");
    }

    // label 태그(텍스트)에도 error 클래스 없는 거 확인하고 추가
    if (!passwordText.classList.contains("error")) {
      passwordText.classList.add("error");
    }

    // password-input-wrap의 맨 아래에 div 요소(에러 메세지 = not-avaliable 클래스) 추가
    // 추가하기 전에 wrap 안에 .not-avaliable 요소 있는지 확인
    if (!document.querySelector(".password-wrap .not-available")) {
      // 새로운 div 요소 생성
      const newDiv = document.createElement("div");

      // 오류 메세지 추가
      // 값이 있으면 - 형식 오류
      // 값이 없으면 - 미입력 오류
      newDiv.innerText = !e.target.value ? mustNeededMsg : passwordErrorMsg;

      // 스타일을 받을 수 있게 클래스 추가
      newDiv.classList.add("not-available");

      // password-input-wrap의 맨 마지막에 추가
      passwordWrap.appendChild(newDiv);
    }

    // 아래쪽 경우의 수(값 있는 경우) 실행 안하고 함수 종료
    return;
  }
  // 만약 어떤 값이라도 있는 경우
  // 나중에는 DB랑 연결 - DB에 저장되지 않은 값일 경우

  // password-input의 error 클래스 삭제
  e.target.classList.remove("error");

  // label 태그에서도 삭제
  passwordText.classList.remove("error");

  // 입력창 아래의 에러 메세지(not-available 클래스 가진 div) 삭제
  // 있을 경우에만 삭제 - 조건식 없으면 에러 발생
  if (document.querySelector(".password-wrap .not-available")) {
    passwordWrap.removeChild(
      document.querySelector(".password-wrap .not-available")
    );
  }
});

// 비밀번호 입력창에 대한 blur 이벤트 생성
passwordInput.addEventListener("blur", (e) => {
  // 만약 blur 시점에 비밀번호 양식이 안 지켜져 았다면
  if (!e.target.value || !passwordRegex.test(e.target.value)) {
    // password-input에 error 클래스 추가
    // error 클래스의 중첩을 막기 위해, 기존에 error 클래스가 없는지부터 확인
    if (!e.target.classList.contains("error")) {
      e.target.classList.add("error");
    }

    // label 태그(텍스트)에도 error 클래스 없는 거 확인하고 추가
    if (!passwordText.classList.contains("error")) {
      passwordText.classList.add("error");
    }

    // password-input-wrap의 맨 아래에 div 요소(에러 메세지 = not-avaliable 클래스) 추가
    // 추가하기 전에 wrap 안에 .not-avaliable 요소 있는지 확인
    if (!document.querySelector(".password-wrap .not-available")) {
      // 새로운 div 요소 생성
      const newDiv = document.createElement("div");

      // 오류 메세지 추가
      // 값이 있으면 - 형식 오류
      // 값이 없으면 - 미입력 오류
      newDiv.innerText = !e.target.value ? mustNeededMsg : passwordErrorMsg;

      // 스타일을 받을 수 있게 클래스 추가
      newDiv.classList.add("not-available");

      // password-input-wrap의 맨 마지막에 추가
      passwordWrap.appendChild(newDiv);
    }

    // 아래쪽 경우의 수(값 있는 경우) 실행 안하고 함수 종료
    return;
  }
  // 만약 어떤 값이라도 있는 경우
  // 나중에는 DB랑 연결 - DB에 저장되지 않은 값일 경우

  // password-input의 error 클래스 삭제
  e.target.classList.remove("error");

  // label 태그에서도 삭제
  passwordText.classList.remove("error");

  // 입력창 아래의 에러 메세지(not-available 클래스 가진 div) 삭제
  if (document.querySelector(".password-wrap .not-available")) {
    passwordWrap.removeChild(
      document.querySelector(".password-wrap .not-available")
    );
  }
});

/*
    ※ 비밀번호 확인

        위쪽 비번 이벤트 + keyup 될 때 비밀번호 값 가지고 와서 비교
            -> 불일치 시 .error 추가, 일치 시 .error 삭제
*/
// 이벤트 처리에 필요한 객체들을 상수에 저장
const verifyInput = document.querySelector(".password-verify-input");
const verifyText = document.querySelector(".password-verify-text");
const verifyWrap = document.querySelector(".password-verify-wrap");

// 오류 메세지 저장
const mustVerifiedMsg = "확인을 위해 비밀번호를 한 번 더 입력해주세요."; // 미입력 오류
const incorrectErrorMsg = "비밀번호가 일치하지 않습니다."; // 불일치 오류

// 비밀번호 확인 입력창에 대한 keyup 이벤트 생성
verifyInput.addEventListener("keyup", (e) => {
  // 키 눌릴때마다 비밀번호 입력칸 안의 값 가져옴
  let correctValue = passwordInput.value;

  // 만약 키가 눌린 시점에 비밀번호 입력칸에 입력한 것과 값이 다르다면 or 값이 없다면
  if (!e.target.value || e.target.value !== correctValue) {
    // password-verify-input에 error 클래스 추가
    // error 클래스의 중첩을 막기 위해, 기존에 error 클래스가 없는지부터 확인
    if (!e.target.classList.contains("error")) {
      e.target.classList.add("error");
    }

    // label 태그(텍스트)에도 error 클래스 없는 거 확인하고 추가
    if (!verifyText.classList.contains("error")) {
      verifyText.classList.add("error");
    }

    // password-verify-wrap의 맨 아래에 div 요소(에러 메세지 = not-avaliable 클래스) 추가
    // 추가하기 전에 wrap 안에 .not-avaliable 요소 있는지 확인
    if (!document.querySelector(".password-verify-wrap .not-available")) {
      // 새로운 div 요소 생성
      const newDiv = document.createElement("div");

      // 오류 메세지 추가
      // 값이 있으면 - 불일치 오류
      // 값이 없으면 - 미입력 오류
      newDiv.innerText = !e.target.value ? mustVerifiedMsg : incorrectErrorMsg;

      // 스타일을 받을 수 있게 클래스 추가
      newDiv.classList.add("not-available");

      // email-verify-wrap의 맨 마지막에 추가
      verifyWrap.appendChild(newDiv);
    }

    // 아래쪽 경우의 수(값 있는 경우) 실행 안하고 함수 종료
    return;
  }
  // 만약 어떤 값이라도 있는 경우
  // password-verify-input의 error 클래스 삭제
  e.target.classList.remove("error");

  // label 태그에서도 삭제
  verifyText.classList.remove("error");

  // 입력창 아래의 에러 메세지(not-available 클래스 가진 div) 삭제
  // 있을 경우에만 삭제 - 조건식 없으면 에러 발생
  if (document.querySelector(".password-verify-wrap .not-available")) {
    verifyWrap.removeChild(
      document.querySelector(".password-verify-wrap .not-available")
    );
  }
});

// 비밀번호 확인 입력창에 대한 blur 이벤트 생성
verifyInput.addEventListener("blur", (e) => {
  // blur 될 때마다 비밀번호 입력칸 안의 값 가져옴
  let correctValue = passwordInput.value;

  // 만약 blur 시점에 비밀번호 입력칸에 입력한 것과 값이 다르다면
  if (!e.target.value || e.target.value !== correctValue) {
    // password-verify-input에 error 클래스 추가
    // error 클래스의 중첩을 막기 위해, 기존에 error 클래스가 없는지부터 확인
    if (!e.target.classList.contains("error")) {
      e.target.classList.add("error");
    }

    // label 태그(텍스트)에도 error 클래스 없는 거 확인하고 추가
    if (!verifyText.classList.contains("error")) {
      verifyText.classList.add("error");
    }

    // password-verify-wrap의 맨 아래에 div 요소(에러 메세지 = not-avaliable 클래스) 추가
    // 추가하기 전에 wrap 안에 .not-avaliable 요소 있는지 확인
    if (!document.querySelector(".password-verify-wrap .not-available")) {
      // 새로운 div 요소 생성
      const newDiv = document.createElement("div");

      // 오류 메세지 추가
      // 값이 있으면 - 불일치 오류
      // 값이 없으면 - 미입력 오류
      newDiv.innerText = !e.target.value ? mustVerifiedMsg : incorrectErrorMsg;

      // 스타일을 받을 수 있게 클래스 추가
      newDiv.classList.add("not-available");

      // password-verify-wrap의 맨 마지막에 추가
      verifyWrap.appendChild(newDiv);
    }

    // 아래쪽 경우의 수(값 있는 경우) 실행 안하고 함수 종료
    return;
  }
  // 만약 어떤 값이라도 있는 경우
  // 나중에는 DB랑 연결 - DB에 저장되지 않은 값일 경우

  // password-verify-input의 error 클래스 삭제
  e.target.classList.remove("error");

  // label 태그에서도 삭제
  verifyText.classList.remove("error");

  // 입력창 아래의 에러 메세지(not-available 클래스 가진 div) 삭제
  if (document.querySelector(".password-verify-wrap .not-available")) {
    verifyWrap.removeChild(
      document.querySelector(".password-verify-wrap .not-available")
    );
  }
});

/*
    ※ 주소지

        * 앞쪽 드롭박스(도 지역, 광역시, 서울, 제주)에 맞춰서
            뒤쪽 드롭박스 내용(도 지역이면 시/군/구, 나머지는 구/동 etc...)이 결정됨

            - 문제점들 -

                1. 그리고 앞쪽 선택에 따라 뒤쪽 내용이 바뀌는데, 이건 innerHTML 넣어서(=) 구현할까?

                2. 각 지역별 드롭박스 데이터는 어떻게?
                    option 태그 객체(createElement)랑 배열(세부지역) 만들어놓고
                    forEach 돌면서 select 태그 내에 option 태그 value랑 innerText 새로운 걸로 할당(=)?

                    세부 지역들로 배열들(앞쪽 드롭박스 별로 따로) 만들어 놓음
                        -> 앞쪽 드롭박스 option의 value를 받아서, 그에 따라 순회할 배열 결정
                        -> forEach 돌려서 option 태그에 담은 다음, 특정 상수(초기값 빈 문자열)에 하나씩 추가(+=) 
                        -> 반복문 끝나면(= 다 만들어지면) select 태그의 innerHTML로 넣음

                        이런 식으로 하면 될 듯?

                3. 앞쪽 드롭박스 선택하면, 뒤쪽은 초기화됨
                    이건 이 타이밍에 innerHTML 넣으면 해결될 듯


            - 결론 -

                "선택해주세요" 없이 초기값 따로 두는 게 작업하기 편할 듯.
                그렇게 하는 사이트들이 많기도 하고.
*/
// 지역 별 세부지역을 담을 배열들 - 주소지 파트에서 사용
// 서울특별시 내 세부지역
const seoulList = [
  "종로구",
  "중구",
  "용산구",
  "성동구",
  "광진구",
  "동대문구",
  "중랑구",
  "성북구",
  "강북구",
  "도봉구",
  "노원구",
  "은평구",
  "서대문구",
  "마포구",
  "양천구",
  "강서구",
  "구로구",
  "금천구",
  "영등포구",
  "동작구",
  "관악구",
  "서초구",
  "강남구",
  "송파구",
  "강동구",
];

// 부산광역시 내 세부지역
const busanList = [
  "중구",
  "서구",
  "동구",
  "영도구",
  "부산진구",
  "동래구",
  "남구",
  "북구",
  "해운대구",
  "사하구",
  "금정구",
  "강서구",
  "연제구",
  "수영구",
  "사상구",
  "기장군",
];

// 대구광역시 내 세부지역
const daeguList = [
  "중구",
  "동구",
  "서구",
  "남구",
  "북구",
  "수성구",
  "달서구",
  "달성군",
];

// 인천광역시 내 세부지역
const incheonList = [
  "중구",
  "동구",
  "남구",
  "미추홀구",
  "연수구",
  "남동구",
  "부평구",
  "계양구",
  "서구",
  "강화군",
  "옹진군",
];

// 광주광역시 내 세부지역
const gwangjuList = ["동구", "서구", "남구", "북구", "광산구"];

// 대전광역시 내 세부 지역
const daejeonList = ["동구", "중구", "서구", "유성구", "대덕구"];

// 울산광역시 내 세부지역
const ulsanList = ["중구", "남구", "동구", "북구", "울주군"];

// 세종특별자치시 내 세부지역
const sejongList = [""];

// 경기도 내 세부지역
const gyeonggiList = [
  "수원시",
  "성남시",
  "고양시",
  "용인시",
  "부천시",
  "안산시",
  "안양시",
  "남양주시",
  "화성시",
  "평택시",
  "의정부시",
  "시흥시",
  "파주시",
  "광명시",
  "김포시",
  "군포시",
  "광주시",
  "이천시",
  "양주시",
  "오산시",
  "구리시",
  "안성시",
  "포천시",
  "의왕시",
  "하남시",
  "여주시",
  "여주군",
  "양평군",
  "동두천시",
  "과천시",
  "가평군",
  "연천군",
];

// 강원도 내 세부지역
const gangwonList = [
  "춘천시",
  "원주시",
  "강릉시",
  "동해시",
  "태백시",
  "속초시",
  "삼척시",
  "홍천군",
  "횡성군",
  "영월군",
  "평창군",
  "정선군",
  "철원군",
  "화천군",
  "양구군",
  "인제군",
  "고성군",
  "양양군",
];

// 충청북도 내 세부지역
const chungBukList = [
  "청주시",
  "충주시",
  "제천시",
  "청원군",
  "보은군",
  "옥천군",
  "영동군",
  "진천군",
  "괴산군",
  "음성군",
  "단양군",
  "증평군",
];

// 충청북도 내 세부지역
const chungNamList = [
  "천안시",
  "공주시",
  "보령시",
  "아산시",
  "서산시",
  "논산시",
  "계룡시",
  "당진시",
  "당진군",
  "금산군",
  "연기군",
  "부여군",
  "서천군",
  "청양군",
  "홍성군",
  "예산군",
  "태안군",
];

// 전라북도 내 세부지역
const jeonBukList = [
  "전주시",
  "군산시",
  "익산시",
  "정읍시",
  "남원시",
  "김제시",
  "완주군",
  "진안군",
  "무주군",
  "장수군",
  "임실군",
  "순창군",
  "고창군",
  "부안군",
];

// 전라북도 내 세부지역
const jeonNamList = [
  "목포시",
  "여수시",
  "순천시",
  "나주시",
  "광양시",
  "담양군",
  "곡성군",
  "구례군",
  "고흥군",
  "보성군",
  "화순군",
  "장흥군",
  "강진군",
  "해남군",
  "영암군",
  "무안군",
  "함평군",
  "영광군",
  "장성군",
  "완도군",
  "진도군",
  "신안군",
];

// 경상북도 내 세부지역
const gyeongBukList = [
  "포항시",
  "경주시",
  "김천시",
  "안동시",
  "구미시",
  "영주시",
  "영천시",
  "상주시",
  "문경시",
  "경산시",
  "군위군",
  "의성군",
  "청송군",
  "영양군",
  "영덕군",
  "청도군",
  "고령군",
  "성주군",
  "칠곡군",
  "예천군",
  "봉화군",
  "울진군",
  "울릉군",
];

// 경상남도 내 세부지역
const gyeongNamList = [
  "창원시",
  "마산시",
  "진주시",
  "진해시",
  "통영시",
  "사천시",
  "김해시",
  "밀양시",
  "거제시",
  "양산시",
  "의령군",
  "함안군",
  "창녕군",
  "고성군",
  "남해군",
  "하동군",
  "산청군",
  "함양군",
  "거창군",
  "합천군",
];

// 제주특별자치도 내 세부지역
const jejuList = ["제주시", "서귀포시", "북제주군", "남제주군"];

/*
    ※ 닉네임

    - keyup, blur

        정규식(0-9,a-z,A-Z,가-힣 / 2자리 이상 15자리 이하) 만족 안 하면 .error 추가
        만족하는 즉시 .error 삭제
*/
// 이벤트 처리에 필요한 객체들을 상수에 저장
const nicknameInput = document.querySelector(".nickname-input");
const nicknameText = document.querySelector(".nickname-text");
const nicknameWrap = document.querySelector(".nickname-wrap");

// 닉네임 양식 선언
const nicknameRegex = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,15}$/;

// 오류 메세지 저장
// 미입력 오류(mustNeededMsg) 메세지는 위에 쓴 거 그대로 사용
const lessThanTwoMsg = "2자 이상 입력해주세요."; // 2자 이하(1자) 오류
const moreThanFifteenMsg = "15자 이하로 입력해주세요."; // 2자 이하(1자) 오류

// 닉네임 입력창에 대한 keyup 이벤트 생성
nicknameInput.addEventListener("keyup", (e) => {
  // 만약 키가 눌린 시점에 닉네임 양식이 안 지켜져 았다면
  if (!e.target.value || !nicknameRegex.test(e.target.value)) {
    // nickname-input에 error 클래스 추가
    // error 클래스의 중첩을 막기 위해, 기존에 error 클래스가 없는지부터 확인
    if (!e.target.classList.contains("error")) {
      e.target.classList.add("error");
    }

    // label 태그(텍스트)에도 error 클래스 없는 거 확인하고 추가
    if (!nicknameText.classList.contains("error")) {
      nicknameText.classList.add("error");
    }

    // nickname-input-wrap의 맨 아래에 div 요소(에러 메세지 = not-avaliable 클래스) 추가
    // 추가하기 전에 wrap 안에 .not-avaliable 요소 있는지 확인
    if (!document.querySelector(".nickname-wrap .not-available")) {
      // 새로운 div 요소 생성
      const newDiv = document.createElement("div");

      // 오류 메세지 추가
      // 값이 없으면 - 미입력 오류
      // 1글자면 - 2글자 미만 오류
      // 16글자 이상이면 - 15글자 초과 오류
      newDiv.innerText = !e.target.value
        ? mustNeededMsg
        : e.target.value.length < 2
        ? lessThanTwoMsg
        : moreThanFifteenMsg;

      // 스타일을 받을 수 있게 클래스 추가
      newDiv.classList.add("not-available");

      // nickname-input-wrap의 맨 마지막에 추가
      nicknameWrap.appendChild(newDiv);
    }

    // 아래쪽 경우의 수(값 있는 경우) 실행 안하고 함수 종료
    return;
  }
  // 만약 어떤 값이라도 있는 경우

  // nickname-input의 error 클래스 삭제
  e.target.classList.remove("error");

  // label 태그에서도 삭제
  nicknameText.classList.remove("error");

  // 입력창 아래의 에러 메세지(not-available 클래스 가진 div) 삭제
  // 있을 경우에만 삭제 - 조건식 없으면 에러 발생
  if (document.querySelector(".nickname-wrap .not-available")) {
    nicknameWrap.removeChild(
      document.querySelector(".nickname-wrap .not-available")
    );
  }
});

// 닉네임 입력창에 대한 blur 이벤트 생성
nicknameInput.addEventListener("blur", (e) => {
  // 만약 blue 된 시점에 닉네임 양식이 안 지켜져 았다면
  if (!e.target.value || !nicknameRegex.test(e.target.value)) {
    // nickname-input에 error 클래스 추가
    // error 클래스의 중첩을 막기 위해, 기존에 error 클래스가 없는지부터 확인
    if (!e.target.classList.contains("error")) {
      e.target.classList.add("error");
    }

    // label 태그(텍스트)에도 error 클래스 없는 거 확인하고 추가
    if (!nicknameText.classList.contains("error")) {
      nicknameText.classList.add("error");
    }

    // nickname-input-wrap의 맨 아래에 div 요소(에러 메세지 = not-avaliable 클래스) 추가
    // 추가하기 전에 wrap 안에 .not-avaliable 요소 있는지 확인
    if (!document.querySelector(".nickname-wrap .not-available")) {
      // 새로운 div 요소 생성
      const newDiv = document.createElement("div");

      // 오류 메세지 추가
      // 값이 없으면 - 미입력 오류
      // 1글자면 - 2글자 미만 오류
      // 16글자 이상이면 - 15글자 초과 오류
      newDiv.innerText = !e.target.value
        ? mustNeededMsg
        : e.target.value.length < 2
        ? lessThanTwoMsg
        : moreThanFifteenMsg;

      // 스타일을 받을 수 있게 클래스 추가
      newDiv.classList.add("not-available");

      // nickname-input-wrap의 맨 마지막에 추가
      nicknameWrap.appendChild(newDiv);
    }

    // 아래쪽 경우의 수(값 있는 경우) 실행 안하고 함수 종료
    return;
  }
  // 만약 어떤 값이라도 있는 경우

  // nickname-input의 error 클래스 삭제
  e.target.classList.remove("error");

  // label 태그에서도 삭제
  nicknameText.classList.remove("error");

  // 입력창 아래의 에러 메세지(not-available 클래스 가진 div) 삭제
  // 있을 경우에만 삭제 - 조건식 없으면 에러 발생
  if (document.querySelector(".nickname-wrap .not-available")) {
    nicknameWrap.removeChild(
      document.querySelector(".nickname-wrap .not-available")
    );
  }
});

/*
    ※ 약관동의

    - click

        체크됨 - .enabled 클래스 추가 + input value = true
        체크 해제 - .enabled 클래스 삭제 + input value = false

            -> 체크 on/off는 toggle만 써도 해결 가능?

        전체동의 체크하면 나머지 모두 체크
        하나라도 체크 안 되면 전체동의 체크 해제

        나머지는 클릭하면 해당요소 체크, 체크된 채로 클릭하면 해제
        
        * 주의 : 색상 외에도 여러 가지 css 속성이 바뀜. 따로 선택자 만들어서 전부 집어넣을 것


        필수 동의 사항은 span 태그 안 span 태그(체크박스 옆 글자)에 required 속성 붙어있음
        click 이벤트 발생 시점에 이걸 가져와서 유효성 체크?
        아니면 단순히 필수 체크박스(input) 전부 가져온 다음에, 하나라도 false인지 검사?

        유효성에 어긋나면 label 텍스트(이용약관)와 container에 .error를 추가
*/
// 이벤트 처리에 필요한 객체들을 상수에 저장
// 이용약관 전체에 관한 객체
const termsWrap = document.querySelector(".terms-wrap"); // 에러 텍스트를 붙이기 위함
const termsContainer = document.querySelector(".terms-container"); // 이용약관 전체를 감싸는 테두리의 스타일을 변경하기 위함
const termsText = document.querySelector(".terms-text");

// 전체 동의 체크박스 객체
const allCheckInput = document.querySelector(".all-check-input");

// 모든 필수, 선택 동의 체크 박스 객체들
// 전체 동의 체크박스의 on/off에 필요
const everyBoxes = document.querySelectorAll(
  ".essential-check-input, .optional-check-input"
);

// 위에서 체크된 요소들만 가져옴
// 위 요소와 개수(NodeList 길이) 같으면 전체 체크박스 on
const everyCheckedBoxes = document.querySelectorAll(
  ".essential-check-input:checked, .optional-check-input:checked"
);

// 필수 동의 체크 박스 객체
// 여러 개 있으니 All 로 가져와서 forEach
const essentialCheckInput = document.querySelectorAll(".essential-check-input");

// 선택 동의 체크박스 객체들
// 마케팅 활용동의 - 아래 객체와 on-off 동일
const marketingCheckInput = document.querySelector(
  ".optional-check-input[name=마케팅동의]"
);

// sns수신 체크박스 객체
const snsCheckInput = document.querySelector(
  ".optional-check-input[name=sns수신]"
);

// 필수 동의 체크 - click 이벤트
// input 칸의 value를 true로 하고, 가장 가까운 조상 essential-check-wrap 과
// 가장 가까운 container에 클래스(.enabled) 추가해서 스타일 변경
essentialCheckInput.forEach((check) => {
  // 각 이벤트들에 대한 클릭 이벤트 생성
  check.addEventListener("click", (e) => {
    // 가장 가까운 wrap과 container에 enabled 클래스를 추가/삭제하기 위해
    // 먼저 해당 객체들을 상수에 할당
    const wrap = e.target.closest(".essential-check-wrap");
    const container = e.target.previousElementSibling; // 이전 형제요소로 검색

    // if문 사용해서 value의 true - false 변환
    // checked는 클릭 시점에서 바뀌니 따로 바꿀 필요 없음
    if (e.target.checked) {
      // 체크된 경우, value 값 true로 변경
      e.target.value = true;

      // wrap에 enabled 클래스 없는지 확인하고, 없었을 경우에만 추가
      if (!wrap.classList.contains("enabled")) {
        wrap.classList.add("enabled");
      }

      // container도 마찬가지로 진행
      if (!container.classList.contains("enabled")) {
        container.classList.add("enabled");
      }

      return;
    }
    // 체크 해제된 경우, value 값 false로 변경
    e.target.value = false;

    // wrap과 container에서 enabled 클래스 삭제
    wrap.classList.remove("enabled");
    container.classList.remove("enabled");

    // 그리고 terms-container랑 terms-text에 error 클래스 추가(없을 때만)
    if (!container.classList.contains("error")) {
      container.classList.add("error");
    }
  });
});

// 필수 동의 체크 - blur 이벤트
// blur 시점에서 하나라도 체크 안 되어있으면 에러 메세지 출력

// 마케팅 동의(선택) 체크 - click 이벤트
// sns수신 동의 객체와 on, off 동일하게 설정
marketingCheckInput.addEventListener("click", (e) => {
  // 마케팅 동의 체크박스의 부모 wrap과 형제(이전) container 가져옴
  const marketingWrap = e.target.closest(".optional-check-wrap");
  const marketingContainer = e.target.previousElementSibling;

  // sns동의 객체의 wrap과 container도 동일하게 가져옴
  const snsWrap = snsCheckInput.closest(".optional-check-wrap");
  const snsContainer = snsCheckInput.previousElementSibling;

  // if문 사용해서 value의 true - false 변환
  // checked는 클릭 시점에서 바뀌니 따로 바꿀 필요 없음
  if (e.target.checked) {
    // 체크된 경우, value 값 true로 변경
    e.target.value = true;

    // sns수신 체크박스의 value랑 checked 모두 true로 변경
    // 안 하면 다음에 sns수신 체크박스 클릭할 때 오류 발생
    snsCheckInput.value = true;
    snsCheckInput.checked = true;

    // 마케팅 wrap에 enabled 클래스 없는지 확인하고, 없었을 경우에만 추가
    if (!marketingWrap.classList.contains("enabled")) {
      marketingWrap.classList.add("enabled");
    }

    // 마케팅 container도 마찬가지로 진행
    if (!marketingContainer.classList.contains("enabled")) {
      marketingContainer.classList.add("enabled");
    }

    // sns수신쪽 체크박스 역시 동일하게 진행
    if (!snsWrap.classList.contains("enabled")) {
      snsWrap.classList.add("enabled");
    }

    // 마케팅 container도 마찬가지로 진행
    if (!snsContainer.classList.contains("enabled")) {
      snsContainer.classList.add("enabled");
    }

    return;
  }
  // 체크 해제된 경우, 마케팅, sns 양쪽 모두 체크박스 value 값 false로 변경
  // sns 체크박스는 checked 도 false로 변경
  e.target.value = false;
  snsCheckInput.value = false;
  snsCheckInput.checked = false;

  // 마케팅, sns 양쪽의 wrap과 container에서 enabled 클래스 삭제
  marketingWrap.classList.remove("enabled");
  marketingContainer.classList.remove("enabled");
  snsWrap.classList.remove("enabled");
  snsContainer.classList.remove("enabled");
});

// sns수신 동의 체크박스 - click 이벤트
/*
  off -> on: 마케팅 수신 동의 체크박스도 true + wrap, container에 클래스 추가
  on -> off: 이 체크박스만 false + 클래스 해제
*/
snsCheckInput.addEventListener("click", (e) => {
  // sns수신 동의 체크박스의 부모 wrap과 형제(이전) container 가져옴
  const snsWrap = e.target.closest(".optional-check-wrap");
  const snsContainer = e.target.previousElementSibling;

  // 마케팅 동의 객체의 wrap과 container도 동일하게 가져옴
  const marketingWrap = marketingCheckInput.closest(".optional-check-wrap");
  const marketingContainer = marketingCheckInput.previousElementSibling;

  // if문 사용해서 value의 true - false 변환
  // checked는 클릭 시점에서 바뀌니 따로 바꿀 필요 없음
  if (e.target.checked) {
    // 체크된 경우, value 값 true로 변경
    e.target.value = true;

    // 마케팅 동의 체크박스의 value랑 checked 모두 true로 변경
    // checked = true 안 해주면 마케팅 수신 체크박스에서 오류 발생
    marketingCheckInput.value = true;
    marketingCheckInput.checked = true;

    // sns수신 wrap에 enabled 클래스 없는지 확인하고, 없었을 경우에만 추가
    if (!snsWrap.classList.contains("enabled")) {
      snsWrap.classList.add("enabled");
    }

    // sns수신 container도 마찬가지로 진행
    if (!snsContainer.classList.contains("enabled")) {
      snsContainer.classList.add("enabled");
    }

    // 마케팅 동의쪽 체크박스 역시 동일하게 진행
    if (!marketingWrap.classList.contains("enabled")) {
      marketingWrap.classList.add("enabled");
    }

    // 마케팅 동의 container도 마찬가지로 진행
    if (!marketingContainer.classList.contains("enabled")) {
      marketingContainer.classList.add("enabled");
    }

    return;
  }
  // 체크 해제된 경우, sns 수신쪽 체크박스만 value 값 false로 변경
  e.target.value = false;

  // sns 수신쪽 wrap과 container에서만 enabled 클래스 삭제
  snsWrap.classList.remove("enabled");
  snsContainer.classList.remove("enabled");
});

/*
    ※ 회원가입 버튼(최종)

    - click 이외에 필요 없음?

        클릭하면 위 요소들 유효성 검사 실행 - 조건 불만족한 부분만 .error 추가
            -> 위쪽 이벤트(addEventListener)들을 전부 변수에 담을 수 있나?
                된다면 다 가져와서 검사하면 될 거 같은데...
*/

// 지금 남은 것들
// 주소지 입력 - 앞쪽 드롭박스 선택에 따라 뒤쪽 드롭박스 내용 결정
// 체크박스 - 필수 입력 체크박스 오류 처리와 blur 이벤트, 전체 동의(+ 모든 체크박스 다 체크되면 전체동의 자동 on, 아니면 off 실시간으로)
// 회원가입 버튼 - 유효성 검사
