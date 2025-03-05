"use strict"
// Funktion til at bekræfte alder
function confirmAge(isOfAge) {
    const overlay = document.getElementById('overlay');
    const errorMessage = document.getElementById('errorMessage');

    if (isOfAge) {
        // Gem popup og tillad adgang
        overlay.style.display = 'none';
        localStorage.setItem('ageVerified', 'true'); // Gem verifikation, så popup ikke kommer igen
    } else {
        // Vis fejlbesked
        errorMessage.classList.remove('hidden');
    }
} 

// Sørg for, at pop-up'en vises, hvis brugeren ikke tidligere har bekræftet sin alder
window.onload = function() {
    if (localStorage.getItem('ageVerified') !== 'true') {
        document.getElementById('overlay').style.display = 'flex';
    }
};
