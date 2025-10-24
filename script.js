const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // offset biar pas di bawah navbar
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Accordion for education
const accordionButtons = document.querySelectorAll('.accordion-item button');
accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

// Light/Dark mode toggle
const toggleTheme = document.querySelector('.toggle-theme');
if (toggleTheme) {
    toggleTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = toggleTheme.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-sun');
            icon.classList.toggle('fa-moon');
        }
    });
}

// Animate progress bars on scroll
const progressBars = document.querySelectorAll('.progress');
window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight * 0.8;
    progressBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        if(barTop < triggerBottom){
            bar.style.width = bar.classList.contains('html-css') ? '85%' :
                              bar.classList.contains('javascript') ? '75%' :
                              bar.classList.contains('cpp') ? '65%' :
                              bar.classList.contains('python') ? '60%' :
                              bar.classList.contains('office') ? '90%' :
                              bar.classList.contains('uiux') ? '70%' : '0';
        }
    });
});

// Carousel
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".carousel-slide img");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");

    if (!images || images.length === 0) return;

    let counter = 0;
    const totalImages = images.length;

    function showSlide(index) {
        images.forEach((img, i) => {
            img.classList.toggle("active", i === index);
        });
    }

    let autoSlide = setInterval(() => {
        counter = (counter + 1) % totalImages;
        showSlide(counter);
    }, 4000);

    const carousel = document.querySelector(".volunteer-carousel");
    if (carousel) {
        carousel.addEventListener("mouseenter", () => clearInterval(autoSlide));
        carousel.addEventListener("mouseleave", () => {
            autoSlide = setInterval(() => {
                counter = (counter + 1) % totalImages;
                showSlide(counter);
            }, 4000);
        });
    }

    if (next) {
        next.addEventListener("click", () => {
            counter = (counter + 1) % totalImages;
            showSlide(counter);
        });
    }

    if (prev) {
        prev.addEventListener("click", () => {
            counter = (counter - 1 + totalImages) % totalImages;
            showSlide(counter);
        });
    }

    showSlide(counter);
});

