// 마이페이지/프로필/스크랩북 js 파일

// 공유 버튼 눌렀을 때 모달창 표시

// 필요한 객체 가져오기
const shareModal = document.querySelector(".share-modal-wrap");

// 모달창 내 클립보드 버튼도 가져옴 - alert 표시용
const clipboardButton = document.querySelector(".cilpboard-button");

// 클립보드 버튼 - click 이벤트
// 클릭하면 alert 창 표시
clipboardButton.addEventListener("click", () => {
  alert("클립보드에 복사되었습니다.");
});

// click 이벤트 - 모달창 닫기
// 모달창 이외 아무 곳이나 클릭하면 모달창 닫힘
document.addEventListener("click", (e) => {
  // 만약 클릭한 곳의 상위 요소가 모달이 아닐 경우 = 모달 이외의 장소를 클릭한 경우
  if (!e.target.closest(".share-modal-wrap")) {
    // 상위 요소가 공유 버튼인 요소를 클릭했다면
    if (e.target.closest(".share-button")) {
      // 모달창을 enabled 상태로 만들어줌
      shareModal.classList.toggle("enabled");

      // 아래쪽 실행 안 하고 함수 종료
      return;
    }
    // 모달창, 버튼 이외의 장소를 클릭한 경우 모달창 enabled 해제
    shareModal.classList.remove("enabled");
  }
  // 상위 요소가 모달일 경우(모달 클릭한 경우) 아무 것도 실행 안함(상태 유지)
});

// 화면 우하단에 있는 화살표 버튼 - click 이벤트
// 클릭 시, 화면 최상단으로 스무스하게 스크롤 이동
// 필요한 객체 가져오기
const topButton = document.querySelector(".top-button-wrap");

// 클릭 이벤트 추가
topButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// 페이지가 어느 정도 스크롤이 되었을 때만 최상단 이동 버튼이 뜨게 하기
// header 높이보다 많이(80.75px) 스크롤 했을 때 버튼 표시
// 필요한 객체 가져오기
const headerHeight = parseFloat(document.querySelector("header").style.height); // header의 높이

window.addEventListener("scroll", () => {
  // window.scrollY(아래로 스크롤 한 정도)가 header의 높이보다 커지면 버튼 표시
  if (window.scrollY > headerHeight) {
    // 만약 현재 버튼이 숨겨진(display: none) 상태라면
    if (topButton.style.display == "none") {
      // display를 block으로 바꿔서 보이게 함
      topButton.style.display = "block";
    }
    // display가 none이 아니라면 그대로 둠
    return;
  }
  // 만약 스크롤 정도가 header의 높이보다 작다면
  // 현재 보이는(display: block) 상태인지 체크
  if (topButton.style.display == "block") {
    // display를 none으로 바꿔서 다시 안 보이게 함
    topButton.style.display = "none";
  }
});

// 편집 버튼 눌렀을 때
// 현재 스크랩한 게시물 수와 폴더이동, 삭제, 취소 버튼을 보이게하고
// 편집 버튼과 카테고리 메뉴는 안 보이게(display: none) 하는 이벤트

// 필요한 객체 가져오기
// 편집 버튼 클릭하면 숨겨지는 요소들
const editButton = document.querySelector(".edit-button");
const categoryFilter = document.querySelector(".category-filter-wrap");

// 편집 버튼 클릭하면 보이게 되는 요소들
const contentCount = document.querySelector(".content-count-container");
const editButtonGroup = document.querySelectorAll(".edit-menu-button");

// 편집 버튼 - click 이벤트
editButton.addEventListener("click", (e) => {
  // 스크랩한 게시물 수 표시
  contentCount.style.display = "block";

  // 폴더이동, 삭제, 취소 버튼도 표시
  // 한 번에 다 가져왔으니 forEach로 순회
  editButtonGroup.forEach((button) => {
    button.style.display = "inline-block";
  });

  // 기존 편집 버튼과 카테고리 리스트 숨김
  e.target.style.display = "none";
  categoryFilter.style.display = "none";
});

// 취소 버튼 눌렀을 때 다시 편집 버튼과 카테고리 메뉴를 보이게 하는 이벤트
// 취소 버튼 객체 가져옴
const cancelButton = document.querySelector(".edit-menu-button:last-child");

// 취소 버튼 - click 이벤트
cancelButton.addEventListener("click", () => {
  // 스크랩한 게시물 수 숨김
  contentCount.style.display = "none";

  // 폴더이동, 삭제, 취소 버튼도 숨김
  editButtonGroup.forEach((button) => {
    button.style.display = "none";
  });

  // 편집 버튼 표시
  editButton.style.display = "inline-block";
  categoryFilter.style.display = "block";
});

/*
  카테고리 버튼(category-filter-wrap)에 mouseover 되면 대카테고리 모달창 표시
  mouseout 되면 다시 안 보이게 변경
*/
/*
  02/09
  원래는 카테고리 버튼 or 대카테고리 모달창에 마우스 올리면
  모달창이 떠있는 상태 그대로 유지되어야 하지만,

  현재 카테고리 버튼 벗어나는 순간 모달창이 사라지는 문제가 있어서
  임시로 원본 사이트의 mouseover 이벤트가 아닌, click 이벤트로 걸어놓음

*/

// 필요한 객체 가져오기 - 대카테고리 모달창
const categoryModal = document.querySelector(".first-category-modal-wrap");

// mouseover 이벤트 - 대카테고리 모달창 표시/숨김
// 버튼 or 모달창 이외의 장소에 마우스 올리면 모달창 닫힘
document.addEventListener("click", (e) => {
  // 만약 대카테고리 모달창 이외의 장소에 마우스를 올린 경우
  if (!e.target.closest(".first-category-modal-wrap")) {
    // 카테고리 버튼 or 대카테고리 모달창에 마우스를 올렸다면
    if (e.target.closest(".category-filter-wrap")) {
      // 대카테고리 모달창에 enabled 클래스 추가함으로서 표시
      // 카테고리 버튼 한 번 더 누르면 닫힘
      categoryModal.classList.toggle("enabled");

      // 아래쪽 실행 안 하고 함수 종료
      return;
    }
    // 대카테고리 모달창, 카테고리 버튼 이외의 장소에 마우스를 올린 경우 대카테고리 모달창 숨김
    categoryModal.classList.remove("enabled");
  }
  // 대카테고리 모달창에 마우스 올린 경우 아무 것도 실행 안함(상태 유지)
});

/*
  대카테고리 모달창 내 메뉴(first-categories-wrap)에 mouseover 되면
  어떤 메뉴에 mouseover 되었는지에 따라 서로 다른 내용(<li>...</li>)을 가진
  소카테고리 모달창 표시

  마찬가지로 mouseout 되면 다시 안 보이게 변경

    어떤 메뉴인지 어떻게 구분할 것인가?
      -> li 태그 자체에 title 속성을 추가하면,
         객체명.title 로 해당 객체 가져오기 가능?

         ->
            document.querySelector(".first-categories-wrap[title='전체 카테고리']")

            이 방식으로 가져오기 가능!
*/

// 필요한 객체 가져오기 - 소카테고리 모달창
const subCategoryModal = document.querySelector(".second-category-modal-wrap");

// 소카테고리 리스트 - 대카테고리에 따라 내용물 변경
const subCategoryList = document.querySelector(".second-category-list");

// 마우스 올린 메뉴에 따라 표시될 서로 다른 소카테고리들
const plantList = ["관엽식물", "침엽식물", "희귀식물", "다육/선인장"]; // 식물 카테고리
const handmadeList = ["분재", "테라리움", "기타"]; // 수공예품 카테고리
const othersList = ["모종삽", "비료", "DIY키트"];

// mouseover 이벤트 - 소카테고리 모달창 표시/숨김
// 대카테고리 내 메뉴 or 소카테고리 모달창 이외의 장소에 마우스 올리면 모달창 닫힘
document.addEventListener("mouseover", (e) => {
  // 만약 소카테고리 모달창 이외의 장소에 마우스를 올린 경우
  if (!e.target.closest(".second-category-modal-wrap")) {
    // 대카테고리 모달창 내 메뉴에 마우스를 올렸다면
    if (e.target.closest(".first-categories-wrap")) {
      // 대카테고리 메뉴를 감싸는 최상단 태그의 title을 변수에 할당
      const firstCategory = e.target.closest(".first-categories-wrap").title;

      // 전체 카테고리에 마우스 올렸는지 확인
      if (firstCategory == "전체 카테고리") {
        // 모달창 띄우지 않음
        subCategoryModal.style.display = "none";

        // 아래쪽 실행 안하고 리스너 종료
        return;
      }

      // 만약 다른 메뉴에 마우스를 올렸다면 이 부분 실행
      // 소카테고리 리스트(ul) 안에 들어갈 정보를 담을 변수 선언
      let resultHTML = ``;

      // 대카테고리에 따라 다른 소카테고리 메뉴를 담을 빈 배열도 선언
      let detailedList = [];

      // 어떤 메뉴에 올렸는지에 따라 서로 다른 리스트 출력하게 설정 - title 속성 값에 따라서
      switch (firstCategory) {
        case "식물":
          detailedList = plantList;
          break;

        case "수공예품":
          detailedList = handmadeList;
          break;

        case "기타":
          detailedList = othersList;
          break;
      }

      // 리스트 선정이 끝나면 해당 리스트 내 항목들을 하나하나 li 태그 안에 담아줌
      detailedList.forEach((item) => {
        // 나중에 서버 연동 시에 받아올 각 요소 별 게시물 수(일단은 0)를 담은 변수 선언
        let itemCount = 0;

        // 리스트 내 요소의 정보가 담긴 html 태그 생성
        let subCategoryItem = `<li class="second-categories-wrap" title="${item}">
          <button class="second-categories-container">
            <div class="second-category-title-wrap">
              <span class="second-caregory-title">${item}</span>
              <span class="second-category-count">${itemCount}</span>
            </div>
          </button>
        </li>`;

        // 리스트 하나 생성할 때마다 resultHTML에 추가
        resultHTML += subCategoryItem;
      });

      // 소카테고리에 위 과정을 통해 얻은 전체 리스트 할당
      subCategoryList.innerHTML = resultHTML;

      // 소카테고리 모달창 표시
      subCategoryModal.style.display = "block";

      // 아래쪽 실행 안 하고 함수 종료
      return;
    }
    // 모달창, 버튼 이외의 장소에 마우스를 올린 경우 소카테고리 모달창 display = none
    subCategoryModal.style.display = "none";
  }
  // 모달에 마우스 올린 경우 아무 것도 실행 안함(상태 유지)
});

/*
  대/소카테고리 공통

  특정 카테고리를 클릭하면 카테고리 버튼 색깔이 파란색으로(클래스 붙여서 구현?),
  카테고리 버튼(category-list-button) 내 텍스트가 클릭한 카테고리랑 같은 이름으로 변경

  단, 전체 카테고리의 경우 원래의 '카테고리' 텍스트로 변경되고,
  색깔도 원래의 것으로 돌아옴(클래스 remove하기?)

  02/09 - 이부분도 다른 사람들과 상의 후 추가바람
*/

/*
  반응형에서의 모달창

  원래 페이지에서는 페이지의 현재 너비, 높이 및 스크롤에 따라
  모달창 위치도 그에 맞춰서 이동함.

  이 덕분에 모달창은 극단적으로 페이지 면적이 바뀌는 게 아닌 이상
  항상 모달창을 뜨게 한 버튼 아래에 위치한 것처럼 보임.
  

  ※ 의문점들

    1. 원래 페이지에서의 모달창은 왜, 이벤트를 유발한 객체에 하위요소 같은 걸로 붙은 게 아닌
      body 태그 내의 가장 마지막에, 원래 없던 상태에서 추가되는 것인가?

      이벤트 발생 객체의 하위에 붙으면 position relative-absolute 같은 걸로 위치 유지 가능하지 않나?
      아니면 이것도 JS로 해결하는 방법이 있나?


    2. 개발자 모드 뜯어보니까, 페이지 너비가 변경됨에 따라
      모달을 감싸는 것으로 추정되는 div 태그 내 style에서 left 속성의 값이 실시간으로 바뀌는 것을 확인함.

      아마 이것도 JS 써서 window.addEventListener("scroll"/"resize" ...) 가지고
      화면 크기가 조정되거나, 화면이 스크롤되면 실시간으로 모달 내 style 태그의
      top/left 속성 값을 바꿔주는 것으로 보임.

      만약 이 방식대로 모달 위치를 실시간으로 바꾸는 게 된다고 하더라도,
      정확한 위치를 구하는 방법은?
*/

// 나중에 폴더이동, 삭제 버튼이랑 이 페이지에 표시되는 게시물에 대한 이벤트도
// 이 페이지 내에서 처리할 게 있으면 추가할 것

// console.log(document.querySelector(".first-categories-wrap[title='식물']"));
