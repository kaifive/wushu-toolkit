import{r as d,j as s}from"./index-saOsx6TE.js";import{C as S}from"./CAlert-Bm5hXDXx.js";import{C as f,a as K}from"./CRow-Bd-_VEqq.js";import{C as M,a as B}from"./CCardBody-JhVVuJV4.js";import{C as O}from"./CCardHeader-6xjujN95.js";import{C as j,a as y}from"./CInputGroupText-BghLoQuS.js";import{C as w}from"./CFormInput-Di0HsGun.js";import{a as x}from"./index.es-j31rD6ei.js";import"./DefaultLayout-DYgob1Kc.js";import"./CFormControlWrapper-CCdBdDk5.js";import"./CFormControlValidation-BU67zDiH.js";import"./CFormLabel-CGaxVhZq.js";class g{constructor(t=0,r="Network Error"){this.status=t,this.text=r}}const q=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},a={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:q()},v=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},I=(e,t="https://api.emailjs.com")=>{if(!e)return;const r=v(e);a.publicKey=r.publicKey,a.blockHeadless=r.blockHeadless,a.storageProvider=r.storageProvider,a.blockList=r.blockList,a.limitRate=r.limitRate,a.origin=r.origin||t},F=async(e,t,r={})=>{const i=await fetch(a.origin+e,{method:"POST",headers:r,body:t}),o=await i.text(),n=new g(i.status,o);if(i.ok)return n;throw n},L=(e,t,r)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||typeof t!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!r||typeof r!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},A=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},P=e=>e.webdriver||!e.languages||e.languages.length===0,E=()=>new g(451,"Unavailable For Headless Browser"),D=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof t!="string")throw"The BlockList watchVariable has to be a string"},W=e=>{var t;return!((t=e.list)!=null&&t.length)||!e.watchVariable},z=(e,t)=>e instanceof FormData?e.get(t):e[t],R=(e,t)=>{if(W(e))return!1;D(e.list,e.watchVariable);const r=z(t,e.watchVariable);return typeof r!="string"?!1:e.list.includes(r)},T=()=>new g(403,"Forbidden"),U=(e,t)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&typeof t!="string")throw"The LimitRate ID has to be a string"},G=async(e,t,r)=>{const i=Number(await r.get(e)||0);return t-Date.now()+i},H=async(e,t,r)=>{if(!t.throttle||!r)return!1;U(t.throttle,t.id);const i=t.id||e;return await G(i,t.throttle,r)>0?!0:(await r.set(i,Date.now().toString()),!1)},N=()=>new g(429,"Too Many Requests"),J=async(e,t,r,i)=>{const o=v(i),n=o.publicKey||a.publicKey,h=o.blockHeadless||a.blockHeadless,m=a.storageProvider||o.storageProvider,b={...a.blockList,...o.blockList},u={...a.limitRate,...o.limitRate};return h&&P(navigator)?Promise.reject(E()):(L(n,e,t),A(r),r&&R(b,r)?Promise.reject(T()):await H(location.pathname,u,m)?Promise.reject(N()):F("/api/v1.0/email/send",JSON.stringify({lib_version:"4.3.3",user_id:n,service_id:e,template_id:t,template_params:r}),{"Content-type":"application/json"}))},Q=e=>{if(!e||e.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},X=e=>typeof e=="string"?document.querySelector(e):e,Y=async(e,t,r,i)=>{const o=v(i),n=o.publicKey||a.publicKey,h=o.blockHeadless||a.blockHeadless,m=a.storageProvider||o.storageProvider,b={...a.blockList,...o.blockList},u={...a.limitRate,...o.limitRate};if(h&&P(navigator))return Promise.reject(E());const p=X(r);L(n,e,t),Q(p);const c=new FormData(p);return R(b,c)?Promise.reject(T()):await H(location.pathname,u,m)?Promise.reject(N()):(c.append("lib_version","4.3.3"),c.append("service_id",e),c.append("template_id",t),c.append("user_id",n),F("/api/v1.0/email/send-form",c))},Z={init:I,send:J,sendForm:Y,EmailJSResponseStatus:g},ue=()=>{const[e,t]=d.useState(""),[r,i]=d.useState(""),[o,n]=d.useState(""),[h,m]=d.useState(""),[b,u]=d.useState(!1),[p,c]=d.useState(!1),C=d.useRef(),_=l=>{l.preventDefault(),Z.sendForm("service_3j61177","template_fgrygiq",C.current,{publicKey:"xo572Xf-hdKwWQOr6"}).then(()=>{u(!0),t(""),i(""),n(""),m("")},$=>{c(!0)})},[V,k]=d.useState(window.innerWidth<=768);return d.useEffect(()=>{const l=()=>{k(window.innerWidth<=768)};return window.addEventListener("resize",l),()=>{window.removeEventListener("resize",l)}},[k]),s.jsxs(s.Fragment,{children:[s.jsx(S,{color:"success",dismissible:!0,visible:b,onClose:()=>u(!1),children:"Email sent successfully!"}),s.jsx(S,{color:"failure",dismissible:!0,visible:p,onClose:()=>c(!1),children:"An error has occurred. Contact us directly via email at: tuongkhai.nguyen@gmail.com"}),s.jsx(f,{children:s.jsx(K,{xs:12,children:s.jsxs(M,{className:"mb-4",children:[s.jsx(O,{children:s.jsx("strong",{children:"Contact Us"})}),s.jsx(B,{children:s.jsxs("form",{ref:C,onSubmit:_,children:[s.jsx(f,{children:s.jsxs(j,{className:"mb-3",children:[s.jsx(y,{style:{width:"100px"},children:"Name: "}),s.jsx(w,{name:"contact_name",value:e,placeholder:"Enter Contact Name",onChange:l=>t(l.target.value)})]})}),s.jsx(f,{children:s.jsxs(j,{className:"mb-3",children:[s.jsx(y,{style:{width:"100px"},children:"Email: "}),s.jsx(w,{name:"contact_email",value:r,placeholder:"Enter Contact Email",onChange:l=>i(l.target.value)})]})}),s.jsx(f,{children:s.jsxs(j,{className:"mb-3",children:[s.jsx(y,{style:{width:"100px"},children:"Subject: "}),s.jsx(w,{name:"subject",value:o,placeholder:"Enter Subject",onChange:l=>n(l.target.value)})]})}),s.jsx(f,{children:s.jsxs(j,{className:"mb-3",children:[s.jsx(y,{style:{width:"100px"},children:"Message: "}),s.jsx(w,{name:"message",value:h,placeholder:"Enter Message",onChange:l=>m(l.target.value)})]})}),s.jsx("div",{className:"d-grid gap-2 d-md-flex justify-content-md-end",children:V?s.jsxs(s.Fragment,{children:[s.jsx(x,{type:"submit",color:"primary",children:"Send"}),s.jsx(x,{color:"secondary",onClick:()=>{t(""),i(""),n(""),m("")},children:"Cancel"})]}):s.jsxs(s.Fragment,{children:[s.jsx(x,{color:"secondary",onClick:()=>{t(""),i(""),n(""),m("")},children:"Cancel"}),s.jsx(x,{type:"submit",color:"primary",children:"Send"})]})})]})})]})})})]})};export{ue as default};
