// Mobile menu toggle functionality
const toggleButton = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.top-menu');

toggleButton.addEventListener('click', function () {
    // Toggle the active class on both the menu and the toggle button
    mobileMenu.classList.toggle('active');
    toggleButton.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const realSlides = Array.from(track.children);
        const prevArrow = carousel.querySelector('.arrow.left');
        const nextArrow = carousel.querySelector('.arrow.right');
        const gap = 10;

        let visibleCount = 1;
        let currentIndex;       // index INTO the _allSlides_ array

        let allSlides = [];

        function getVisibleCount() {
            const minImgWidth = 350;
            const width = carousel.offsetWidth;
            return Math.max(1, Math.floor((width + gap) / (minImgWidth + gap)));
        }

        function setupClones() {
            // clear out
            track.innerHTML = '';
            visibleCount = getVisibleCount();

            // clone last & first `visibleCount` slides
            const prepend = realSlides.slice(-visibleCount).map(slide => slide.cloneNode(true));
            const append = realSlides.slice(0, visibleCount).map(slide => slide.cloneNode(true));

            allSlides = [...prepend, ...realSlides, ...append];
            allSlides.forEach(slide => track.appendChild(slide));

            // start at the “first real slide”
            currentIndex = visibleCount;
        }

        function updateSizesAndPosition(transition = true) {
            visibleCount = getVisibleCount();
            const containerWidth = carousel.offsetWidth;
            const imgWidth = (containerWidth - gap * (visibleCount - 1)) / visibleCount;

            allSlides.forEach(slide => {
                slide.style.width = `${imgWidth}px`;
                slide.style.minWidth = `${imgWidth}px`;
                slide.style.maxWidth = `${imgWidth}px`;
            });

            if (!transition) track.style.transition = 'none';
            else track.style.transition = 'transform 0.5s ease-in-out';

            const offset = (imgWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${offset}px)`;
        }

        function moveTo(index) {
            currentIndex = index;
            updateSizesAndPosition(true);
        }

        function next() {
            moveTo(currentIndex + 1);
        }

        function prev() {
            moveTo(currentIndex - 1);
        }

        // When animation ends, check if we're in a clone region
        track.addEventListener('transitionend', () => {
            // If we've slid past the last real slide…
            if (currentIndex >= realSlides.length + visibleCount) {
                // …snap back to the first real slide
                currentIndex = visibleCount;
                updateSizesAndPosition(false);
            }
            // If we've slid before the first real slide…
            if (currentIndex < visibleCount) {
                // …snap to the last real slide
                currentIndex = realSlides.length + visibleCount - 1;
                updateSizesAndPosition(false);
            }
        });

        // Arrow handlers
        nextArrow.addEventListener('click', next);
        prevArrow.addEventListener('click', prev);

        // On resize, re-clone & re-position
        window.addEventListener('resize', () => {
            setupClones();
            updateSizesAndPosition(false);
        });

        // INITIALIZE
        setupClones();
        updateSizesAndPosition(false);
    });
});
