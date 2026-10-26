document.addEventListener("DOMContentLoaded", function () {

  // ================= MOBILE MENU =================
  const menuButton = document.getElementById("menuButton");
  const closeMenu = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileOverlay = document.getElementById("mobileOverlay");

  function openMenu() {
    if (!mobileMenu || !mobileOverlay || !menuButton) return;
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.add("translate-x-0");
    mobileOverlay.classList.remove("opacity-0", "pointer-events-none");
    mobileOverlay.classList.add("opacity-100", "pointer-events-auto");
    document.body.classList.add("overflow-hidden");
    menuButton.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
  }

  function closeMobileMenu() {
    if (!mobileMenu || !mobileOverlay || !menuButton) return;
    mobileMenu.classList.remove("translate-x-0");
    mobileMenu.classList.add("translate-x-full");
    mobileOverlay.classList.remove("opacity-100", "pointer-events-auto");
    mobileOverlay.classList.add("opacity-0", "pointer-events-none");
    document.body.classList.remove("overflow-hidden");
    menuButton.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  }

  if (menuButton) menuButton.addEventListener("click", openMenu);
  if (closeMenu) closeMenu.addEventListener("click", closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileMenu);

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") closeMobileMenu();
  });

  // ================= 1ST SECTION: PRODUCT SWIPER =================
  if (document.querySelector(".productSwiper")) {
    const productSwiper = new Swiper(".productSwiper", {
      slidesPerView: 3,
      spaceBetween: 14,
      speed: 600,
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 10 },
        768: { slidesPerView: 2, spaceBetween: 12 },
        1200: { slidesPerView: 3, spaceBetween: 14 }
      },
      navigation: { nextEl: "#productNext", prevEl: "#productPrev" }
    });
  }

  // ================= 2ND SECTION: HERITAGE SWIPER =================
  if (document.querySelector(".heritageSwiper")) {
    const heritageSwiper = new Swiper(".heritageSwiper", {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 600
    });

    const heritageCounter = document.getElementById("heritageCounter");
    const heritageProgress = document.getElementById("heritageProgress");
    const heritagePrev = document.getElementById("heritagePrev");
    const heritageNext = document.getElementById("heritageNext");

    function updateHeritageSlider() {
      const currentSlide = heritageSwiper.activeIndex + 1;
      if (heritageCounter) heritageCounter.textContent = currentSlide + "/6";
      if (heritageProgress) heritageProgress.style.width = (currentSlide / 6) * 100 + "%";
    }

    if (heritagePrev) heritagePrev.addEventListener("click", function() { heritageSwiper.slidePrev(); });
    if (heritageNext) heritageNext.addEventListener("click", function() { heritageSwiper.slideNext(); });

    heritageSwiper.on("slideChange", updateHeritageSlider);
    updateHeritageSlider();
  }

  // ================= 3RD SECTION: ACCORDION =================
  const accordionButtons = document.querySelectorAll(".accordion-button");
  accordionButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const content = button.nextElementSibling;
      const plus = button.querySelector(".plus");
      if (content.classList.contains("hidden")) {
        content.classList.remove("hidden");
        if (plus) plus.textContent = "−";
      } else {
        content.classList.add("hidden");
        if (plus) plus.textContent = "+";
      }
    });
  });

  // ================= 4TH SECTION: CHERISHED TABS =================
  const cherishedTabs = document.querySelectorAll(".cherished-tab");
  if (document.querySelector(".cherishedSwiper")) {
    const cherishedSwiper = new Swiper(".cherishedSwiper", {
      slidesPerView: 1,
      speed: 700,
      autoHeight: true
    });

    for (let i = 0; i < cherishedTabs.length; i++) {
      cherishedTabs[i].addEventListener("click", function () {
        cherishedSwiper.slideTo(i);
        for (let j = 0; j < cherishedTabs.length; j++) {
          cherishedTabs[j].classList.remove("active");
          cherishedTabs[j].setAttribute("aria-selected", "false");
        }
        cherishedTabs[i].classList.add("active");
        cherishedTabs[i].setAttribute("aria-selected", "true");
      });
    }
  }

  // ================= NEWSLETTER =================
  const form = document.getElementById('newsletterForm');
  if (form) {
    const emailInput = document.getElementById('emailInput');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    submitBtn.addEventListener('click', function() {
      const email = emailInput.value.trim();
      formMessage.className = 'form-message';

      if (email === '') {
        formMessage.textContent = 'Please enter your email address.';
        formMessage.classList.add('error');
        return;
      }

      if (emailRegex.test(email)) {
        formMessage.textContent = 'Email entered correctly! Welcome to the list.';
        formMessage.classList.add('success');
        emailInput.value = '';
      } else {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.classList.add('error');
      }
    });

    emailInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitBtn.click();
      }
    });
  }

  // ================= LOGIN SECTION =================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const passwordToggle = document.getElementById("passwordToggle");
    const passwordIcon = document.getElementById("passwordIcon");
    const loginMessage = document.getElementById("loginMessage");

    // Password Toggle Logic
    if (passwordToggle && password && passwordIcon) {
      passwordToggle.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("✅ Toggle clicked!");
        
        if (password.type === "password") {
          password.type = "text";
          passwordIcon.classList.remove("fa-eye-slash");
          passwordIcon.classList.add("fa-eye");
          console.log("✅ Password is now VISIBLE");
        } else {
          password.type = "password";
          passwordIcon.classList.remove("fa-eye");
          passwordIcon.classList.add("fa-eye-slash");
          console.log("✅ Password is now HIDDEN");
        }
      });
    }

    // Form Validation Logic
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      emailError.classList.add("hidden");
      passwordError.classList.add("hidden");
      loginMessage.classList.add("hidden");

      let valid = true;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

      if (email.value.trim() === "") {
        emailError.textContent = "Please enter your email address.";
        emailError.classList.remove("hidden");
        valid = false;
      } else if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.classList.remove("hidden");
        valid = false;
      }

      if (password.value.trim() === "") {
        passwordError.textContent = "Please enter your password.";
        passwordError.classList.remove("hidden");
        valid = false;
      } else if (!passwordPattern.test(password.value)) {
        passwordError.textContent = "Password must contain at least 6 characters and one number.";
        passwordError.classList.remove("hidden");
        valid = false;
      }

      if (valid) {
        loginMessage.textContent = "Sign in successful.";
        loginMessage.classList.remove("hidden");
      }
    });
  }
});
// video //


  document.addEventListener('DOMContentLoaded', function() {
    // Select all images with the trigger class
    const triggers = document.querySelectorAll('.journal-img-trigger');
    
    triggers.forEach(function(img) {
      img.addEventListener('click', function() {
        // Find the parent card containing this specific image
        const card = this.closest('.journal-card');
        // Find the video element inside this same card
        const video = card.querySelector('video');
        
        if (video) {
          // Hide the clicked image
          this.classList.add('hidden');
          // Show the video (removes Tailwind's 'hidden' class)
          video.classList.remove('hidden');
          
          // Play the video (catch prevents console errors if browser blocks it)
          video.play().catch(function(error) {
            console.error("Video playback failed:", error);
          });
        }
      });
    });
  });
    // Optional: Click video to pause and show image again
    document.querySelectorAll('.journal-card video').forEach(function(video) {
      video.addEventListener('click', function() {
        const card = this.closest('.journal-card');
        const img = card.querySelector('.journal-img-trigger');
        
        this.pause();
        this.classList.add('hidden');
        img.classList.remove('hidden');
      });
    });

