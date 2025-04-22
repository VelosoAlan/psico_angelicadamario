// Initialize Swiper
const swiper = new Swiper('.depoimentos-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const nav = document.querySelector('nav');
    const menuItems = document.querySelectorAll('nav ul li a');

    // Toggle menu
    menuToggle.addEventListener('click', function() {
        nav.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', function() {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on menu items
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Keyboard navigation
    menuItems.forEach(item => {
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = form.querySelector('[name="name"]').value;
        const email = form.querySelector('[name="email"]').value;
        const message = form.querySelector('[name="message"]').value;
        
        if (!name || !email || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }
        
        // Here you would typically send the form data to your server
        console.log('Form submitted:', { name, email, message });
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
    });
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    // Remove lazy loading for critical images
    const criticalImages = document.querySelectorAll('.logo img, .hero-image img, .sobre-image img');
    criticalImages.forEach(img => {
        img.classList.add('loaded');
    });

    // Apply lazy loading only to non-critical images
    const lazyImages = document.querySelectorAll('.beneficio-icon img, .servico-icon img, .social-links img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        if (img.src) {
            imageObserver.observe(img);
        }
    });
});

// Swiper initialization
if (typeof Swiper !== 'undefined') {
    new Swiper('.depoimentos-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
        a11y: {
            prevSlideMessage: 'Slide anterior',
            nextSlideMessage: 'Próximo slide',
            paginationBulletMessage: 'Ir para o slide {{index}}',
        },
    });
}

// Add loading state to buttons
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('loading')) return;
        
        this.classList.add('loading');
        this.setAttribute('aria-busy', 'true');
        
        // Simulate loading state
        setTimeout(() => {
            this.classList.remove('loading');
            this.setAttribute('aria-busy', 'false');
        }, 1000);
    });
});

// Add skip link for keyboard users
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.className = 'skip-link visually-hidden';
skipLink.textContent = 'Pular para o conteúdo principal';
document.body.insertBefore(skipLink, document.body.firstChild);

// Handle skip link focus
skipLink.addEventListener('focus', function() {
    this.classList.remove('visually-hidden');
});

skipLink.addEventListener('blur', function() {
    this.classList.add('visually-hidden');
});

// Add keyboard navigation for cards
document.querySelectorAll('.beneficio-card, .servico-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Add loading state for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
    
    img.addEventListener('error', function() {
        this.classList.add('error');
        this.alt = 'Erro ao carregar imagem';
    });
});

// Add scroll to top button
const scrollButton = document.createElement('button');
scrollButton.className = 'scroll-top';
scrollButton.innerHTML = '↑';
scrollButton.setAttribute('aria-label', 'Voltar ao topo');
document.body.appendChild(scrollButton);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

scrollButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS for scroll button
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--roxo);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    }
    
    .scroll-top.visible {
        display: block;
        opacity: 1;
    }
    
    .scroll-top:hover {
        background: var(--roxo-escuro);
    }
    
    .loading {
        position: relative;
        pointer-events: none;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        margin: -10px 0 0 -10px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .skip-link {
        position: absolute;
        top: -80px;
        left: 0;
        background: var(--roxo);
        color: white;
        padding: 8px;
        z-index: 100;
    }
    
    .skip-link:focus {
        top: 0;
    }
    
    img {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    img.error {
        opacity: 0.5;
    }
    
    .logo img {
        opacity: 1;
    }
    
    .hero-image img {
        opacity: 1;
    }
    
    .sobre-image img {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Personalização de mensagens do WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    // Função para atualizar a mensagem do WhatsApp
    function updateWhatsAppMessage(button, message) {
        const whatsappNumber = '5519998913629';
        const encodedMessage = encodeURIComponent(message);
        button.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    }

    // Personalizar mensagens com base em interações do usuário
    const serviceButtons = document.querySelectorAll('.servico-card .button-outline');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Não prevenir o comportamento padrão, apenas registrar a interação
            const serviceType = this.closest('.servico-card').querySelector('h3').textContent;
            
            // Armazenar a preferência do usuário
            localStorage.setItem('preferredService', serviceType);
            
            // Atualizar a mensagem do botão flutuante do WhatsApp
            const floatingButton = document.querySelector('.whatsapp-button');
            if (floatingButton) {
                updateWhatsAppMessage(
                    floatingButton, 
                    `Olá Angélica, tenho interesse na ${serviceType}. Vi seu site e gostaria de saber mais sobre como funciona.`
                );
            }
        });
    });

    // Personalizar mensagem com base na seção visualizada
    const sections = document.querySelectorAll('section[id]');
    const floatingButton = document.querySelector('.whatsapp-button');
    
    if (floatingButton) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const preferredService = localStorage.getItem('preferredService');
                    
                    let message = 'Olá Angélica, gostaria de conversar sobre terapia.';
                    
                    if (sectionId === 'beneficios') {
                        message = 'Olá Angélica, vi os benefícios da terapia no seu site e gostaria de saber mais.';
                    } else if (sectionId === 'servicos' && preferredService) {
                        message = `Olá Angélica, tenho interesse na ${preferredService}. Poderia me informar mais?`;
                    }
                    
                    updateWhatsAppMessage(floatingButton, message);
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
});
