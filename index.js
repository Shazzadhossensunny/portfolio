// ---
const hamMenuBtn = document.querySelector(".header__main-ham-menu-cont");
const smallMenu = document.querySelector(".header__sm-menu");
const headerHamMenuBtn = document.querySelector(".header__main-ham-menu");
const headerHamMenuCloseBtn = document.querySelector(
  ".header__main-ham-menu-close"
);
const headerSmallMenuLinks = document.querySelectorAll(".header__sm-menu-link");

hamMenuBtn.addEventListener("click", () => {
  if (smallMenu.classList.contains("header__sm-menu--active")) {
    smallMenu.classList.remove("header__sm-menu--active");
  } else {
    smallMenu.classList.add("header__sm-menu--active");
  }
  if (headerHamMenuBtn.classList.contains("d-none")) {
    headerHamMenuBtn.classList.remove("d-none");
    headerHamMenuCloseBtn.classList.add("d-none");
  } else {
    headerHamMenuBtn.classList.add("d-none");
    headerHamMenuCloseBtn.classList.remove("d-none");
  }
});

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener("click", () => {
    smallMenu.classList.remove("header__sm-menu--active");
    headerHamMenuBtn.classList.remove("d-none");
    headerHamMenuCloseBtn.classList.add("d-none");
  });
}

// ---
// const headerLogoConatiner = document.querySelector(".header__logo-container");

// headerLogoConatiner.addEventListener("click", () => {
//   location.href = "index.html";
// });

// send mail
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const errorElement = document.getElementById("error-message");

  if (!name || !email || !message) {
    showMessage(errorElement, "Please fill in all fields.", "red");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage(errorElement, "Please enter a valid email address.", "red");
    return false;
  }

  return true;
}

function showMessage(element, message, color) {
  element.textContent = message;
  element.style.display = "block";
  element.style.color = color;
  setTimeout(() => {
    element.style.display = "none";
  }, 5000); // Hide after 5 seconds
}

function sendMail() {
  if (!validateForm()) {
    return; // Stop if validation fails
  }

  const params = {
    from_name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim()
  };

  const serviceID = "service_r0ffn07";
  const templateID = "template_2lx38fm";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      showMessage(document.getElementById("success-message"), "Your message was sent successfully!", "green");
    })
    .catch((err) => {
      console.log(err);
      showMessage(document.getElementById("error-message"), "An error occurred. Please try again later.", "red");
    });
}
