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

let products = [
    {
        id: 1,
        name: 'Pilsner',
        image: 'img/pilsner.webp',
        price: 22,
        dateAdded: '2023-01-15',
        popularity: 100,
        description: 'Vores pilsner er klar og let, med et lille friskt citronpift, der giver den en skøn, let syrlig smag. Skummet er dejligt og fyldigt, og de tyske humler giver en fin bitterhed, som passer perfekt til den friske smag. Det er en læskende og forfriskende pilsner, som er nem at nyde, og som giver dig en klassisk øl med et lille ekstra twist.'

    },
    {
        id: 2,
        name: 'Spiky Ginger',
        image: 'img/spiky-ginger.webp',
        price: 25,
        dateAdded: '2023-02-15',
        popularity: 30,
        description: 'En lager, der sparker igennem med en krydret ingefærsmag og et skarpt syrligt twist fra havtorn. Guld- og orangefarvet, sprudlende og fyldt med liv, denne øl leverer både varme og friskhed i hver slurk. En perfekt balance mellem krydderi og syre, der får dine smagsløg til at danse.'
    },
    {
        id: 3,
        name: 'Pinky Promise',
        image: 'img/pinky-promise.webp',
        price: 25,
        dateAdded: '2023-04-15',
        popularity: 40,
        description: 'En livlig og sprudlende sour med en smuk lyserød farve, der kombinerer sødmen fra hindbær med den skarpe, næsten vinøse syre fra ribs. Denne øl er en kærlighedserklæring til de frugtige smage, der er både forfriskende og uforglemmelige. Perfekt til dem, der elsker en sour med et twist.'
    },
    {
        id: 4,
        name: 'Basil Smash',
        image: 'img/basil-smash.webp',
        price: 25,
        dateAdded: '2023-03-15',
        popularity: 70,
        description: 'En lys grøn IPA, der rammer dig med et friskt basilikumsslag og en sprød limefinish. Denne øl kombinerer det bedste fra krydderurterne og den sprudlende citrus for at skabe en levende, let bitter smagsoplevelse. Perfekt for den, der søger noget ekstra i sin IPA'
    },
    {
        id: 5,
        name: 'Beetylychious',
        image: 'img/beetylychouis.webp',
        price: 28,
        dateAdded: '2025-01-15',
        popularity: 80,
        description: 'En mørkerød brown ale, hvor den eksotiske sødme fra lychee møder den jordnære dybde fra rødbede. En fyldig og kompleks smagsoplevelse, der bringer et lækkert mix af frugt og jord til din gane. Den perfekte kombination af sødme og umami, der efterlader et varigt indtryk.'
    },
    {
        id: 6,
        name: 'Berry Bomb',
        image: 'img/berry-bomb.webp',
        price: 28,
        dateAdded: '2024-01-15',
        popularity: 10,
        description: 'En dyb lilla Double IPA, der byder på en intens brombærsmag, som blander sig med den kraftige syre fra solbær. Denne øl har en fyldig maltbase, der understøtter de frugtagtige noter og en markant humlebitterhed, som giver en stærk og kompleks smagsoplevelse. Med sin kraftige alkoholfrie karakter og frugtige twist er denne IPA perfekt til dem, der ønsker en dristig og læskende øl, hvor bær og humle mødes i en intens, men afbalanceret symfoni.'
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

    // Filter products to only show "Pilsner"
    let filteredProducts = products.filter(product => product.name === 'Pilsner');

    // Sort the filtered products based on the selected filter type
    let sortedProducts = [...filteredProducts]; // Copy the filtered products to avoid modifying the original array

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
            <div class="price">${value.price.toLocaleString()} kr</div>
            <button onclick="addToCard(${value.id})">Add To Cart</button>

            <section class="produkt">
                <section class="daaser">
                    <article class="daase">
                        <a href="${imageName}.html">
                        <img src="../${value.image}" alt="${value.name}"> </a>  
                    </article>

                </section>
            <section class="beskrivelse">
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()} kr</div>
                <div>
                    <button onclick="changeQuantity(${value.id}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${value.id}, ${value.quantity + 1})">+</button>
                </div>
                <p>${value.description}</p>
            </section>
        </section>`;

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
                <a href="${imageName}.html">
                    <img src="../${value.image}" alt="${value.name}">
                </a>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()} kr</div>
                <div>
                    <button onclick="changeQuantity(${value.id}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${value.id}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString() + ' kr';
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
