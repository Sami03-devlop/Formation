const prod = { A: 90, B: 90, C: 90, D: 90 }; // %
const prodShare = { A: 300, B: 300, C: 300}; // tonage produites
const numMastery = 76; // %
const changeoverMin = { A: 2, B: 9} // min
const polyvalence = { A: 5.22 , B: 0.22, C: 0.22, D: 0.22}; // %
const delaiCorrJ = { A: 1, B: 18} // jours

document.getElementById('prod-values').textContent = `A ${prod.A}%, B ${prod.B}%, C ${prod.C}%, D ${prod.D}%`;
document.getElementById('num-prod').textContent = `${numMastery}%`;
document.getElementById('changeover').textContent = `${changeoverMin.A}h et ${changeoverMin.B}min`;
document.getElementById('poly-prod').textContent = `A ${polyvalence.A.toFixed(2)} • B ${polyvalence.B.toFixed(2)} • C ${polyvalence.C.toFixed(2)} • D ${polyvalence.D.toFixed(2)}`;
document.getElementById('delai-corr').textContent = `${delaiCorrJ.A}h et ${delaiCorrJ.B}h`;

const ORANGE = '#c75c1e', MARRON = '#7c3b12', BEIGE = '#f7e6d4';

new Chart(document.getElementById('prodBar'), {
  type:'bar',
  data:{
    labels:['Équipe A','Équipe B','Équipe C','Équipe D'],
    datasets:[{
      label:'Productivité (%)',
      data:[prod.A,prod.B,prod.C,prod.D],
      backgroundColor: [ORANGE, ORANGE, ORANGE, ORANGE],
      borderColor: MARRON,
      borderWidth:1
    }]
  },
  options:{
    plugins:{ legend:{ display:false } },
    scales:{
      y: { beginAtZero:true, max:100, grid:{ color:'#c75c1e30' } },
      x: { grid:{ display:false } }
    }
  }
});

new Chart(document.getElementById('prodPie'), {
  type:'pie',
  data:{
    labels:['Équipe A','Équipe B','Équipe C'],
    datasets:[{
      data:[prodShare.A, prodShare.B, prodShare.C],
      backgroundColor:['#c75c1e','#7c3b12','#f7e6d4'],
      borderColor:'#ffffff',
      borderWidth:2
    }]
  },
  options:{ plugins:{ legend:{ position:'bottom' } } }
});

// Formations – criticité basée sur productivité & changeover
const formations = [
  { name:'SMED – Réduction temps de changement', why:`Temps de changement de série variable (n'est pas optimisé) `, crit: 'rouge'},
  { name:'Sensibilisation au porte des EPIs et à la sécurité interne ', why:'Accidents critiques élevées', crit:'rouge'},
  { name:'Sensibilisation aux réclamations clients', why:`Réduire les réclamations dues aux défauts de qualité `, crit: 'rouge' },
  { name:'Balisage et 5s', why:'Augmenter la productivité et réduire le nombre des accidents', crit:'rouge' },
  { name:'Polyvanlence interne', why:` Polyvanlence 0 parmi 22 (les 5 polyvalents travaillent dans le temps normal) !!!`, crit:'rouge' },
];
const tbody = document.getElementById('formations-body');
formations.forEach(f=>{
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${f.name}</td><td>${f.why}</td><td><span class="badge ${f.crit}">${f.crit[0].toUpperCase()+f.crit.slice(1)}</span></td>`;
  tbody.appendChild(tr);
});
