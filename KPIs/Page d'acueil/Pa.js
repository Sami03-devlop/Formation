// rh-importance.js

// Valeurs RH (Juillet 2025)
const integJours = 9;       // Temps d’intégration moyen
const turnoverPct = 2.8;    // %
const satInternePct = 79;   // %
const satStagPct = 86;      // %

const fmtPct = v => `${v}%`;
const setText = (id, txt) => { const el = document.getElementById(id); if(el) el.textContent = txt; };

// Compteurs animés
function animateCount(elId, target, suffix='', duration=900){
  const el = document.getElementById(elId);
  if(!el) return;
  const start = 0;
  const startTime = performance.now();
  function step(t){
    const p = Math.min((t - startTime)/duration, 1);
    const val = (start + (target - start) * p);
    el.textContent = suffix === '%' ? `${val.toFixed(0)}%` : suffix === ' j' ? `${val.toFixed(0)} j` : val.toFixed(0);
    if(p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Injecte valeurs + animation
animateCount('kpi-integration', integJours, ' j', 1000);
animateCount('kpi-turnover', turnoverPct, '%', 1000);
animateCount('kpi-sat-interne', satInternePct, '%', 1000);
animateCount('kpi-sat-stag', satStagPct, '%', 1000);

// Charts
const ORANGE = '#c75c1e', MARRON = '#7c3b12', BEIGE = '#f7e6d4';

const pieCtx = document.getElementById('rhSatisfPie');
if(pieCtx){
  new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: ['Satisfaction interne', 'Satisfaction stagiaires'],
      datasets: [{
        data: [satInternePct, satStagPct],
        backgroundColor: [MARRON, ORANGE],
        borderColor: '#ffffff',
        borderWidth: 2
      }]
    },
    options: { plugins: { legend: { position: 'bottom' } } }
  });
}

const barCtx = document.getElementById('rhTurnoverBar');
if(barCtx){
  new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Production','Maintenance','Logistique','QHSE','Magasin'],
      datasets: [{
        label: 'Turnover (%)',
        data: [3.1, 2.2, 2.9, 1.8, 2.4],
        backgroundColor: ORANGE,
        borderColor: MARRON,
        borderWidth: 1
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, max: 5, grid: { color: '#c75c1e30' } },
        x: { grid: { display: false } }
      }
    }
  });
}

// Apparition au scroll (joue les animations CSS existantes)
const observed = document.querySelectorAll('.fadeIn, .slideUp, .domain-card');
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.animationPlayState = 'running';
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
},{ threshold: 0.15 });
observed.forEach(el=>io.observe(el));

// Micro-interactions sur les cartes de service
const cards = document.querySelectorAll('#services-grid .domain-card');
cards.forEach(card=>{
  card.addEventListener('mouseenter', ()=> {
    card.style.transform = 'translateY(-10px) scale(1.03)';
    card.style.boxShadow = '0 16px 44px #c75c1e40';
  });
  card.addEventListener('mouseleave', ()=> {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
  card.addEventListener('click', ()=> {
    card.style.transform = 'translateY(-4px) scale(0.99)';
    setTimeout(()=> card.style.transform = '', 140);
  });
});
