let slideIndex = 0;
let slides;
let currentSlide;
let nextSlide;
showSlides();

function showSlides() {
    slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].style.transform = "translateX(100%)";
    }
    slideIndex++;
    if (slideIndex > slides.length) { 
        slideIndex = 1; 
    }
    if (currentSlide) {
        currentSlide.style.transform = "translateX(-100%)";
    }
    nextSlide = slides[slideIndex-1];
    nextSlide.style.display = "block";
    nextSlide.style.transform = "translateX(0)";
    currentSlide = nextSlide;
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}
