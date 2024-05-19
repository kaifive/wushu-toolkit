import{r as b,j as e}from"./index-CElTUelm.js";import{c as L,a as H}from"./index.es-BW7ilCWv.js";import{s as v,g as _}from"./sortStandings-DkvFZbCF.js";import{c as p,a as k}from"./calculatePercentage-BRYGkmoQ.js";import{C as S}from"./CAlert-CJ7AKUAI.js";import{C as q}from"./CAlertLink-CEvuQFZW.js";import{C as u,a as c}from"./CRow-djQU6Uen.js";import{C as g}from"./CWidgetStatsB-j0mOGr8X.js";import{C as A,a as W}from"./CCardBody-DtJaO40X.js";import{C as y}from"./CCardHeader-DG7C2oY3.js";import{C as D}from"./CWidgetStatsF-CC4mLire.js";import{c as I}from"./cil-chart-pie-DAJ2n9ge.js";import{C as R,a as U}from"./CInputGroupText-CzLPl8Yl.js";import{C as E}from"./CFormSelect-CR_pGCnx.js";import{B as Q}from"./BarChart--YREZs2i.js";import"./DefaultLayout-BCaloUkW.js";import"./CProgress-B_M7lBmy.js";import"./CCardFooter-CV32sG5U.js";import"./CFormControlWrapper-DHx3HMhE.js";import"./CFormControlValidation-D2gcis0q.js";import"./CFormLabel-N7opIoiE.js";const je=()=>{const[a,i]=b.useState(""),[o,s]=b.useState(""),[x,t]=b.useState({athleteData:{},schools:[],loading:!0,error:null});b.useEffect(()=>{const l=()=>{_().then(F=>{t(F)}).catch(F=>{t({athleteData:{},schools:[],loading:!0,error:null})})};l();const d=setInterval(l,1*60*1e3);return()=>clearInterval(d)},[t]);const{athleteData:n,schools:J,athletes:M,loading:O,error:z,syncDate:P}=x;let B=M,r=v(n);if(a!==""&&(r=r.filter(l=>l.school===a),B=B.filter(l=>l.school===a)),o!==""&&(r=r.filter(l=>l.athlete===o)),O)return e.jsx("div",{children:"Loading..."});if(z)return e.jsxs(S,{color:"danger",children:["An error has occurred getting scores, refresh this page. If this problem continues to persist, contact Khai Nguyen and check the ",e.jsx(q,{href:"https://bowuu.com/all-results",target:"_blank",children:"Official Total Scores"}),"."]});let T=null;r=r[0];let h=null,f=null,m=v(n);if(o==="")T=e.jsx(S,{color:"danger",children:"Select an Athlete."});else{h=v(n).filter(d=>d.group===r.group),h=h.filter(d=>d.gender===r.gender),f=v(n).filter(d=>d.gender===r.gender);const l=r.group==="A"?9:6;T=e.jsxs(e.Fragment,{children:[e.jsxs(u,{xs:{gutter:3},children:[e.jsx(c,{xs:12,sm:6,xl:3,xxl:3,children:e.jsx(g,{className:"mb-3",color:"white",progress:{value:p(r.topEvents.Barehand.score,10)},text:w(r,"Barehand"),title:"Top Barehand Score",value:`${C(r,"Barehand")} / 10.00`})}),e.jsx(c,{xs:12,sm:6,xl:3,xxl:3,children:e.jsx(g,{className:"mb-3",color:"white",progress:{value:p(C(r,"Short Weapon"),10)},text:w(r,"Short Weapon"),title:"Top Short Weapon Score",value:`${C(r,"Short Weapon")} / 10.00`})}),e.jsx(c,{xs:12,sm:6,xl:3,xxl:3,children:e.jsx(g,{className:"mb-3",color:"white",progress:{value:p(C(r,"Long Weapon"),10)},text:w(r,"Long Weapon"),title:"Top Long Weapon Score",value:`${C(r,"Long Weapon")} / 10.00`})}),e.jsx(c,{xs:12,sm:6,xl:3,xxl:3,children:e.jsx(g,{className:"mb-3",color:"white",progress:{value:p(r.finalScore,20)},text:"Top Barehand + Top Weapon",title:"Combined Score",value:`${r.finalScore} / 20.00`})})]}),e.jsx("br",{}),e.jsxs(u,{xs:{gutter:3},children:[e.jsx(c,{xs:12,sm:12,xl:4,xxl:4,children:e.jsx(g,{className:"mb-3",color:"white",progress:{value:p(h.length-j(r,h)+1,h.length)},text:"Ranking in Group & Gender",value:`#${j(r,h)} of ${h.length}`})}),e.jsx(c,{xs:12,sm:12,xl:4,xxl:4,children:e.jsx(g,{className:"mb-3",color:"white",progress:{value:p(f.length-j(r,f)+1,f.length)},text:"Ranking in Gender",value:`#${j(r,f)} of ${f.length}`})}),e.jsx(c,{xs:12,sm:12,xl:4,xxl:4,children:e.jsx(g,{className:"mb-3",color:"white",progress:{value:p(m.length-j(r,m)+1,m.length)},text:"Ranking in USA",value:`#${j(r,m)} of ${m.length}`})})]}),e.jsx("br",{}),e.jsx(u,{children:e.jsx(c,{xs:12,sm:12,xl:12,xxl:12,children:e.jsxs(A,{children:[e.jsxs(y,{children:[e.jsx("strong",{children:"Athlete Barehand Score Comparison"})," ",e.jsx("br",{}),"Average Overall Barehand Score in Group & Gender: ",N(h,"Barehand")]}),e.jsx(W,{children:e.jsx(G,{dataset:$(r,m,"Barehand")})})]})})}),e.jsx("br",{}),e.jsxs(u,{xs:{gutter:3},children:[e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsxs(A,{children:[e.jsxs(y,{children:[e.jsx("strong",{children:"Athlete Short Weapon Score Comparison"}),e.jsx("br",{}),"Average Overall Short Weapon Score in Group & Gender: ",N(h,"Short Weapon")]}),e.jsx(W,{children:e.jsx(G,{dataset:$(r,m,"Short Weapon")})})]})}),e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsxs(A,{children:[e.jsxs(y,{children:[e.jsx("strong",{children:"Athlete Long Weapon Score Comparison"}),e.jsx("br",{}),"Average Overall Long Weapon Score in Group & Gender: ",N(h,"Long Weapon")]}),e.jsx(W,{children:e.jsx(G,{dataset:$(r,m,"Long Weapon")})})]})})]}),e.jsx("br",{}),e.jsxs(u,{xs:{gutter:3},children:[e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsx(D,{icon:e.jsx(L,{width:24,icon:I,size:"xl"}),title:"Average Barehand Score",value:`${K(r,"Barehand")} / 10.00`,color:"primary"})}),e.jsx(c,{xs:12,sm:12,xl:6,xxl:6,children:e.jsx(D,{icon:e.jsx(L,{width:24,icon:I,size:"xl"}),title:"Average Weapon Score",value:`${K(r,"Weapon")} / 10.00`,color:"primary"})})]}),e.jsx("br",{}),j(r,h)<l?e.jsxs(S,{color:"primary",children:[e.jsx("strong",{children:"US Junior Wushu Team Standing"}),e.jsx("br",{}),"Congratulations, ",r.athlete," is currently on the 2024 US Junior Wushu Team!"]}):e.jsxs(S,{color:"warning",children:[e.jsx("strong",{children:"US Junior Wushu Team Standing"}),e.jsx("br",{}),"Unfortunately, ",r.athlete," is currently not on the 2024 US Junior Wushu Team. "]}),e.jsx("br",{})]})}return e.jsxs(e.Fragment,{children:[e.jsx(u,{children:e.jsx(c,{xs:12,children:e.jsxs(S,{color:"info",children:["Scores as of ",P,". To update scores, refresh this page or wait 1 minute."]})})}),e.jsx(u,{children:e.jsx(c,{xs:12,children:e.jsxs(A,{className:"mb-4",children:[e.jsx(y,{children:e.jsx("strong",{children:"Total Score Filters"})}),e.jsxs(W,{children:[e.jsx(u,{children:e.jsxs(R,{className:"mb-3",children:[e.jsx(U,{style:{width:"75px"},children:"School: "}),e.jsxs(E,{value:a,onChange:l=>{i(l.target.value),s("")},children:[e.jsx("option",{value:"",children:"*"}),J.map((l,d)=>e.jsx("option",{value:l,children:l},d))]})]})}),e.jsx(u,{children:e.jsxs(R,{className:"mb-3",children:[e.jsx(U,{style:{width:"75px"},children:"Athlete: "}),e.jsxs(E,{value:o,onChange:l=>s(l.target.value),children:[e.jsx("option",{value:"",children:"*"}),B.map((l,d)=>e.jsx("option",{value:l.name,children:l.name},d))]})]})}),e.jsx("div",{className:"d-grid gap-2 d-md-flex justify-content-md-end",children:e.jsx(H,{style:{},color:"primary",onClick:()=>{i(""),s("")},children:"Reset Filters"})})]})]})})}),T]})},G=({dataset:a})=>{const i={height:500,sx:{[`.${k.left} .${k.label}`]:{transform:"translate(-20px, 0)"}}};return e.jsx(Q,{dataset:a,xAxis:[{scaleType:"band",dataKey:"label"}],yAxis:[{max:10}],series:[{dataKey:"athlete",label:"Athlete Score",color:"#1b9e3e"},{dataKey:"group",label:"Group Average",color:"#3399ff"},{dataKey:"gender",label:"Group & Gender Average",color:"#e55353"}],grid:{horizontal:!0},...i})};function C(a,i){let o=0;return a.events.map(s=>{s.class===i&&s.score>o&&(o=s.score)}),o}function w(a,i){let o=0,s="Not Applicable";return a.events.map(x=>{x.class===i&&x.score>o&&(o=x.score,s=x.form)}),s}function j(a,i){let o=1;for(const s of i){if(s.athlete===a.athlete)return o;o+=1}return null}function K(a,i){let o=0,s=0;a.events.forEach(t=>{t.class.includes(i)&&(o=o+t.score,s++)});const x=s!==0?o/s:0;return Math.round(x*100)/100}function $(a,i,o){let s={};i.map(t=>{t.group===a.group&&t.events.map(n=>{n.class===o&&(s[n.form]||(s[n.form]={groupTotalScore:0,groupCount:0,genderTotalScore:0,genderCount:0}),t.gender===a.gender&&(s[n.form].genderTotalScore+=n.score,s[n.form].genderCount++),s[n.form].groupTotalScore+=n.score,s[n.form].groupCount++)})});let x=[];return a.events.map(t=>{t.class===o&&x.push({label:t.form,athlete:t.score,group:s[t.form].groupCount!==0?Math.round(s[t.form].groupTotalScore/s[t.form].groupCount*100)/100:0,gender:s[t.form].genderCount!==0?Math.round(s[t.form].genderTotalScore/s[t.form].genderCount*100)/100:0})}),x}function N(a,i){let o=0,s=0;a.map(t=>{t.events.map(n=>{n.class===i&&(o+=n.score,s++)})});const x=s!==0?o/s:0;return Math.round(x*100)/100}export{je as default};