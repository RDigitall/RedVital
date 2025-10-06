// Hero Slider Functionality
class HeroSlider {
    private slides: NodeListOf<Element>;
    private currentSlide = 0;
    private slideInterval!: number;

    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.setupSlider();
        this.setupControls();
        this.startAutoSlide();
    }

    setupSlider(): void {
        // Initialize first slide as active
        if (this.slides.length > 0) {
            this.slides[0].classList.add('active');
        }
    }

    setupControls(): void {
        const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
        const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
    }

    nextSlide(): void {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
    }

    prevSlide(): void {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        this.slides[this.currentSlide].classList.add('active');
    }

    startAutoSlide(): void {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoSlide(): void {
        clearInterval(this.slideInterval);
    }
}

// Mobile Navigation
class MobileNav {
    private hamburger: HTMLElement | null;
    private navMenu: HTMLElement | null;

    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.setupMobileNav();
    }

    setupMobileNav(): void {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking on nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
        }
    }

    toggleMobileMenu(): void {
        if (this.navMenu && this.hamburger) {
            this.navMenu.classList.toggle('active');
            this.hamburger.classList.toggle('active');
        }
    }

    closeMobileMenu(): void {
        if (this.navMenu && this.hamburger) {
            this.navMenu.classList.remove('active');
            this.hamburger.classList.remove('active');
        }
    }
}

// Tab Functionality
class TabManager {
    constructor() {
        this.setupTreatmentTabs();
        this.setupRehabTabs();
    }

    setupTreatmentTabs(): void {
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
                const targetPanel = document.getElementById(targetTab!);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    setupRehabTabs(): void {
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
                const targetPanel = document.getElementById(targetTab!);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
}

// Smooth Scrolling for Anchor Links
class SmoothScroll {
    constructor() {
        this.setupSmoothScrolling();
    }

    setupSmoothScrolling(): void {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href')?.substring(1);
                const targetElement = document.getElementById(targetId!);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    private observer: IntersectionObserver;

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

    observeElements(): void {
        const elementsToAnimate = document.querySelectorAll('.specialty-card, .exam-card, .section-header');
        elementsToAnimate.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Header Scroll Effect
class HeaderScrollEffect {
    private header: HTMLElement | null;

    constructor() {
        this.header = document.querySelector('.header');
        this.setupScrollEffect();
    }

    setupScrollEffect(): void {
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
    private whatsappBtn: HTMLElement | null;

    constructor() {
        this.whatsappBtn = document.querySelector('.whatsapp-btn');
        this.setupAnimation();
    }

    setupAnimation(): void {
        if (this.whatsappBtn) {
            // Add pulse animation on page load
            setTimeout(() => {
                this.whatsappBtn?.classList.add('pulse');
            }, 3000);

            // Remove pulse animation on click
            this.whatsappBtn.addEventListener('click', () => {
                this.whatsappBtn?.classList.remove('pulse');
            });
        }
    }
}

// Lazy Loading for Images
class LazyImageLoader {
    private imageObserver: IntersectionObserver;

    constructor() {
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    this.loadImage(img);
                    this.imageObserver.unobserve(img);
                }
            });
        });

        this.setupLazyLoading();
    }

    setupLazyLoading(): void {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    loadImage(img: HTMLImageElement): void {
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

    setupFormValidation(): void {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form as HTMLFormElement)) {
                    e.preventDefault();
                }
            });
        });
    }

    validateForm(form: HTMLFormElement): boolean {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            const inputElement = input as HTMLInputElement | HTMLTextAreaElement;
            if (!inputElement.value.trim()) {
                this.showError(inputElement, 'Este campo es requerido');
                isValid = false;
            } else {
                this.clearError(inputElement);
            }
        });

        return isValid;
    }

    showError(input: HTMLInputElement | HTMLTextAreaElement, message: string): void {
        input.classList.add('error');
        let errorElement = input.parentNode?.querySelector('.error-message') as HTMLElement;

        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            input.parentNode?.appendChild(errorElement);
        }

        errorElement.textContent = message;
    }

    clearError(input: HTMLInputElement | HTMLTextAreaElement): void {
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
    const heroSlider = document.querySelector('.hero-slider') as HTMLElement;
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

// Export for module usage
export {
    HeroSlider,
    MobileNav,
    TabManager,
    SmoothScroll,
    AnimationObserver,
    HeaderScrollEffect,
    WhatsAppButton,
    LazyImageLoader,
    FormValidator
};
