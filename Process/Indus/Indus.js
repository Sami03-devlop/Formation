// Animation au scroll
function animateOnScroll() {
    document.querySelectorAll('.fade-in').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
            el.style.animationPlayState = 'running';
        }
    });
    document.querySelectorAll('.animated-img').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
            el.style.animationPlayState = 'running';
        }
    });
}

// Responsive menu
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('nav');
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.innerHTML = '☰';
            mobileBtn.style.cssText = `
                display: block;
                background: none;
                border: none;
                color: #c75c1e;
                font-size: 1.5rem;
                cursor: pointer;
            `;
            mobileBtn.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
            nav.appendChild(mobileBtn);
        }
    } else {
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        if (mobileBtn) mobileBtn.remove();
        navLinks.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '1';
    animateOnScroll();
    initMobileMenu();
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('resize', initMobileMenu);
document.addEventListener('DOMContentLoaded', function() {
    // ... (ton code existant)

    // Zoom interactif image schéma
    document.querySelectorAll('.schema-img').forEach(function(img) {
        img.addEventListener('click', function() {
            img.classList.toggle('zoomed');
        });
        // Pour mobile : pinch-to-zoom non natif, mais zoom au tap
        img.addEventListener('touchend', function(e) {
            e.preventDefault();
            img.classList.toggle('zoomed');
        });
    });
});