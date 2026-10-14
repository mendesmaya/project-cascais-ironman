/* CP sábado 17/10/2026: horário de fim de semana desde 28/09/2026.
   GPX 2024. Alternativas externas são inseridas pelo utilizador, não calculadas por API. */
(function(root){'use strict';
const points=[{id:'carcavelos',n:'Carcavelos',km:42.1,ride:9,back:13,offset:27,lat:38.68588,lon:-9.33155},{id:'oeiras',n:'Oeiras',km:48.1,ride:12,back:16,offset:24,lat:38.68502,lon:-9.31298},{id:'paco-de-arcos',n:'Paço de Arcos',km:50.3,ride:17,back:21,offset:19,lat:38.69459,lon:-9.29119},{id:'caxias',n:'Caxias',km:51.9,ride:19,back:23,offset:17,lat:38.69869,lon:-9.27636},{id:'alges',n:'Algés',km:57.8,ride:25,back:29,offset:11,lat:38.69853,lon:-9.22916}];
const sequence=(a,b,step)=>Array.from({length:Math.floor((b-a)/step)+1},(_,i)=>a+i*step);
const outbound=[334,364,394,...sequence(428,1148,20),1178,1208,1238],inbound=[330,360,390,420,450,...sequence(480,1140,20),1170,1200];
const suspended=['M04','M05','M09','M15','M18','M27','M29','M38','M43','M44'];
const finite=Number.isFinite,clamp=(v,min,max,d)=>v!==''&&v!==null&&finite(Number(v))?Math.min(max,Math.max(min,Number(v))):d;
const validTime=t=>/^\d{2}:\d{2}$/.test(t||'')&&Number(t.slice(0,2))<24&&Number(t.slice(3))<60;
const minutes=t=>validTime(t)?Number(t.slice(0,2))*60+Number(t.slice(3)):NaN;
const next=(list,after)=>finite(after)?list.find(x=>x>=after)??NaN:NaN;
function blockedLine(label){const codes=String(label).toUpperCase().match(/\bM\d{1,2}\b/g)||[];return codes.map(x=>'M'+x.slice(1).padStart(2,'0')).find(x=>suspended.includes(x))||null}
function normalizeRoutes(routes){const safe={};if(!routes||typeof routes!=='object')return safe;for(const p of points){const data=routes[p.id];if(!data||typeof data!=='object')continue;const item={};if(data.walk!==undefined)item.walk=clamp(data.walk,1,60,5);for(const leg of ['out','back']){item[leg]=(Array.isArray(data[leg])?data[leg]:[]).slice(0,5).filter(x=>x&&['walk','public'].includes(x.type)&&validTime(x.depart)&&validTime(x.arrive)&&minutes(x.arrive)>minutes(x.depart)&&x.confirmed===true&&!blockedLine(x.label)).map(x=>({type:x.type,depart:x.depart,arrive:x.arrive,label:String(x.label||'Alternativa externa').slice(0,80),confirmed:true}))}safe[p.id]=item}return safe}
function normalize(v={}){const walk=clamp(v.walk,1,60,5);return{time:validTime(v.time)?v.time:'10:30',speed:clamp(v.speed,20,45,30),walk,originWalk:clamp(v.originWalk,1,60,walk),finalWalk:clamp(v.finalWalk,0,60,10),trip:['round','outbound','return'].includes(v.trip)?v.trip:'round',returnPoint:points.some(p=>p.id===v.returnPoint)?v.returnPoint:'oeiras',returnTime:validTime(v.returnTime)?v.returnTime:'11:00',routes:normalizeRoutes(v.routes)}}
function externalCandidates(entries,start){return(entries||[]).map(x=>({kind:x.type,label:x.label,depart:minutes(x.depart),arrive:minutes(x.arrive),source:'Inserido pelo utilizador',official:false})).filter(x=>x.depart>=start)}
function calc(input){const cfg=normalize(input),t=minutes(cfg.time),finish=t+(89.6-33.8)/cfg.speed*60;
 const relevant=cfg.trip==='return'?points.filter(p=>p.id===cfg.returnPoint):points;
 const arr=relevant.map(p=>{const data=cfg.routes[p.id]||{},w=data.walk??cfg.walk,bike=t+(p.km-33.8)/cfg.speed*60;
 const railDep=next(outbound,t+cfg.originWalk),railArr=railDep+p.ride;
 const cpOut={kind:'cp',label:'Comboio CP + caminhada',depart:railDep,arrive:railArr+w,stationArrive:railArr,source:'Horário CP + caminhada manual',official:true};
 const outCandidates=[cpOut,...externalCandidates(data.out,t)].filter(x=>finite(x.depart)&&finite(x.arrive)).sort((a,b)=>a.arrive-b.arrive||a.depart-b.depart);
 const selectedOut=outCandidates[0]||null,ready=selectedOut?.arrive??NaN,wait=bike-ready;
 const startBack=cfg.trip==='return'?minutes(cfg.returnTime):Math.max(bike,ready);
 const returnReady=startBack+w,railBackDep=next(inbound.map(x=>x+p.offset),returnReady),railBackArr=railBackDep+p.back;
 const cpBack={kind:'cp',label:'Caminhada + comboio CP',depart:railBackDep,arrive:railBackArr,source:'Horário CP + caminhada manual',official:true};
 const backCandidates=[cpBack,...externalCandidates(data.back,startBack)].filter(x=>finite(x.depart)&&finite(x.arrive)).sort((a,b)=>a.arrive-b.arrive||a.depart-b.depart);
 const selectedBack=backCandidates[0]||null,ret=selectedBack?.depart??NaN,cascaisArrival=selectedBack?.arrive??NaN,cas=cascaisArrival+cfg.finalWalk,margin=finish-cas;
 const needOut=cfg.trip!=='return',needBack=cfg.trip!=='outbound',reasons=[];
 if(needOut){if(!selectedOut)reasons.push('Sem alternativa de ida disponível nos dados avaliados.');else if(wait<0)reasons.push('Chegas depois da passagem estimada do atleta.');else if(wait<3)reasons.push('Chegas antes do atleta, mas com menos de 3 minutos de margem.')}
 if(needBack){if(!selectedBack)reasons.push('Sem alternativa de regresso disponível após a hora de saída.');else if(margin<0)reasons.push('Ficas pronto em Cascais depois da passagem estimada do atleta.');else if(margin<5)reasons.push('O regresso deixa menos de 5 minutos de margem em Cascais.')}
 const ok=(!needOut||wait>=3)&&(!needBack||margin>=5);
 return{...p,walk:w,bike,dep:selectedOut?.depart??NaN,trainArr:selectedOut?.kind==='cp'?railArr:NaN,ready,wait,returnReady,startBack,ret,returnWait:selectedBack?.kind==='cp'?ret-returnReady:ret-startBack,cascaisRail:selectedBack?.kind==='cp'?cascaisArrival:NaN,cascaisArrival,cas,margin,ok,reasons,selectedOut,selectedBack,outCandidates,backCandidates,needOut,needBack}});
 const viable=arr.filter(x=>x.ok).sort((a,b)=>cfg.trip==='outbound'?a.ready-b.ready||b.wait-a.wait:a.cas-b.cas||(finite(a.ready)&&finite(b.ready)?a.ready-b.ready:0));
 return{cfg,t,finish,arr,best:viable[0]||null}}
function fmt(x){if(!finite(x))return'—';const m=Math.round(x),day=Math.floor(m/1440),xday=((m%1440)+1440)%1440;return String(Math.floor(xday/60)).padStart(2,'0')+':'+String(xday%60).padStart(2,'0')+(day>0?' (dia seguinte)':'')}
function directionsURL(origin,destination,mode='walking'){return'https://www.google.com/maps/dir/?'+new URLSearchParams({api:'1',origin,destination,travelmode:mode}).toString()}
function walkURL(p,reverse=false){const station='Estação de '+p.n+', Portugal',ref=p.lat+','+p.lon;return directionsURL(reverse?ref:station,reverse?station:ref)}
function wholeURL(p,leg,mode){const ref=p.lat+','+p.lon;return directionsURL(leg==='out'?'Rua de Biarritz, Estoril, Portugal':ref,leg==='out'?ref:'Estação de Cascais, Portugal',mode)}
function shareURL(url,cfg,mode){const u=new URL(url);u.search='';for(const key of ['time','speed','walk','originWalk','finalWalk','trip','returnPoint','returnTime'])u.searchParams.set(key,cfg[key]);if(Object.keys(cfg.routes).length)u.searchParams.set('routes',JSON.stringify(cfg.routes));if(mode)u.searchParams.set('mode','race');u.hash='planner';return u.toString()}
const api={points,outbound,inbound,suspended,normalize,normalizeRoutes,blockedLine,validTime,minutes,calc,fmt,walkURL,wholeURL,shareURL};root.IronPlanner=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
