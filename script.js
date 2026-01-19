const data=[
 {label:'Staking',value:40,color:'#6cf'},
 {label:'Ecosystem',value:25,color:'#4fa'},
 {label:'Presale',value:15,color:'#fa6'},
 {label:'Team & Burn',value:10,color:'#f66'},
 {label:'Liquidity',value:10,color:'#99f'}
];

const chart=document.getElementById('chart');
let start=0;

data.forEach(d=>{
  const slice=document.createElement('div');
  slice.style.position='absolute';
  slice.style.width='100%';
  slice.style.height='100%';
  slice.style.borderRadius='50%';
  slice.style.background=d.color;
  slice.style.transform=`rotate(${start}deg)`;
  slice.style.clipPath=`polygon(50% 50%,100% 0,100% ${d.value*3.6}%)`;
  chart.appendChild(slice);
  start+=d.value*3.6;
});
