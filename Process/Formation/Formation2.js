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

// Responsive menu (si tu utilises le bouton hamburger dans le CSS)
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
