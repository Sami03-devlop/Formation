// Données Juillet 2025
const gammeMoy = 4.6 ;         // opérations/poste (moyenne)
const nomenclMoy = 3.7;       // compos./machine (moyenne)
const ecartPct = 1;         // écart moyen temps réel vs standard en %

document.getElementById('gammeMoy').textContent = gammeMoy.toFixed(1);
document.getElementById('nomMoy').textContent = nomenclMoy.toFixed(1);
document.getElementById('ecartTemps').textContent = `${ecartPct}%`;

const ORANGE = '#c75c1e', MARRON = '#7c3b12';

// Comparaison temps standard vs réel (5 références)
const refs = ['Zonne Préparation','Zonne Monoblock','Zonne Séchoire','Zonne Four','Zonne Dépileuse'];
const tStd = [12.0, 15.0, 10.0, 14.0, 11.0];   // minutes
const tReal = [13.0, 16.0, 9.5, 15.5, 12.0];

new Chart(document.getElementById('cmpChart'), {
  type: 'bar',
  data: {
    labels: refs,
    datasets: [
      { label: 'Standard (h)', data: tStd, backgroundColor: BEhex(ORANGE, 0.6), borderColor: ORANGE, borderWidth: 5 },
      { label: 'Réel (h)', data: tReal, backgroundColor: BEhex(MARRON, 0.6), borderColor: MARRON, borderWidth: 5 }
    ]
  },
  options: {
    plugins: { legend: { position: 'bottom' } },
    scales: { y: { beginAtZero: true, grid: { color: '#c75c1e30' } }, x: { grid: { display: false } } }
  }
});

// Helper simple pour alpha
function BEhex(hex, a){ return hex.replace('#', 'rgba(') // not accurate, fallback simple color
}

// Formations
const formations = [
  { name: 'Formation à la création et gestion des nomenclatures', why: `Manque des documents`, crit: 'rouge' },
  { name: 'Formation aux gammes opératoires et séquences de production', why: 'Manque des documents', crit: 'rouge' },
  { name: 'Analyse des temps et mouvements (Méthode MTM ou chronométrage)', why: `Manque des tempes opératoires théoriques`, crit: 'rouge' },
  { name: 'VSM & équilibrage poste', why: 'Réduire gaspillages', crit: 'jaune' },
  { name: 'Power BI pour méthodes', why: 'Suivi des écarts et dérives', crit: 'jaune' },
];

const tbody = document.getElementById('formations-body');
formations.forEach(f=>{
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${f.name}</td><td>${f.why}</td><td><span class="badge ${f.crit}">${f.crit[0].toUpperCase()+f.crit.slice(1)}</span></td>`;
  tbody.appendChild(tr);
});
