document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if(burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('active');
            
            // Burger Animation
            burger.classList.toggle('toggle');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            });
        });
    }

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15, // Trigger slightly earlier
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
            navbar.style.padding = "10px 0";
        } else {
            navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)";
            navbar.style.padding = "15px 0";
        }
    });

    // --- Form Handling ---
    const quoteForm = document.getElementById('quoteForm');
    if(quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = quoteForm.querySelector('button');
            const originalText = btn.innerText;

            // Change button state
            btn.innerText = 'Sending...';
            btn.style.opacity = '0.7';
            
            // Simulate network request
            setTimeout(() => {
                alert("Thanks! Your request has been received. We'll be in touch with a quote shortly.");
                quoteForm.reset();
                btn.innerText = originalText;
                btn.style.opacity = '1';
            }, 1500);
        });
    }
});
