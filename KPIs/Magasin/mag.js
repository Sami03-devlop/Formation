// Données Juillet 2025
const rupturesMois = 4;         // nb
const delaiPrepMin = 22;        // minutes
const ecartInventairePct = 1.8; // %
const outilsNumPct = 74;        // %

document.getElementById('ruptures').textContent = rupturesMois;
document.getElementById('delaiPrep').textContent = `${delaiPrepMin} min`;
document.getElementById('ecartInv').textContent = `${ecartInventairePct}%`;
document.getElementById('numTools').textContent = `${outilsNumPct}%`;

const ORANGE='#c75c1e', MARRON='#7c3b12', BEIGE='#f7e6d4';

// Barres: ruptures par catégorie
new Chart(document.getElementById('ruptBar'), {
  type: 'bar',
  data: {
    labels: ['MP', 'Composants', 'PF'],
    datasets: [{
      label: 'Ruptures',
      data: [2, 1, 1],
      backgroundColor: ORANGE,
      borderColor: MARRON,
      borderWidth: 1
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, grid: { color: '#c75c1e30' } }, x: { grid: { display: false } } }
  }
});

// Jauge écart inventaire
new Chart(document.getElementById('invGauge'), {
  type: 'doughnut',
  data: {
    labels: ['Écart', 'Conforme'],
    datasets: [{ data: [ecartInventairePct, Math.max(0, 5 - ecartInventairePct)], // échelle interne 0–5%
      backgroundColor: [ORANGE, BEIGE], borderWidth: 0 }]
  },
  options: { cutout: '78%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }
});

// Formations
const formations = [
  { name: 'Comptages tournants & fiabilité inventaire', why: `Écart ${ecartInventairePct}%`, crit: ecartInventairePct > 1 ? 'jaune' : 'vert' },
  { name: 'Optimisation picking & layout', why: `Préparation ${delaiPrepMin} min`, crit: delaiPrepMin > 20 ? 'jaune' : 'vert' },
  { name: 'Sage X3 avancé', why: `Maîtrise ${outilsNumPct}%`, crit: outilsNumPct < 80 ? 'jaune' : 'vert' },
  { name: 'Gestion des stocks (ABC/XYZ, SS, MOQ)', why: `Ruptures: ${rupturesMois}`, crit: rupturesMois >= 4 ? 'jaune' : 'vert' },
  { name: 'Sécurité magasin & engins', why: 'Exposition manutention', crit: 'rouge' },
];
const tbody = document.getElementById('formations-body');
formations.forEach(f=>{
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${f.name}</td><td>${f.why}</td><td><span class="badge ${f.crit}">${f.crit[0].toUpperCase()+f.crit.slice(1)}</span></td>`;
  tbody.appendChild(tr);
});
