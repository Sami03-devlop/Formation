// Animation au scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('[class*="fade"], [class*="slide"]');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.animationPlayState = 'running';
        }
    });
}

// Gestion du scroll pour header
function handleScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'c75c1e(146, 152, 159, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#919191bf';
        header.style.backdropFilter = 'none';
    }
}

// Modal pour pages en développement
function showModal(event) {
    event.preventDefault();
    document.getElementById('developmentModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('developmentModal').style.display = 'none';
}

// Scroll vers section
function scrollToSection(event, sectionId) {
    event.preventDefault();

    // Mettre à jour les liens actifs
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');

    // Afficher les sections existantes
    const currentSection = document.getElementById(sectionId);
    if (currentSection) {
        currentSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Effet parallaxe pour la section hero
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Gestion des animations au survol des cartes
function initHoverEffects() {
    const cards = document.querySelectorAll('.mission-card, .objective-card, .domain-card, .info-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}

// Animation des compteurs (si nécessaire pour les KPIs futurs)
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// Gestion responsive du menu mobile
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('nav');

    if (window.innerWidth <= 768) {
        // Créer un bouton hamburger si nécessaire
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileBtn = document.createElement('button');
            mobileBtn.className = 'mobile-menu-btn';
            mobileBtn.innerHTML = '☰';
            mobileBtn.style.cssText = `
                display: block;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
            `;

            mobileBtn.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });

            nav.appendChild(mobileBtn);
        }
    } else {
        // Remove mobile menu button if exists on resize
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        if (mobileBtn) {
            mobileBtn.remove();
        }
        navLinks.style.display = 'flex';
    }
}

// Lazy loading des images
function initLazyLoading() {
    const images = document.querySelectorAll('[style*="background"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Démarrer les animations
    animateOnScroll();
    initHoverEffects();
    initMobileMenu();
    initLazyLoading();

    // Masquer le modal au clic en dehors
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('developmentModal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Animation de typing pour la citation
    const quote = document.querySelector('.hero-quote');
    const text = quote.textContent;
    quote.textContent = '';
    let i = 0;

    setTimeout(() => {
        const typeInterval = setInterval(() => {
            quote.textContent += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(typeInterval);
            }
        }, 50);
    }, 1000);
});

// Event listeners
window.addEventListener('scroll', () => {
    handleScroll();
    animateOnScroll();
    parallaxEffect();
});

window.addEventListener('resize', initMobileMenu);

// Smooth scroll pour tous les liens internes
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

// Préloader pour une meilleure expérience utilisateur
window.addEventListener('load', function() {
    document.body.style.opacity = '1';

    // Démarrer les animations avec délai
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }, 100);
});
function openModal() {
    document.getElementById("samiModal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("samiModal").style.display = "none";
  }

  // Fermer la modale si on clique en dehors
  window.onclick = function(event) {
    const modal = document.getElementById("samiModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
  <script>
document.querySelectorAll('.sub-menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  });
});