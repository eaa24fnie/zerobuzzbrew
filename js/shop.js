"use strict"

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

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
    },
    {
        id: 2,
        name: 'Spiky Ginger',
        image: 'img/spiky-ginger.webp',
        price: 25,
        dateAdded: '2023-02-15',
    },
    {
        id: 3,
        name: 'Pinky Promise',
        image: 'img/pinky-promise.webp',
        price: 25,
        dateAdded: '2023-04-15',
    },
    {
        id: 4,
        name: 'Basil Smash',
        image: 'img/basil-smash.webp',
        price: 25,
        dateAdded: '2023-03-15',
    },
    {
        id: 5,
        name: 'Beetylychious',
        image: 'img/beetylychouis.webp',
        price: 28,
        dateAdded: '2025-01-15',
    },
    {
        id: 6,
        name: 'Berry Bomb',
        image: 'img/berry-bomb.webp',
        price: 28,
        dateAdded: '2024-01-15',
    }
];

let listCards = [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        // Extract the image name without the extension for the link
        let imageName = value.image.split('/').pop().split('.')[0];

        newDiv.innerHTML = `
            <a href="produkter/${imageName}.html">
                <img src="${value.image}" alt="${value.name}">
            </a>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()} kr</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    });
}

initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        // Copy product from list to list card
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
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');

            // Extract the image name without the extension for the link
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
