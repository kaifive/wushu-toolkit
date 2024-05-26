import{r as v,k as Q,j as e}from"./index-CwZinMA-.js";import{c as M,a as V}from"./index.es-BRguBUzB.js";import{s as W,g as X}from"./sortStandings-BKA6Uv8N.js";import{c as m,a as C}from"./calculatePercentage-BPZlyN7g.js";import{C as S}from"./CAlert-C5cijoaG.js";import{C as Y}from"./CAlertLink-CY4uuIZ7.js";import{C as u,a as c}from"./CRow-RTIxXRUG.js";import{C as p}from"./CWidgetStatsB-j2coDY8X.js";import{C as y,a as B}from"./CCardBody-Dz3B_DsP.js";import{C as T}from"./CCardHeader-CG33Z5Kr.js";import{C as D}from"./CWidgetStatsF-B_GfX0TN.js";import{c as R}from"./cil-chart-pie-DAJ2n9ge.js";import{C as U,a as E}from"./CInputGroupText-eoGZCRuZ.js";import{C as K}from"./CFormSelect-BkrAyWU7.js";import{B as Z}from"./BarChart-DIBmbBJC.js";import"./DefaultLayout-DVQz6GJd.js";import"./CProgress-DzTElEP8.js";import"./CCardFooter-D2z8DV1U.js";import"./CFormControlWrapper-t4WKZHDn.js";import"./CFormControlValidation-Db0Gua_R.js";import"./CFormLabel-JuYYA5sz.js";const Ae=()=>{const[a,i]=v.useState(""),[s,r]=v.useState(""),[d,t]=v.useState({athleteData:{},schools:[],loading:!0,error:null});v.useEffect(()=>{const l=()=>{X().then(I=>{t(I)}).catch(I=>{t({athleteData:{},schools:[],loading:!0,error:null})})};l();const h=setInterval(l,1*60*1e3);return()=>clearInterval(h)},[t,setInterval]);const{colorMode:n,setColorMode:ee}=Q("coreui-free-react-admin-template-theme"),J=n==="dark"?{[`.${C.root}`]:{[`.${C.tick}, .${C.line}`]:{stroke:"white",strokeWidth:3},[`.${C.tickLabel}`]:{fill:"white"}},".MuiChartsGrid-horizontalLine":{stroke:"white"},".MuiChartsLegend-series text":{color:"white !important",fill:"white !important"}}:{},G={height:300,sx:{[`.${C.left} .${C.label}`]:{transform:"translate(-20px, 0)"},...J}},{athleteData:A,schools:O,athletes:P,loading:H,error:_,syncDate:q}=d;let $=P,o=W(A);if(a!==""&&(o=o.filter(l=>l.school===a),$=$.filter(l=>l.school===a)),s!==""&&(o=o.filter(l=>l.athlete===s)),H)return e.jsx("div",{children:"Loading..."});if(_)return e.jsxs(S,{color:"danger",children:["An error has occurred getting scores, refresh this page. If this problem continues to persist, contact Khai Nguyen and check the ",e.jsx(Y,{href:"https://bowuu.com/all-results",target:"_blank",children:"Official Total Scores"}),"."]});let k=null;o=o[0];let x=null,j=null,g=W(A);if(s==="")k=e.jsx(S,{color:"danger",children:"Select an Athlete."});else{x=W(A).filter(h=>h.group===o.group),x=x.filter(h=>h.gender===o.gender),j=W(A).filter(h=>h.gender===o.gender);const l=o.group==="A"?9:6;k=e.jsxs(e.Fragment,{children:[e.jsxs(u,{xs:{gutter:3},children:[e.jsx(c,{xs:12,sm:6,xl:3,xxl:3,children:e.jsx(p,{className:"mb-3",progress:{value:m(o.topEvents.Barehand.score,10)},text:L(o,"Barehand"),title:"Top Barehand Score",value:`${b(o,"Barehand")} / 10.00`})}),e.jsx(c,{xs:12,sm:6,xl:3,xxl:3,children:e.jsx(p,{className:"mb-3",progress:{value:m(b(o,"Short Weapon"),10)},text:L(o,"Short Weapon"),title:"Top Short Weapon Score",value:`${b(o,"Short Weapon")} / 10.00`})}),e.jsx(c,{xs:12,sm:6,xl:3,xxl:3,children:e.jsx(p,{className:"mb-3",progress:{value:m(b(o,"Long Weapon"),10)},text:L(o,"Long Weapon"),title:"Top Long Weapon Score",value:`${b(o,"Long Weapon")} / 10.00`})}),e.jsx(c,{xs:12,sm:6,xl:3,xxl:3,children:e.jsx(p,{className:"mb-3",progress:{value:m(o.finalScore,20)},text:"Top Barehand + Top Weapon",title:"Combined Score",value:`${o.finalScore} / 20.00`})})]}),e.jsx("br",{}),e.jsxs(u,{xs:{gutter:3},children:[e.jsx(c,{xs:12,sm:12,xl:4,xxl:4,children:e.jsx(p,{className:"mb-3",progress:{value:m(x.length-f(o,x)+1,x.length)},text:"Ranking in Group & Gender",value:`#${f(o,x)} of ${x.length}`})}),e.jsx(c,{xs:12,sm:12,xl:4,xxl:4,children:e.jsx(p,{className:"mb-3",progress:{value:m(j.length-f(o,j)+1,j.length)},text:"Ranking in Gender",value:`#${f(o,j)} of ${j.length}`})}),e.jsx(c,{xs:12,sm:12,xl:4,xxl:4,children:e.jsx(p,{className:"mb-3",progress:{value:m(g.length-f(o,g)+1,g.length)},text:"Ranking in USA",value:`#${f(o,g)} of ${g.length}`})})]}),e.jsx("br",{}),e.jsx(u,{children:e.jsx(c,{xs:12,sm:12,xl:12,xxl:12,children:e.jsxs(y,{children:[e.jsxs(T,{children:[e.jsx("strong",{children:"Athlete Barehand Score Comparison"})," ",e.jsx("br",{}),"Average Overall Barehand Score in Group & Gender: ",F(x,"Barehand")]}),e.jsx(B,{children:e.jsx(w,{dataset:N(o,g,"Barehand"),chartSetting:G})})]})})}),e.jsx("br",{}),e.jsxs(u,{xs:{gutter:3},children:[e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsxs(y,{children:[e.jsxs(T,{children:[e.jsx("strong",{children:"Athlete Short Weapon Score Comparison"}),e.jsx("br",{}),"Average Overall Short Weapon Score in Group & Gender: ",F(x,"Short Weapon")]}),e.jsx(B,{children:e.jsx(w,{dataset:N(o,g,"Short Weapon"),chartSetting:G})})]})}),e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsxs(y,{children:[e.jsxs(T,{children:[e.jsx("strong",{children:"Athlete Long Weapon Score Comparison"}),e.jsx("br",{}),"Average Overall Long Weapon Score in Group & Gender: ",F(x,"Long Weapon")]}),e.jsx(B,{children:e.jsx(w,{dataset:N(o,g,"Long Weapon"),chartSetting:G})})]})})]}),e.jsx("br",{}),e.jsxs(u,{xs:{gutter:3},children:[e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsx(D,{icon:e.jsx(M,{width:24,icon:R,size:"xl"}),title:"Average Barehand Score",padding:!1,value:`${z(o,"Barehand")} / 10.00`,color:"primary"})}),e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsx(D,{icon:e.jsx(M,{width:24,icon:R,size:"xl"}),title:"Average Weapon Score",padding:!1,value:`${z(o,"Weapon")} / 10.00`,color:"primary"})})]}),e.jsx("br",{}),f(o,x)<l?e.jsxs(S,{color:"primary",children:[e.jsx("strong",{children:"US Junior Wushu Team Standing"}),e.jsx("br",{}),"Congratulations, ",o.athlete," is currently on the 2024 US Junior Wushu Team!"]}):e.jsxs(S,{color:"warning",children:[e.jsx("strong",{children:"US Junior Wushu Team Standing"}),e.jsx("br",{}),"Unfortunately, ",o.athlete," is currently not on the 2024 US Junior Wushu Team. "]}),e.jsx("br",{})]})}return e.jsxs(e.Fragment,{children:[e.jsx(u,{children:e.jsx(c,{xs:12,children:e.jsxs(S,{color:"info",children:["Scores as of ",q,". To update scores, refresh this page or wait 1 minute."]})})}),e.jsx(u,{children:e.jsx(c,{xs:12,children:e.jsxs(y,{className:"mb-4",children:[e.jsx(T,{children:e.jsx("strong",{children:"Total Score Filters"})}),e.jsxs(B,{children:[e.jsx(u,{children:e.jsxs(U,{className:"mb-3",children:[e.jsx(E,{style:{width:"75px"},children:"School: "}),e.jsxs(K,{value:a,onChange:l=>{i(l.target.value),r("")},children:[e.jsx("option",{value:"",children:"*"}),O.map((l,h)=>e.jsx("option",{value:l,children:l},h))]})]})}),e.jsx(u,{children:e.jsxs(U,{className:"mb-3",children:[e.jsx(E,{style:{width:"75px"},children:"Athlete: "}),e.jsxs(K,{value:s,onChange:l=>r(l.target.value),children:[e.jsx("option",{value:"",children:"*"}),$.map((l,h)=>e.jsx("option",{value:l.name,children:l.name},h))]})]})}),e.jsx("div",{className:"d-grid gap-2 d-md-flex justify-content-md-end",children:e.jsx(V,{style:{},color:"primary",onClick:()=>{i(""),r("")},children:"Reset Filters"})})]})]})})}),k]})},w=({dataset:a,chartSetting:i})=>e.jsx(Z,{dataset:a,xAxis:[{scaleType:"band",dataKey:"label"}],yAxis:[{max:10}],series:[{dataKey:"athlete",label:"Athlete Score",color:"#1b9e3e"},{dataKey:"group",label:"Group Average",color:"#3399ff"},{dataKey:"gender",label:"Group & Gender Average",color:"#e55353"}],grid:{horizontal:!0},...i});function b(a,i){let s=0;return a.events.map(r=>{r.class===i&&r.score>s&&(s=r.score)}),s}function L(a,i){let s=0,r="Not Applicable";return a.events.map(d=>{d.class===i&&d.score>s&&(s=d.score,r=d.form)}),r}function f(a,i){let s=1;for(const r of i){if(r.athlete===a.athlete)return s;s+=1}return null}function z(a,i){let s=0,r=0;a.events.forEach(t=>{t.class.includes(i)&&t.score!==0&&(s=s+t.score,r++)});const d=r!==0?s/r:0;return Math.round(d*1e3)/1e3}function N(a,i,s){let r={};i.map(t=>{t.group===a.group&&t.events.map(n=>{n.class===s&&(r[n.form]||(r[n.form]={groupTotalScore:0,groupCount:0,groupAverageCount:0,genderTotalScore:0,genderCount:0,genderAverageCount:0}),t.gender===a.gender&&(r[n.form].genderCount++,n.score!==0&&(r[n.form].genderTotalScore+=n.score,r[n.form].genderAverageCount++)),r[n.form].groupCount++,n.score!==0&&(r[n.form].groupTotalScore+=n.score,r[n.form].groupAverageCount++))})});let d=[];return a.events.map(t=>{t.class===s&&d.push({label:t.form,athlete:t.score,group:r[t.form].groupAverageCount!==0?Math.round(r[t.form].groupTotalScore/r[t.form].groupAverageCount*1e3)/1e3:0,gender:r[t.form].genderAverageCount!==0?Math.round(r[t.form].genderTotalScore/r[t.form].genderAverageCount*1e3)/1e3:0})}),d}function F(a,i){let s=0,r=0;a.map(t=>{t.events.map(n=>{n.class===i&&n.score!==0&&(s+=n.score,r++)})});const d=r!==0?s/r:0;return Math.round(d*1e3)/1e3}export{Ae as default};
