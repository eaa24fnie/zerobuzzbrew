"use strict"
//sikrer, at scriptet først eksekveres, når hele HTML-dokumentet er indlæst og derefter defineres der 3 konstanter
document.addEventListener('DOMContentLoaded', function() { 
    const shopContainer = document.querySelector('.shopcontainer');
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    const dropbtn = document.querySelector('.dropbtn');
    
    // Gemmer den oprindelige rækkefølge af produkter så man kan gendanne standardrækkefølgen senere
    const originalProducts = Array.from(shopContainer.querySelectorAll('.product'));

    // Tilføjer event listeners til dropdown-links, 'sortType' hentes fra linkens 'data-sort' attribut
    // sortProducts funktionen kaldes med 'sortType' og teksten på dropdown opdateres til den valgte sorteringsmetode
    dropdownLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const sortType = this.getAttribute('data-sort');
        sortProducts(sortType);
        dropbtn.textContent = this.textContent + ' ▼';
      });
    });
  
    // Alle produktelementer i 'shopContainer' konverteres til et array og prudkterne sorteres baseret på sortType
    function sortProducts(sortType) {
      let products = Array.from(shopContainer.querySelectorAll('.product'));
      
      if (sortType === 'newest') {
        products.sort((a, b) => {
          return new Date(b.dataset.releaseDate) - new Date(a.dataset.releaseDate);
        });
      } else if (sortType === 'popular') {
        // Gendan den oprindelige rækkefølge
        products = [...originalProducts];
      }
  
      // Tilføj en overgangseffekt
      products.forEach(product => product.style.opacity = '0');
      
      setTimeout(() => {
        products.forEach(product => shopContainer.appendChild(product));
        products.forEach(product => product.style.opacity = '1');
      }, 300);
    }
});

