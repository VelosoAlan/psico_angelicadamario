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

// Initialize Swiper for Serviços
const servicosSwiper = new Swiper('.servicos-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    a11y: {
        prevSlideMessage: 'Slide anterior',
        nextSlideMessage: 'Próximo slide',
        paginationBulletMessage: 'Ir para o slide {{index}}',
    },
    on: {
        init: function() {
            // Ajustar altura dos slides após a inicialização
            this.update();
        },
        resize: function() {
            // Ajustar altura dos slides após redimensionamento
            this.update();
        }
    }
});

// Inicialização dos Sliders
const servicosSlider = new Swiper('.servicos-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
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
});

const beneficiosSlider = new Swiper('.beneficios-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
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

// Proteção contra spam
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Verificação de tempo mínimo de preenchimento (5 segundos)
        const startTime = parseInt(localStorage.getItem('formStartTime') || '0');
        const currentTime = Date.now();
        const timeSpent = (currentTime - startTime) / 1000;
        
        if (timeSpent < 5) {
            alert('Por favor, preencha o formulário com mais cuidado.');
            return;
        }
        
        // Verificação de campos ocultos (honeypot)
        const honeypot = form.querySelector('#website');
        if (honeypot && honeypot.value !== '') {
            return; // Bot detectado
        }
        
        // Verificação de padrões de spam
        const message = form.querySelector('textarea').value;
        if (message.includes('http://') || message.includes('https://') || 
            message.includes('www.') || message.includes('.com')) {
            alert('Por favor, não inclua links no seu mensagem.');
            return;
        }
        
        // Limite de caracteres
        if (message.length > 1000) {
            alert('A mensagem excede o limite de caracteres permitido.');
            return;
        }
        
        // Se passar por todas as verificações, envia o formulário
        form.submit();
    });
    
    // Armazena o tempo de início do preenchimento
    form.addEventListener('focus', function() {
        if (!localStorage.getItem('formStartTime')) {
            localStorage.setItem('formStartTime', Date.now().toString());
        }
    }, true);
}

// Adiciona campo honeypot ao formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        const honeypot = document.createElement('div');
        honeypot.style.display = 'none';
        honeypot.innerHTML = `
            <label for="website">Website</label>
            <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
        `;
        form.appendChild(honeypot);
    }
});

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

// WhatsApp Button
function updateWhatsAppMessage(button, message) {
    const whatsappNumber = '5511999999999'; // Substitua pelo seu número
    const encodedMessage = encodeURIComponent(message);
    button.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}
