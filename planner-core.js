/* Horários CP de sábado 17/10/2026, em vigor desde 28/09/2026.
   Sem transbordos rodoviários. Distâncias/pontos: HTML original, GPX 2024. */
(function(root){
'use strict';
const points=[{id:'carcavelos',n:'Carcavelos',km:42.1,ride:9,back:13,offset:27,lat:38.68588,lon:-9.33155},{id:'oeiras',n:'Oeiras',km:48.1,ride:12,back:16,offset:24,lat:38.68502,lon:-9.31298},{id:'paco-de-arcos',n:'Paço de Arcos',km:50.3,ride:17,back:21,offset:19,lat:38.69459,lon:-9.29119},{id:'caxias',n:'Caxias',km:51.9,ride:19,back:23,offset:17,lat:38.69869,lon:-9.27636},{id:'alges',n:'Algés',km:57.8,ride:25,back:29,offset:11,lat:38.69853,lon:-9.22916}];
const sequence=(a,b,step)=>Array.from({length:Math.floor((b-a)/step)+1},(_,i)=>a+i*step);
const outbound=[334,364,394,...sequence(428,1148,20),1178,1208,1238];
const inbound=[330,360,390,420,450,...sequence(480,1140,20),1170,1200];
const finite=Number.isFinite;
const next=(list,after)=>finite(after)?list.find(x=>x>=after)??NaN:NaN;
const clamp=(v,min,max,fallback)=>{const n=Number(v);return v!==''&&v!==null&&finite(n)?Math.min(max,Math.max(min,n)):fallback};
function normalize(v={}){let time=/^\d{2}:\d{2}$/.test(v.time||'')?v.time:'10:30';let[h,m]=time.split(':').map(Number);if(h>23||m>59)time='10:30';return{time,speed:clamp(v.speed,20,45,30),walk:clamp(v.walk,1,60,5)}}
const minutes=t=>{const[h,m]=t.split(':').map(Number);return h*60+m};
function reasons(p){let out=[];if(!finite(p.dep))out.push('Sem comboio de ida incluído no horário ferroviário.');else if(p.wait<0)out.push('Chegas depois da passagem estimada do atleta.');else if(p.wait<3)out.push('Chegas antes do atleta, mas com menos de 3 minutos de margem.');if(finite(p.dep)&&!finite(p.ret))out.push('Sem regresso integralmente ferroviário disponível após a passagem.');else if(finite(p.ret)&&p.margin<0)out.push('Ficas pronto em Cascais depois da passagem estimada do atleta.');else if(finite(p.ret)&&p.margin<5)out.push('O regresso deixa menos de 5 minutos de margem em Cascais.');return out}
function calc(input){const cfg=normalize(input),t=minutes(cfg.time),s=cfg.speed,w=cfg.walk;const finish=t+(89.6-33.8)/s*60;const arr=points.map(p=>{const dep=next(outbound,t+w),trainArr=dep+p.ride,ready=trainArr+w,bike=t+(p.km-33.8)/s*60,wait=bike-ready,returnReady=Math.max(bike,ready)+w,ret=next(inbound.map(x=>x+p.offset),returnReady),cascaisRail=ret+p.back,cas=cascaisRail+10,margin=finish-cas;const row={...p,dep,trainArr,ready,bike,wait,returnReady,ret,returnWait:ret-returnReady,cascaisRail,cas,margin,ok:wait>=3&&margin>=5};row.reasons=reasons(row);return row});return{cfg,t,finish,arr,best:arr.filter(x=>x.ok).sort((a,b)=>b.margin-a.margin)[0]||null}}
function fmt(x){if(!finite(x))return '—';const rounded=Math.round(x),day=Math.floor(rounded/1440),m=((rounded%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')+(day>0?' (dia seguinte)':'')}
function walkURL(point,reverse=false){const station='Estação de '+point.n+', Portugal',ref=point.lat+','+point.lon;const params=new URLSearchParams({api:'1',origin:reverse?ref:station,destination:reverse?station:ref,travelmode:'walking'});return'https://www.google.com/maps/dir/?'+params.toString()}
function shareURL(url,cfg,mode){const u=new URL(url);u.search='';u.searchParams.set('time',cfg.time);u.searchParams.set('speed',cfg.speed);u.searchParams.set('walk',cfg.walk);if(mode)u.searchParams.set('mode','race');else u.searchParams.delete('mode');u.hash='planner';return u.toString()}
const api={points,outbound,inbound,normalize,minutes,calc,fmt,walkURL,shareURL};root.IronPlanner=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
