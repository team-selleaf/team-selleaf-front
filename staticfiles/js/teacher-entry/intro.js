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
