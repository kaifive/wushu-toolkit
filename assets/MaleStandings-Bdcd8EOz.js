import{r as m,j as e}from"./index-DaaECyk7.js";import{s as M,g as L}from"./sortStandings-DkvFZbCF.js";import{C as G}from"./CAlert-D-oD-ePa.js";import{C as k}from"./CAlertLink-zs5v_PWM.js";import{C as o,a}from"./CRow-DH9lIp_T.js";import{C as j,a as x}from"./CCardBody-BHd87pYM.js";import{C as p}from"./CCardHeader-Copk0Avi.js";import{C as R,a as E}from"./CInputGroupText-CGCdKYev.js";import{C as H}from"./CFormSelect-DoWT4N8j.js";import{a as K}from"./index.es-sDt4CLI9.js";import{C as g,a as f,b as h,c as l,d as C,e as i}from"./CTable-CIwLinl9.js";import"./DefaultLayout-TU9xk17e.js";import"./CFormControlWrapper-BClSTyW9.js";import"./CFormControlValidation-DaSLTuVw.js";import"./CFormLabel-BDcODpte.js";const se=()=>{const[c,n]=m.useState(""),[s,r]=m.useState({athleteData:{},schools:[],loading:!0,error:null});m.useEffect(()=>{const t=()=>{L().then(v=>{r(v)}).catch(v=>{r({athleteData:{},schools:[],loading:!0,error:null})})};t();const I=setInterval(t,1*60*1e3);return()=>clearInterval(I)},[r]);const{athleteData:w,loading:y,error:D,syncDate:N}=s,u=M(w).filter(t=>t.gender==="Male"),S=u.filter(t=>t.group==="A"),T=u.filter(t=>t.group==="B"),b=u.filter(t=>t.group==="C");if(y)return e.jsx("div",{children:"Loading..."});if(D)return e.jsxs(G,{color:"danger",children:["An error has occurred getting scores, refresh this page. If this problem continues to persist, contact Khai Nguyen and check the ",e.jsx(k,{href:"https://bowuu.com/all-results",target:"_blank",children:"Official Total Scores"}),"."]});let d=null;return c===""?d=e.jsxs(e.Fragment,{children:[e.jsx(o,{children:e.jsx(a,{xs:12,children:e.jsx(A,{standings:S})})}),e.jsx(o,{children:e.jsx(a,{xs:12,children:e.jsx(F,{standings:T})})}),e.jsx(o,{children:e.jsx(a,{xs:12,children:e.jsx(B,{standings:b})})})]}):c==="A"?d=e.jsx(e.Fragment,{children:e.jsx(o,{children:e.jsx(a,{xs:12,children:e.jsx(A,{standings:S})})})}):c==="B"?d=e.jsx(e.Fragment,{children:e.jsx(o,{children:e.jsx(a,{xs:12,children:e.jsx(F,{standings:T})})})}):c==="C"&&(d=e.jsx(e.Fragment,{children:e.jsx(o,{children:e.jsx(a,{xs:12,children:e.jsx(B,{standings:b})})})})),e.jsxs(e.Fragment,{children:[e.jsx(o,{children:e.jsx(a,{xs:12,children:e.jsxs(G,{color:"info",children:["Standings as of ",N,". To update scores, refresh this page or wait 1 minute."]})})}),e.jsx(o,{children:e.jsx(a,{xs:12,children:e.jsxs(j,{className:"mb-4",children:[e.jsx(p,{children:e.jsx("strong",{children:"Standing Filters"})}),e.jsxs(x,{children:[e.jsx(o,{children:e.jsxs(R,{className:"mb-3",children:[e.jsx(E,{style:{width:"75px"},children:"Group: "}),e.jsxs(H,{value:c,onChange:t=>n(t.target.value),children:[e.jsx("option",{value:"",children:"*"}),e.jsx("option",{value:"A",children:"A Group"}),e.jsx("option",{value:"B",children:"B Group"}),e.jsx("option",{value:"C",children:"C Group"})]})]})}),e.jsx("div",{className:"d-grid gap-2 d-md-flex justify-content-md-end",children:e.jsx(K,{style:{},color:"primary",onClick:()=>{n("")},children:"Reset Filter"})})]})]})})}),d]})},A=({standings:c})=>e.jsxs(j,{className:"mb-4",children:[e.jsxs(p,{children:[e.jsx("strong",{children:"Live Standings"})," - Male | A Group"]}),e.jsx(x,{children:e.jsxs(g,{striped:!0,hover:!0,responsive:!0,children:[e.jsx(f,{children:e.jsxs(h,{children:[e.jsx(l,{scope:"col",children:"Team Status"}),e.jsx(l,{scope:"col",children:"Athlete"}),e.jsx(l,{scope:"col",children:"School"}),e.jsx(l,{scope:"col",children:"Final Score"})]})}),e.jsx(C,{children:c.map((n,s)=>{let r="#"+s;return s>=0&&s<3?r="A Team":s>=3&&s<6?r="B Team":s>=6&&s<9&&(r="C Team"),e.jsxs(h,{children:[e.jsx(l,{scope:"row",children:r}),e.jsx(i,{children:n.athlete}),e.jsx(i,{children:n.school}),e.jsx(i,{children:n.finalScore})]},s)})})]})})]}),F=({standings:c})=>e.jsxs(j,{className:"mb-4",children:[e.jsxs(p,{children:[e.jsx("strong",{children:"Live Standings"})," - Male | B Group"]}),e.jsx(x,{children:e.jsxs(g,{striped:!0,hover:!0,responsive:!0,children:[e.jsx(f,{children:e.jsxs(h,{children:[e.jsx(l,{scope:"col",children:"Team Status"}),e.jsx(l,{scope:"col",children:"Athlete"}),e.jsx(l,{scope:"col",children:"School"}),e.jsx(l,{scope:"col",children:"Final Score"})]})}),e.jsx(C,{children:c.map((n,s)=>{let r="#"+s;return s>=0&&s<2?r="A Team":s>=2&&s<4?r="B Team":s>=4&&s<6&&(r="C Team"),e.jsxs(h,{children:[e.jsx(l,{scope:"row",children:r}),e.jsx(i,{children:n.athlete}),e.jsx(i,{children:n.school}),e.jsx(i,{children:n.finalScore})]},s)})})]})})]}),B=({standings:c})=>e.jsxs(j,{className:"mb-4",children:[e.jsxs(p,{children:[e.jsx("strong",{children:"Live Standings"})," - Male | C Group"]}),e.jsx(x,{children:e.jsxs(g,{striped:!0,hover:!0,responsive:!0,children:[e.jsx(f,{children:e.jsxs(h,{children:[e.jsx(l,{scope:"col",children:"Team Status"}),e.jsx(l,{scope:"col",children:"Athlete"}),e.jsx(l,{scope:"col",children:"School"}),e.jsx(l,{scope:"col",children:"Final Score"})]})}),e.jsx(C,{children:c.map((n,s)=>{let r="#"+s;return s>=0&&s<2?r="A Team":s>=2&&s<4?r="B Team":s>=4&&s<6&&(r="C Team"),e.jsxs(h,{children:[e.jsx(l,{scope:"row",children:r}),e.jsx(i,{children:n.athlete}),e.jsx(i,{children:n.school}),e.jsx(i,{children:n.finalScore})]},s)})})]})})]});export{se as default};
