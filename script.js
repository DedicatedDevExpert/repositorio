// ========================================
// PORTFÓLIO PESSOAL - CIENTISTA DE DADOS
// Funcionalidades JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Inicializar todas as funcionalidades
    initMobileMenu();
    initFormValidation();
    initPortfolioFilters();
    initSmoothScrolling();
    initCharacterCounter();
    initAnimations();
    updateActiveNavLink();
}

// ========================================
// MENU RESPONSIVO (HAMBÚRGUER)
// ========================================
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            // Toggle das classes para animar o menu
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Acessibilidade: atualizar aria-expanded
            const isExpanded = navMenu.classList.contains('active');
            mobileMenu.setAttribute('aria-expanded', isExpanded);
        });
        
        // Fechar menu ao clicar nos links (mobile)
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Fechar menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && 
                !mobileMenu.contains(event.target) && 
                navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// ========================================
// VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// ========================================
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const formSuccess = document.getElementById('form-success');
    
    // Validação em tempo real
    if (nameInput) {
        nameInput.addEventListener('blur', () => validateName());
        nameInput.addEventListener('input', () => clearError('name'));
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => validateEmail());
        emailInput.addEventListener('input', () => clearError('email'));
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', () => validateMessage());
        messageInput.addEventListener('input', () => clearError('message'));
    }
    
    // Submissão do formulário
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        handleFormSubmission();
    });
    
    // Funções de validação
    function validateName() {
        const name = nameInput.value.trim();
        const errorElement = document.getElementById('name-error');
        
        if (name.length < 2) {
            showError('name', 'Nome deve ter pelo menos 2 caracteres');
            return false;
        }
        
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
            showError('name', 'Nome deve conter apenas letras e espaços');
            return false;
        }
        
        clearError('name');
        return true;
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError('email', 'Email é obrigatório');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            showError('email', 'Por favor, insira um email válido');
            return false;
        }
        
        clearError('email');
        return true;
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (message.length < 10) {
            showError('message', 'Mensagem deve ter pelo menos 10 caracteres');
            return false;
        }
        
        if (message.length > 1000) {
            showError('message', 'Mensagem não pode exceder 1000 caracteres');
            return false;
        }
        
        clearError('message');
        return true;
    }
    
    function showError(fieldName, message) {
        const input = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (input) input.classList.add('error');
        if (errorElement) errorElement.textContent = message;
    }
    
    function clearError(fieldName) {
        const input = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (input) input.classList.remove('error');
        if (errorElement) errorElement.textContent = '';
    }
    
    function handleFormSubmission() {
        // Validar todos os campos
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            return;
        }
        
        // Simular envio com loading
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Simular delay de envio
        setTimeout(() => {
            // Reset do formulário
            contactForm.reset();
            
            // Mostrar mensagem de sucesso
            formSuccess.style.display = 'block';
            
            // Reset do botão
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            
            // Esconder mensagem de sucesso após 5 segundos
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
            
            // Scroll para o topo da mensagem de sucesso
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
        }, 2000);
    }
}

// ========================================
// CONTADOR DE CARACTERES DA MENSAGEM
// ========================================
function initCharacterCounter() {
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('char-count');
    
    if (messageInput && charCount) {
        messageInput.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = currentLength;
            
            // Mudar cor baseado no comprimento
            const counterContainer = charCount.parentElement;
            if (currentLength < 10) {
                counterContainer.style.color = 'var(--error-color)';
            } else if (currentLength > 900) {
                counterContainer.style.color = 'var(--warning-color)';
            } else {
                counterContainer.style.color = 'var(--text-light)';
            }
        });
    }
}

// ========================================
// FILTROS DO PORTFÓLIO
// ========================================
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Obter categoria do filtro
            const filterCategory = this.getAttribute('data-filter');
            
            // Filtrar projetos com animação
            projectCards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                
                // Delay escalonado para animação suave
                setTimeout(() => {
                    if (filterCategory === 'all' || cardCategory === filterCategory) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        // Animar entrada
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-20px)';
                        
                        // Esconder após animação
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }, index * 50);
            });
        });
    });
}

// ========================================
// ROLAGEM SUAVE
// ========================================
function initSmoothScrolling() {
    // Para links internos da mesma página
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll suave para botões de ação
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        if (button.getAttribute('href') && button.getAttribute('href').startsWith('#')) {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
}

// ========================================
// ANIMAÇÕES E INTERAÇÕES
// ========================================
function initAnimations() {
    // Animação de cards ao fazer hover
    const cards = document.querySelectorAll('.skill-card, .project-card, .cert-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animação das barras de idiomas ao entrar na viewport
    const languageBars = document.querySelectorAll('.language-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Reset e animar
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        });
    }, observerOptions);
    
    languageBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Animação de contagem para estatísticas (se houver)
    const statNumbers = document.querySelectorAll('[data-count]');
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.getAttribute('data-count'));
        
        const observerStat = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(stat, 0, finalValue, 2000);
                    observerStat.unobserve(entry.target);
                }
            });
        }, { threshold: 0.7 });
        
        observerStat.observe(stat);
    });
    
    // Scroll reveal para elementos
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.2 });
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }
}

// ========================================
// NAVEGAÇÃO ATIVA
// ========================================
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================

// Animação de contador numérico
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        
        element.textContent = current;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Debounce para otimizar performance em eventos que disparam muito
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle para scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========================================
// EVENTOS GLOBAIS
// ========================================

// Otimizar redimensionamento da janela
window.addEventListener('resize', debounce(() => {
    // Fechar menu mobile ao redimensionar para desktop
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
    }
}, 250));

// Header transparente/sólido baseado no scroll
window.addEventListener('scroll', throttle(() => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(12px)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    }
}, 100));

// ========================================
// ACESSIBILIDADE
// ========================================

// Navegação por teclado aprimorada
document.addEventListener('keydown', function(event) {
    // ESC para fechar menu mobile
    if (event.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
    }
    
    // Enter para submeter formulário quando botão tem foco
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.id === 'submit-btn') {
            const form = document.getElementById('contact-form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    }
});

// Melhorar foco visível para navegação por teclado
const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
);

focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

// ========================================
// CONSOLE DE DESENVOLVIMENTO
// ========================================

// Mensagem de boas-vindas para desenvolvedores
console.log(`
🚀 Portfólio Ana Silva - Cientista de Dados
📧 ana.silva@email.com
💼 Desenvolvido com HTML5, CSS3 e JavaScript puro
🎯 Site totalmente funcional e responsivo

Funcionalidades implementadas:
✅ Menu responsivo com hambúrguer
✅ Validação completa de formulário
✅ Filtros de portfólio com animações
✅ Rolagem suave
✅ Animações e interações
✅ Acessibilidade aprimorada
✅ Performance otimizada

Versão: 1.0.0
`);

// Detectar se está em modo de desenvolvimento
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    console.log('🔧 Modo de desenvolvimento ativo');
    
    // Adicionar informações de debug
    window.portfolioDebug = {
        version: '1.0.0',
        features: [
            'Mobile Menu',
            'Form Validation', 
            'Portfolio Filters',
            'Smooth Scrolling',
            'Animations',
            'Accessibility'
        ],
        performance: {
            loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
            domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
        }
    };
}