document.addEventListener('DOMContentLoaded', () => {

    // 1. Detección de Scroll para Animación (Fade-In)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Aparece cuando el 20% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar una vez que ha aparecido
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 2. Smooth Scroll para la Navegación
    const navLinks = document.querySelectorAll('#header-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Si es un enlace a una sección interna
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calcula la posición teniendo en cuenta la altura del header fijo
                    const headerHeight = document.getElementById('header-nav').offsetHeight;
                    const elementPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});