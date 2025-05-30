// Mobile menu toggle functionality
const toggleButton = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.top-menu');

toggleButton.addEventListener('click', function () {
    // Toggle the active class on both the menu and the toggle button
    mobileMenu.classList.toggle('active');
    toggleButton.classList.toggle('active');
});


const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.line');
const images = document.querySelectorAll('.carousel-track img');
const prevArrow = document.getElementById('prev');
const nextArrow = document.getElementById('next');
const carousel = document.querySelector('.carousel');
let currentIndex = 0;
let slideInterval;

// Variables for dragging
let isDragging = false;
let startPos = 0;
let lastPos = 0;
let currentTranslate = 0;
let hasDragged = false;   // Flag to check if a meaningful drag occurred

// Ensure images are fully loaded before calculations
function imagesLoaded() {
    return new Promise(resolve => {
        let loaded = 0;
        images.forEach(img => {
            img.onload = () => {
                loaded++;
                if (loaded === images.length) resolve();
            };
            if (img.complete) {
                loaded++;
                if (loaded === images.length) resolve();
            }
        });
    });
}

// Get the carousel container's width
function getCarouselWidth() {
    return carousel.offsetWidth;
}

const dragThreshold = getCarouselWidth() * 0.5; // Minimum pixels to consider as a valid swipe

/*
const lol = document.getElementById("carousel");
lol.addEventListener("dblclick", function () {
    document.getElementById("lol").innerHTML = `${getCarouselWidth()}`;
});
*/

// Update carousel position instantly (used on resize and snapping back)
function updateCarouselSize() {
    track.style.transition = 'none';
    track.style.transform = `translateX(-${currentIndex * getCarouselWidth()}px)`;
    setTimeout(() => {
        track.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
}

// Update slide and reset navigation line fill animation
function updateCarousel(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${index * getCarouselWidth()}px)`;

    dots.forEach(dot => {
        dot.classList.remove('active');
        const fill = dot.querySelector('.fill');
        fill.style.transition = 'none';
        fill.style.width = '0';
    });

    const activeDot = dots[index];
    activeDot.classList.add('active');
    const activeFill = activeDot.querySelector('.fill');
    void activeFill.offsetWidth;
    activeFill.style.transition = 'width 6s linear';
    activeFill.style.width = '100%';
}

// Move to next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel(currentIndex);
}

// Move to previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel(currentIndex);
}

// Start auto-slide (6s interval matching fill animation)
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 6000);
}

// Reset auto-slide timer
function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// --- Click events for navigation lines and arrows ---
dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        updateCarousel(index);
        resetAutoSlide();
    });
});

prevArrow.addEventListener('click', () => {
    prevSlide(); // Move to the previous slide
    resetAutoSlide(); // Restart the auto-slide timer
});

nextArrow.addEventListener('click', () => {
    nextSlide(); // Move to the next slide
    resetAutoSlide(); // Restart the auto-slide timer
});

// Update carousel size on window resize
window.addEventListener('resize', updateCarouselSize);

// --- Pointer (drag) events for swipe/drag support ---
carousel.addEventListener('pointerdown', (e) => {
    // Prevent dragging if the target is an arrow or a navigation line
    if (e.target.classList.contains('arrow') || e.target.classList.contains('line')) {
        return;
    }

    isDragging = true;
    hasDragged = false;
    startPos = e.clientX;
    lastPos = startPos;
    carousel.setPointerCapture(e.pointerId);
    track.style.transition = 'none'; // Disable smooth transition during drag
    clearInterval(slideInterval);    // Stop auto-slide while dragging
    e.preventDefault();
});

carousel.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    lastPos = currentPosition;
    const delta = currentPosition - startPos;
    if (Math.abs(delta) > 5) hasDragged = true;
    const containerWidth = getCarouselWidth();
    currentTranslate = -currentIndex * containerWidth + delta;
    track.style.transform = `translateX(${currentTranslate}px)`;
    e.preventDefault();
});

function pointerUpHandler(e) {
    if (!isDragging) return;
    isDragging = false;
    carousel.releasePointerCapture(e.pointerId);
    track.style.transition = 'transform 0.5s ease-in-out'; // Re-enable smooth transition
    const delta = lastPos - startPos;

    if (hasDragged) {
        if (delta < -dragThreshold) {
            // Dragged left: go to next slide
            nextSlide();
        } else if (delta > dragThreshold) {
            // Dragged right: go to previous slide
            prevSlide();
        } else {
            // Not enough drag: snap back to current slide
            updateCarousel(currentIndex);
        }
        resetAutoSlide();
    } else {
        // If it was just a tap, simply restart auto-slide
        startAutoSlide();
    }
}

carousel.addEventListener('pointerup', pointerUpHandler);
carousel.addEventListener('pointercancel', pointerUpHandler);

// --- Start the carousel after images load ---
imagesLoaded().then(() => {
    updateCarouselSize();
    const activeFill = dots[currentIndex].querySelector('.fill');
    activeFill.style.width = '100%';
    startAutoSlide();
});
