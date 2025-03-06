"use strict";

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

// document.addEventListener("DOMContentLoaded", () => {
//     const cart = document.querySelector(".card"); // Kurven
//     const cartButton = document.querySelector(".shopping"); // Kurv-ikonet
//     const closeButton = document.querySelector(".closeShopping"); // Luk-knap
//     const cartContent = document.querySelector(".listCard"); // Indholdet af kurven

//     // Åbner og lukker kurven, når der trykkes på kurv-ikonet
//     cartButton.addEventListener("click", (event) => {
//         event.stopPropagation(); // Forhindrer klik på ikonet i at lukke kurven
//         cart.classList.toggle("open");
//     });

//     // Forhindrer klik på kurven i at lukke den
//     cart.addEventListener("click", (event) => {
//         event.stopPropagation();
//     });

//     // Lukker kurven, hvis man klikker udenfor
//     document.addEventListener("click", () => {
//         cart.classList.remove("open");
//     });

//     // Forhindrer at "+" og "-" knapper lukker kurven
//     cartContent.addEventListener("click", (event) => {
//         if (event.target.classList.contains("plus") || event.target.classList.contains("minus")) {
//             event.stopPropagation(); // Sørger for, at klik på disse knapper ikke lukker kurven
//         }
//     });

//     // Lukker kurven, når der trykkes på "Close"
//     closeButton.addEventListener("click", () => {
//         cart.classList.remove("open");
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
    const cart = document.querySelector(".card"); // Kurven
    const cartButton = document.querySelector(".shopping"); // Kurv-ikonet
    const closeButton = document.querySelector(".closeShopping"); // Luk-knap
    const cartContent = document.querySelector(".listCard"); // Indholdet af kurven

    // Åbner og lukker kurven, når der trykkes på kurv-ikonet
    cartButton.addEventListener("click", (event) => {
        event.stopPropagation();
        cart.classList.add("open"); // Åbner kurven med animation
    });

    // Forhindrer klik på kurven i at lukke den
    cart.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    // Lukker kurven med animation, hvis man klikker udenfor
    document.addEventListener("click", () => {
        closeCartWithAnimation();
    });

    // Forhindrer at "+" og "-" knapper lukker kurven
    cartContent.addEventListener("click", (event) => {
        if (event.target.classList.contains("plus") || event.target.classList.contains("minus")) {
            event.stopPropagation();
        }
    });

    // Lukker kurven, når der trykkes på "Close"
    closeButton.addEventListener("click", () => {
        closeCartWithAnimation();
    });

    // Funktion til at lukke kurven med animation
    function closeCartWithAnimation() {
        if (cart.classList.contains("open")) {
            cart.classList.add("closing"); // Tilføj en 'closing' klasse for animation
            setTimeout(() => {
                cart.classList.remove("open", "closing"); // Fjern begge klasser efter animationen
            }, 300); // Justér tiden til at matche din CSS-animation
        }
    }
    closeCartWithAnimation();
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
        image: 'img/beetylychouis.webp',
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

function initApp() {
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
    sortedProducts.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        let imageName = value.image.split('/').pop().split('.')[0];

        newDiv.innerHTML = `
            <a href="produkter/${imageName}.html">
                <img src="${value.image}" alt="${value.name}">
            </a>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()} kr</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;

        // Append the item to the list with a smooth transition
        list.appendChild(newDiv);
        
        // Ensure smooth transition of position change
        setTimeout(() => {
            newDiv.style.transform = 'translateY(0)';
        }, 10); // Small delay to trigger the transition
    });
}

// Handle adding items to the shopping cart
function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        totalPrice += value.price;
        count += value.quantity;

        if (value != null) {
            let newDiv = document.createElement('li');
            let imageName = value.image.split('/').pop().split('.')[0];

            newDiv.innerHTML = `
                <a href="produkter/${imageName}.html">
                    <img src="${value.image}" alt="${value.name}">
                </a>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()} kr</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString() + ' kr';
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

// Initialize the app
initApp();
