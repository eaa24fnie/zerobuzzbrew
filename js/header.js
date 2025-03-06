"use strict";

window.addEventListener("scroll", function () {
    var header = document.getElementById("header");
    if (window.scrollY > 500) {  // Shrink when scrolled 50px down
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});