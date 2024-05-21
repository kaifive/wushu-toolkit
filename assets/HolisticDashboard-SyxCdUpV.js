import{r as v,k as O,j as e}from"./index-saOsx6TE.js";import{s as N,g as P}from"./sortStandings-DkvFZbCF.js";import{c as b,a as p}from"./calculatePercentage-Dnik35xR.js";import{C as w}from"./CAlert-Bm5hXDXx.js";import{C as _}from"./CAlertLink-Cu2f1DKt.js";import{C as x,a as c}from"./CRow-Bd-_VEqq.js";import{C as h,a as d}from"./CCardBody-JhVVuJV4.js";import{C as m}from"./CCardHeader-6xjujN95.js";import{C as M,a as B}from"./CInputGroupText-BghLoQuS.js";import{C as T}from"./CFormSelect-C3rtwmcq.js";import{a as q}from"./index.es-j31rD6ei.js";import{C as S}from"./CWidgetStatsB-ByJ6nNEh.js";import{B as E}from"./BarChart-DjQf3_aS.js";import"./DefaultLayout-DYgob1Kc.js";import"./CFormControlWrapper-CCdBdDk5.js";import"./CFormControlValidation-BU67zDiH.js";import"./CFormLabel-CGaxVhZq.js";import"./CProgress-CcAS6j1T.js";const de=()=>{const[i,o]=v.useState(""),[t,l]=v.useState(""),[r,a]=v.useState(""),[g,A]=v.useState({athleteData:{},schools:[],loading:!0,error:null});v.useEffect(()=>{const n=()=>{P().then($=>{A($)}).catch($=>{A({athleteData:{},schools:[],loading:!0,error:null})})};n();const F=setInterval(n,1*60*1e3);return()=>clearInterval(F)},[A]);const{athleteData:W,schools:G,loading:I,error:K,syncDate:H}=g;let L=N(W),s=N(W);i!==""&&(s=s.filter(n=>n.gender===i)),t!==""&&(s=s.filter(n=>n.group===t)),r!==""&&(s=s.filter(n=>n.school===r));const{colorMode:z,setColorMode:J}=O("coreui-free-react-admin-template-theme"),R=z==="dark"?{[`.${p.root}`]:{[`.${p.tick}, .${p.line}`]:{stroke:"white",strokeWidth:3},[`.${p.tickLabel}`]:{fill:"white"}},".MuiChartsGrid-horizontalLine":{stroke:"white"},".MuiChartsLegend-series text":{color:"white !important",fill:"white !important"}}:{},u={height:300,sx:{[`.${p.left} .${p.label}`]:{transform:"translate(-20px, 0)"},...R}};return I?e.jsx("div",{children:"Loading..."}):K?e.jsxs(w,{color:"danger",children:["An error has occurred getting scores, refresh this page. If this problem continues to persist, contact Khai Nguyen and check the ",e.jsx(_,{href:"https://bowuu.com/all-results",target:"_blank",children:"Official Total Scores"}),"."]}):e.jsxs(e.Fragment,{children:[e.jsx(x,{children:e.jsx(c,{xs:12,children:e.jsxs(w,{color:"info",children:["Scores as of ",H,". To update scores, refresh this page or wait 1 minute."]})})}),e.jsx(x,{children:e.jsx(c,{xs:12,children:e.jsxs(h,{className:"mb-4",children:[e.jsx(m,{children:e.jsx("strong",{children:"Holistic Dashboard Filters"})}),e.jsxs(d,{children:[e.jsx(x,{children:e.jsxs(M,{className:"mb-3",children:[e.jsx(B,{style:{width:"75px"},children:"Gender: "}),e.jsxs(T,{value:i,onChange:n=>o(n.target.value),children:[e.jsx("option",{value:"",children:"*"}),e.jsx("option",{value:"Male",children:"Male"}),e.jsx("option",{value:"Female",children:"Female"})]})]})}),e.jsx(x,{children:e.jsxs(M,{className:"mb-3",children:[e.jsx(B,{style:{width:"75px"},children:"Group: "}),e.jsxs(T,{value:t,onChange:n=>l(n.target.value),children:[e.jsx("option",{value:"",children:"*"}),e.jsx("option",{value:"A",children:"A"}),e.jsx("option",{value:"B",children:"B"}),e.jsx("option",{value:"C",children:"C"})]})]})}),e.jsx(x,{children:e.jsxs(M,{className:"mb-3",children:[e.jsx(B,{style:{width:"75px"},children:"School: "}),e.jsxs(T,{value:r,onChange:n=>a(n.target.value),children:[e.jsx("option",{value:"",children:"*"}),G.map((n,F)=>e.jsx("option",{value:n,children:n},F))]})]})}),e.jsx("div",{className:"d-grid gap-2 d-md-flex justify-content-md-end",children:e.jsx(q,{style:{},color:"primary",onClick:()=>{o(""),l(""),a("")},children:"Reset Filters"})})]})]})})}),e.jsxs(x,{xs:{gutter:3},children:[e.jsx(c,{xs:12,sm:6,xl:3,xxl:3,children:e.jsx(S,{className:"mb-3",progress:{value:b(s.length,L.length)},text:"",title:"Number of Athletes",value:`${s.length} / ${L.length}`})}),e.jsx(c,{xs:12,sm:6,xl:3,xxl:3,children:e.jsx(S,{className:"mb-3",progress:{value:b(j(s,"Barehand"),10)},text:"",title:"Average Barehand Score",value:`${j(s,"Barehand")} / 10.00`})}),e.jsx(c,{xs:12,sm:6,xl:3,xxl:3,children:e.jsx(S,{className:"mb-3",progress:{value:b(j(s,"Short Weapon"),10)},text:"",title:"Average Short Weapon Score",value:`${j(s,"Short Weapon")} / 10.00`})}),e.jsx(c,{xs:12,sm:6,xl:3,xxl:3,children:e.jsx(S,{className:"mb-3",progress:{value:b(j(s,"Long Weapon"),10)},text:"",title:"Average Long Weapon Score",value:`${j(s,"Long Weapon")} / 10.00`})})]}),e.jsx("br",{}),e.jsx(x,{children:e.jsx(c,{xs:12,sm:12,xl:12,xxl:12,children:e.jsxs(h,{children:[e.jsx(m,{children:e.jsx("strong",{children:"Number of Competitors by Barehand Events"})}),e.jsx(d,{children:e.jsx(f,{dataset:C(s,"Barehand"),type:"Count",chartSetting:u})})]})})}),e.jsx("br",{}),e.jsxs(x,{xs:{gutter:3},children:[e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsxs(h,{children:[e.jsx(m,{children:e.jsx("strong",{children:"Number of Competitors by Short Weapon Events"})}),e.jsx(d,{children:e.jsx(f,{dataset:C(s,"Short Weapon"),type:"Count",chartSetting:u})})]})}),e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsxs(h,{children:[e.jsx(m,{children:e.jsx("strong",{children:"Number of Competitors by Long Weapon Events"})}),e.jsx(d,{children:e.jsx(f,{dataset:C(s,"Long Weapon"),type:"Count",chartSetting:u})})]})})]}),e.jsx("br",{}),e.jsx(x,{children:e.jsx(c,{xs:12,sm:12,xl:12,xxl:12,children:e.jsxs(h,{children:[e.jsxs(m,{children:[e.jsx("strong",{children:"Average Scores by Barehand Events"})," ",e.jsx("br",{}),"Total Average: ",j(s,"Barehand")]}),e.jsx(d,{children:e.jsx(f,{dataset:C(s,"Barehand"),type:"Average",chartSetting:u})})]})})}),e.jsx("br",{}),e.jsxs(x,{xs:{gutter:3},children:[e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsxs(h,{children:[e.jsxs(m,{children:[e.jsx("strong",{children:"Average Scores by Short Weapon Events"}),e.jsx("br",{}),"Total Average: ",j(s,"Short Weapon")]}),e.jsx(d,{children:e.jsx(f,{dataset:C(s,"Short Weapon"),type:"Average",chartSetting:u})})]})}),e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsxs(h,{children:[e.jsxs(m,{children:[e.jsx("strong",{children:"Average Scores by Long Weapon Events"}),e.jsx("br",{}),"Total Average: ",j(s,"Long Weapon")]}),e.jsx(d,{children:e.jsx(f,{dataset:C(s,"Long Weapon"),type:"Average",chartSetting:u})})]})})]}),e.jsx("br",{}),e.jsxs(x,{xs:{gutter:3},children:[e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsxs(h,{children:[e.jsxs(m,{children:[e.jsx("strong",{children:"Top 10 Highest Combined Score"})," - Male",e.jsx("br",{}),"Total Average: ",D(y(s,"Male"))]}),e.jsx(d,{children:e.jsx(k,{dataset:y(s,"Male"),gender:"Male",chartSetting:u})})]})}),e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsxs(h,{children:[e.jsxs(m,{children:[e.jsx("strong",{children:"Top 10 Highest Combined Score"})," - Female",e.jsx("br",{}),"Total Average: ",D(y(s,"Female"))]}),e.jsx(d,{children:e.jsx(k,{dataset:y(s,"Female"),gender:"Female",chartSetting:u})})]})})]})]})},f=({dataset:i,type:o,chartSetting:t})=>{let l=null;return o==="Average"&&(l=[{max:10}]),e.jsx(E,{dataset:i,xAxis:[{scaleType:"band",dataKey:"label"}],yAxis:l,series:[{dataKey:`male${o}`,label:"Male",color:"#3399ff"},{dataKey:`female${o}`,label:"Female",color:"#e55353"}],grid:{horizontal:!0},...t})},k=({dataset:i,gender:o,chartSetting:t})=>{const l=o==="Male"?"#3399ff":"#e55353";return e.jsx(E,{dataset:i,xAxis:[{scaleType:"band",dataKey:"name"}],yAxis:[{max:20}],series:[{dataKey:"score",label:"Combined Score",color:l}],grid:{horizontal:!0},...t})};function j(i,o){let t=0,l=0;i.map(a=>{a.events.forEach(g=>{g.class===o&&(t=t+g.score,l++)})});const r=l!==0?t/l:0;return Math.round(r*100)/100}function D(i){let o=0,t=0;i.map(r=>{o+=r.score,t++});const l=t!==0?o/t:0;return Math.round(l*100)/100}function C(i,o){let t={};i.map(r=>{r.events.map(a=>{a.class===o&&(t[a.form]||(t[a.form]={maleCount:0,femaleCount:0,maleTotal:0,femaleTotal:0,maleAverage:0,femaleAverage:0,label:`${r.group} - ${a.type}`}),t[a.form][r.gender.toLowerCase()+"Count"]+=1,t[a.form][r.gender.toLowerCase()+"Total"]+=a.score)})});let l=Object.values(t);return l.map(r=>{r.maleAverage=r.maleCount!==0?Math.round(r.maleTotal/r.maleCount*100)/100:0,r.femaleAverage=r.femaleCount!==0?Math.round(r.femaleTotal/r.femaleCount*100)/100:0}),l.sort((r,a)=>r.label<a.label?-1:r.label>a.label?1:0)}function y(i,o){let t=[];const l=i.filter(a=>a.gender===o);let r=10;l.length<10&&(r=l.length);for(let a=0;a<r;a++){const g={score:l[a].finalScore,name:l[a].athlete};t.push(g)}return t}export{de as default};
