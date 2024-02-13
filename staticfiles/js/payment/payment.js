// 주소 모달창 나오게
const addressModal = document.querySelector(".address-modal-wrap");
const modalBtn = document.querySelector(".change-button");

modalBtn.addEventListener("click", (e) => {
  addressModal.style.display = "block";
});

// 주소 모달창 닫기
const closeBtn = document.querySelector(".close-button");
closeBtn.addEventListener("click", (e) => {
  addressModal.style.display = "none";
});

// 모달에서 삭제누르면 경고가 나오게

const deleteButtons = document.querySelectorAll(".delete-button");
const confirmModal = document.querySelector(".confirm-total-wrap");

deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", (e) => {
    // 삭제 버튼을 누를 때 confirm 모달 표시
    confirmModal.style.display = "block";

    // 확인 버튼 이벤트
    const confirmAction = document.querySelector(".confirm");
    confirmAction.addEventListener("click", () => {
      // 확인을 누르면 삭제 수행
      const target = deleteButton.closest(".address-wrap");
      target.remove();

      // confirm 모달 숨김
      confirmModal.style.display = "none";
    });

    // 취소 버튼 이벤트
    const cancelAction = document.querySelector(".confirm-cancel");
    cancelAction.addEventListener("click", () => {
      // 취소를 누르면 confirm 모달 숨김
      confirmModal.style.display = "none";
    });
  });
});
