/**
 * Main JavaScript - Peek Projects Website
 * Handles content loading, GSAP animations, and interactions
 */

// Global state
let contentData = null;
let heroSceneCleanup = null;

// Icon mapping for services
const serviceIcons = {
    'Web & App Development': 'assets/icons/code.svg',
    'AI Integrations & Automation': 'assets/icons/ai.svg',
    'Data & System Architecture': 'assets/icons/database.svg',
    'Business Discovery & Consulting': 'assets/icons/compass.svg',
    'UX Prototyping & Product Design': 'assets/icons/layout.svg'
};

/**
 * Load content from JSON
 */
async function loadContent() {
    try {
        const response = await fetch('content/content.json');
        contentData = await response.json();
        populateContent();
    } catch (error) {
        console.error('Error loading content:', error);
        // Fallback content
        contentData = {
            hero: {
                headline: "Where Engineering Meets Understanding.",
                subtext: "Peek Projects helps businesses translate vision into intelligent, data-driven solutions.",
                cta: { text: "Get Started", target: "#contact" }
            }
        };
        populateContent();
    }
}

/**
 * Populate HTML with content from JSON
 */
function populateContent() {
    // Hero content
    if (contentData.hero) {
        const headline = document.getElementById('hero-headline');
        const subtext = document.getElementById('hero-subtext');
        const cta = document.getElementById('hero-cta');
        
        if (headline) headline.textContent = contentData.hero.headline;
        if (subtext) subtext.textContent = contentData.hero.subtext;
        if (cta) cta.textContent = contentData.hero.cta.text;
    }

    // About content
    if (contentData.about) {
        const aboutTitle = document.getElementById('about-title');
        const aboutText = document.getElementById('about-text');
        const aboutTagline = document.getElementById('about-tagline');
        
        if (aboutTitle) aboutTitle.textContent = contentData.about.title;
        
        if (aboutText && contentData.about.paragraphs) {
            aboutText.innerHTML = contentData.about.paragraphs
                .map(p => `<p>${p}</p>`)
                .join('');
        }
        
        if (aboutTagline) aboutTagline.textContent = contentData.about.tagline;
    }

    // Services
    if (contentData.services) {
        const servicesGrid = document.getElementById('services-grid');
        if (servicesGrid) {
            servicesGrid.innerHTML = contentData.services.map(service => `
                <div class="service-card">
                    <img src="${serviceIcons[service.title] || 'assets/icons/code.svg'}" 
                         alt="" 
                         class="service-icon" 
                         aria-hidden="true">
                    <h3>${service.title}</h3>
                    <p class="service-summary">${service.summary}</p>
                    <ul class="service-bullets">
                        ${service.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                    </ul>
                </div>
            `).join('');
        }
    }

    // Projects
    if (contentData.projects) {
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = contentData.projects.map(project => `
                <div class="project-card">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            `).join('');
        }
    }

    // Process
    if (contentData.process) {
        const processTimeline = document.getElementById('process-timeline');
        if (processTimeline) {
            processTimeline.innerHTML = contentData.process.map(step => `
                <div class="process-step">
                    <div class="process-number">${step.step}</div>
                    <h3>${step.title}</h3>
                    <p>${step.description}</p>
                </div>
            `).join('');
        }
    }

    // Contact
    if (contentData.contact) {
        const contactTitle = document.getElementById('contact-title');
        const contactEmail = document.getElementById('contact-email');
        const socialLinks = document.getElementById('social-links');
        
        if (contactTitle) contactTitle.textContent = contentData.contact.title;
        if (contactEmail) {
            contactEmail.textContent = contentData.contact.email;
            contactEmail.href = `mailto:${contentData.contact.email}`;
        }
        
        if (socialLinks && contentData.contact.social) {
            socialLinks.innerHTML = Object.entries(contentData.contact.social)
                .map(([platform, url]) => `
                    <a href="${url}" 
                       class="social-link" 
                       target="_blank" 
                       rel="noopener noreferrer">
                        ${platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                `).join('');
        }
    }

    // Footer
    if (contentData.footer) {
        const footerTagline = document.getElementById('footer-tagline');
        if (footerTagline) footerTagline.textContent = contentData.footer.tagline;
    }

    // Current year
    const currentYear = document.getElementById('current-year');
    if (currentYear) currentYear.textContent = new Date().getFullYear();

    // Initialize animations after content is loaded
    initAnimations();
}

/**
 * Initialize GSAP animations
 */
function initAnimations() {
    // Check for GSAP
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded');
        // Fallback to CSS animations
        document.querySelectorAll('.hero-headline, .hero-subtext, .hero-cta').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        return;
    }

    // Hero entrance animation
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power1.inOut' } });
    
    heroTimeline
        .to('.hero-headline', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.5
        })
        .to('.hero-subtext', {
            opacity: 1,
            y: 0,
            duration: 1.2
        }, '-=0.8')
        .to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 1.2
        }, '-=0.8');

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power1.out'
                });
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .project-card, .process-step'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    // Parallax scroll effect on hero (if motion not reduced)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroContent = document.querySelector('.hero-content');
            
            if (heroContent && scrollY < window.innerHeight) {
                gsap.to(heroContent, {
                    y: scrollY * 0.5,
                    opacity: 1 - (scrollY / window.innerHeight) * 0.8,
                    duration: 0.3
                });
            }
        });
    }
}

/**
 * Initialize 3D hero scene (lazy loaded)
 */
async function init3DScene() {
    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
        console.log('WebGL not supported, using fallback image');
        showFallbackHero();
        return;
    }

    // Check for reduced motion or disable flag
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const disable3D = document.body.hasAttribute('data-disable-3d');
    
    if (prefersReducedMotion || disable3D) {
        showFallbackHero();
        return;
    }

    try {
        // Dynamic import of hero scene
        const { initHeroScene } = await import('./heroScene.js');
        heroSceneCleanup = initHeroScene();
        
        if (heroSceneCleanup) {
            // Hide fallback if 3D loaded successfully
            const fallback = document.getElementById('hero-fallback');
            if (fallback) fallback.style.display = 'none';
        } else {
            showFallbackHero();
        }
    } catch (error) {
        console.error('Error loading 3D scene:', error);
        showFallbackHero();
    }
}

/**
 * Show fallback hero image
 */
function showFallbackHero() {
    const fallback = document.getElementById('hero-fallback');
    const container = document.getElementById('hero-3d-container');
    
    if (fallback) fallback.style.display = 'block';
    if (container) container.style.display = 'none';
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('active');
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('active');
        });
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Header scroll behavior
 */
function initHeaderScroll() {
    let lastScroll = 0;
    const header = document.querySelector('.site-header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('hidden');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.classList.add('hidden');
        } else {
            // Scrolling up
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Contact form handling
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Create mailto link with form data
        const subject = encodeURIComponent('Contact from Peek Projects Website');
        const body = encodeURIComponent(
            `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
        );
        
        window.location.href = `mailto:hello@peek.consulting?subject=${subject}&body=${body}`;
        
        // Reset form
        form.reset();
        
        // Show confirmation
        alert('Thank you for your message! Your email client will open to send the message.');
    });
}

/**
 * Initialize everything when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Load content first
    loadContent();
    
    // Initialize UI components
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initContactForm();
    
    // Load 3D scene after a short delay (for better LCP)
    setTimeout(() => {
        init3DScene();
    }, 100);
});

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', () => {
    if (heroSceneCleanup) {
        heroSceneCleanup();
    }
});
