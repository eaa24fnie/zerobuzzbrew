"use strict";

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');


//tilføjer event listener til at åbne og lukke kurven
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
        image: 'img/beetylychious.webp',
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


// loader kurvens data fra localStorage på appinnit 
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        listCards = JSON.parse(savedCart);
        reloadCard();
    }
}

function initApp() {
    // loader kurvens data når app indlæses
    loadCartFromStorage();

    // tilføjer event listener til filter dropdown funktionen
    const filterOptions = document.getElementById('filterOptions');
    filterOptions.addEventListener('change', () => {
        renderProductList(filterOptions.value);
    });

    // første visning af produkter
    renderProductList(filterOptions.value);
}

function renderProductList(filterType) {
    // rydder listen før genindlæsning
    list.innerHTML = '';


    //tager filnavnet fra aktuelle side (uden .html)
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');

    // Filtrere produkter baseret på aktuelle sides fil-navn
    let filteredProducts = products.filter(product => product.name.toLowerCase().replace(' ', '-') === currentPage.toLowerCase());

 
    //sorterer filtrerede produkter baseret på den valgte filtype
    let sortedProducts = [...filteredProducts]; // Kopiér de filtrerede produkter for at undgå at ændre det originale array.

    if (filterType === 'newest') {
        sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (filterType === 'popular') {
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
    }

    // Indlæser de sorterede produkter
    sortedProducts.forEach((value) => {
        let newDiv = document.createElement('section');
        newDiv.classList.add('item');
        let imageName = value.image.split('/').pop().split('.')[0];

        newDiv.innerHTML = `
            <section class="produkt">
                <section class="daaser">
                    <article class="daase">
                        <a href="${imageName}.html">
                            <img src="../${value.image}" alt="${value.name}">
                        </a>  
                    </article>
                </section>
                <section class="beskrivelse">
                    <h1>${value.name}</h1>
                    <h3>${value.price.toLocaleString()},00 DKK</h3>
                    <article>
                        <button class="knap" onclick="addToCard(${value.id})">Tilføj til kurv</button>
                    </article>
                    <article>
                        <a href="../404.html" ><button class="knap mobile-pay"><img src="../img/mobile-pay.svg"></button>
                    </article></a>
                    <p>${value.description}</p>
                </section>
            </section>`;

        // Tilføj elementet til listen med en glidende overgang
        list.appendChild(newDiv);
        
    
        //sikrer smooth transition ved positionsskift
        setTimeout(() => {
            newDiv.style.transform = 'translateY(0)';
        }, 10); // lille delay til at trigger transform
    });
}




// tilføjelse af produkter til kurv
function addToCard(id) {
    const product = products.find(product => product.id === id);
    const index = listCards.findIndex(item => item.id === id);
    
    if (index === -1) {
        product.quantity = 1;
        listCards.push({...product});
    } else {
        listCards[index].quantity++;
    }
    
    //Gemmer kurven i local storage
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
                <section>${value.name}</section>
                <section>${value.price.toLocaleString()},00 DKK</section>
                <section class="number">
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

// Ændring af produkt antal
function changeQuantity(id, quantity) {
    const index = listCards.findIndex(item => item.id === id);
    
    if (quantity == 0) {
        listCards.splice(index, 1); // fjerner produkt fra listen
    } else {
        listCards[index].quantity = quantity;
    }

    // Gemmer opdaterede kurv til localStorage
    saveCartToStorage();

    reloadCard();
}

// Gemmer kurv til localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(listCards));
}

function renderRelatedProducts(currentProductId) {
    let relatedProductsContainer = document.querySelector('.related-products');

    if (!relatedProductsContainer) {
        console.warn('No container found for related products.');
        return;
    }

    
    //filtrere aktuelle produkt fra
    let relatedProducts = products
    .filter(product => String(product.id) !== String(currentProductId))

        .sort((a, b) => b.popularity - a.popularity) // sorter fre popularitet
        .slice(0, 3); // Take the top 3

    relatedProductsContainer.innerHTML = ''; // rydder tidligere indhold

    relatedProducts.forEach(product => {
        let productDiv = document.createElement('section');
        productDiv.classList.add('related-item');
        
        let imageName = product.image.split('/').pop().split('.')[0];

        productDiv.innerHTML = `
            <section>
                        <a href="${imageName}.html"> 
                            <article class="relateret">
                            <img src="../${product.image}" alt="${product.name}">
                            </article>
                        </a>  
                    </section>
        `;

        relatedProductsContainer.appendChild(productDiv);
    });
}

let currentProductId = 1; 
renderRelatedProducts(currentProductId);

// genindlæser app
initApp();

