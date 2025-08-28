// Données Juillet 2025 (réalistes)
const mttrH = 32.2; // heures
const dispoPct = 98.6; // %
const correctivesPct = 100; // % // Polyvalence des équipes
const polyvalence = { A: 5.5, B: 3.6, C: 6.6, D: 6.6 };
const numMastery = 68; // %

document.getElementById('mttr-val').textContent = `${mttrH.toFixed(1)} min`;
document.getElementById('dispo-val').textContent = `${dispoPct}%`;
document.getElementById('corr-val').textContent = `${correctivesPct}%`;
document.getElementById('poly-val').textContent = `A ${polyvalence.A.toFixed(1)} • B ${polyvalence.B.toFixed(1)} • C ${polyvalence.C.toFixed(1)} • D ${polyvalence.D.toFixed(1)}`;
document.getElementById('num-val').textContent = `${numMastery}%`;

// Chart helpers
const ORANGE = '#c75c1e';
const MARRON = '#7c3b12';
const BEIGE = '#f7e6d4';

// Jauge MTTR (doughnut inversée vs objectif)
new Chart(document.getElementById('mttrGauge'), {
  type: 'doughnut',
  data: {
    labels: ['MTTR', 'Marge vs objectif(5h)'],
    datasets: [{
      data: [mttrH, Math.max(2, 5 - mttrH)],
      backgroundColor: [ORANGE, BEIGE],
      borderWidth: 0
    }]
  },
  options: {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  }
});

// Jauge Disponibilité
new Chart(document.getElementById('dispoGauge'), {
  type: 'doughnut',
  data: {
    labels: ['Disponibilité', 'Indispo'],
    datasets: [{
      data: [dispoPct, 99 - dispoPct],
      backgroundColor: [MARRON, BEIGE],
      borderWidth: 0
    }]
  },
  options: {
    cutout: '78%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  }
});

// Radar Top 5 pannes
new Chart(document.getElementById('pannesRadar'), {
  type: 'radar',
  data: {
    labels: ['Monoblock', 'Sortie Séchoire', 'Laminoir', 'Extruseuse', 'Transporteur'],
    datasets: [{
      label: 'Occurrences',
      data: [6, 12, 4, 8, 12],
      backgroundColor: 'rgba(199,92,30,0.25)',
      borderColor: ORANGE,
      pointBackgroundColor: MARRON
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { r: { beginAtZero: true, grid: { color: '#c75c1e30' } } }
  }
});

// Formations et criticité basée sur KPIs
const formations = [
  { name: 'Analyse des causes racines (5 Why, Ishikawa)', why: 'Pannes récurrentes Sortie Séchoire / Transpoorteur', crit: 'rouge' },
  { name: 'Maintennace prédictive / prévisionnelle   4,0 ', why: 'Taux de mainntenance corrective est 100% !!', crit: correctivesPct > 55 ? 'rouge' : 'jaune' },
  { name: 'Les indicateurs de performance & Reporting', why: 'Evaluer la performance et la fiabilité des machines', crit: mttrH > 3.0 ? 'jaune' : 'vert' },
  { name: '5s et Balisage des zones de maintenance', why: 'Signalisation, Nettoyage et organisation de la zone de travail', crit: 'jaune' },
  { name: 'Sensibilisation à la sécurité interne et au port des EPIs', why: 'Nombre des accidents critiques !!', crit: 'rouge' },];

const tbody = document.getElementById('formations-body');
formations.forEach(f=>{
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${f.name}</td>
    <td>${f.why}</td>
    <td><span class="badge ${f.crit}">${f.crit.charAt(0).toUpperCase()+f.crit.slice(1)}</span></td>
  `;
  tbody.appendChild(tr);
});
