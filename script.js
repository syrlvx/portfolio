const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

// --- 1. Event untuk Scroll-Spy (Highlight link aktif) ---
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
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

// --- 2. Event untuk Menutup Menu Saat Link di-Klik (KODE BARU) ---
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Cek jika menu sedang terbuka (punya class 'show')
        if (navItems && navItems.classList.contains('show')) {
            navItems.classList.remove('show');

            // Kembalikan ikon hamburger
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
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

// Animate progress bars on scroll (VERSI BARU YANG BENAR)
const skillsSectionForAnimation = document.getElementById('skills');
const allProgressBarsForAnimation = document.querySelectorAll('.progress');
let animationHasRun = false; // Flag agar animasi cuma jalan sekali

// Buat fungsi terpisah untuk mengecek
function runSkillAnimation() {
    // Jaga-jaga kalau elemen #skills tidak ketemu
    if (!skillsSectionForAnimation) return; 

    const triggerBottom = window.innerHeight * 0.8;
    const sectionTop = skillsSectionForAnimation.getBoundingClientRect().top;

    // Cek apakah bagian atas section 'skills' sudah masuk ke 80% layar
    // DAN apakah animasinya belum pernah berjalan
    if (sectionTop < triggerBottom && !animationHasRun) {
        
        allProgressBarsForAnimation.forEach(bar => {
            let targetWidth = '0%';
            // Pastikan nilai persen ini sudah benar
            if (bar.classList.contains('html-css')) targetWidth = '90%';
            else if (bar.classList.contains('javascript')) targetWidth = '80%';
            else if (bar.classList.contains('cpp')) targetWidth = '75%';
            else if (bar.classList.contains('python')) targetWidth = '85%';
            else if (bar.classList.contains('office')) targetWidth = '95%';
            else if (bar.classList.contains('uiux')) targetWidth = '70%';
            
            bar.style.width = targetWidth;
        });
        
        animationHasRun = true; // Tandai bahwa animasi sudah berjalan
    }
}

// Pasang event listener untuk scroll
window.addEventListener('scroll', runSkillAnimation);

// Jalankan juga saat halaman baru dimuat, 
// (siapa tahu section-nya sudah terlihat pas di-load)
document.addEventListener('DOMContentLoaded', runSkillAnimation);

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

// --- Hamburger Menu Toggle ---
const menuToggle = document.getElementById('mobile-menu-toggle');
const navItems = document.getElementById('nav-items-container');

if (menuToggle && navItems) {
    menuToggle.addEventListener('click', () => {
        // Tampilkan/sembunyikan menu
        navItems.classList.toggle('show');

        // Ganti ikon (hamburger <-> 'X')
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}