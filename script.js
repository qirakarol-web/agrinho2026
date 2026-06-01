// ==========================================
// 1. MENU HAMBÚRGUER (RESPONSIVIDADE)
// ==========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        // Alterna as classes de ativação
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('open');
        
        // Melhora a acessibilidade indicando se o menu está aberto
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Fecha o menu automaticamente ao clicar em qualquer link (útil para mobile)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ==========================================
// 2. LINK ATIVO CONFORME O SCROLL
// ==========================================
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Verifica se o scroll está na altura da seção atual (com margem de 150px)
        if (window.scrollY >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// 3. ANIMAÇÃO AO DESLIZAR (REVEAL ON SCROLL)
// ==========================================
// Aplica um efeito de "fade-in" nos elementos quando eles aparecem no ecrã
const revealElements = document.querySelectorAll('.card, .about-text, .about-image, .contact-box');

const options = {
    threshold: 0.15, // Percentagem do elemento visível para ativar
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target); // Para a animação correr apenas uma vez
        }
    });
}, options);

revealElements.forEach(element => {
    // Adiciona a classe inicial de animação via JS (evita problemas se o JS falhar)
    element.classList.add('reveal-hidden');
    observer.observe(element);
});

// ==========================================
// 4. VALIDAÇÃO DO FORMULÁRIO DE CONTACTO
// ==========================================
const contactForm = document.querySelector('#sustainability-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        // Captura os dados dos inputs
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const message = document.querySelector('#message').value.trim();

        // Validação simples
        if (name === '' || email === '' || message === '') {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Simulação de envio bem-sucedido
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = 'A enviar...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert(`Obrigado pelo teu contacto, ${name}! Juntos fazemos a diferença. 🌱`);
            
            // Reseta o formulário
            contactForm.reset();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}
