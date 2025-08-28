// Données Juillet 2025
const integJours = 9;       // temps d’intégration moyen
const turnoverPct = 2.8;    // %
const satStagPct = 86;      // %
const satInternePct = 79;   // %

document.getElementById('integration').textContent = `${integJours} j`;
document.getElementById('turnover').textContent = `${turnoverPct}%`;
document.getElementById('satStag').textContent = `${satStagPct}%`;
document.getElementById('satInterne').textContent = `${satInternePct}%`;

const ORANGE='#c75c1e', MARRON='#7c3b12', BEIGE='#f7e6d4';

// Diagramme circulaire satisfactions
new Chart(document.getElementById('satisfPie'), {
  type: 'pie',
  data: {
    labels: ['Satisfaction stagiaires', 'Satisfaction interne'],
    datasets: [{
      data: [satStagPct, satInternePct],
      backgroundColor: [ORANGE, MARRON],
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  },
  options: { plugins: { legend: { position: 'bottom' } } }
});

// Barres turnover par département
new Chart(document.getElementById('turnBar'), {
  type: 'bar',
  data: {
    labels: ['Production','Maintenance','Logistique','QHSE'],
    datasets: [{
      label: 'Turnover (%)',
      data: [3.1, 2.2, 2.9, 1.8],
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

// Formations
const formations = [
  { name: 'Onboarding & mentoring design', why: `Intégration ${integJours} j`, crit: integJours > 8 ? 'jaune' : 'vert' },
  { name: 'Leadership de proximité (managers)', why: `Turnover ${turnoverPct}%`, crit: turnoverPct > 3 ? 'rouge' : 'jaune' },
  { name: 'Expérience stagiaire & tutorat', why: `Satisfaction stagiaires ${satStagPct}%`, crit: satStagPct < 85 ? 'jaune' : 'vert' },
  { name: 'Communication interne & engagement', why: `Satisfaction interne ${satInternePct}%`, crit: satInternePct < 80 ? 'jaune' : 'vert' },
  { name: 'Analytics RH (Power BI, Excel)', why: 'Suivi KPI RH', crit: 'vert' },
];
const tbody = document.getElementById('formations-body');
formations.forEach(f=>{
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${f.name}</td><td>${f.why}</td><td><span class="badge ${f.crit}">${f.crit[0].toUpperCase()+f.crit.slice(1)}</span></td>`;
  tbody.appendChild(tr);
});
