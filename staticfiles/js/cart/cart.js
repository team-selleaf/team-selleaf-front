// 장바구니 페이지 js 파일

/*
  장바구니 리스트에 담은 상품(product-preview-wrap)이 하나도 있다면
  상품 리스트(contents-wrap) 표시하고,
  상품 없음 메세지와 구매 바로가기 버튼 숨김


  없다면 contents-wrap을 숨기고, 상품 없음 메세지와 구매 바로가기 버튼 추가
*/

// 필요한 객체 가져오기
const productList = document.querySelectorAll(".product-preview-wrap"); // 길이 n짜리 배열형태
const noItemsWrap = document.querySelector(".no-items-wrap");
const productWrap = document.querySelector(".contents-wrap");

// 상품 리스트(productList)의 길이가 1 이상이면 상품 리스트 표시
// 없으면 텍스트와 구매 바로가기 버튼 표시
if (productList.length >= 1) {
  noItemsWrap.style.display = "none";
  productWrap.style.display = "block";
} else {
  noItemsWrap.style.display = "block";
  productWrap.style.display = "none";
}

// 해야되는 것들
// 클래스명 수정
