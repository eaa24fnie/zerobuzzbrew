"use strict";

function confirmAge(isOfAge) {
    const overlay = document.getElementById("overlay");
    const errorMessage = document.getElementById("errorMessage");

    if (isOfAge) {
        overlay.style.display = "none"; // Skjuler pop-uppen
        localStorage.setItem("ageConfirmed", "true"); // Gemmer bekræftigelse
    } else {
        errorMessage.classList.remove("hidden"); // Viser fejl-beskeden
    }
}

// Tjekker om brugeren allerede har bekræftet sin alder
window.onload = function () {
    if (localStorage.getItem("ageConfirmed") === "true") {
        document.getElementById("overlay").style.display = "none";
    }
}; 


let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// Tilføjer 'add event listeners' for åbning og lukning af shop-kurven
openShopping.addEventListener('click', () => {
    body.classList.add('active');
}); 
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'Pilsner',
        image: 'img/pilsner.webp',
        price: 22,
        dateAdded: '2023-01-15',
        popularity: 100,
    },
    {
        id: 2,
        name: 'Spiky Ginger',
        image: 'img/spiky-ginger.webp',
        price: 25,
        dateAdded: '2023-02-15',
        popularity: 30
    },
    {
        id: 3,
        name: 'Pinky Promise',
        image: 'img/pinky-promise.webp',
        price: 25,
        dateAdded: '2023-04-15',
        popularity: 40
    },
    {
        id: 4,
        name: 'Basil Smash',
        image: 'img/basil-smash.webp',
        price: 25,
        dateAdded: '2023-03-15',
        popularity: 70
    },
    {
        id: 5,
        name: 'Beetylychious',
        image: 'img/beetylychious.webp',
        price: 28,
        dateAdded: '2025-01-15',
        popularity: 80
    },
    {
        id: 6,
        name: 'Berry Bomb',
        image: 'img/berry-bomb.webp',
        price: 28,
        dateAdded: '2024-01-15',
        popularity: 10
    }
];

let listCards = [];

// Indlæser kurvens data fra Localstorage ved app initialization
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        listCards = JSON.parse(savedCart);
        reloadCard();
    }
}

function initApp() {
    // Indlæser kurvens data ved opstart
    loadCartFromStorage();

    // Tilføjer 'addeventlistener' til filter dropdown
    const filterOptions = document.getElementById('filterOptions');
    filterOptions.addEventListener('change', () => {
        renderProductList(filterOptions.value);
    }); 

    // Initial render af produkterne
    renderProductList(filterOptions.value);
}

function renderProductList(filterType) {
    // Clear listen før re-rendering
    list.innerHTML = '';

    // Sorterer produkterne baseret på den valgte filter-type
    let sortedProducts = [...products]; // Kopierer produkterne for at undgå at ændre den originale array

    if (filterType === 'newest') {
        sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (filterType === 'popular') {
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
    }

    // Viser de sorterede produkter
    sortedProducts.forEach((value) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        let imageName = value.image.split('/').pop().split('.')[0];

        newDiv.innerHTML = `
            <a href="produkter/${imageName}.html">
                <img class="webshopprodukter" src="${value.image}" alt="${value.name}">
            </a>
            <section class="title">${value.name}</section>
            <section class="price">${value.price.toLocaleString()},00 DKK</section>
            <button onclick="addToCard(${value.id})">Add To Cart</button>`;

        // Tilføjer item til listen med en smooth overgang
        list.appendChild(newDiv);
        
        // Sikrer en smooth overgang af 'position change'
        setTimeout(() => {
            newDiv.style.transform = 'translateY(0)';
        }, 10); 
    });
}

// Håndterer tilføjelse af items til kurven
function addToCard(id) {
    const product = products.find(product => product.id === id);
    const index = listCards.findIndex(item => item.id === id);
    
    if (index === -1) {
        product.quantity = 1;
        listCards.push({...product});
    } else {
        listCards[index].quantity++;
    } 
    
    // Gemmer kurven til Localstorage
    saveCartToStorage();

    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value) => {
        totalPrice += value.price * value.quantity;
        count += value.quantity;

        if (value != null) {
            let newDiv = document.createElement('li');
            let imageName = value.image.split('/').pop().split('.')[0];

            newDiv.innerHTML = `
                <a href="produkter/${imageName}.html">
                    <img src="${value.image}" alt="${value.name}">
                </a>
                <section>${value.name}</section>
                <section>${value.price.toLocaleString()},00 DKK</section>
                <section>
                    <button onclick="changeQuantity(${value.id}, ${value.quantity - 1})">-</button>
                    <article class="count">${value.quantity}</article>
                    <button onclick="changeQuantity(${value.id}, ${value.quantity + 1})">+</button>
                </section>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString() + ',00 DKK';
    quantity.innerText = count;
}

// Håndterer mængden af produkterne
function changeQuantity(id, quantity) {
    const index = listCards.findIndex(item => item.id === id);
    
    if (quantity == 0) {
        listCards.splice(index, 1); // Sletter itemen fra listen
    } else {
        listCards[index].quantity = quantity;
    }

    // Gemmer den opdaterede kurv til Localstorage
    saveCartToStorage();

    reloadCard();
}

// Gemmer kurvens data til Localstorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(listCards));
}

initApp();
