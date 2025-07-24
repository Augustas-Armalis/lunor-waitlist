const form = document.getElementById("subscriptionForm");
const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNmQzMWU0ZjgyMDk0NTYzMWE1YWMxZDU1NWViM2EzNGI3ZmFjYzg4ZGE5MGIyMmU1MTc3YTA1M2JhNzhmMTI1MzY4ZmQwN2FlNWIyOWQ0ZDMiLCJpYXQiOjE3NTI3NTI1MDkuMzcyOTkzLCJuYmYiOjE3NTI3NTI1MDkuMzcyOTk2LCJleHAiOjQ5MDg0MjYxMDkuMzY5MTI0LCJzdWIiOiI4Mzc1ODgiLCJzY29wZXMiOltdfQ.fqaFzJYQDda_Jx2-00-loIXAA1mtOqhmWYQnxVRHPEfLcThB1OdQa_Vss_LynaFjia2-_cEIC-q8EML6XfarfKf4Cd-cxwa6_LNxq8_eK-1LvtyE_QtzANp9k1-NEMYQVzx79xYKpB655XJz8y2_zzoPXG3eWrgp3dIcsv0Nv9XHaCB7OomKXsxsrhEIcs7OSwRGXgyawW0vIfnn7TrhOlG4R2Wl36XIfc5Q9TuZnRuOW8Yq8d0xDrB6sH5H-4T_Wx07WreJq7lEThI2RRQE1Ea_EiEyazSE9e-8lun5tJcZTjIgFn9V5vDZ_36CMjW_1qUu7HENAylQZOfK6JqF-mhlagyKNrsx2xvJ7rouH2HBfFeWiG8NYQUJVTW0IfPYWNI8obSMt4J2BX114XmAJcj_B8gHs1lwi_-h4lAK-Ir0KkRCB8Va-8DhWM_bJPT151FcZlC_4Andz2fWo_2WRmtq0XLlIu9JoenFaWsCJ6RBpyC4EFAYHLXIlIhLZlU9EJc7gn1n_-eu9cG6Qx_iXPTgQ7vSMxgl2jUDQPiULffmff_UiP5HM9VhHJXeG_Y_q9FHdtsI9XLPiR-K0_tGp-_Zw98wZ5nWDbW1QJfHDtdmSY8nNr4YMRHZI211c0mYPANRoHamLNA6uTwPhWahRnjPDqJ6we1ZdUlrjBFbubg"; // 🔒 Replace this securely in real project

// Add lottie-web import at the top if not present
// <script src="https://unpkg.com/lottie-web/build/player/lottie.min.js"></script>

const popupOverlay = document.getElementById('popup-overlay');
const popupSuccess = document.getElementById('popup-success');
const popupError = document.getElementById('popup-error');
const lottieSuccessDiv = document.querySelector('.lottie-success');
const lottieErrorDiv = document.querySelector('.lottie-error');

function showPopupSuccess() {
  popupOverlay.classList.remove('hidden');
  popupSuccess.classList.remove('hidden');
  popupError.classList.add('hidden');
  // Remove previous animation if any
  lottieSuccessDiv.innerHTML = '';
  // Create and insert dotlottie-wc only when shown
  const dotlottie = document.createElement('dotlottie-wc');
  dotlottie.setAttribute('src', 'https://lottie.host/dc29b91d-02d0-45ee-92ff-1940917a12c1/EdY0IxwWnQ.lottie');
  dotlottie.setAttribute('style', 'width: 90px; height: 90px; margin-bottom: 24px;');
  dotlottie.setAttribute('speed', '1');
  dotlottie.setAttribute('autoplay', '');
  lottieSuccessDiv.appendChild(dotlottie);
}

function showPopupError() {
  popupOverlay.classList.remove('hidden');
  popupSuccess.classList.add('hidden');
  popupError.classList.remove('hidden');
  // Remove previous animation if any
  lottieErrorDiv.innerHTML = '';
  // Create and insert dotlottie-wc only when shown
  const dotlottie = document.createElement('dotlottie-wc');
  dotlottie.setAttribute('src', 'https://lottie.host/03a6bdf9-e4a4-4dd9-a37c-a7b76c0d6268/y6MZDpgafZ.lottie');
  dotlottie.setAttribute('style', 'width: 90px; height: 90px; margin-bottom: 24px;');
  dotlottie.setAttribute('speed', '1');
  dotlottie.setAttribute('autoplay', '');
  lottieErrorDiv.appendChild(dotlottie);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  // Remove any code that hides the form or its container
  // Only show the popup overlay on success or error

  fetch("https://connect.mailerlite.com/api/groups?filter[name]=lunorwaitlist", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const groupId = data.data?.[0]?.id;
      if (!groupId) throw new Error("Group not found");
      return fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          fields: { name },
          groups: [groupId],
        }),
      });
    })
    .then((res) => {
      if (!res.ok) throw new Error("Subscription failed");
      return res.json();
    })
    .then(() => {
      showPopupSuccess();
    })
    .catch((err) => {
      console.error("Error:", err);
      showPopupError();
    });
});

// Carousel logic
const carouselImages = document.querySelectorAll('#carousel-container .carousel-image');
let carouselIndex = 0;
function showCarouselImage(idx) {
  carouselImages.forEach((img, i) => {
    if (i === idx) {
      img.classList.add('active');
    } else {
      img.classList.remove('active');
    }
  });
}
showCarouselImage(carouselIndex);
setInterval(() => {
  carouselIndex = (carouselIndex + 1) % carouselImages.length;
  showCarouselImage(carouselIndex);
}, 1500);
