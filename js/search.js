"use strict"

const pages = [
    { name: "Pilsner", url: "../produkter/pilsner.html" },
    { name: "Spiky Ginger", url: "../produkter/spiky-ginger.html" },
    { name: "Beetylychious", url: "../produkter/beetylychious.html" },
    { name: "Pinky Promise", url: "../produkter/pinky-promise.html" },
    { name: "Berry Bomb", url: "../produkter/berry-bomb.html" },
    { name: "Basil Smash", url: "../produkter/basil-smash.html" }
];

const searchInput = document.getElementById("searchInput");
        const autocomplete = document.getElementById("autocomplete");
        let selectedIndex = -1;

        searchInput.addEventListener("input", function() {
            let query = this.value.toLowerCase();
            autocomplete.innerHTML = "";
            selectedIndex = -1; // Reset det valgte

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
                    window.location.href = page.url; // Redirecter på klik
                });
                autocomplete.appendChild(div);
            });

            autocomplete.style.display = "block";
        });

        // Håndterer keyboard navigation
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

        // Skjuler 'suggestions' når man klikker udenfor
        document.addEventListener("click", (event) => {
            if (!searchInput.contains(event.target) && !autocomplete.contains(event.target)) {
                autocomplete.style.display = "none";
            }
        });