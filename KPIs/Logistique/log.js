const claims = 0;
const otif = 99.5; // %
const ruptures = { MP:0, PF:0 };
const leadH = 48;
const num = 75;

document.getElementById('claims').textContent = claims;
document.getElementById('otif').textContent = `${otif}%`;
document.getElementById('ruptures').textContent = `${ruptures.MP} / ${ruptures.PF}`;
document.getElementById('leadtime').textContent = `${leadH} h`;
document.getElementById('num').textContent = `${num}%`;

const ORANGE='#c75c1e', MARRON='#7c3b12';

new Chart(document.getElementById('mixChart'), {
  type:'bar',
  data:{
    labels:['Semaine 27','S28','S29','S30'],
    datasets:[
      { type:'bar', label:'Ruptures', data:[2,1,1,1], backgroundColor: ORANGE, borderColor: MARRON, borderWidth:1, yAxisID:'y' },
      { type:'line', label:'OTIF (%)', data:[92,94,93,93], borderColor: MARRON, backgroundColor: 'transparent', tension:.2, yAxisID:'y1' }
    ]
  },
  options:{
    plugins:{ legend:{ position:'bottom' } },
    scales:{
      y:{ beginAtZero:true, title:{ display:true, text:'Ruptures' }, grid:{ color:'#c75c1e30' } },
      y1:{ beginAtZero:false, min:85, max:100, position:'right', title:{ display:true, text:'OTIF %' }, grid:{ drawOnChartArea:false } },
      x:{ grid:{ display:false } }
    }
  }
});

const formations = [
  { name:'Formation mécanique automobile (Basic)', why:`Pour diagnostiquer l'état des camions (demandée par le responsable)`, crit: (ruptures.MP+ruptures.PF)>=0?'rouge':'jaune' },
  { name:'Gestion des stocks (ABC, SS, MOQ)', why:'Stabiliser la disponibilité', crit:'jaune' },
  { name:'Amélioration processus préparation/expédition', why:`Lead time ${leadH} h`, crit: leadH>12?'jaune':'vert' },
  { name:'KPIs et reporting', why:`Améliorer la prise de décision`, crit: claims>=5?'jaune':'vert' },
  { name:'Outils numériques Excel, Power BI et Sage X3', why:`Améliorer les compétences numériques`, crit: num<=75?'jaune':'vert' },
];
const tbody=document.getElementById('formations-body');
formations.forEach(f=>{
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${f.name}</td><td>${f.why}</td><td><span class="badge ${f.crit}">${f.crit[0].toUpperCase()+f.crit.slice(1)}</span></td>`;
  tbody.appendChild(tr);
});
