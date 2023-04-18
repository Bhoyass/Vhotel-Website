// Responsive Button
const temp = book.innerHTML;
function updateContent() {
  const book = document.querySelector("#book");
  if (window.matchMedia("(max-width: 768px)").matches) {
    book.innerHTML = "BOOK NOW";
    book.addEventListener("click", () => {
      toggleDropdownMobile();
    });
    bookMobile();
  } else {
    book.innerHTML = temp;
    const bookMobile = document.querySelector("#book-mobile");
    bookMobile.innerHTML = "";
  }
}

updateContent();

window.addEventListener("resize", updateContent);

// Navbar transparent to solid
function handleNavbarOnScroll() {
  const navbar = document.querySelector(".navbar");
  const navbarText = document.querySelectorAll(".navbar ul li a");
  const humbergerMenu = document.querySelector(".menu-btn i");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      navbar.classList.add("solid");
      humbergerMenu.style.color = "rgb(75, 113, 85)";
      if (window.innerWidth > 768) {
        navbarText.forEach((element) => {
          element.style.color = "black";
        });
      }
      const afterElement = window.getComputedStyle(navbarText[0], "::after");

      afterElement.setProperty("border-color", "black");
    } else {
      afterElement = window.getComputedStyle(navbarText[0], "::after");
      navbar.classList.remove("solid");
      navbarText.forEach((element) => {
        element.style.color = "rgb(246, 243, 234)";
      });
      humbergerMenu.style.color = "rgb(246, 243, 234)";
      afterElement.setProperty("border-color", "rgb(246, 243, 234)");
    }
  });
  let lastScroll = 0;
  const navbarSlide = document.querySelector(".navbar ul");
  window.addEventListener("scroll", () => {
    let navbarSlideOpen = navbarSlide.classList.contains("open");
    if (lastScroll < window.scrollY && !navbarSlideOpen) {
      navbar.classList.add("hide");
    } else {
      navbar.classList.remove("hide");
    }
    lastScroll = window.scrollY;
  });
}
// DROPDOWN MENU
function toggleDropdown() {
  const dropdown = document.getElementById("myDropdown");
  if (dropdown.style.opacity === "0") {
    dropdown.style.display = "block";
    setTimeout(function () {
      dropdown.style.opacity = "1";
    }, 10);
  } else {
    dropdown.style.opacity = "0";
    setTimeout(function () {
      dropdown.style.display = "none";
    }, 300);
  }
}

// RESET FORM
function resetForm() {
  document.getElementById("arrivalDate").value = "";
  document.getElementById("departureDate").value = "";
  document.getElementById("numPeople").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("roomType").selectedIndex = 0;
}

// VALIDATE FORM
function submitForm() {
  var arrivalDateInput = document.getElementById("arrivalDate");
  var departureDateInput = document.getElementById("departureDate");
  var numPeople = document.getElementById("numPeople").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;

  // Parse Arrival Date
  var arrivalDate = new Date(arrivalDateInput.value);
  if (isNaN(arrivalDate)) {
    Swal.fire({
      icon: "error",
      title: "Submit Invalid",
      text: "You Havent Selected an Arrival Date",
    });
    return;
  }

  // Validate Arrival Date
  var currentDate = new Date();
  if (arrivalDate.getDate() < currentDate.getDate()) {
    Swal.fire({
      icon: "error",
      title: `Submit Invalid`,
      text: "You Cant Select Arrival Date in the Past",
    });
    return;
  }

  // Parse Departure Date
  var departureDate = new Date(departureDateInput.value);
  if (isNaN(departureDate)) {
    Swal.fire({
      icon: "error",
      title: "Submit Invalid",
      text: "You Havent Selected a Departure Date",
    });
    return;
  }

  // Validate Departure Date
  if (departureDate.getDate() <= arrivalDate.getDate()) {
    Swal.fire({
      icon: "error",
      title: "Submit Invalid",
      text: "The reservation requires a minimum stay of 1 day",
    });
    return;
  }

  // Validate Number of People
  if (numPeople === "" || numPeople < 1) {
    Swal.fire({
      icon: "error",
      title: "Submit Invalid",
      text: "You Havent Inserted Number of People",
    });
    return;
  }

  // Validate Name
  if (name === "" || name.length < 1 || name.length > 50 || !isNaN(name)) {
    Swal.fire({
      icon: "error",
      title: "Submit Invalid",
      text: "You Havent Inserted Your Name",
    });
    return;
  }

  // Validate Email
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Submit Invalid",
      text: "You Havent Inserted a Valid Email",
    });
    return;
  }

  // Validate Phone Number
  var phonePattern = /^0\d{9,12}$/;
  if (!phonePattern.test(phone)) {
    Swal.fire({
      icon: "error",
      title: "Submit Invalid",
      text: "Please ensure that a valid phone number is entered, starting with 0 and consisting of 10-12 digits.",
    });
    return;
  }

  // Validate Room Type
  var roomType = document.getElementById("roomType").value;
  if (roomType === "") {
    Swal.fire({
      icon: "error",
      title: "Submit Invalid",
      text: "You Haven't Selected a Room Type",
    });
    return;
  }

  // If all validations pass, submit the form
  Swal.fire({
    title: "Is Your Data Input Correct?",
    text: "Please verify your information before booking.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, book it",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Booking Confirmed",
        text: "Enjoy your stay!",
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
      resetForm();
    }
  });
  const body = document.querySelector("body");

  if (body.style.paddingRight) {
    body.style.paddingRight = "0";
  }
  if (window.innerWidth >= 768) {
    toggleDropdown();
  }
}

// HAMBURGER MENU
function toggleHamburgerMenu() {  
  const menuBtn = document.querySelector(".menu-btn");
  const navbarSlide = document.querySelector(".navbar ul");

  // Function to close the menu
  const closeMenu = () => {
    navbarSlide.classList.remove("open");
  };

  menuBtn.addEventListener("click", () => {
    navbarSlide.classList.toggle("open");
  });

  // Add event listener on document to close the menu when clicking outside of navbar ul
  document.addEventListener("click", (event) => {
    const isNavbarUlClicked = navbarSlide.contains(event.target);
    const isMenuBtnClicked = menuBtn.contains(event.target);
    if (!isNavbarUlClicked && !isMenuBtnClicked) {
      closeMenu();
    }
  });
}

// BOOK MOBILE
function bookMobile() {
  const htmlString = `
  <div class="container">
  <div id="arrival" class="box">
  <h3>Check In</h3>
  <input type="date" id="arrivalDate" />
</div>

<div id="departure" class="box">
  <h3>Check Out</h3>
  <input type="date" id="departureDate" />
</div>

<div id="people" class="box">
  <h3>Occupancy</h3>
  <input type="number" id="numPeople" min="1" placeholder="" />
</div>
</div>

<div class="container-bottom">
  <div class="dropdown" id="myDropdown" style="opacity: 1">
    <input type="text" placeholder="Name" id="name" />
    <input type="email" placeholder="Email" id="email" />
    <input type="tel" placeholder="Phone" id="phone" pattern="[0-9]{10}" />
    <select id="roomType">
      <option value="" selected disabled>Choose Room Type</option>
      <option value="king">King Bedroom</option>
      <option value="queen">Queen Bedroom</option>
      <option value="double">Double Bedroom</option>
      <option value="suite">Suite</option>
      <option value="studio">Studio</option>
    </select>
    <button onclick="submitForm()">Submit</button>
  </div>   
</div>   
`;
  const bookMobile = document.getElementById("book-mobile");
  bookMobile.innerHTML = htmlString;
}

// TOGGLE DROPDOWN BOOK MOBILE
function toggleDropdownMobile() {
  const dropdownMobile = document.getElementById("book-mobile");
  if (dropdownMobile.style.opacity === "0") {
    dropdownMobile.style.display = "flex";
    setTimeout(function () {
      dropdownMobile.style.opacity = "1";
    }, 10);
  } else {
    dropdownMobile.style.opacity = "0";
    setTimeout(function () {
      dropdownMobile.style.display = "none";
    }, 300);
  }
  document.addEventListener("click", (event) => {
    var isBookMobileClicked = dropdownMobile.contains(event.target);
    var isBookClick = document.getElementById("book").contains(event.target);
    if (
      !isBookMobileClicked &&
      !isBookClick &&
      dropdownMobile.style.opacity === "1"
    ) {
      dropdownMobile.style.opacity = "0";
      setTimeout(function () {
        dropdownMobile.style.display = "none";
      }, 300);
    }
  });
}

// TOGGLE DROPDOWN ARTICLE
function toggleDropdownArticle() {
  const bookArticle = document.querySelectorAll("#rooms button");
  bookArticle.forEach((button) => {
    button.addEventListener("click", () => {
      const dropdownMobile = document.getElementById("book-mobile");
      if (dropdownMobile.style.opacity === "0") {
        dropdownMobile.style.display = "flex";
        setTimeout(function () {
          dropdownMobile.style.opacity = "1";
        }, 10);
      } else {
        dropdownMobile.style.opacity = "0";
        setTimeout(function () {
          dropdownMobile.style.display = "none";
        }, 300);
      }
      document.addEventListener("click", (event) => {
        const isBookMobileClicked = dropdownMobile.contains(event.target);
        const isBookClick = Array.from(
          document.querySelectorAll("#rooms a")
        ).some((link) => link.contains(event.target));
        if (
          !isBookMobileClicked &&
          !isBookClick &&
          dropdownMobile.style.opacity === "1"
        ) {
          dropdownMobile.style.opacity = "0";
          setTimeout(function () {
            dropdownMobile.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// ONLY FOR MOBILE
if (window.innerWidth < 768) {
  const elements = document.querySelectorAll('[data-aos-delay]');
  elements.forEach(element => {
    element.setAttribute('data-aos-delay', '0');
    element.setAttribute(`data-aos-offset`, `0`);
  });
  const bookArticle = document.querySelectorAll("#rooms a");
  bookArticle.forEach((button) => {
    button.attributes.removeNamedItem("href");
  });
  const news = document.querySelector(".news-title span");
  news.innerHTML = "Latest";
  toggleDropdownArticle();
}

// EMAIL LETTER
function emailLetter() {
  const email = document.querySelector(".input input[type='email']");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let submit = document.querySelector(".input button");
  submit.addEventListener("click", () => {
    if (email.value.match(emailPattern)) {
      Swal.fire({
        title: "Thank you!",
        text: `You are now subscribed to our newsletter.`,
        icon: "success",
        confirmButtonText: "Close",
      });
      email.value = "";
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid email address.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  });
}
emailLetter();

// Window On Load
window.addEventListener("load", () => {
  handleNavbarOnScroll();
  toggleHamburgerMenu();
});



