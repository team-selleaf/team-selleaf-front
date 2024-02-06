const a = document.querySelector(".info-list-wrap");
const c = document.querySelector(".alert");
const b = document.querySelector(".product-index");

a.addEventListener("mouseover", (e) => {
  a.style.border = "2px solid black";
  a.style.borderRadius = "6px";
});
a.addEventListener("mouseout", (e) => {
  b.value == "unselected"
    ? (((a.style.border = "2px solid #c06888"), (a.style.borderRadius = "6px")),
      (c.style.display = "block"))
    : ((a.style.border = "1px solid #424242"), (c.style.display = "none"));
});

const guide = document.querySelector(".off");
const guideButton = document.querySelector(".guide-button");
const require = document.querySelector(".required-off");
const requiredButton = document.querySelector("#required-info-header");

guideButton.addEventListener("click", (e) => {
  guide.classList.toggle("expended");
});

requiredButton.addEventListener("click", (e) => {
  require.classList.toggle("expended");
});

const imgFileInput = document.querySelector("#img-file");
const prevImgBox = document.querySelector(".prev-img-box");
const cancel = document.querySelector(".cancel");
imgFileInput.addEventListener("change", (e) => {
  const [file] = e.target.files;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", (e) => {
    const path = e.target.result;
    cancel.style.display = "block";
    path.includes("image")
      ? ((prevImgBox.style.backgroundImage = `url(${path})`),
        (prevImgBox.style.zIndex = "5"))
      : (prevImgBox.style.backgroundImage = `url('images/attach.png')`);
  });
});
cancel.addEventListener("click", (e) => {
  prevImgBox.style.backgroundImage = "";
  prevImgBox.style.zIndex = "-5";
  e.target.style.display = "none";
  imgFileInput.value = "";
});
