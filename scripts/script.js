// Hamburger menu all pages
document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('nav > ul').classList.toggle('open');
});

document.querySelectorAll('nav > ul > li > a').forEach(function(link) {
    link.addEventListener('click', function() {
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('nav > ul').classList.remove('open');
    });
});

// Verify help page
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        var headerHeight = window.innerWidth > 768 ? 140 : 165;
        var targetPosition = section.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Carousel
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].style.transform = "translateX(-100%)";
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.transform = "translateX(0)";
    }

    setInterval(nextSlide, 5000); // Change slide every 5 seconds
});