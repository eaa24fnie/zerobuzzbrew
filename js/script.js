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



let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
});

closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
});
let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: 'img/pilsner.webp',
        price: 22,
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        image: 'img/basil-smash.webp',
        price: 25,
    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: 'img/beetylychouis.webp',
        price: 25,
    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: 'img/berry-bomb.webp',
        price: 25,
    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: 'img/pinky-promise.webp',
        price: 25,
    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: 'img/spiky-ginger.webp',
        price: 25,
    },
];
let listCards = [];
function initApp(){
    products.forEach((valye, key)=>{
        let newSection 
    }) 
}