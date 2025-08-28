// Données Juillet 2025 (réalistes)
const incidentsTotal = 0;            // incidents/mois
const rtaMin = 95;                   // remise en service moyenne (minutes)
const conformitePct = 90;            // %
const energieGaspilleeMWh = 4;    // MWh

// Injection valeurs
document.getElementById('incidents').textContent = incidentsTotal;
document.getElementById('rta').textContent = `${rtaMin} min`;
document.getElementById('conf').textContent = `${conformitePct}%`;
document.getElementById('waste').textContent = `${energieGaspilleeMWh} heures`;

// Couleurs thème
const ORANGE = '#c75c1e', MARRON = '#7c3b12', BEIGE = '#f7e6d4';

// Ligne incidents par semaine (S27 à S30)
new Chart(document.getElementById('incLine'), {
  type: 'line',
  data: {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [{
      label: 'Incidents',
      data: [0, 0, 0, 0],
      borderColor: ORANGE,
      backgroundColor: 'rgba(199,92,30,0.15)',
      fill: true,
      tension: 0.25,
      pointBackgroundColor: MARRON
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, grid: { color: '#c75c1e30' } },
      x: { grid: { display: false } }
    }
  }
});

// Jauge conformité installations
new Chart(document.getElementById('confGauge'), {
  type: 'doughnut',
  data: {
    labels: ['Conformité', 'Écart'],
    datasets: [{
      data: [conformitePct, 100 - conformitePct],
      backgroundColor: [MARRON, BEIGE],
      borderWidth: 0
    }]
  },
  options: {
    cutout: '78%',
    plugins: { legend: { display: false }, tooltip: { enabled: false } }
  }
});

// Formations recommandées (tbody id="formations-body")
const formations = [
  { name: 'Habilitation électrique', why: `Demandée par le responsable de service`, crit: 'rouge' },
  { name: 'Les variateurs de vitesse  et leurs application - paramétrage', why: 'Demandée par le responsable de service', crit: 'rouge' },
  { name: 'Sécurité électrique & Secourisme', why: `Sensibiliser aux risques et dangers électrique  `, crit: 'jaune' },
  { name: 'Conformité installations (IEC/EN 60204-1)', why: `Taux de conformité de 90%`, crit: 'vert' },
  { name: 'Efficacité énergitique', why: `Fonctionnelent à vide du moteur d'extrudeuse 4h`, crit: 'jaune' },
];
const tbody = document.getElementById('formations-body');
formations.forEach(f => {
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${f.name}</td><td>${f.why}</td><td><span class="badge ${f.crit}">${f.crit[0].toUpperCase()+f.crit.slice(1)}</span></td>`;
  tbody.appendChild(tr);
});
