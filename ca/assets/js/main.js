(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;
    const headerFixed = () => {
      if (headerOffset - window.scrollY <= 0) {
        selectHeader.classList.add("fixed-top");
        nextElement.classList.add("scrolled-offset");
      } else {
        selectHeader.classList.remove("fixed-top");
        nextElement.classList.remove("scrolled-offset");
      }
    };
    window.addEventListener("load", headerFixed);
    onscroll(document, headerFixed);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();

// // Set the time (in milliseconds) for cursor inactivity
// const inactivityTime = 1000; // 40 seconds

// let popupTimeout;

// // Function to display the popup
// function showPopup() {
//   const popup = document.getElementById("popupBox");
//   popup.style.display = "block";
// }

// // Function to start the inactivity timer
// function startInactivityTimer() {
//   popupTimeout = setTimeout(showPopup, inactivityTime);
// }

// // Function to reset the inactivity timer
// function resetInactivityTimer() {
//   clearTimeout(popupTimeout);
//   startInactivityTimer();
// }

// // Add event listeners for mousemove and keydown to reset the inactivity timer
// document.addEventListener("mousemove", resetInactivityTimer);
// document.addEventListener("keydown", resetInactivityTimer);

// // Start the inactivity timer when the page loads
// startInactivityTimer();

// function showPopupOnMouseLeave() {
//   setTimeout(() => {
//     let mousecount = 0;
//     document.addEventListener("mouseleave", function (event) {
//       if (event.clientY <= 0) {
//         if (mousecount < 1) {
//           const exitPopup = document.querySelector(".exit-popup");
//           exitPopup.style.display = "block";
//           document.body.classList.add("openpop");
//           mousecount++;
//         }
//       }
//     });

//     const closeButtons = document.querySelectorAll(
//       ".pop-off, .exit-popup-close, .exit-popup-href"
//     );
//     closeButtons.forEach(function (button) {
//       button.addEventListener("click", function () {
//         const exitPopup = document.querySelector(".exit-popup");
//         exitPopup.style.display = "none";
//         document.body.classList.remove("openpop");
//       });
//     });
//   }, 3000);
// }

// function showPopupAfterCertainTimeFrame(timeoutInSeconds = 40) {
//   const timeoutInMilliseconds = timeoutInSeconds * 1000;
//   setTimeout(() => {
//     const exitPopup = document.querySelector(".exit-popup");
//     exitPopup.style.display = "block";
//     document.body.classList.add("openpop");

//     const closeButtons = document.querySelectorAll(
//       ".pop-off, .exit-popup-close, .exit-popup-href"
//     );
//     closeButtons.forEach(function (button) {
//       button.addEventListener("click", function () {
//         exitPopup.style.display = "none";
//         document.body.classList.remove("openpop");
//       });
//     });
//   }, timeoutInMilliseconds);
// }

// const modalDisplayCondition = "mouse_leave"; // Replace with your actual condition
// const modalTimeDelay = 40; // Replace with your actual time delay

// if (modalDisplayCondition === "mouse_leave") {
//   showPopupOnMouseLeave();
// } else if (modalDisplayCondition === "time_based") {
//   showPopupAfterCertainTimeFrame(modalTimeDelay);
// }

document.addEventListener("DOMContentLoaded", function () {
  var popup_vars = { show_popup: "time_based", time_delay: "40" };
  const modalDisplayCondition = popup_vars.show_popup;
  const modalTimeDelay = popup_vars.time_delay || 40;

  // Add GA event to modal link
  function modalPopupGAEvent() {
    const modalPopup = document.getElementById("modal_popup");
    modalPopup.addEventListener("click", function () {
      if (window.dataLayer) {
        window.dataLayer.push({ event: "popup_click" });
      }
    });
  }

  function showPopUpOnMouseLeave() {
    modalPopupGAEvent();
    setTimeout(function () {
      var mousecount = 0;
      document.addEventListener("mouseleave", function (event) {
        if (event.clientY <= 0) {
          if (mousecount < 1) {
            var exitPopup = document.querySelector(".exit-popup");
            exitPopup.style.display = "block";
            document.body.classList.add("openpop");
            mousecount = mousecount + 1;
          }
        }
      });

      var closeButtons = document.querySelectorAll(
        ".pop-off, .exit-popup-close, .exit-popup-href"
      );
      closeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          var exitPopup = document.querySelector(".exit-popup");
          exitPopup.style.display = "none";
          document.body.classList.remove("openpop");
        });
      });
    }, 3000);
  }

  function showPopupAfterCertainTimeFrame(timeoutInSeconds = 40) {
    modalPopupGAEvent();
    const timeoutInMilliseconds = timeoutInSeconds * 1000;
    setTimeout(function () {
      var exitPopup = document.querySelector(".exit-popup");
      exitPopup.style.display = "block";
      document.body.classList.add("openpop");

      var closeButtons = document.querySelectorAll(
        ".pop-off, .exit-popup-close, .exit-popup-href"
      );
      closeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          var exitPopup = document.querySelector(".exit-popup");
          exitPopup.style.display = "none";
          document.body.classList.remove("openpop");
        });
      });
    }, timeoutInMilliseconds);
  }

  if (modalDisplayCondition === "mouse_leave") {
    showPopUpOnMouseLeave();
  }

  if (modalDisplayCondition === "time_based") {
    showPopupAfterCertainTimeFrame(modalTimeDelay);
  }
});
