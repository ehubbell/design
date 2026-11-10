const nodes=[
{id:'source',label:'Editable sources',x:30,y:120,description:'Artwork and licensed fonts live in src/brand/brand-kit/assets/. Theme roles live in styles/tokens.css. These started from the sibling website snapshot; edit them in place and mark new explorations as proposals.'},
{id:'review',label:'Review the kit',x:280,y:120,description:'Run npm start, inspect the brand kit in both themes and at narrow widths, and check artwork, typography, contrast, and downloads before packaging.'},
{id:'export',label:'Generate exports',x:530,y:120,description:'Run npm run export:brand. The script creates an asset manifest and ZIP under the kit’s exports folder without overwriting editable sources.'},
{id:'handoff',label:'Share the package',x:780,y:120,description:'Extract the ZIP and serve its contents locally. It includes both previews, assets, styles, scripts, and font licenses. Website changes and publication remain separate actions.'}
];
const edges=[['source','review'],['review','export'],['export','handoff']];
const stage=document.querySelector('#stage'),canvas=document.querySelector('#canvas'),details=document.querySelector('#details');let scale=1,x=0,y=0,selected=null;
function render(){canvas.style.transform=`translate(${x}px,${y}px) scale(${scale})`;document.querySelector('#zoom-label').textContent=Math.round(scale*100)+'%';}
function fit(){
 const narrow=stage.clientWidth<600,w=narrow?250:1000,h=narrow?610:340;
 const positions=nodes.map((n,i)=>({...n,x:narrow?30:n.x,y:narrow?30+i*150:n.y}));
 canvas.style.width=w+'px';canvas.style.height=h+'px';
 const svg=canvas.querySelector('svg');svg.setAttribute('width',w);svg.setAttribute('height',h);
 document.querySelectorAll('.node').forEach((el,i)=>{el.style.left=positions[i].x+'px';el.style.top=positions[i].y+'px';});
 document.querySelectorAll('#edges path').forEach((el,i)=>{const a=positions[i],b=positions[i+1];el.setAttribute('d',narrow?`M${a.x+95} ${a.y+100}L${b.x+95} ${b.y-6}`:`M${a.x+190} ${a.y+50}L${b.x-6} ${b.y+50}`);});
 scale=Math.min(1,(stage.clientWidth-32)/w,(stage.clientHeight-32)/h);x=(stage.clientWidth-w*scale)/2;y=(stage.clientHeight-h*scale)/2;render();
}
function zoom(factor){const next=Math.max(.2,Math.min(2.5,scale*factor));const cx=stage.clientWidth/2,cy=stage.clientHeight/2;x=cx-(cx-x)*next/scale;y=cy-(cy-y)*next/scale;scale=next;render();}
for(const [i,node] of nodes.entries()){const button=document.createElement('button');button.className='node';button.style.left=node.x+'px';button.style.top=node.y+'px';const number=document.createElement('span');number.textContent='0'+(i+1);button.append(number,document.createTextNode(node.label));button.onclick=()=>{selected=button;document.querySelector('#detail-title').textContent=node.label;document.querySelector('#detail-copy').textContent=node.description;details.hidden=false;document.querySelector('#close').focus();};document.querySelector('#nodes').append(button);}
for(const [from,to] of edges){const a=nodes.find(n=>n.id===from),b=nodes.find(n=>n.id===to);const line=document.createElementNS('http://www.w3.org/2000/svg','path');line.setAttribute('d',`M${a.x+190} ${a.y+50}L${b.x-6} ${b.y+50}`);line.setAttribute('stroke','currentColor');line.setAttribute('fill','none');line.setAttribute('marker-end','url(#arrow)');document.querySelector('#edges').append(line);}
function close(){details.hidden=true;selected?.focus();}document.querySelector('#close').onclick=close;document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!details.hidden)close();});
document.querySelector('#zoom-in').onclick=()=>zoom(1.25);document.querySelector('#zoom-out').onclick=()=>zoom(.8);document.querySelector('#fit').onclick=fit;
let drag=null;stage.addEventListener('pointerdown',e=>{if(e.target.closest('button')||e.button!==0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY};stage.setPointerCapture(e.pointerId);});stage.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;x+=e.clientX-drag.x;y+=e.clientY-drag.y;drag.x=e.clientX;drag.y=e.clientY;render();});for(const event of ['pointerup','pointercancel','lostpointercapture'])stage.addEventListener(event,()=>drag=null);new ResizeObserver(fit).observe(stage);
