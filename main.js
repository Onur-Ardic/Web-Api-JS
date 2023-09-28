const formWrapper = document.querySelector(".form-wrapper");
const form = document.getElementById("form");
const input = document.getElementById("searchInput");
const buttonWraper = document.querySelector(".button-wrapper");
const searchButton = document.getElementById("searchButton");
const clearButton = document.getElementById("clearButton");
const imageWrapper = document.querySelector("#image-wrapper");

// ---------Events start---------

addEventListener();
function addEventListener() {
  form.addEventListener("submit", search);
  clearButton.addEventListener("click", clearALL);
}

function clearALL(e) {
  input.value = "";
  Array.from(imageWrapper.children).forEach((child) => {
    child.remove();
  });
}

function search(e) {
  const value = input.value.trim();

  fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID iuw-S3eW1ZELE7nxOWYhDRCsOYUSjXcteIeskQgZfOY ",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      Array.from(data.results).forEach((image) => {
        // console.log(image.urls.small);
        addImageToUi(image.urls.small);
      });
    })
    .catch((err) => console.log(err));

  e.preventDefault();
}

function addImageToUi(url) {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.setAttribute("src", url);
  img.height = "400";
  img.width = "400";
  div.append(img);
  imageWrapper.append(div);
}
