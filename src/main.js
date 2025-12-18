// Hero Slider Functionality
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.setupSlider();
        this.setupControls();
        this.startAutoSlide();
    }

    setupSlider() {
        // Initialize first slide as active
        if (this.slides.length > 0) {
            this.slides[0].classList.add('active');
        }
    }

    setupControls() {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
    }

    nextSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }

    prevSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.slides[this.currentSlide].classList.add('active');
    }

    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoSlide() {
        clearInterval(this.slideInterval);
    }
}

// Mobile Navigation
class MobileNav {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.setupMobileNav();
    }

    setupMobileNav() {
        // Verificar que los elementos existen
        if (!this.hamburger || !this.navMenu) {
            console.error('No se encontró el hamburger o nav-menu');
            return;
        }

        // Evento click en el hamburger
        this.hamburger.addEventListener('click', () => {
            console.log('Click en hamburger detectado');
            this.toggleMobileMenu();
        });

        // Cerrar menú al hacer click en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Tab Functionality
class TabManager {
    constructor() {
        this.setupTreatmentTabs();
        this.setupRehabTabs();
    }

    setupTreatmentTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                // Show corresponding panel
                const targetPanel = document.getElementById(targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    setupRehabTabs() {
        const rehabTabButtons = document.querySelectorAll('.rehab-tab-btn');
        const rehabTabPanels = document.querySelectorAll('.rehab-tab-panel');

        rehabTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // Remove active class from all buttons and panels
                rehabTabButtons.forEach(btn => btn.classList.remove('active'));
                rehabTabPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                // Show corresponding panel
                const targetPanel = document.getElementById(targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
}

// Smooth Scrolling for Anchor Links
class SmoothScroll {
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                // Solo procesar enlaces internos (#)
                if (href === '#' || href.startsWith('#!')) return;
                
                e.preventDefault();
                const targetId = href.substring(1);
                
                if (!targetId) return;
                
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.observeElements();
    }

    observeElements() {
        const elementsToAnimate = document.querySelectorAll('.specialty-card, .exam-card, .section-header');
        elementsToAnimate.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Header Scroll Effect
class HeaderScrollEffect {
    constructor() {
        this.header = document.querySelector('.header');
        this.setupScrollEffect();
    }

    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            if (this.header) {
                if (window.scrollY > 100) {
                    this.header.classList.add('scrolled');
                } else {
                    this.header.classList.remove('scrolled');
                }
            }
        });
    }
}

// WhatsApp Button Animation
class WhatsAppButton {
    constructor() {
        this.whatsappBtn = document.querySelector('.whatsapp-btn');
        this.setupAnimation();
    }

    setupAnimation() {
        if (this.whatsappBtn) {
            // Add pulse animation on page load
            setTimeout(() => {
                if (this.whatsappBtn) {
                    this.whatsappBtn.classList.add('pulse');
                }
            }, 3000);

            // Remove pulse animation on click
            this.whatsappBtn.addEventListener('click', () => {
                if (this.whatsappBtn) {
                    this.whatsappBtn.classList.remove('pulse');
                }
            });
        }
    }
}

// Lazy Loading for Images
class LazyImageLoader {
    constructor() {
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    this.imageObserver.unobserve(img);
                }
            });
        });

        this.setupLazyLoading();
    }

    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.classList.add('loaded');
        }
    }
}

// Form Validation (if any forms exist)
class FormValidator {
    constructor() {
        this.setupFormValidation();
    }

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, 'Este campo es requerido');
                isValid = false;
            } else {
                this.clearError(input);
            }
        });

        return isValid;
    }

    showError(input, message) {
        input.classList.add('error');
        let errorElement = input.parentNode?.querySelector('.error-message');

        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            input.parentNode?.appendChild(errorElement);
        }

        errorElement.textContent = message;
    }

    clearError(input) {
        input.classList.remove('error');
        const errorElement = input.parentNode?.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new HeroSlider();
    new MobileNav();
    new TabManager();
    new SmoothScroll();
    new AnimationObserver();
    new HeaderScrollEffect();
    new WhatsAppButton();
    new LazyImageLoader();
    new FormValidator();

    // Add loading class removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);

    // Console log for debugging
    console.log('MediFis website loaded successfully!');
});

// Handle page visibility change (pause slider when page is hidden)
document.addEventListener('visibilitychange', () => {
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        if (document.hidden) {
            // Pause animations when page is hidden
            heroSlider.style.animationPlayState = 'paused';
        } else {
            // Resume animations when page is visible
            heroSlider.style.animationPlayState = 'running';
        }
    }
});