"use strict";

window.onscroll = function () {
    let button = document.getElementById("backToTop");
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 200) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  };
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  