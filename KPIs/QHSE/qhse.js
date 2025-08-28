const accidents = 8;
const nc = { EPI: 0.5, Procedure: 1.5, Proprete: 1 }; // total 20
const iso = 70; // %
const num = 65; // %

document.getElementById('accidents').textContent = accidents;
document.getElementById('nc-total').textContent = `${Object.values(nc).reduce((a,b)=>a+b,0)}%`;
document.getElementById('iso').textContent = `${iso}%`;
document.getElementById('num').textContent = `${num}%`;

const ORANGE='#c75c1e', MARRON='#7c3b12', BEIGE='#f7e6d4';

new Chart(document.getElementById('ncBar'), {
  type:'bar',
  data:{
    labels:['Déchets dans le convoyeur','Caristes','Retrait de briques'],
    datasets:[{
      label:'Non-conformités',
      data:[nc.EPI, nc.Procedure, nc.Proprete],
      backgroundColor: ORANGE,
      borderColor: MARRON,
      borderWidth:1
    }]
  },
  options:{
    plugins:{ legend:{ display:false } },
    scales:{
      y:{ beginAtZero:true, grid:{ color:'#c75c1e30' } },
      x:{ grid:{ display:false } }
    }
  }
});

new Chart(document.getElementById('isoGauge'),{
  type:'doughnut',
  data:{ labels:['ISO','Reste'], datasets:[{ data:[iso,100-iso], backgroundColor:[MARRON,BEIGE], borderWidth:0 }] },
  options:{ cutout:'78%', plugins:{ legend:{ display:false }, tooltip:{ enabled:false } } }
});

const formations = [
  { name:'Sensibilisation EPI & culture sécurité', why:`Nombre d'accidents trop élevé (8 accident / mois)`, crit: nc.EPI>=0.4?'rouge':'jaune' },
  { name:'Outils numériques QHSE (Power BI, Excel)', why:`Maîtrise ${num}%`, crit: num<75?'rouge':'jaune' },
  { name:'Management de l’intégration SMI', why:`Améliorer l'efficacité du service, réduisant les actions répetitives`, crit: 'rouge' },
  { name:'Les Bonnes Pratiques de Fabrication', why:`Le Taux de non coformités (due au personnel) est relativement élevé`, crit: nc.Proprete>=0.5?'jaune':'vert' },
  { name:'Sensibilisations au normes ISO 9001 et aux réclamtions répétitives', why:`Amélioration de la qualité et la satisfaction des clients `, crit: iso<95?'jaune':'vert' },
];
const tbody=document.getElementById('formations-body');
formations.forEach(f=>{
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${f.name}</td><td>${f.why}</td><td><span class="badge ${f.crit}">${f.crit[0].toUpperCase()+f.crit.slice(1)}</span></td>`;
  tbody.appendChild(tr);
});
