"use strict"

document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".dropbtn");
    const dropdown = document.querySelector(".dropdown-content");

    button.addEventListener("click", function(event) {
        event.stopPropagation();
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function() {
        dropdown.style.display = "none";
    });
});



