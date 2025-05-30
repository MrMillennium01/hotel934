document.addEventListener('DOMContentLoaded', () => {
    // Find all carousels
    document.querySelectorAll('.carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const images = carousel.querySelectorAll('.carousel-track img');
        const prevArrow = carousel.querySelector('.arrow.left');
        const nextArrow = carousel.querySelector('.arrow.right');
        let currentIndex = 0;

        function getVisibleCount() {
            const minImgWidth = 350;
            const gap = 10;
            const width = carousel.offsetWidth;
            return Math.min(images.length, Math.max(1, Math.floor((width + gap) / (minImgWidth + gap))));
        }

        function updateCarousel() {
            const visibleCount = getVisibleCount();
            if (currentIndex > images.length - visibleCount) {
                currentIndex = Math.max(0, images.length - visibleCount);
            }
            const gap = 10;
            const containerWidth = carousel.offsetWidth;
            const imgWidth = (containerWidth - gap * (visibleCount - 1)) / visibleCount;
            images.forEach(img => {
                img.style.width = imgWidth + 'px';
                img.style.minWidth = imgWidth + 'px';
                img.style.maxWidth = imgWidth + 'px';
            });
            const offset = (imgWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${offset}px)`;

            if (visibleCount >= images.length) {
                prevArrow.style.opacity = 0;
                nextArrow.style.opacity = 0;
            } else {
                prevArrow.style.opacity = currentIndex <= 0 ? 0 : 1;
                nextArrow.style.opacity = currentIndex >= images.length - visibleCount ? 0 : 1;
            }
        }

        function nextSlide() {
            const visibleCount = getVisibleCount();
            if (currentIndex < images.length - visibleCount) {
                currentIndex++;
                updateCarousel();
            }
        }

        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }

        prevArrow.addEventListener('click', prevSlide);
        nextArrow.addEventListener('click', nextSlide);
        window.addEventListener('resize', updateCarousel);

        updateCarousel();
    });
});
