"use strict";

function confirmAge(isOfAge) {
    const overlay = document.getElementById("overlay");
    const errorMessage = document.getElementById("errorMessage");

    if (isOfAge) {
        overlay.style.display = "none"; // Hide the popup
        localStorage.setItem("ageConfirmed", "true"); // Store confirmation
    } else {
        errorMessage.classList.remove("hidden"); // Show error message
    }
}

// Check if the user has already confirmed age
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

// Add event listeners for opening and closing the shopping cart
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

// Load cart data from localStorage on app initialization
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        listCards = JSON.parse(savedCart);
        reloadCard();
    }
}

function initApp() {
    // Load cart data when the app initializes
    loadCartFromStorage();

    // Add event listener to the filter dropdown
    const filterOptions = document.getElementById('filterOptions');
    filterOptions.addEventListener('change', () => {
        renderProductList(filterOptions.value);
    }); 

    // Initial render of products
    renderProductList(filterOptions.value);
}

function renderProductList(filterType) {
    // Clear the list before re-rendering
    list.innerHTML = '';

    // Sort the products based on the selected filter type
    let sortedProducts = [...products]; // Copy the products to avoid modifying the original array

    if (filterType === 'newest') {
        sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (filterType === 'popular') {
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
    }

    // Render the sorted products
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

        // Append the item to the list with a smooth transition
        list.appendChild(newDiv);
        
        // Ensure smooth transition of position change
        setTimeout(() => {
            newDiv.style.transform = 'translateY(0)';
        }, 10); // Small delay to trigger the transition
    });
}

// Handle adding items to the shopping cart
function addToCard(id) {
    const product = products.find(product => product.id === id);
    const index = listCards.findIndex(item => item.id === id);
    
    if (index === -1) {
        product.quantity = 1;
        listCards.push({...product});
    } else {
        listCards[index].quantity++;
    }
    
    // Save the cart to localStorage
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

// Handle changing item quantity
function changeQuantity(id, quantity) {
    const index = listCards.findIndex(item => item.id === id);
    
    if (quantity == 0) {
        listCards.splice(index, 1); // Remove the item from the list
    } else {
        listCards[index].quantity = quantity;
    }

    // Save the updated cart to localStorage
    saveCartToStorage();

    reloadCard();
}

// Save cart data to localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(listCards));
}

// Initialize the app
initApp();
