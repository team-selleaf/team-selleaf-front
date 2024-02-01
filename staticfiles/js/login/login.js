/*
    email, pw 입력란

    이메일 input 클릭하면 처음에는 하늘색의 굵은 반투명 border 추가
        -> 이벤트 리스너 click

    다만, blur 되었을 때, 값이 아무것도 없다면 테두리 빨갛게 변경(아마 red?)
        -> 이 때 다시 input 클릭하면 위의 클릭 이벤트로 나오는
           굵은 테두리가 빨간색으로 변경


    비밀번호 input을 클릭하면 마찬가지로 해당 부분만 하늘색의 굵은 반투명 border 추가

    단, blur 되었을 때에는 이메일과 비밀번호 input 모두 테두리 빨갛게 변경

    이 상태에서 클릭했을 때에는 비밀번호 input 만 빨간색 굵은 반투명 테두리 추가 
*/

/*
    다른 SNS 로그인 아이콘

    mouseover 되면 아이콘 색깔 뿌얘짐
        -> svg 태그에 스타일 추가??

    mouseout 되면 원상복구
*/
const svgs = document.querySelectorAll(".login-with-sns-wrap > svg");

svgs.forEach((svg) => {
  svg.addEventListener("mouseover", (e) => {
    e.target.style.opacity = 0.7;
  });

  svg.addEventListener("mouseout", (e) => {
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
