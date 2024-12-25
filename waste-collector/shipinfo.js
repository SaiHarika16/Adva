let currentIndex = 0;
const cards = document.querySelectorAll('.flexcard');
const totalCards = cards.length;
const cardsWrapper = document.querySelector('.flexcards-wrapper');

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight); // Including margin
    cardsWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateFocus();
}


function nextCard() {
    currentIndex++;
    if (currentIndex > totalCards - 3) { // Loops back to the first
        currentIndex = 0;
    }
    updateCarousel();
}

function prevCard() {
    currentIndex--;
    if (currentIndex < 0) { // Loops to the last visible set
        currentIndex = totalCards - 3; // Assuming 3 cards are visible at once
    }
    updateCarousel();
}
