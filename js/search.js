"use strict"

const pages = [
    { name: "Pilsner", url: "pilsner.html" },
    { name: "Spiky Ginger", url: "spikyginger.html" },
    { name: "Beetylychouis", url: "beetylychious.html" },
    { name: "Pinky Promise", url: "pinkypromise.html" },
    { name: "Berry Bomb", url: "berrybomb.html" },
    { name: "Basil Smash", url: "basilsmash.html" }
];

const searchInput = document.getElementById("searchInput");
        const autocomplete = document.getElementById("autocomplete");
        let selectedIndex = -1;

        searchInput.addEventListener("input", function() {
            let query = this.value.toLowerCase();
            autocomplete.innerHTML = "";
            selectedIndex = -1; // Reset selection

            let matches = pages.filter(page => page.name.toLowerCase().includes(query));
            if (matches.length === 0) {
                autocomplete.style.display = "none";
                return;
            }

            matches.forEach((page, index) => {
                let div = document.createElement("div");
                div.textContent = page.name;
                div.dataset.url = page.url;
                div.addEventListener("click", () => {
                    window.location.href = page.url; // Redirect on click
                });
                autocomplete.appendChild(div);
            });

            autocomplete.style.display = "block";
        });

        // Handle keyboard navigation
        searchInput.addEventListener("keydown", function(event) {
            let options = autocomplete.getElementsByTagName("div");
            
            if (event.key === "ArrowDown") {
                selectedIndex = (selectedIndex + 1) % options.length;
            } else if (event.key === "ArrowUp") {
                selectedIndex = (selectedIndex - 1 + options.length) % options.length;
            } else if (event.key === "Enter" && selectedIndex > -1) {
                event.preventDefault();
                window.location.href = options[selectedIndex].dataset.url;
            }

            Array.from(options).forEach((option, index) => {
                option.classList.toggle("selected", index === selectedIndex);
            });
        });

        // Hide suggestions when clicking outside
        document.addEventListener("click", (event) => {
            if (!searchInput.contains(event.target) && !autocomplete.contains(event.target)) {
                autocomplete.style.display = "none";
            }
        });