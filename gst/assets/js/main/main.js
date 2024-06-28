
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide-wrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let autoplayInterval;
    let isAutoplaying = false;

    function changeSlide(index) {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentIndex = index;
    }

    function startAutoplay() {
        if (!isAutoplaying) {
            isAutoplaying = true;
            autoplayInterval = setInterval(() => {
                changeSlide(currentIndex + 1);
            }, 800000);   //8000
        }
    }

    function stopAutoplay() {
        isAutoplaying = false;
        clearInterval(autoplayInterval);
    }

    function goToPrevSlide() {
        changeSlide(currentIndex - 1);
        stopAutoplay();
        startAutoplay();
    }

    function goToNextSlide() {
        changeSlide(currentIndex + 1);
        stopAutoplay();
        startAutoplay();
    }

    function initializeSlideshow() {
        slides.forEach((slide) => {
            slide.addEventListener('mouseenter', function () {
                stopAutoplay();
            });

            slide.addEventListener('mouseleave', function () {
                startAutoplay();
            });

            slide.querySelectorAll('input, textarea, select').forEach(input => {
                input.addEventListener('focus', function () {
                    stopAutoplay();
                });
            });
        });

        prevBtn.addEventListener('click', function () {
            goToPrevSlide();
        });
        nextBtn.addEventListener('click', function () {
            goToNextSlide();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                goToPrevSlide();
            } else if (event.key === 'ArrowRight') {
                goToNextSlide();
            }
        });

        changeSlide(0);
        startAutoplay();
    }

    initializeSlideshow();
});
