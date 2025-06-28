import{r as B,R as x,n as En,_ as ze,a as Re,c as Ge,P as C,e as Ec}from"./index-DISsdtxp.js";function ao(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return B.useMemo(function(){return t.every(function(n){return n==null})?null:function(n){t.forEach(function(r){Tc(r,n)})}},t)}function Tc(t,e){if(t!=null)if(bc(t))t(e);else try{t.current=e}catch{throw new Error('Cannot assign value "'.concat(e,'" to ref "').concat(t,'"'))}}function bc(t){return!!(t&&{}.toString.call(t)=="[object Function]")}function Ac(t,e){if(t==null)return{};var n={};for(var r in t)if({}.hasOwnProperty.call(t,r)){if(e.includes(r))continue;n[r]=t[r]}return n}function Ri(t,e){return Ri=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,r){return n.__proto__=r,n},Ri(t,e)}function Sc(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,Ri(t,e)}var as={disabled:!1},co=x.createContext(null),Cc=function(e){return e.scrollTop},Ft="unmounted",Ze="exited",Qe="entering",gt="entered",Pi="exiting",Ie=function(t){Sc(e,t);function e(r,s){var a;a=t.call(this,r,s)||this;var l=s,h=l&&!l.isMounting?r.enter:r.appear,f;return a.appearStatus=null,r.in?h?(f=Ze,a.appearStatus=Qe):f=gt:r.unmountOnExit||r.mountOnEnter?f=Ft:f=Ze,a.state={status:f},a.nextCallback=null,a}e.getDerivedStateFromProps=function(s,a){var l=s.in;return l&&a.status===Ft?{status:Ze}:null};var n=e.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(s){var a=null;if(s!==this.props){var l=this.state.status;this.props.in?l!==Qe&&l!==gt&&(a=Qe):(l===Qe||l===gt)&&(a=Pi)}this.updateStatus(!1,a)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var s=this.props.timeout,a,l,h;return a=l=h=s,s!=null&&typeof s!="number"&&(a=s.exit,l=s.enter,h=s.appear!==void 0?s.appear:l),{exit:a,enter:l,appear:h}},n.updateStatus=function(s,a){if(s===void 0&&(s=!1),a!==null)if(this.cancelNextCallback(),a===Qe){if(this.props.unmountOnExit||this.props.mountOnEnter){var l=this.props.nodeRef?this.props.nodeRef.current:En.findDOMNode(this);l&&Cc(l)}this.performEnter(s)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Ze&&this.setState({status:Ft})},n.performEnter=function(s){var a=this,l=this.props.enter,h=this.context?this.context.isMounting:s,f=this.props.nodeRef?[h]:[En.findDOMNode(this),h],I=f[0],A=f[1],S=this.getTimeouts(),T=h?S.appear:S.enter;if(!s&&!l||as.disabled){this.safeSetState({status:gt},function(){a.props.onEntered(I)});return}this.props.onEnter(I,A),this.safeSetState({status:Qe},function(){a.props.onEntering(I,A),a.onTransitionEnd(T,function(){a.safeSetState({status:gt},function(){a.props.onEntered(I,A)})})})},n.performExit=function(){var s=this,a=this.props.exit,l=this.getTimeouts(),h=this.props.nodeRef?void 0:En.findDOMNode(this);if(!a||as.disabled){this.safeSetState({status:Ze},function(){s.props.onExited(h)});return}this.props.onExit(h),this.safeSetState({status:Pi},function(){s.props.onExiting(h),s.onTransitionEnd(l.exit,function(){s.safeSetState({status:Ze},function(){s.props.onExited(h)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(s,a){a=this.setNextCallback(a),this.setState(s,a)},n.setNextCallback=function(s){var a=this,l=!0;return this.nextCallback=function(h){l&&(l=!1,a.nextCallback=null,s(h))},this.nextCallback.cancel=function(){l=!1},this.nextCallback},n.onTransitionEnd=function(s,a){this.setNextCallback(a);var l=this.props.nodeRef?this.props.nodeRef.current:En.findDOMNode(this),h=s==null&&!this.props.addEndListener;if(!l||h){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var f=this.props.nodeRef?[this.nextCallback]:[l,this.nextCallback],I=f[0],A=f[1];this.props.addEndListener(I,A)}s!=null&&setTimeout(this.nextCallback,s)},n.render=function(){var s=this.state.status;if(s===Ft)return null;var a=this.props,l=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var h=Ac(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return x.createElement(co.Provider,{value:null},typeof l=="function"?l(s,h):x.cloneElement(x.Children.only(l),h))},e}(x.Component);Ie.contextType=co;Ie.propTypes={};function pt(){}Ie.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:pt,onEntering:pt,onEntered:pt,onExit:pt,onExiting:pt,onExited:pt};Ie.UNMOUNTED=Ft;Ie.EXITED=Ze;Ie.ENTERING=Qe;Ie.ENTERED=gt;Ie.EXITING=Pi;var Hi=B.forwardRef(function(t,e){var n=t.className,r=t.dark,s=t.disabled,a=t.white,l=ze(t,["className","dark","disabled","white"]);return x.createElement("button",Re({type:"button",className:Ge("btn","btn-close",{"btn-close-white":a},s,n),"aria-label":"Close",disabled:s},r&&{"data-coreui-theme":"dark"},l,{ref:e}))});Hi.propTypes={className:C.string,dark:C.bool,disabled:C.bool,white:C.bool};Hi.displayName="CCloseButton";var $i=B.forwardRef(function(t,e){var n=t.className,r=n===void 0?"modal-backdrop":n,s=t.visible,a=ze(t,["className","visible"]),l=B.useRef(null),h=ao(e,l);return x.createElement(Ie,{in:s,mountOnEnter:!0,nodeRef:l,timeout:150,unmountOnExit:!0},function(f){return x.createElement("div",Re({className:Ge(r,"fade",{show:f==="entered"})},a,{ref:h}))})});$i.propTypes={className:C.string,visible:C.bool};$i.displayName="CBackdrop";var kc=function(t){return t?typeof t=="function"?t():t:document.body},Rn=function(t){var e=t.children,n=t.container,r=t.portal,s=B.useState(null),a=s[0],l=s[1];return B.useEffect(function(){r&&l(kc(n)||document.body)},[n,r]),typeof window<"u"&&r&&a?Ec.createPortal(e,a):x.createElement(x.Fragment,null,e)};Rn.propTypes={children:C.node,container:C.any,portal:C.bool.isRequired};Rn.displayName="CConditionalPortal";var Wi=B.forwardRef(function(t,e){var n=t.children,r=t.className,s=ze(t,["children","className"]);return x.createElement("div",Re({className:Ge("modal-content",r)},s,{ref:e}),n)});Wi.propTypes={children:C.node,className:C.string};Wi.displayName="CModalContent";var lo=B.createContext({}),zi=B.forwardRef(function(t,e){var n,r=t.children,s=t.alignment,a=t.className,l=t.fullscreen,h=t.scrollable,f=t.size,I=ze(t,["children","alignment","className","fullscreen","scrollable","size"]);return x.createElement("div",Re({className:Ge("modal-dialog",(n={"modal-dialog-centered":s==="center"},n[typeof l=="boolean"?"modal-fullscreen":"modal-fullscreen-".concat(l,"-down")]=l,n["modal-dialog-scrollable"]=h,n["modal-".concat(f)]=f,n),a)},I,{ref:e}),r)});zi.propTypes={alignment:C.oneOf(["top","center"]),children:C.node,className:C.string,fullscreen:C.oneOfType([C.bool,C.oneOf(["sm","md","lg","xl","xxl"])]),scrollable:C.bool,size:C.oneOf(["sm","lg","xl"])};zi.displayName="CModalDialog";var uo=B.forwardRef(function(t,e){var n=t.children,r=t.alignment,s=t.backdrop,a=s===void 0?!0:s,l=t.className,h=t.container,f=t.duration,I=f===void 0?150:f,A=t.focus,S=A===void 0?!0:A,T=t.fullscreen,P=t.keyboard,R=P===void 0?!0:P,F=t.onClose,D=t.onClosePrevented,te=t.onShow,V=t.portal,j=V===void 0?!0:V,X=t.scrollable,Te=t.size,W=t.transition,y=W===void 0?!0:W,d=t.unmountOnClose,g=d===void 0?!0:d,m=t.visible,v=ze(t,["children","alignment","backdrop","className","container","duration","focus","fullscreen","keyboard","onClose","onClosePrevented","onShow","portal","scrollable","size","transition","unmountOnClose","visible"]),w=B.useRef(null),p=B.useRef(null),le=B.useRef(null),Ke=ao(e,p),nn=B.useState(m),ne=nn[0],be=nn[1],ct=B.useState(!1),bt=ct[0],rn=ct[1],ve={visible:ne,setVisible:be};B.useEffect(function(){be(m)},[m]),B.useEffect(function(){var G;return ne?(w.current=document.activeElement,document.addEventListener("mouseup",sn),document.addEventListener("keydown",De)):(G=w.current)===null||G===void 0||G.focus(),function(){document.removeEventListener("mouseup",sn),document.removeEventListener("keydown",De)}},[ne]);var $=function(){if(a==="static")return rn(!0);be(!1)};B.useLayoutEffect(function(){D&&D(),setTimeout(function(){return rn(!1)},I)},[bt]),B.useLayoutEffect(function(){return ne?(document.body.classList.add("modal-open"),a&&(document.body.style.overflow="hidden",document.body.style.paddingRight="0px"),setTimeout(function(){var G;S&&((G=p.current)===null||G===void 0||G.focus())},y?I:0)):(document.body.classList.remove("modal-open"),a&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))),function(){document.body.classList.remove("modal-open"),a&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))}},[ne]);var sn=function(G){p.current&&p.current==G.target&&$()},De=function(G){G.key==="Escape"&&R&&$()};return x.createElement(x.Fragment,null,x.createElement(Ie,{in:ne,mountOnEnter:!0,nodeRef:p,onEnter:te,onExit:F,unmountOnExit:g,timeout:y?I:0},function(G){return x.createElement(Rn,{container:h,portal:j},x.createElement(lo.Provider,{value:ve},x.createElement("div",Re({className:Ge("modal",{"modal-static":bt,fade:y,show:G==="entered"},l),tabIndex:-1},ne?{"aria-modal":!0,role:"dialog"}:{"aria-hidden":"true"},{style:Re({},G!=="exited"&&{display:"block"})},v,{ref:Ke}),x.createElement(zi,{alignment:r,fullscreen:T,scrollable:X,size:Te},x.createElement(Wi,{ref:le},n)))))}),a&&x.createElement(Rn,{container:h,portal:j},x.createElement($i,{visible:ne})))});uo.propTypes={alignment:C.oneOf(["top","center"]),backdrop:C.oneOfType([C.bool,C.oneOf(["static"])]),children:C.node,className:C.string,container:C.any,duration:C.number,focus:C.bool,fullscreen:C.oneOfType([C.bool,C.oneOf(["sm","md","lg","xl","xxl"])]),keyboard:C.bool,onClose:C.func,onClosePrevented:C.func,onShow:C.func,portal:C.bool,scrollable:C.bool,size:C.oneOf(["sm","lg","xl"]),transition:C.bool,unmountOnClose:C.bool,visible:C.bool};uo.displayName="CModal";var ho=B.forwardRef(function(t,e){var n=t.children,r=t.className,s=ze(t,["children","className"]);return x.createElement("div",Re({className:Ge("modal-footer",r)},s,{ref:e}),n)});ho.propTypes={children:C.node,className:C.string};ho.displayName="CModalFooter";var fo=B.forwardRef(function(t,e){var n=t.children,r=t.className,s=t.closeButton,a=s===void 0?!0:s,l=ze(t,["children","className","closeButton"]),h=B.useContext(lo).setVisible;return x.createElement("div",Re({className:Ge("modal-header",r)},l,{ref:e}),n,a&&x.createElement(Hi,{onClick:function(){return h(!1)}}))});fo.propTypes={children:C.node,className:C.string,closeButton:C.bool};fo.displayName="CModalHeader";var po=B.forwardRef(function(t,e){var n=t.children,r=t.as,s=r===void 0?"h5":r,a=t.className,l=ze(t,["children","as","className"]);return x.createElement(s,Re({className:Ge("modal-title",a)},l,{ref:e}),n)});po.propTypes={as:C.elementType,children:C.node,className:C.string};po.displayName="CModalTitle";const Rc=()=>{};var cs={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const go=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Pc=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const a=t[n++];e[r++]=String.fromCharCode((s&31)<<6|a&63)}else if(s>239&&s<365){const a=t[n++],l=t[n++],h=t[n++],f=((s&7)<<18|(a&63)<<12|(l&63)<<6|h&63)-65536;e[r++]=String.fromCharCode(55296+(f>>10)),e[r++]=String.fromCharCode(56320+(f&1023))}else{const a=t[n++],l=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(a&63)<<6|l&63)}}return e.join("")},mo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const a=t[s],l=s+1<t.length,h=l?t[s+1]:0,f=s+2<t.length,I=f?t[s+2]:0,A=a>>2,S=(a&3)<<4|h>>4;let T=(h&15)<<2|I>>6,P=I&63;f||(P=64,l||(T=64)),r.push(n[A],n[S],n[T],n[P])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(go(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Pc(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const a=n[t.charAt(s++)],h=s<t.length?n[t.charAt(s)]:0;++s;const I=s<t.length?n[t.charAt(s)]:64;++s;const S=s<t.length?n[t.charAt(s)]:64;if(++s,a==null||h==null||I==null||S==null)throw new Oc;const T=a<<2|h>>4;if(r.push(T),I!==64){const P=h<<4&240|I>>2;if(r.push(P),S!==64){const R=I<<6&192|S;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Oc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Nc=function(t){const e=go(t);return mo.encodeByteArray(e,!0)},Pn=function(t){return Nc(t).replace(/\./g,"")},vo=function(t){try{return mo.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lc=()=>Dc().__FIREBASE_DEFAULTS__,Mc=()=>{if(typeof process>"u"||typeof cs>"u")return;const t=cs.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},xc=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&vo(t[1]);return e&&JSON.parse(e)},Gi=()=>{try{return Rc()||Lc()||Mc()||xc()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},yo=t=>{var e,n;return(n=(e=Gi())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Uc=t=>{const e=yo(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},_o=()=>{var t;return(t=Gi())===null||t===void 0?void 0:t.config},wo=t=>{var e;return(e=Gi())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(t){return t.endsWith(".cloudworkstations.dev")}async function Io(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jc(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,a=t.sub||t.user_id;if(!a)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:a,user_id:a,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Pn(JSON.stringify(n)),Pn(JSON.stringify(l)),""].join(".")}const Vt={};function Bc(){const t={prod:[],emulator:[]};for(const e of Object.keys(Vt))Vt[e]?t.emulator.push(e):t.prod.push(e);return t}function Vc(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let ls=!1;function Eo(t,e){if(typeof window>"u"||typeof document>"u"||!Jt(window.location.host)||Vt[t]===e||Vt[t]||ls)return;Vt[t]=e;function n(T){return`__firebase__banner__${T}`}const r="__firebase__banner",a=Bc().prod.length>0;function l(){const T=document.getElementById(r);T&&T.remove()}function h(T){T.style.display="flex",T.style.background="#7faaf0",T.style.position="fixed",T.style.bottom="5px",T.style.left="5px",T.style.padding=".5em",T.style.borderRadius="5px",T.style.alignItems="center"}function f(T,P){T.setAttribute("width","24"),T.setAttribute("id",P),T.setAttribute("height","24"),T.setAttribute("viewBox","0 0 24 24"),T.setAttribute("fill","none"),T.style.marginLeft="-6px"}function I(){const T=document.createElement("span");return T.style.cursor="pointer",T.style.marginLeft="16px",T.style.fontSize="24px",T.innerHTML=" &times;",T.onclick=()=>{ls=!0,l()},T}function A(T,P){T.setAttribute("id",P),T.innerText="Learn more",T.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",T.setAttribute("target","__blank"),T.style.paddingLeft="5px",T.style.textDecoration="underline"}function S(){const T=Vc(r),P=n("text"),R=document.getElementById(P)||document.createElement("span"),F=n("learnmore"),D=document.getElementById(F)||document.createElement("a"),te=n("preprendIcon"),V=document.getElementById(te)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(T.created){const j=T.element;h(j),A(D,F);const X=I();f(V,te),j.append(V,R,D,X),document.body.appendChild(j)}a?(R.innerText="Preview backend disconnected.",V.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(V.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,R.innerText="Preview backend running in this workspace."),R.setAttribute("id",P)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",S):S()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Hc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ee())}function $c(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function To(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Wc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function zc(){const t=ee();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function bo(){try{return typeof indexedDB=="object"}catch{return!1}}function Ao(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var a;e(((a=s.error)===null||a===void 0?void 0:a.message)||"")}}catch(n){e(n)}})}function Gc(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qc="FirebaseError";class me extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=qc,Object.setPrototypeOf(this,me.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ot.prototype.create)}}class ot{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,a=this.errors[e],l=a?Kc(a,r):"Error",h=`${this.serviceName}: ${l} (${s}).`;return new me(s,h,r)}}function Kc(t,e){return t.replace(Jc,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Jc=/\{\$([^}]+)}/g;function Xc(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function nt(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const a=t[s],l=e[s];if(us(a)&&us(l)){if(!nt(a,l))return!1}else if(a!==l)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function us(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function jt(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,a]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(a)}}),e}function Bt(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Yc(t,e){const n=new Zc(t,e);return n.subscribe.bind(n)}class Zc{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Qc(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=yi),s.error===void 0&&(s.error=yi),s.complete===void 0&&(s.complete=yi);const a=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),a}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Qc(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function yi(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el=1e3,tl=2,nl=4*60*60*1e3,il=.5;function hs(t,e=el,n=tl){const r=e*Math.pow(n,t),s=Math.round(il*r*(Math.random()-.5)*2);return Math.min(nl,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(t){return t&&t._delegate?t._delegate:t}class pe{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Fc;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(a){if(s)return null;throw a}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ol(e))try{this.getOrInitializeService({instanceIdentifier:et})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const a=this.getOrInitializeService({instanceIdentifier:s});r.resolve(a)}catch{}}}}clearInstance(e=et){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=et){return this.instances.has(e)}getOptions(e=et){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[a,l]of this.instancesDeferred.entries()){const h=this.normalizeInstanceIdentifier(a);r===h&&l.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),a=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;a.add(e),this.onInitCallbacks.set(s,a);const l=this.instances.get(s);return l&&e(l,s),()=>{a.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:sl(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=et){return this.component?this.component.multipleInstances?e:et:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function sl(t){return t===et?void 0:t}function ol(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new rl(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var L;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(L||(L={}));const cl={debug:L.DEBUG,verbose:L.VERBOSE,info:L.INFO,warn:L.WARN,error:L.ERROR,silent:L.SILENT},ll=L.INFO,ul={[L.DEBUG]:"log",[L.VERBOSE]:"log",[L.INFO]:"info",[L.WARN]:"warn",[L.ERROR]:"error"},hl=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=ul[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Bn{constructor(e){this.name=e,this._logLevel=ll,this._logHandler=hl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in L))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?cl[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,L.DEBUG,...e),this._logHandler(this,L.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,L.VERBOSE,...e),this._logHandler(this,L.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,L.INFO,...e),this._logHandler(this,L.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,L.WARN,...e),this._logHandler(this,L.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,L.ERROR,...e),this._logHandler(this,L.ERROR,...e)}}const dl=(t,e)=>e.some(n=>t instanceof n);let ds,fs;function fl(){return ds||(ds=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function pl(){return fs||(fs=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const So=new WeakMap,Oi=new WeakMap,Co=new WeakMap,_i=new WeakMap,qi=new WeakMap;function gl(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",a),t.removeEventListener("error",l)},a=()=>{n(He(t.result)),s()},l=()=>{r(t.error),s()};t.addEventListener("success",a),t.addEventListener("error",l)});return e.then(n=>{n instanceof IDBCursor&&So.set(n,t)}).catch(()=>{}),qi.set(e,t),e}function ml(t){if(Oi.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",l),t.removeEventListener("abort",l)},a=()=>{n(),s()},l=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",a),t.addEventListener("error",l),t.addEventListener("abort",l)});Oi.set(t,e)}let Ni={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Oi.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Co.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return He(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function vl(t){Ni=t(Ni)}function yl(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(wi(this),e,...n);return Co.set(r,e.sort?e.sort():[e]),He(r)}:pl().includes(t)?function(...e){return t.apply(wi(this),e),He(So.get(this))}:function(...e){return He(t.apply(wi(this),e))}}function _l(t){return typeof t=="function"?yl(t):(t instanceof IDBTransaction&&ml(t),dl(t,fl())?new Proxy(t,Ni):t)}function He(t){if(t instanceof IDBRequest)return gl(t);if(_i.has(t))return _i.get(t);const e=_l(t);return e!==t&&(_i.set(t,e),qi.set(e,t)),e}const wi=t=>qi.get(t);function ko(t,e,{blocked:n,upgrade:r,blocking:s,terminated:a}={}){const l=indexedDB.open(t,e),h=He(l);return r&&l.addEventListener("upgradeneeded",f=>{r(He(l.result),f.oldVersion,f.newVersion,He(l.transaction),f)}),n&&l.addEventListener("blocked",f=>n(f.oldVersion,f.newVersion,f)),h.then(f=>{a&&f.addEventListener("close",()=>a()),s&&f.addEventListener("versionchange",I=>s(I.oldVersion,I.newVersion,I))}).catch(()=>{}),h}const wl=["get","getKey","getAll","getAllKeys","count"],Il=["put","add","delete","clear"],Ii=new Map;function ps(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ii.get(e))return Ii.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Il.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||wl.includes(n)))return;const a=async function(l,...h){const f=this.transaction(l,s?"readwrite":"readonly");let I=f.store;return r&&(I=I.index(h.shift())),(await Promise.all([I[n](...h),s&&f.done]))[0]};return Ii.set(e,a),a}vl(t=>({...t,get:(e,n,r)=>ps(e,n)||t.get(e,n,r),has:(e,n)=>!!ps(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Tl(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Tl(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Di="@firebase/app",gs="0.13.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pe=new Bn("@firebase/app"),bl="@firebase/app-compat",Al="@firebase/analytics-compat",Sl="@firebase/analytics",Cl="@firebase/app-check-compat",kl="@firebase/app-check",Rl="@firebase/auth",Pl="@firebase/auth-compat",Ol="@firebase/database",Nl="@firebase/data-connect",Dl="@firebase/database-compat",Ll="@firebase/functions",Ml="@firebase/functions-compat",xl="@firebase/installations",Ul="@firebase/installations-compat",Fl="@firebase/messaging",jl="@firebase/messaging-compat",Bl="@firebase/performance",Vl="@firebase/performance-compat",Hl="@firebase/remote-config",$l="@firebase/remote-config-compat",Wl="@firebase/storage",zl="@firebase/storage-compat",Gl="@firebase/firestore",ql="@firebase/ai",Kl="@firebase/firestore-compat",Jl="firebase",Xl="11.9.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Li="[DEFAULT]",Yl={[Di]:"fire-core",[bl]:"fire-core-compat",[Sl]:"fire-analytics",[Al]:"fire-analytics-compat",[kl]:"fire-app-check",[Cl]:"fire-app-check-compat",[Rl]:"fire-auth",[Pl]:"fire-auth-compat",[Ol]:"fire-rtdb",[Nl]:"fire-data-connect",[Dl]:"fire-rtdb-compat",[Ll]:"fire-fn",[Ml]:"fire-fn-compat",[xl]:"fire-iid",[Ul]:"fire-iid-compat",[Fl]:"fire-fcm",[jl]:"fire-fcm-compat",[Bl]:"fire-perf",[Vl]:"fire-perf-compat",[Hl]:"fire-rc",[$l]:"fire-rc-compat",[Wl]:"fire-gcs",[zl]:"fire-gcs-compat",[Gl]:"fire-fst",[Kl]:"fire-fst-compat",[ql]:"fire-vertex","fire-js":"fire-js",[Jl]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const On=new Map,Zl=new Map,Mi=new Map;function ms(t,e){try{t.container.addComponent(e)}catch(n){Pe.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function we(t){const e=t.name;if(Mi.has(e))return Pe.debug(`There were multiple attempts to register component ${e}.`),!1;Mi.set(e,t);for(const n of On.values())ms(n,t);for(const n of Zl.values())ms(n,t);return!0}function Yt(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function he(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ql={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},$e=new ot("app","Firebase",Ql);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new pe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw $e.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et=Xl;function Ro(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Li,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw $e.create("bad-app-name",{appName:String(s)});if(n||(n=_o()),!n)throw $e.create("no-options");const a=On.get(s);if(a){if(nt(n,a.options)&&nt(r,a.config))return a;throw $e.create("duplicate-app",{appName:s})}const l=new al(s);for(const f of Mi.values())l.addComponent(f);const h=new eu(n,r,l);return On.set(s,h),h}function Po(t=Li){const e=On.get(t);if(!e&&t===Li&&_o())return Ro();if(!e)throw $e.create("no-app",{appName:t});return e}function ae(t,e,n){var r;let s=(r=Yl[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const a=s.match(/\s|\//),l=e.match(/\s|\//);if(a||l){const h=[`Unable to register library "${s}" with version "${e}":`];a&&h.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&l&&h.push("and"),l&&h.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Pe.warn(h.join(" "));return}we(new pe(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tu="firebase-heartbeat-database",nu=1,Gt="firebase-heartbeat-store";let Ei=null;function Oo(){return Ei||(Ei=ko(tu,nu,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Gt)}catch(n){console.warn(n)}}}}).catch(t=>{throw $e.create("idb-open",{originalErrorMessage:t.message})})),Ei}async function iu(t){try{const n=(await Oo()).transaction(Gt),r=await n.objectStore(Gt).get(No(t));return await n.done,r}catch(e){if(e instanceof me)Pe.warn(e.message);else{const n=$e.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Pe.warn(n.message)}}}async function vs(t,e){try{const r=(await Oo()).transaction(Gt,"readwrite");await r.objectStore(Gt).put(e,No(t)),await r.done}catch(n){if(n instanceof me)Pe.warn(n.message);else{const r=$e.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Pe.warn(r.message)}}}function No(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru=1024,su=30;class ou{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new cu(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=ys();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(l=>l.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:s}),this._heartbeatsCache.heartbeats.length>su){const l=lu(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(l,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Pe.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=ys(),{heartbeatsToSend:r,unsentEntries:s}=au(this._heartbeatsCache.heartbeats),a=Pn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(n){return Pe.warn(n),""}}}function ys(){return new Date().toISOString().substring(0,10)}function au(t,e=ru){const n=[];let r=t.slice();for(const s of t){const a=n.find(l=>l.agent===s.agent);if(a){if(a.dates.push(s.date),_s(n)>e){a.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),_s(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class cu{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return bo()?Ao().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await iu(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return vs(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return vs(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function _s(t){return Pn(JSON.stringify({version:2,heartbeats:t})).length}function lu(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uu(t){we(new pe("platform-logger",e=>new El(e),"PRIVATE")),we(new pe("heartbeat",e=>new ou(e),"PRIVATE")),ae(Di,gs,t),ae(Di,gs,"esm2017"),ae("fire-js","")}uu("");function Ki(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Do(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const hu=Do,Lo=new ot("auth","Firebase",Do());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nn=new Bn("@firebase/auth");function du(t,...e){Nn.logLevel<=L.WARN&&Nn.warn(`Auth (${Et}): ${t}`,...e)}function An(t,...e){Nn.logLevel<=L.ERROR&&Nn.error(`Auth (${Et}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ge(t,...e){throw Ji(t,...e)}function ye(t,...e){return Ji(t,...e)}function Mo(t,e,n){const r=Object.assign(Object.assign({},hu()),{[e]:n});return new ot("auth","Firebase",r).create(e,{appName:t.name})}function We(t){return Mo(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ji(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Lo.create(t,...e)}function k(t,e,...n){if(!t)throw Ji(e,...n)}function Ce(t){const e="INTERNAL ASSERTION FAILED: "+t;throw An(e),new Error(e)}function Oe(t,e){t||Ce(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xi(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function fu(){return ws()==="http:"||ws()==="https:"}function ws(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pu(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(fu()||To()||"connection"in navigator)?navigator.onLine:!0}function gu(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e,n){this.shortDelay=e,this.longDelay=n,Oe(n>e,"Short delay should be less than long delay!"),this.isMobile=Hc()||Wc()}get(){return pu()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(t,e){Oe(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ce("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ce("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ce("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mu={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],yu=new Zt(3e4,6e4);function qe(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Ne(t,e,n,r,s={}){return Uo(t,s,async()=>{let a={},l={};r&&(e==="GET"?l=r:a={body:JSON.stringify(r)});const h=Xt(Object.assign({key:t.config.apiKey},l)).slice(1),f=await t._getAdditionalHeaders();f["Content-Type"]="application/json",t.languageCode&&(f["X-Firebase-Locale"]=t.languageCode);const I=Object.assign({method:e,headers:f},a);return $c()||(I.referrerPolicy="no-referrer"),t.emulatorConfig&&Jt(t.emulatorConfig.host)&&(I.credentials="include"),xo.fetch()(await Fo(t,t.config.apiHost,n,h),I)})}async function Uo(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},mu),e);try{const s=new wu(t),a=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const l=await a.json();if("needConfirmation"in l)throw Tn(t,"account-exists-with-different-credential",l);if(a.ok&&!("errorMessage"in l))return l;{const h=a.ok?l.errorMessage:l.error.message,[f,I]=h.split(" : ");if(f==="FEDERATED_USER_ID_ALREADY_LINKED")throw Tn(t,"credential-already-in-use",l);if(f==="EMAIL_EXISTS")throw Tn(t,"email-already-in-use",l);if(f==="USER_DISABLED")throw Tn(t,"user-disabled",l);const A=r[f]||f.toLowerCase().replace(/[_\s]+/g,"-");if(I)throw Mo(t,A,I);ge(t,A)}}catch(s){if(s instanceof me)throw s;ge(t,"network-request-failed",{message:String(s)})}}async function Vn(t,e,n,r,s={}){const a=await Ne(t,e,n,r,s);return"mfaPendingCredential"in a&&ge(t,"multi-factor-auth-required",{_serverResponse:a}),a}async function Fo(t,e,n,r){const s=`${e}${n}?${r}`,a=t,l=a.config.emulator?Xi(t.config,s):`${t.config.apiScheme}://${s}`;return vu.includes(n)&&(await a._persistenceManagerAvailable,a._getPersistenceType()==="COOKIE")?a._getPersistence()._getFinalTarget(l).toString():l}function _u(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class wu{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(ye(this.auth,"network-request-failed")),yu.get())})}}function Tn(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=ye(t,e,r);return s.customData._tokenResponse=n,s}function Is(t){return t!==void 0&&t.enterprise!==void 0}class Iu{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return _u(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Eu(t,e){return Ne(t,"GET","/v2/recaptchaConfig",qe(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tu(t,e){return Ne(t,"POST","/v1/accounts:delete",e)}async function Dn(t,e){return Ne(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ht(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function bu(t,e=!1){const n=Ee(t),r=await n.getIdToken(e),s=Yi(r);k(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const a=typeof s.firebase=="object"?s.firebase:void 0,l=a==null?void 0:a.sign_in_provider;return{claims:s,token:r,authTime:Ht(Ti(s.auth_time)),issuedAtTime:Ht(Ti(s.iat)),expirationTime:Ht(Ti(s.exp)),signInProvider:l||null,signInSecondFactor:(a==null?void 0:a.sign_in_second_factor)||null}}function Ti(t){return Number(t)*1e3}function Yi(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return An("JWT malformed, contained fewer than 3 sections"),null;try{const s=vo(n);return s?JSON.parse(s):(An("Failed to decode base64 JWT payload"),null)}catch(s){return An("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Es(t){const e=Yi(t);return k(e,"internal-error"),k(typeof e.exp<"u","internal-error"),k(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qt(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof me&&Au(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function Au({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ht(this.lastLoginAt),this.creationTime=Ht(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ln(t){var e;const n=t.auth,r=await t.getIdToken(),s=await qt(t,Dn(n,{idToken:r}));k(s==null?void 0:s.users.length,n,"internal-error");const a=s.users[0];t._notifyReloadListener(a);const l=!((e=a.providerUserInfo)===null||e===void 0)&&e.length?jo(a.providerUserInfo):[],h=ku(t.providerData,l),f=t.isAnonymous,I=!(t.email&&a.passwordHash)&&!(h!=null&&h.length),A=f?I:!1,S={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:h,metadata:new Ui(a.createdAt,a.lastLoginAt),isAnonymous:A};Object.assign(t,S)}async function Cu(t){const e=Ee(t);await Ln(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ku(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function jo(t){return t.map(e=>{var{providerId:n}=e,r=Ki(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ru(t,e){const n=await Uo(t,{},async()=>{const r=Xt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:a}=t.config,l=await Fo(t,s,"/v1/token",`key=${a}`),h=await t._getAdditionalHeaders();h["Content-Type"]="application/x-www-form-urlencoded";const f={method:"POST",headers:h,body:r};return t.emulatorConfig&&Jt(t.emulatorConfig.host)&&(f.credentials="include"),xo.fetch()(l,f)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Pu(t,e){return Ne(t,"POST","/v2/accounts:revokeToken",qe(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){k(e.idToken,"internal-error"),k(typeof e.idToken<"u","internal-error"),k(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Es(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){k(e.length!==0,"internal-error");const n=Es(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(k(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:a}=await Ru(e,n);this.updateTokensAndExpiration(r,s,Number(a))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:a}=n,l=new vt;return r&&(k(typeof r=="string","internal-error",{appName:e}),l.refreshToken=r),s&&(k(typeof s=="string","internal-error",{appName:e}),l.accessToken=s),a&&(k(typeof a=="number","internal-error",{appName:e}),l.expirationTime=a),l}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new vt,this.toJSON())}_performRefresh(){return Ce("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(t,e){k(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class de{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,a=Ki(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Su(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new Ui(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const n=await qt(this,this.stsTokenManager.getToken(this.auth,e));return k(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return bu(this,e)}reload(){return Cu(this)}_assign(e){this!==e&&(k(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new de(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){k(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ln(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(he(this.auth.app))return Promise.reject(We(this.auth));const e=await this.getIdToken();return await qt(this,Tu(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,a,l,h,f,I,A;const S=(r=n.displayName)!==null&&r!==void 0?r:void 0,T=(s=n.email)!==null&&s!==void 0?s:void 0,P=(a=n.phoneNumber)!==null&&a!==void 0?a:void 0,R=(l=n.photoURL)!==null&&l!==void 0?l:void 0,F=(h=n.tenantId)!==null&&h!==void 0?h:void 0,D=(f=n._redirectEventId)!==null&&f!==void 0?f:void 0,te=(I=n.createdAt)!==null&&I!==void 0?I:void 0,V=(A=n.lastLoginAt)!==null&&A!==void 0?A:void 0,{uid:j,emailVerified:X,isAnonymous:Te,providerData:W,stsTokenManager:y}=n;k(j&&y,e,"internal-error");const d=vt.fromJSON(this.name,y);k(typeof j=="string",e,"internal-error"),Ue(S,e.name),Ue(T,e.name),k(typeof X=="boolean",e,"internal-error"),k(typeof Te=="boolean",e,"internal-error"),Ue(P,e.name),Ue(R,e.name),Ue(F,e.name),Ue(D,e.name),Ue(te,e.name),Ue(V,e.name);const g=new de({uid:j,auth:e,email:T,emailVerified:X,displayName:S,isAnonymous:Te,photoURL:R,phoneNumber:P,tenantId:F,stsTokenManager:d,createdAt:te,lastLoginAt:V});return W&&Array.isArray(W)&&(g.providerData=W.map(m=>Object.assign({},m))),D&&(g._redirectEventId=D),g}static async _fromIdTokenResponse(e,n,r=!1){const s=new vt;s.updateFromServerResponse(n);const a=new de({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ln(a),a}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];k(s.localId!==void 0,"internal-error");const a=s.providerUserInfo!==void 0?jo(s.providerUserInfo):[],l=!(s.email&&s.passwordHash)&&!(a!=null&&a.length),h=new vt;h.updateFromIdToken(r);const f=new de({uid:s.localId,auth:e,stsTokenManager:h,isAnonymous:l}),I={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Ui(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(a!=null&&a.length)};return Object.assign(f,I),f}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ts=new Map;function ke(t){Oe(t instanceof Function,"Expected a class definition");let e=Ts.get(t);return e?(Oe(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Ts.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Bo.type="NONE";const bs=Bo;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sn(t,e,n){return`firebase:${t}:${e}:${n}`}class yt{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:a}=this.auth;this.fullUserKey=Sn(this.userKey,s.apiKey,a),this.fullPersistenceKey=Sn("persistence",s.apiKey,a),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Dn(this.auth,{idToken:e}).catch(()=>{});return n?de._fromGetAccountInfoResponse(this.auth,n,e):null}return de._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new yt(ke(bs),e,r);const s=(await Promise.all(n.map(async I=>{if(await I._isAvailable())return I}))).filter(I=>I);let a=s[0]||ke(bs);const l=Sn(r,e.config.apiKey,e.name);let h=null;for(const I of n)try{const A=await I._get(l);if(A){let S;if(typeof A=="string"){const T=await Dn(e,{idToken:A}).catch(()=>{});if(!T)break;S=await de._fromGetAccountInfoResponse(e,T,A)}else S=de._fromJSON(e,A);I!==a&&(h=S),a=I;break}}catch{}const f=s.filter(I=>I._shouldAllowMigration);return!a._shouldAllowMigration||!f.length?new yt(a,e,r):(a=f[0],h&&await a._set(l,h.toJSON()),await Promise.all(n.map(async I=>{if(I!==a)try{await I._remove(l)}catch{}})),new yt(a,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function As(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Wo(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Vo(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Go(e))return"Blackberry";if(qo(e))return"Webos";if(Ho(e))return"Safari";if((e.includes("chrome/")||$o(e))&&!e.includes("edge/"))return"Chrome";if(zo(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Vo(t=ee()){return/firefox\//i.test(t)}function Ho(t=ee()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function $o(t=ee()){return/crios\//i.test(t)}function Wo(t=ee()){return/iemobile/i.test(t)}function zo(t=ee()){return/android/i.test(t)}function Go(t=ee()){return/blackberry/i.test(t)}function qo(t=ee()){return/webos/i.test(t)}function Zi(t=ee()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Ou(t=ee()){var e;return Zi(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Nu(){return zc()&&document.documentMode===10}function Ko(t=ee()){return Zi(t)||zo(t)||qo(t)||Go(t)||/windows phone/i.test(t)||Wo(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jo(t,e=[]){let n;switch(t){case"Browser":n=As(ee());break;case"Worker":n=`${As(ee())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Et}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=a=>new Promise((l,h)=>{try{const f=e(a);l(f)}catch(f){h(f)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lu(t,e={}){return Ne(t,"GET","/v2/passwordPolicy",qe(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mu=6;class xu{constructor(e){var n,r,s,a;const l=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=l.minPasswordLength)!==null&&n!==void 0?n:Mu,l.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=l.maxPasswordLength),l.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=l.containsLowercaseCharacter),l.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=l.containsUppercaseCharacter),l.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=l.containsNumericCharacter),l.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=l.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(a=e.forceUpgradeOnSignin)!==null&&a!==void 0?a:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,a,l,h;const f={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,f),this.validatePasswordCharacterOptions(e,f),f.isValid&&(f.isValid=(n=f.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),f.isValid&&(f.isValid=(r=f.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),f.isValid&&(f.isValid=(s=f.containsLowercaseLetter)!==null&&s!==void 0?s:!0),f.isValid&&(f.isValid=(a=f.containsUppercaseLetter)!==null&&a!==void 0?a:!0),f.isValid&&(f.isValid=(l=f.containsNumericCharacter)!==null&&l!==void 0?l:!0),f.isValid&&(f.isValid=(h=f.containsNonAlphanumericCharacter)!==null&&h!==void 0?h:!0),f}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,a){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ss(this),this.idTokenSubscription=new Ss(this),this.beforeStateQueue=new Du(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Lo,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(a=>this._resolvePersistenceManagerAvailable=a)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ke(n)),this._initializationPromise=this.queue(async()=>{var r,s,a;if(!this._deleted&&(this.persistenceManager=await yt.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((a=this.currentUser)===null||a===void 0?void 0:a.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Dn(this,{idToken:e}),r=await de._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(he(this.app)){const l=this.app.settings.authIdToken;return l?new Promise(h=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(l).then(h,h))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const l=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,h=s==null?void 0:s._redirectEventId,f=await this.tryRedirectSignIn(e);(!l||l===h)&&(f!=null&&f.user)&&(s=f.user,a=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(s)}catch(l){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(l))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return k(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ln(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=gu()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(he(this.app))return Promise.reject(We(this));const n=e?Ee(e):null;return n&&k(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&k(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return he(this.app)?Promise.reject(We(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return he(this.app)?Promise.reject(We(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ke(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Lu(this),n=new xu(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ot("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await Pu(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&ke(e)||this._popupRedirectResolver;k(n,this,"argument-error"),this.redirectPersistenceManager=await yt.create(this,[ke(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const a=typeof n=="function"?n:n.next.bind(n);let l=!1;const h=this._isInitialized?Promise.resolve():this._initializationPromise;if(k(h,this,"internal-error"),h.then(()=>{l||a(this.currentUser)}),typeof n=="function"){const f=e.addObserver(n,r,s);return()=>{l=!0,f()}}else{const f=e.addObserver(n);return()=>{l=!0,f()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return k(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Jo(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;if(he(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&du(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function at(t){return Ee(t)}class Ss{constructor(e){this.auth=e,this.observer=null,this.addObserver=Yc(n=>this.observer=n)}get next(){return k(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Fu(t){Hn=t}function Xo(t){return Hn.loadJS(t)}function ju(){return Hn.recaptchaEnterpriseScript}function Bu(){return Hn.gapiScript}function Vu(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class Hu{constructor(){this.enterprise=new $u}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class $u{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const Wu="recaptcha-enterprise",Yo="NO_RECAPTCHA";class zu{constructor(e){this.type=Wu,this.auth=at(e)}async verify(e="verify",n=!1){async function r(a){if(!n){if(a.tenantId==null&&a._agentRecaptchaConfig!=null)return a._agentRecaptchaConfig.siteKey;if(a.tenantId!=null&&a._tenantRecaptchaConfigs[a.tenantId]!==void 0)return a._tenantRecaptchaConfigs[a.tenantId].siteKey}return new Promise(async(l,h)=>{Eu(a,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(f=>{if(f.recaptchaKey===void 0)h(new Error("recaptcha Enterprise site key undefined"));else{const I=new Iu(f);return a.tenantId==null?a._agentRecaptchaConfig=I:a._tenantRecaptchaConfigs[a.tenantId]=I,l(I.siteKey)}}).catch(f=>{h(f)})})}function s(a,l,h){const f=window.grecaptcha;Is(f)?f.enterprise.ready(()=>{f.enterprise.execute(a,{action:e}).then(I=>{l(I)}).catch(()=>{l(Yo)})}):h(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Hu().execute("siteKey",{action:"verify"}):new Promise((a,l)=>{r(this.auth).then(h=>{if(!n&&Is(window.grecaptcha))s(h,a,l);else{if(typeof window>"u"){l(new Error("RecaptchaVerifier is only supported in browser"));return}let f=ju();f.length!==0&&(f+=h),Xo(f).then(()=>{s(h,a,l)}).catch(I=>{l(I)})}}).catch(h=>{l(h)})})}}async function Cs(t,e,n,r=!1,s=!1){const a=new zu(t);let l;if(s)l=Yo;else try{l=await a.verify(n)}catch{l=await a.verify(n,!0)}const h=Object.assign({},e);if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in h){const f=h.phoneEnrollmentInfo.phoneNumber,I=h.phoneEnrollmentInfo.recaptchaToken;Object.assign(h,{phoneEnrollmentInfo:{phoneNumber:f,recaptchaToken:I,captchaResponse:l,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in h){const f=h.phoneSignInInfo.recaptchaToken;Object.assign(h,{phoneSignInInfo:{recaptchaToken:f,captchaResponse:l,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return h}return r?Object.assign(h,{captchaResp:l}):Object.assign(h,{captchaResponse:l}),Object.assign(h,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(h,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),h}async function Fi(t,e,n,r,s){var a;if(!((a=t._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const l=await Cs(t,e,n,n==="getOobCode");return r(t,l)}else return r(t,e).catch(async l=>{if(l.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const h=await Cs(t,e,n,n==="getOobCode");return r(t,h)}else return Promise.reject(l)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gu(t,e){const n=Yt(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),a=n.getOptions();if(nt(a,e??{}))return s;ge(s,"already-initialized")}return n.initialize({options:e})}function qu(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(ke);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ku(t,e,n){const r=at(t);k(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,a=Zo(e),{host:l,port:h}=Ju(e),f=h===null?"":`:${h}`,I={url:`${a}//${l}${f}/`},A=Object.freeze({host:l,port:h,protocol:a.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){k(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),k(nt(I,r.config.emulator)&&nt(A,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=I,r.emulatorConfig=A,r.settings.appVerificationDisabledForTesting=!0,Jt(l)?(Io(`${a}//${l}${f}`),Eo("Auth",!0)):Xu()}function Zo(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Ju(t){const e=Zo(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const a=s[1];return{host:a,port:ks(r.substr(a.length+1))}}else{const[a,l]=r.split(":");return{host:a,port:ks(l)}}}function ks(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Xu(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ce("not implemented")}_getIdTokenResponse(e){return Ce("not implemented")}_linkToIdToken(e,n){return Ce("not implemented")}_getReauthenticationResolver(e){return Ce("not implemented")}}async function Yu(t,e){return Ne(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zu(t,e){return Vn(t,"POST","/v1/accounts:signInWithPassword",qe(t,e))}async function Qu(t,e){return Ne(t,"POST","/v1/accounts:sendOobCode",qe(t,e))}async function eh(t,e){return Qu(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function th(t,e){return Vn(t,"POST","/v1/accounts:signInWithEmailLink",qe(t,e))}async function nh(t,e){return Vn(t,"POST","/v1/accounts:signInWithEmailLink",qe(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt extends Qi{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Kt(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Kt(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Fi(e,n,"signInWithPassword",Zu);case"emailLink":return th(e,{email:this._email,oobCode:this._password});default:ge(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Fi(e,r,"signUpPassword",Yu);case"emailLink":return nh(e,{idToken:n,email:this._email,oobCode:this._password});default:ge(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _t(t,e){return Vn(t,"POST","/v1/accounts:signInWithIdp",qe(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ih="http://localhost";class it extends Qi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new it(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):ge("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,a=Ki(n,["providerId","signInMethod"]);if(!r||!s)return null;const l=new it(r,s);return l.idToken=a.idToken||void 0,l.accessToken=a.accessToken||void 0,l.secret=a.secret,l.nonce=a.nonce,l.pendingToken=a.pendingToken||null,l}_getIdTokenResponse(e){const n=this.buildRequest();return _t(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,_t(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,_t(e,n)}buildRequest(){const e={requestUri:ih,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Xt(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rh(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function sh(t){const e=jt(Bt(t)).link,n=e?jt(Bt(e)).deep_link_id:null,r=jt(Bt(t)).deep_link_id;return(r?jt(Bt(r)).link:null)||r||n||e||t}class er{constructor(e){var n,r,s,a,l,h;const f=jt(Bt(e)),I=(n=f.apiKey)!==null&&n!==void 0?n:null,A=(r=f.oobCode)!==null&&r!==void 0?r:null,S=rh((s=f.mode)!==null&&s!==void 0?s:null);k(I&&A&&S,"argument-error"),this.apiKey=I,this.operation=S,this.code=A,this.continueUrl=(a=f.continueUrl)!==null&&a!==void 0?a:null,this.languageCode=(l=f.lang)!==null&&l!==void 0?l:null,this.tenantId=(h=f.tenantId)!==null&&h!==void 0?h:null}static parseLink(e){const n=sh(e);try{return new er(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(){this.providerId=Tt.PROVIDER_ID}static credential(e,n){return Kt._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=er.parseLink(n);return k(r,"argument-error"),Kt._fromEmailAndCode(e,r.code,r.tenantId)}}Tt.PROVIDER_ID="password";Tt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Tt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt extends Qo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe extends Qt{constructor(){super("facebook.com")}static credential(e){return it._fromParams({providerId:Fe.PROVIDER_ID,signInMethod:Fe.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Fe.credentialFromTaggedObject(e)}static credentialFromError(e){return Fe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Fe.credential(e.oauthAccessToken)}catch{return null}}}Fe.FACEBOOK_SIGN_IN_METHOD="facebook.com";Fe.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je extends Qt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return it._fromParams({providerId:je.PROVIDER_ID,signInMethod:je.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return je.credentialFromTaggedObject(e)}static credentialFromError(e){return je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return je.credential(n,r)}catch{return null}}}je.GOOGLE_SIGN_IN_METHOD="google.com";je.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be extends Qt{constructor(){super("github.com")}static credential(e){return it._fromParams({providerId:Be.PROVIDER_ID,signInMethod:Be.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Be.credentialFromTaggedObject(e)}static credentialFromError(e){return Be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Be.credential(e.oauthAccessToken)}catch{return null}}}Be.GITHUB_SIGN_IN_METHOD="github.com";Be.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve extends Qt{constructor(){super("twitter.com")}static credential(e,n){return it._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Ve.credential(n,r)}catch{return null}}}Ve.TWITTER_SIGN_IN_METHOD="twitter.com";Ve.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const a=await de._fromIdTokenResponse(e,r,s),l=Rs(r);return new wt({user:a,providerId:l,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Rs(r);return new wt({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Rs(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn extends me{constructor(e,n,r,s){var a;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Mn.prototype),this.customData={appName:e.name,tenantId:(a=e.tenantId)!==null&&a!==void 0?a:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Mn(e,n,r,s)}}function ea(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(a=>{throw a.code==="auth/multi-factor-auth-required"?Mn._fromErrorAndOperation(t,a,e,r):a})}async function oh(t,e,n=!1){const r=await qt(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return wt._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ah(t,e,n=!1){const{auth:r}=t;if(he(r.app))return Promise.reject(We(r));const s="reauthenticate";try{const a=await qt(t,ea(r,s,e,t),n);k(a.idToken,r,"internal-error");const l=Yi(a.idToken);k(l,r,"internal-error");const{sub:h}=l;return k(t.uid===h,r,"user-mismatch"),wt._forOperation(t,s,a)}catch(a){throw(a==null?void 0:a.code)==="auth/user-not-found"&&ge(r,"user-mismatch"),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ta(t,e,n=!1){if(he(t.app))return Promise.reject(We(t));const r="signIn",s=await ea(t,r,e),a=await wt._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(a.user),a}async function ch(t,e){return ta(at(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lh(t){const e=at(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function dp(t,e,n){const r=at(t);await Fi(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",eh)}function uh(t,e,n){return he(t.app)?Promise.reject(We(t)):ch(Ee(t),Tt.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&lh(t),r})}function hh(t,e,n,r){return Ee(t).onIdTokenChanged(e,n,r)}function dh(t,e,n){return Ee(t).beforeAuthStateChanged(e,n)}function fp(t,e,n,r){return Ee(t).onAuthStateChanged(e,n,r)}function fh(t){return Ee(t).signOut()}const xn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(xn,"1"),this.storage.removeItem(xn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ph=1e3,gh=10;class ia extends na{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ko(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((l,h,f)=>{this.notifyListeners(l,f)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const l=this.storage.getItem(r);!n&&this.localCache[r]===l||this.notifyListeners(r,l)},a=this.storage.getItem(r);Nu()&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,gh):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},ph)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}ia.type="LOCAL";const mh=ia;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra extends na{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}ra.type="SESSION";const sa=ra;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vh(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new $n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:a}=n.data,l=this.handlersMap[s];if(!(l!=null&&l.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const h=Array.from(l).map(async I=>I(n.origin,a)),f=await vh(h);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:f})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}$n.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tr(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let a,l;return new Promise((h,f)=>{const I=tr("",20);s.port1.start();const A=setTimeout(()=>{f(new Error("unsupported_event"))},r);l={messageChannel:s,onMessage(S){const T=S;if(T.data.eventId===I)switch(T.data.status){case"ack":clearTimeout(A),a=setTimeout(()=>{f(new Error("timeout"))},3e3);break;case"done":clearTimeout(a),h(T.data.response);break;default:clearTimeout(A),clearTimeout(a),f(new Error("invalid_response"));break}}},this.handlers.add(l),s.port1.addEventListener("message",l.onMessage),this.target.postMessage({eventType:e,eventId:I,data:n},[s.port2])}).finally(()=>{l&&this.removeMessageHandler(l)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(){return window}function _h(t){_e().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oa(){return typeof _e().WorkerGlobalScope<"u"&&typeof _e().importScripts=="function"}async function wh(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ih(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Eh(){return oa()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aa="firebaseLocalStorageDb",Th=1,Un="firebaseLocalStorage",ca="fbase_key";class en{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Wn(t,e){return t.transaction([Un],e?"readwrite":"readonly").objectStore(Un)}function bh(){const t=indexedDB.deleteDatabase(aa);return new en(t).toPromise()}function ji(){const t=indexedDB.open(aa,Th);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Un,{keyPath:ca})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Un)?e(r):(r.close(),await bh(),e(await ji()))})})}async function Ps(t,e,n){const r=Wn(t,!0).put({[ca]:e,value:n});return new en(r).toPromise()}async function Ah(t,e){const n=Wn(t,!1).get(e),r=await new en(n).toPromise();return r===void 0?null:r.value}function Os(t,e){const n=Wn(t,!0).delete(e);return new en(n).toPromise()}const Sh=800,Ch=3;class la{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ji(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Ch)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return oa()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=$n._getInstance(Eh()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await wh(),!this.activeServiceWorker)return;this.sender=new yh(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ih()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ji();return await Ps(e,xn,"1"),await Os(e,xn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ps(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Ah(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Os(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const a=Wn(s,!1).getAll();return new en(a).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:a}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(a)&&(this.notifyListeners(s,a),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Sh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}la.type="LOCAL";const kh=la;new Zt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rh(t,e){return e?ke(e):(k(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr extends Qi{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return _t(e,this._buildIdpRequest())}_linkToIdToken(e,n){return _t(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return _t(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Ph(t){return ta(t.auth,new nr(t),t.bypassAuthState)}function Oh(t){const{auth:e,user:n}=t;return k(n,e,"internal-error"),ah(n,new nr(t),t.bypassAuthState)}async function Nh(t){const{auth:e,user:n}=t;return k(n,e,"internal-error"),oh(n,new nr(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{constructor(e,n,r,s,a=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=a,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:a,error:l,type:h}=e;if(l){this.reject(l);return}const f={auth:this.auth,requestUri:n,sessionId:r,tenantId:a||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(h)(f))}catch(I){this.reject(I)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Ph;case"linkViaPopup":case"linkViaRedirect":return Nh;case"reauthViaPopup":case"reauthViaRedirect":return Oh;default:ge(this.auth,"internal-error")}}resolve(e){Oe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Oe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dh=new Zt(2e3,1e4);class mt extends ua{constructor(e,n,r,s,a){super(e,n,s,a),this.provider=r,this.authWindow=null,this.pollId=null,mt.currentPopupAction&&mt.currentPopupAction.cancel(),mt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return k(e,this.auth,"internal-error"),e}async onExecution(){Oe(this.filter.length===1,"Popup operations only handle one event");const e=tr();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ye(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ye(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,mt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ye(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Dh.get())};e()}}mt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lh="pendingRedirect",Cn=new Map;class Mh extends ua{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Cn.get(this.auth._key());if(!e){try{const r=await xh(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Cn.set(this.auth._key(),e)}return this.bypassAuthState||Cn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function xh(t,e){const n=jh(e),r=Fh(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Uh(t,e){Cn.set(t._key(),e)}function Fh(t){return ke(t._redirectPersistence)}function jh(t){return Sn(Lh,t.config.apiKey,t.name)}async function Bh(t,e,n=!1){if(he(t.app))return Promise.reject(We(t));const r=at(t),s=Rh(r,e),l=await new Mh(r,s,n).execute();return l&&!n&&(delete l.user._redirectEventId,await r._persistUserIfCurrent(l.user),await r._setRedirectUser(null,e)),l}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh=10*60*1e3;class Hh{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!$h(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!ha(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(ye(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Vh&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ns(e))}saveEventToCache(e){this.cachedEventUids.add(Ns(e)),this.lastProcessedEventTime=Date.now()}}function Ns(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function ha({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function $h(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ha(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wh(t,e={}){return Ne(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zh=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Gh=/^https?/;async function qh(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Wh(t);for(const n of e)try{if(Kh(n))return}catch{}ge(t,"unauthorized-domain")}function Kh(t){const e=xi(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const l=new URL(t);return l.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&l.hostname===r}if(!Gh.test(n))return!1;if(zh.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh=new Zt(3e4,6e4);function Ds(){const t=_e().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Xh(t){return new Promise((e,n)=>{var r,s,a;function l(){Ds(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ds(),n(ye(t,"network-request-failed"))},timeout:Jh.get()})}if(!((s=(r=_e().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((a=_e().gapi)===null||a===void 0)&&a.load)l();else{const h=Vu("iframefcb");return _e()[h]=()=>{gapi.load?l():n(ye(t,"network-request-failed"))},Xo(`${Bu()}?onload=${h}`).catch(f=>n(f))}}).catch(e=>{throw kn=null,e})}let kn=null;function Yh(t){return kn=kn||Xh(t),kn}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zh=new Zt(5e3,15e3),Qh="__/auth/iframe",ed="emulator/auth/iframe",td={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},nd=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function id(t){const e=t.config;k(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Xi(e,ed):`https://${t.config.authDomain}/${Qh}`,r={apiKey:e.apiKey,appName:t.name,v:Et},s=nd.get(t.config.apiHost);s&&(r.eid=s);const a=t._getFrameworks();return a.length&&(r.fw=a.join(",")),`${n}?${Xt(r).slice(1)}`}async function rd(t){const e=await Yh(t),n=_e().gapi;return k(n,t,"internal-error"),e.open({where:document.body,url:id(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:td,dontclear:!0},r=>new Promise(async(s,a)=>{await r.restyle({setHideOnLeave:!1});const l=ye(t,"network-request-failed"),h=_e().setTimeout(()=>{a(l)},Zh.get());function f(){_e().clearTimeout(h),s(r)}r.ping(f).then(f,()=>{a(l)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sd={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},od=500,ad=600,cd="_blank",ld="http://localhost";class Ls{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function ud(t,e,n,r=od,s=ad){const a=Math.max((window.screen.availHeight-s)/2,0).toString(),l=Math.max((window.screen.availWidth-r)/2,0).toString();let h="";const f=Object.assign(Object.assign({},sd),{width:r.toString(),height:s.toString(),top:a,left:l}),I=ee().toLowerCase();n&&(h=$o(I)?cd:n),Vo(I)&&(e=e||ld,f.scrollbars="yes");const A=Object.entries(f).reduce((T,[P,R])=>`${T}${P}=${R},`,"");if(Ou(I)&&h!=="_self")return hd(e||"",h),new Ls(null);const S=window.open(e||"",h,A);k(S,t,"popup-blocked");try{S.focus()}catch{}return new Ls(S)}function hd(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dd="__/auth/handler",fd="emulator/auth/handler",pd=encodeURIComponent("fac");async function Ms(t,e,n,r,s,a){k(t.config.authDomain,t,"auth-domain-config-required"),k(t.config.apiKey,t,"invalid-api-key");const l={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Et,eventId:s};if(e instanceof Qo){e.setDefaultLanguage(t.languageCode),l.providerId=e.providerId||"",Xc(e.getCustomParameters())||(l.customParameters=JSON.stringify(e.getCustomParameters()));for(const[A,S]of Object.entries({}))l[A]=S}if(e instanceof Qt){const A=e.getScopes().filter(S=>S!=="");A.length>0&&(l.scopes=A.join(","))}t.tenantId&&(l.tid=t.tenantId);const h=l;for(const A of Object.keys(h))h[A]===void 0&&delete h[A];const f=await t._getAppCheckToken(),I=f?`#${pd}=${encodeURIComponent(f)}`:"";return`${gd(t)}?${Xt(h).slice(1)}${I}`}function gd({config:t}){return t.emulator?Xi(t,fd):`https://${t.authDomain}/${dd}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi="webStorageSupport";class md{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=sa,this._completeRedirectFn=Bh,this._overrideRedirectResult=Uh}async _openPopup(e,n,r,s){var a;Oe((a=this.eventManagers[e._key()])===null||a===void 0?void 0:a.manager,"_initialize() not called before _openPopup()");const l=await Ms(e,n,r,xi(),s);return ud(e,l,tr())}async _openRedirect(e,n,r,s){await this._originValidation(e);const a=await Ms(e,n,r,xi(),s);return _h(a),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:a}=this.eventManagers[n];return s?Promise.resolve(s):(Oe(a,"If manager is not set, promise should be"),a)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await rd(e),r=new Hh(e);return n.register("authEvent",s=>(k(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(bi,{type:bi},s=>{var a;const l=(a=s==null?void 0:s[0])===null||a===void 0?void 0:a[bi];l!==void 0&&n(!!l),ge(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=qh(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Ko()||Ho()||Zi()}}const vd=md;var xs="@firebase/auth",Us="1.10.7";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){k(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _d(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function wd(t){we(new pe("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:l,authDomain:h}=r.options;k(l&&!l.includes(":"),"invalid-api-key",{appName:r.name});const f={apiKey:l,authDomain:h,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Jo(t)},I=new Uu(r,s,a,f);return qu(I,n),I},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),we(new pe("auth-internal",e=>{const n=at(e.getProvider("auth").getImmediate());return(r=>new yd(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ae(xs,Us,_d(t)),ae(xs,Us,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Id=5*60,Ed=wo("authIdTokenMaxAge")||Id;let Fs=null;const Td=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Ed)return;const s=n==null?void 0:n.token;Fs!==s&&(Fs=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function bd(t=Po()){const e=Yt(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Gu(t,{popupRedirectResolver:vd,persistence:[kh,mh,sa]}),r=wo("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const a=new URL(r,location.origin);if(location.origin===a.origin){const l=Td(a.toString());dh(n,l,()=>l(n.currentUser)),hh(n,h=>l(h))}}const s=yo("auth");return s&&Ku(n,`http://${s}`),n}function Ad(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}Fu({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const a=ye("internal-error");a.customData=s,n(a)},r.type="text/javascript",r.charset="UTF-8",Ad().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});wd("Browser");var js=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var da;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,d){function g(){}g.prototype=d.prototype,y.D=d.prototype,y.prototype=new g,y.prototype.constructor=y,y.C=function(m,v,w){for(var p=Array(arguments.length-2),le=2;le<arguments.length;le++)p[le-2]=arguments[le];return d.prototype[v].apply(m,p)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(y,d,g){g||(g=0);var m=Array(16);if(typeof d=="string")for(var v=0;16>v;++v)m[v]=d.charCodeAt(g++)|d.charCodeAt(g++)<<8|d.charCodeAt(g++)<<16|d.charCodeAt(g++)<<24;else for(v=0;16>v;++v)m[v]=d[g++]|d[g++]<<8|d[g++]<<16|d[g++]<<24;d=y.g[0],g=y.g[1],v=y.g[2];var w=y.g[3],p=d+(w^g&(v^w))+m[0]+3614090360&4294967295;d=g+(p<<7&4294967295|p>>>25),p=w+(v^d&(g^v))+m[1]+3905402710&4294967295,w=d+(p<<12&4294967295|p>>>20),p=v+(g^w&(d^g))+m[2]+606105819&4294967295,v=w+(p<<17&4294967295|p>>>15),p=g+(d^v&(w^d))+m[3]+3250441966&4294967295,g=v+(p<<22&4294967295|p>>>10),p=d+(w^g&(v^w))+m[4]+4118548399&4294967295,d=g+(p<<7&4294967295|p>>>25),p=w+(v^d&(g^v))+m[5]+1200080426&4294967295,w=d+(p<<12&4294967295|p>>>20),p=v+(g^w&(d^g))+m[6]+2821735955&4294967295,v=w+(p<<17&4294967295|p>>>15),p=g+(d^v&(w^d))+m[7]+4249261313&4294967295,g=v+(p<<22&4294967295|p>>>10),p=d+(w^g&(v^w))+m[8]+1770035416&4294967295,d=g+(p<<7&4294967295|p>>>25),p=w+(v^d&(g^v))+m[9]+2336552879&4294967295,w=d+(p<<12&4294967295|p>>>20),p=v+(g^w&(d^g))+m[10]+4294925233&4294967295,v=w+(p<<17&4294967295|p>>>15),p=g+(d^v&(w^d))+m[11]+2304563134&4294967295,g=v+(p<<22&4294967295|p>>>10),p=d+(w^g&(v^w))+m[12]+1804603682&4294967295,d=g+(p<<7&4294967295|p>>>25),p=w+(v^d&(g^v))+m[13]+4254626195&4294967295,w=d+(p<<12&4294967295|p>>>20),p=v+(g^w&(d^g))+m[14]+2792965006&4294967295,v=w+(p<<17&4294967295|p>>>15),p=g+(d^v&(w^d))+m[15]+1236535329&4294967295,g=v+(p<<22&4294967295|p>>>10),p=d+(v^w&(g^v))+m[1]+4129170786&4294967295,d=g+(p<<5&4294967295|p>>>27),p=w+(g^v&(d^g))+m[6]+3225465664&4294967295,w=d+(p<<9&4294967295|p>>>23),p=v+(d^g&(w^d))+m[11]+643717713&4294967295,v=w+(p<<14&4294967295|p>>>18),p=g+(w^d&(v^w))+m[0]+3921069994&4294967295,g=v+(p<<20&4294967295|p>>>12),p=d+(v^w&(g^v))+m[5]+3593408605&4294967295,d=g+(p<<5&4294967295|p>>>27),p=w+(g^v&(d^g))+m[10]+38016083&4294967295,w=d+(p<<9&4294967295|p>>>23),p=v+(d^g&(w^d))+m[15]+3634488961&4294967295,v=w+(p<<14&4294967295|p>>>18),p=g+(w^d&(v^w))+m[4]+3889429448&4294967295,g=v+(p<<20&4294967295|p>>>12),p=d+(v^w&(g^v))+m[9]+568446438&4294967295,d=g+(p<<5&4294967295|p>>>27),p=w+(g^v&(d^g))+m[14]+3275163606&4294967295,w=d+(p<<9&4294967295|p>>>23),p=v+(d^g&(w^d))+m[3]+4107603335&4294967295,v=w+(p<<14&4294967295|p>>>18),p=g+(w^d&(v^w))+m[8]+1163531501&4294967295,g=v+(p<<20&4294967295|p>>>12),p=d+(v^w&(g^v))+m[13]+2850285829&4294967295,d=g+(p<<5&4294967295|p>>>27),p=w+(g^v&(d^g))+m[2]+4243563512&4294967295,w=d+(p<<9&4294967295|p>>>23),p=v+(d^g&(w^d))+m[7]+1735328473&4294967295,v=w+(p<<14&4294967295|p>>>18),p=g+(w^d&(v^w))+m[12]+2368359562&4294967295,g=v+(p<<20&4294967295|p>>>12),p=d+(g^v^w)+m[5]+4294588738&4294967295,d=g+(p<<4&4294967295|p>>>28),p=w+(d^g^v)+m[8]+2272392833&4294967295,w=d+(p<<11&4294967295|p>>>21),p=v+(w^d^g)+m[11]+1839030562&4294967295,v=w+(p<<16&4294967295|p>>>16),p=g+(v^w^d)+m[14]+4259657740&4294967295,g=v+(p<<23&4294967295|p>>>9),p=d+(g^v^w)+m[1]+2763975236&4294967295,d=g+(p<<4&4294967295|p>>>28),p=w+(d^g^v)+m[4]+1272893353&4294967295,w=d+(p<<11&4294967295|p>>>21),p=v+(w^d^g)+m[7]+4139469664&4294967295,v=w+(p<<16&4294967295|p>>>16),p=g+(v^w^d)+m[10]+3200236656&4294967295,g=v+(p<<23&4294967295|p>>>9),p=d+(g^v^w)+m[13]+681279174&4294967295,d=g+(p<<4&4294967295|p>>>28),p=w+(d^g^v)+m[0]+3936430074&4294967295,w=d+(p<<11&4294967295|p>>>21),p=v+(w^d^g)+m[3]+3572445317&4294967295,v=w+(p<<16&4294967295|p>>>16),p=g+(v^w^d)+m[6]+76029189&4294967295,g=v+(p<<23&4294967295|p>>>9),p=d+(g^v^w)+m[9]+3654602809&4294967295,d=g+(p<<4&4294967295|p>>>28),p=w+(d^g^v)+m[12]+3873151461&4294967295,w=d+(p<<11&4294967295|p>>>21),p=v+(w^d^g)+m[15]+530742520&4294967295,v=w+(p<<16&4294967295|p>>>16),p=g+(v^w^d)+m[2]+3299628645&4294967295,g=v+(p<<23&4294967295|p>>>9),p=d+(v^(g|~w))+m[0]+4096336452&4294967295,d=g+(p<<6&4294967295|p>>>26),p=w+(g^(d|~v))+m[7]+1126891415&4294967295,w=d+(p<<10&4294967295|p>>>22),p=v+(d^(w|~g))+m[14]+2878612391&4294967295,v=w+(p<<15&4294967295|p>>>17),p=g+(w^(v|~d))+m[5]+4237533241&4294967295,g=v+(p<<21&4294967295|p>>>11),p=d+(v^(g|~w))+m[12]+1700485571&4294967295,d=g+(p<<6&4294967295|p>>>26),p=w+(g^(d|~v))+m[3]+2399980690&4294967295,w=d+(p<<10&4294967295|p>>>22),p=v+(d^(w|~g))+m[10]+4293915773&4294967295,v=w+(p<<15&4294967295|p>>>17),p=g+(w^(v|~d))+m[1]+2240044497&4294967295,g=v+(p<<21&4294967295|p>>>11),p=d+(v^(g|~w))+m[8]+1873313359&4294967295,d=g+(p<<6&4294967295|p>>>26),p=w+(g^(d|~v))+m[15]+4264355552&4294967295,w=d+(p<<10&4294967295|p>>>22),p=v+(d^(w|~g))+m[6]+2734768916&4294967295,v=w+(p<<15&4294967295|p>>>17),p=g+(w^(v|~d))+m[13]+1309151649&4294967295,g=v+(p<<21&4294967295|p>>>11),p=d+(v^(g|~w))+m[4]+4149444226&4294967295,d=g+(p<<6&4294967295|p>>>26),p=w+(g^(d|~v))+m[11]+3174756917&4294967295,w=d+(p<<10&4294967295|p>>>22),p=v+(d^(w|~g))+m[2]+718787259&4294967295,v=w+(p<<15&4294967295|p>>>17),p=g+(w^(v|~d))+m[9]+3951481745&4294967295,y.g[0]=y.g[0]+d&4294967295,y.g[1]=y.g[1]+(v+(p<<21&4294967295|p>>>11))&4294967295,y.g[2]=y.g[2]+v&4294967295,y.g[3]=y.g[3]+w&4294967295}r.prototype.u=function(y,d){d===void 0&&(d=y.length);for(var g=d-this.blockSize,m=this.B,v=this.h,w=0;w<d;){if(v==0)for(;w<=g;)s(this,y,w),w+=this.blockSize;if(typeof y=="string"){for(;w<d;)if(m[v++]=y.charCodeAt(w++),v==this.blockSize){s(this,m),v=0;break}}else for(;w<d;)if(m[v++]=y[w++],v==this.blockSize){s(this,m),v=0;break}}this.h=v,this.o+=d},r.prototype.v=function(){var y=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);y[0]=128;for(var d=1;d<y.length-8;++d)y[d]=0;var g=8*this.o;for(d=y.length-8;d<y.length;++d)y[d]=g&255,g/=256;for(this.u(y),y=Array(16),d=g=0;4>d;++d)for(var m=0;32>m;m+=8)y[g++]=this.g[d]>>>m&255;return y};function a(y,d){var g=h;return Object.prototype.hasOwnProperty.call(g,y)?g[y]:g[y]=d(y)}function l(y,d){this.h=d;for(var g=[],m=!0,v=y.length-1;0<=v;v--){var w=y[v]|0;m&&w==d||(g[v]=w,m=!1)}this.g=g}var h={};function f(y){return-128<=y&&128>y?a(y,function(d){return new l([d|0],0>d?-1:0)}):new l([y|0],0>y?-1:0)}function I(y){if(isNaN(y)||!isFinite(y))return S;if(0>y)return D(I(-y));for(var d=[],g=1,m=0;y>=g;m++)d[m]=y/g|0,g*=4294967296;return new l(d,0)}function A(y,d){if(y.length==0)throw Error("number format error: empty string");if(d=d||10,2>d||36<d)throw Error("radix out of range: "+d);if(y.charAt(0)=="-")return D(A(y.substring(1),d));if(0<=y.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=I(Math.pow(d,8)),m=S,v=0;v<y.length;v+=8){var w=Math.min(8,y.length-v),p=parseInt(y.substring(v,v+w),d);8>w?(w=I(Math.pow(d,w)),m=m.j(w).add(I(p))):(m=m.j(g),m=m.add(I(p)))}return m}var S=f(0),T=f(1),P=f(16777216);t=l.prototype,t.m=function(){if(F(this))return-D(this).m();for(var y=0,d=1,g=0;g<this.g.length;g++){var m=this.i(g);y+=(0<=m?m:4294967296+m)*d,d*=4294967296}return y},t.toString=function(y){if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(R(this))return"0";if(F(this))return"-"+D(this).toString(y);for(var d=I(Math.pow(y,6)),g=this,m="";;){var v=X(g,d).g;g=te(g,v.j(d));var w=((0<g.g.length?g.g[0]:g.h)>>>0).toString(y);if(g=v,R(g))return w+m;for(;6>w.length;)w="0"+w;m=w+m}},t.i=function(y){return 0>y?0:y<this.g.length?this.g[y]:this.h};function R(y){if(y.h!=0)return!1;for(var d=0;d<y.g.length;d++)if(y.g[d]!=0)return!1;return!0}function F(y){return y.h==-1}t.l=function(y){return y=te(this,y),F(y)?-1:R(y)?0:1};function D(y){for(var d=y.g.length,g=[],m=0;m<d;m++)g[m]=~y.g[m];return new l(g,~y.h).add(T)}t.abs=function(){return F(this)?D(this):this},t.add=function(y){for(var d=Math.max(this.g.length,y.g.length),g=[],m=0,v=0;v<=d;v++){var w=m+(this.i(v)&65535)+(y.i(v)&65535),p=(w>>>16)+(this.i(v)>>>16)+(y.i(v)>>>16);m=p>>>16,w&=65535,p&=65535,g[v]=p<<16|w}return new l(g,g[g.length-1]&-2147483648?-1:0)};function te(y,d){return y.add(D(d))}t.j=function(y){if(R(this)||R(y))return S;if(F(this))return F(y)?D(this).j(D(y)):D(D(this).j(y));if(F(y))return D(this.j(D(y)));if(0>this.l(P)&&0>y.l(P))return I(this.m()*y.m());for(var d=this.g.length+y.g.length,g=[],m=0;m<2*d;m++)g[m]=0;for(m=0;m<this.g.length;m++)for(var v=0;v<y.g.length;v++){var w=this.i(m)>>>16,p=this.i(m)&65535,le=y.i(v)>>>16,Ke=y.i(v)&65535;g[2*m+2*v]+=p*Ke,V(g,2*m+2*v),g[2*m+2*v+1]+=w*Ke,V(g,2*m+2*v+1),g[2*m+2*v+1]+=p*le,V(g,2*m+2*v+1),g[2*m+2*v+2]+=w*le,V(g,2*m+2*v+2)}for(m=0;m<d;m++)g[m]=g[2*m+1]<<16|g[2*m];for(m=d;m<2*d;m++)g[m]=0;return new l(g,0)};function V(y,d){for(;(y[d]&65535)!=y[d];)y[d+1]+=y[d]>>>16,y[d]&=65535,d++}function j(y,d){this.g=y,this.h=d}function X(y,d){if(R(d))throw Error("division by zero");if(R(y))return new j(S,S);if(F(y))return d=X(D(y),d),new j(D(d.g),D(d.h));if(F(d))return d=X(y,D(d)),new j(D(d.g),d.h);if(30<y.g.length){if(F(y)||F(d))throw Error("slowDivide_ only works with positive integers.");for(var g=T,m=d;0>=m.l(y);)g=Te(g),m=Te(m);var v=W(g,1),w=W(m,1);for(m=W(m,2),g=W(g,2);!R(m);){var p=w.add(m);0>=p.l(y)&&(v=v.add(g),w=p),m=W(m,1),g=W(g,1)}return d=te(y,v.j(d)),new j(v,d)}for(v=S;0<=y.l(d);){for(g=Math.max(1,Math.floor(y.m()/d.m())),m=Math.ceil(Math.log(g)/Math.LN2),m=48>=m?1:Math.pow(2,m-48),w=I(g),p=w.j(d);F(p)||0<p.l(y);)g-=m,w=I(g),p=w.j(d);R(w)&&(w=T),v=v.add(w),y=te(y,p)}return new j(v,y)}t.A=function(y){return X(this,y).h},t.and=function(y){for(var d=Math.max(this.g.length,y.g.length),g=[],m=0;m<d;m++)g[m]=this.i(m)&y.i(m);return new l(g,this.h&y.h)},t.or=function(y){for(var d=Math.max(this.g.length,y.g.length),g=[],m=0;m<d;m++)g[m]=this.i(m)|y.i(m);return new l(g,this.h|y.h)},t.xor=function(y){for(var d=Math.max(this.g.length,y.g.length),g=[],m=0;m<d;m++)g[m]=this.i(m)^y.i(m);return new l(g,this.h^y.h)};function Te(y){for(var d=y.g.length+1,g=[],m=0;m<d;m++)g[m]=y.i(m)<<1|y.i(m-1)>>>31;return new l(g,y.h)}function W(y,d){var g=d>>5;d%=32;for(var m=y.g.length-g,v=[],w=0;w<m;w++)v[w]=0<d?y.i(w+g)>>>d|y.i(w+g+1)<<32-d:y.i(w+g);return new l(v,y.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.A,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=I,l.fromString=A,da=l}).apply(typeof js<"u"?js:typeof self<"u"?self:typeof window<"u"?window:{});var bn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,o,c){return i==Array.prototype||i==Object.prototype||(i[o]=c.value),i};function n(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof bn=="object"&&bn];for(var o=0;o<i.length;++o){var c=i[o];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=n(this);function s(i,o){if(o)e:{var c=r;i=i.split(".");for(var u=0;u<i.length-1;u++){var _=i[u];if(!(_ in c))break e;c=c[_]}i=i[i.length-1],u=c[i],o=o(u),o!=u&&o!=null&&e(c,i,{configurable:!0,writable:!0,value:o})}}function a(i,o){i instanceof String&&(i+="");var c=0,u=!1,_={next:function(){if(!u&&c<i.length){var E=c++;return{value:o(E,i[E]),done:!1}}return u=!0,{done:!0,value:void 0}}};return _[Symbol.iterator]=function(){return _},_}s("Array.prototype.values",function(i){return i||function(){return a(this,function(o,c){return c})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},h=this||self;function f(i){var o=typeof i;return o=o!="object"?o:i?Array.isArray(i)?"array":o:"null",o=="array"||o=="object"&&typeof i.length=="number"}function I(i){var o=typeof i;return o=="object"&&i!=null||o=="function"}function A(i,o,c){return i.call.apply(i.bind,arguments)}function S(i,o,c){if(!i)throw Error();if(2<arguments.length){var u=Array.prototype.slice.call(arguments,2);return function(){var _=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(_,u),i.apply(o,_)}}return function(){return i.apply(o,arguments)}}function T(i,o,c){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?A:S,T.apply(null,arguments)}function P(i,o){var c=Array.prototype.slice.call(arguments,1);return function(){var u=c.slice();return u.push.apply(u,arguments),i.apply(this,u)}}function R(i,o){function c(){}c.prototype=o.prototype,i.aa=o.prototype,i.prototype=new c,i.prototype.constructor=i,i.Qb=function(u,_,E){for(var b=Array(arguments.length-2),M=2;M<arguments.length;M++)b[M-2]=arguments[M];return o.prototype[_].apply(u,b)}}function F(i){const o=i.length;if(0<o){const c=Array(o);for(let u=0;u<o;u++)c[u]=i[u];return c}return[]}function D(i,o){for(let c=1;c<arguments.length;c++){const u=arguments[c];if(f(u)){const _=i.length||0,E=u.length||0;i.length=_+E;for(let b=0;b<E;b++)i[_+b]=u[b]}else i.push(u)}}class te{constructor(o,c){this.i=o,this.j=c,this.h=0,this.g=null}get(){let o;return 0<this.h?(this.h--,o=this.g,this.g=o.next,o.next=null):o=this.i(),o}}function V(i){return/^[\s\xa0]*$/.test(i)}function j(){var i=h.navigator;return i&&(i=i.userAgent)?i:""}function X(i){return X[" "](i),i}X[" "]=function(){};var Te=j().indexOf("Gecko")!=-1&&!(j().toLowerCase().indexOf("webkit")!=-1&&j().indexOf("Edge")==-1)&&!(j().indexOf("Trident")!=-1||j().indexOf("MSIE")!=-1)&&j().indexOf("Edge")==-1;function W(i,o,c){for(const u in i)o.call(c,i[u],u,i)}function y(i,o){for(const c in i)o.call(void 0,i[c],c,i)}function d(i){const o={};for(const c in i)o[c]=i[c];return o}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function m(i,o){let c,u;for(let _=1;_<arguments.length;_++){u=arguments[_];for(c in u)i[c]=u[c];for(let E=0;E<g.length;E++)c=g[E],Object.prototype.hasOwnProperty.call(u,c)&&(i[c]=u[c])}}function v(i){var o=1;i=i.split(":");const c=[];for(;0<o&&i.length;)c.push(i.shift()),o--;return i.length&&c.push(i.join(":")),c}function w(i){h.setTimeout(()=>{throw i},0)}function p(){var i=ct;let o=null;return i.g&&(o=i.g,i.g=i.g.next,i.g||(i.h=null),o.next=null),o}class le{constructor(){this.h=this.g=null}add(o,c){const u=Ke.get();u.set(o,c),this.h?this.h.next=u:this.g=u,this.h=u}}var Ke=new te(()=>new nn,i=>i.reset());class nn{constructor(){this.next=this.g=this.h=null}set(o,c){this.h=o,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let ne,be=!1,ct=new le,bt=()=>{const i=h.Promise.resolve(void 0);ne=()=>{i.then(rn)}};var rn=()=>{for(var i;i=p();){try{i.h.call(i.g)}catch(c){w(c)}var o=Ke;o.j(i),100>o.h&&(o.h++,i.next=o.g,o.g=i)}be=!1};function ve(){this.s=this.s,this.C=this.C}ve.prototype.s=!1,ve.prototype.ma=function(){this.s||(this.s=!0,this.N())},ve.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function $(i,o){this.type=i,this.g=this.target=o,this.defaultPrevented=!1}$.prototype.h=function(){this.defaultPrevented=!0};var sn=function(){if(!h.addEventListener||!Object.defineProperty)return!1;var i=!1,o=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};h.addEventListener("test",c,o),h.removeEventListener("test",c,o)}catch{}return i}();function De(i,o){if($.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var c=this.type=i.type,u=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=o,o=i.relatedTarget){if(Te){e:{try{X(o.nodeName);var _=!0;break e}catch{}_=!1}_||(o=null)}}else c=="mouseover"?o=i.fromElement:c=="mouseout"&&(o=i.toElement);this.relatedTarget=o,u?(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:G[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&De.aa.h.call(this)}}R(De,$);var G={2:"touch",3:"pen",4:"mouse"};De.prototype.h=function(){De.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var on="closure_listenable_"+(1e6*Math.random()|0),$a=0;function Wa(i,o,c,u,_){this.listener=i,this.proxy=null,this.src=o,this.type=c,this.capture=!!u,this.ha=_,this.key=++$a,this.da=this.fa=!1}function an(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function cn(i){this.src=i,this.g={},this.h=0}cn.prototype.add=function(i,o,c,u,_){var E=i.toString();i=this.g[E],i||(i=this.g[E]=[],this.h++);var b=Kn(i,o,u,_);return-1<b?(o=i[b],c||(o.fa=!1)):(o=new Wa(o,this.src,E,!!u,_),o.fa=c,i.push(o)),o};function qn(i,o){var c=o.type;if(c in i.g){var u=i.g[c],_=Array.prototype.indexOf.call(u,o,void 0),E;(E=0<=_)&&Array.prototype.splice.call(u,_,1),E&&(an(o),i.g[c].length==0&&(delete i.g[c],i.h--))}}function Kn(i,o,c,u){for(var _=0;_<i.length;++_){var E=i[_];if(!E.da&&E.listener==o&&E.capture==!!c&&E.ha==u)return _}return-1}var Jn="closure_lm_"+(1e6*Math.random()|0),Xn={};function ur(i,o,c,u,_){if(Array.isArray(o)){for(var E=0;E<o.length;E++)ur(i,o[E],c,u,_);return null}return c=fr(c),i&&i[on]?i.K(o,c,I(u)?!!u.capture:!1,_):za(i,o,c,!1,u,_)}function za(i,o,c,u,_,E){if(!o)throw Error("Invalid event type");var b=I(_)?!!_.capture:!!_,M=Zn(i);if(M||(i[Jn]=M=new cn(i)),c=M.add(o,c,u,b,E),c.proxy)return c;if(u=Ga(),c.proxy=u,u.src=i,u.listener=c,i.addEventListener)sn||(_=b),_===void 0&&(_=!1),i.addEventListener(o.toString(),u,_);else if(i.attachEvent)i.attachEvent(dr(o.toString()),u);else if(i.addListener&&i.removeListener)i.addListener(u);else throw Error("addEventListener and attachEvent are unavailable.");return c}function Ga(){function i(c){return o.call(i.src,i.listener,c)}const o=qa;return i}function hr(i,o,c,u,_){if(Array.isArray(o))for(var E=0;E<o.length;E++)hr(i,o[E],c,u,_);else u=I(u)?!!u.capture:!!u,c=fr(c),i&&i[on]?(i=i.i,o=String(o).toString(),o in i.g&&(E=i.g[o],c=Kn(E,c,u,_),-1<c&&(an(E[c]),Array.prototype.splice.call(E,c,1),E.length==0&&(delete i.g[o],i.h--)))):i&&(i=Zn(i))&&(o=i.g[o.toString()],i=-1,o&&(i=Kn(o,c,u,_)),(c=-1<i?o[i]:null)&&Yn(c))}function Yn(i){if(typeof i!="number"&&i&&!i.da){var o=i.src;if(o&&o[on])qn(o.i,i);else{var c=i.type,u=i.proxy;o.removeEventListener?o.removeEventListener(c,u,i.capture):o.detachEvent?o.detachEvent(dr(c),u):o.addListener&&o.removeListener&&o.removeListener(u),(c=Zn(o))?(qn(c,i),c.h==0&&(c.src=null,o[Jn]=null)):an(i)}}}function dr(i){return i in Xn?Xn[i]:Xn[i]="on"+i}function qa(i,o){if(i.da)i=!0;else{o=new De(o,this);var c=i.listener,u=i.ha||i.src;i.fa&&Yn(i),i=c.call(u,o)}return i}function Zn(i){return i=i[Jn],i instanceof cn?i:null}var Qn="__closure_events_fn_"+(1e9*Math.random()>>>0);function fr(i){return typeof i=="function"?i:(i[Qn]||(i[Qn]=function(o){return i.handleEvent(o)}),i[Qn])}function q(){ve.call(this),this.i=new cn(this),this.M=this,this.F=null}R(q,ve),q.prototype[on]=!0,q.prototype.removeEventListener=function(i,o,c,u){hr(this,i,o,c,u)};function Y(i,o){var c,u=i.F;if(u)for(c=[];u;u=u.F)c.push(u);if(i=i.M,u=o.type||o,typeof o=="string")o=new $(o,i);else if(o instanceof $)o.target=o.target||i;else{var _=o;o=new $(u,i),m(o,_)}if(_=!0,c)for(var E=c.length-1;0<=E;E--){var b=o.g=c[E];_=ln(b,u,!0,o)&&_}if(b=o.g=i,_=ln(b,u,!0,o)&&_,_=ln(b,u,!1,o)&&_,c)for(E=0;E<c.length;E++)b=o.g=c[E],_=ln(b,u,!1,o)&&_}q.prototype.N=function(){if(q.aa.N.call(this),this.i){var i=this.i,o;for(o in i.g){for(var c=i.g[o],u=0;u<c.length;u++)an(c[u]);delete i.g[o],i.h--}}this.F=null},q.prototype.K=function(i,o,c,u){return this.i.add(String(i),o,!1,c,u)},q.prototype.L=function(i,o,c,u){return this.i.add(String(i),o,!0,c,u)};function ln(i,o,c,u){if(o=i.i.g[String(o)],!o)return!0;o=o.concat();for(var _=!0,E=0;E<o.length;++E){var b=o[E];if(b&&!b.da&&b.capture==c){var M=b.listener,z=b.ha||b.src;b.fa&&qn(i.i,b),_=M.call(z,u)!==!1&&_}}return _&&!u.defaultPrevented}function pr(i,o,c){if(typeof i=="function")c&&(i=T(i,c));else if(i&&typeof i.handleEvent=="function")i=T(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(o)?-1:h.setTimeout(i,o||0)}function gr(i){i.g=pr(()=>{i.g=null,i.i&&(i.i=!1,gr(i))},i.l);const o=i.h;i.h=null,i.m.apply(null,o)}class Ka extends ve{constructor(o,c){super(),this.m=o,this.l=c,this.h=null,this.i=!1,this.g=null}j(o){this.h=arguments,this.g?this.i=!0:gr(this)}N(){super.N(),this.g&&(h.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function At(i){ve.call(this),this.h=i,this.g={}}R(At,ve);var mr=[];function vr(i){W(i.g,function(o,c){this.g.hasOwnProperty(c)&&Yn(o)},i),i.g={}}At.prototype.N=function(){At.aa.N.call(this),vr(this)},At.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ei=h.JSON.stringify,Ja=h.JSON.parse,Xa=class{stringify(i){return h.JSON.stringify(i,void 0)}parse(i){return h.JSON.parse(i,void 0)}};function ti(){}ti.prototype.h=null;function yr(i){return i.h||(i.h=i.i())}function Ya(){}var St={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ni(){$.call(this,"d")}R(ni,$);function ii(){$.call(this,"c")}R(ii,$);var lt={},_r=null;function ri(){return _r=_r||new q}lt.La="serverreachability";function wr(i){$.call(this,lt.La,i)}R(wr,$);function Ct(i){const o=ri();Y(o,new wr(o))}lt.STAT_EVENT="statevent";function Ir(i,o){$.call(this,lt.STAT_EVENT,i),this.stat=o}R(Ir,$);function Z(i){const o=ri();Y(o,new Ir(o,i))}lt.Ma="timingevent";function Er(i,o){$.call(this,lt.Ma,i),this.size=o}R(Er,$);function kt(i,o){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return h.setTimeout(function(){i()},o)}function Rt(){this.g=!0}Rt.prototype.xa=function(){this.g=!1};function Za(i,o,c,u,_,E){i.info(function(){if(i.g)if(E)for(var b="",M=E.split("&"),z=0;z<M.length;z++){var N=M[z].split("=");if(1<N.length){var K=N[0];N=N[1];var J=K.split("_");b=2<=J.length&&J[1]=="type"?b+(K+"="+N+"&"):b+(K+"=redacted&")}}else b=null;else b=E;return"XMLHTTP REQ ("+u+") [attempt "+_+"]: "+o+`
`+c+`
`+b})}function Qa(i,o,c,u,_,E,b){i.info(function(){return"XMLHTTP RESP ("+u+") [ attempt "+_+"]: "+o+`
`+c+`
`+E+" "+b})}function ut(i,o,c,u){i.info(function(){return"XMLHTTP TEXT ("+o+"): "+tc(i,c)+(u?" "+u:"")})}function ec(i,o){i.info(function(){return"TIMEOUT: "+o})}Rt.prototype.info=function(){};function tc(i,o){if(!i.g)return o;if(!o)return null;try{var c=JSON.parse(o);if(c){for(i=0;i<c.length;i++)if(Array.isArray(c[i])){var u=c[i];if(!(2>u.length)){var _=u[1];if(Array.isArray(_)&&!(1>_.length)){var E=_[0];if(E!="noop"&&E!="stop"&&E!="close")for(var b=1;b<_.length;b++)_[b]=""}}}}return ei(c)}catch{return o}}var si={NO_ERROR:0,TIMEOUT:8},nc={},oi;function un(){}R(un,ti),un.prototype.g=function(){return new XMLHttpRequest},un.prototype.i=function(){return{}},oi=new un;function Le(i,o,c,u){this.j=i,this.i=o,this.l=c,this.R=u||1,this.U=new At(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Tr}function Tr(){this.i=null,this.g="",this.h=!1}var br={},ai={};function ci(i,o,c){i.L=1,i.v=pn(Ae(o)),i.m=c,i.P=!0,Ar(i,null)}function Ar(i,o){i.F=Date.now(),hn(i),i.A=Ae(i.v);var c=i.A,u=i.R;Array.isArray(u)||(u=[String(u)]),jr(c.i,"t",u),i.C=0,c=i.j.J,i.h=new Tr,i.g=is(i.j,c?o:null,!i.m),0<i.O&&(i.M=new Ka(T(i.Y,i,i.g),i.O)),o=i.U,c=i.g,u=i.ca;var _="readystatechange";Array.isArray(_)||(_&&(mr[0]=_.toString()),_=mr);for(var E=0;E<_.length;E++){var b=ur(c,_[E],u||o.handleEvent,!1,o.h||o);if(!b)break;o.g[b.key]=b}o=i.H?d(i.H):{},i.m?(i.u||(i.u="POST"),o["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,o)):(i.u="GET",i.g.ea(i.A,i.u,null,o)),Ct(),Za(i.i,i.u,i.A,i.l,i.R,i.m)}Le.prototype.ca=function(i){i=i.target;const o=this.M;o&&Se(i)==3?o.j():this.Y(i)},Le.prototype.Y=function(i){try{if(i==this.g)e:{const J=Se(this.g);var o=this.g.Ba();const ft=this.g.Z();if(!(3>J)&&(J!=3||this.g&&(this.h.h||this.g.oa()||Gr(this.g)))){this.J||J!=4||o==7||(o==8||0>=ft?Ct(3):Ct(2)),li(this);var c=this.g.Z();this.X=c;t:if(Sr(this)){var u=Gr(this.g);i="";var _=u.length,E=Se(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Je(this),Pt(this);var b="";break t}this.h.i=new h.TextDecoder}for(o=0;o<_;o++)this.h.h=!0,i+=this.h.i.decode(u[o],{stream:!(E&&o==_-1)});u.length=0,this.h.g+=i,this.C=0,b=this.h.g}else b=this.g.oa();if(this.o=c==200,Qa(this.i,this.u,this.A,this.l,this.R,J,c),this.o){if(this.T&&!this.K){t:{if(this.g){var M,z=this.g;if((M=z.g?z.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!V(M)){var N=M;break t}}N=null}if(c=N)ut(this.i,this.l,c,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ui(this,c);else{this.o=!1,this.s=3,Z(12),Je(this),Pt(this);break e}}if(this.P){c=!0;let ue;for(;!this.J&&this.C<b.length;)if(ue=ic(this,b),ue==ai){J==4&&(this.s=4,Z(14),c=!1),ut(this.i,this.l,null,"[Incomplete Response]");break}else if(ue==br){this.s=4,Z(15),ut(this.i,this.l,b,"[Invalid Chunk]"),c=!1;break}else ut(this.i,this.l,ue,null),ui(this,ue);if(Sr(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),J!=4||b.length!=0||this.h.h||(this.s=1,Z(16),c=!1),this.o=this.o&&c,!c)ut(this.i,this.l,b,"[Invalid Chunked Response]"),Je(this),Pt(this);else if(0<b.length&&!this.W){this.W=!0;var K=this.j;K.g==this&&K.ba&&!K.M&&(K.j.info("Great, no buffering proxy detected. Bytes received: "+b.length),mi(K),K.M=!0,Z(11))}}else ut(this.i,this.l,b,null),ui(this,b);J==4&&Je(this),this.o&&!this.J&&(J==4?Qr(this.j,this):(this.o=!1,hn(this)))}else wc(this.g),c==400&&0<b.indexOf("Unknown SID")?(this.s=3,Z(12)):(this.s=0,Z(13)),Je(this),Pt(this)}}}catch{}finally{}};function Sr(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function ic(i,o){var c=i.C,u=o.indexOf(`
`,c);return u==-1?ai:(c=Number(o.substring(c,u)),isNaN(c)?br:(u+=1,u+c>o.length?ai:(o=o.slice(u,u+c),i.C=u+c,o)))}Le.prototype.cancel=function(){this.J=!0,Je(this)};function hn(i){i.S=Date.now()+i.I,Cr(i,i.I)}function Cr(i,o){if(i.B!=null)throw Error("WatchDog timer not null");i.B=kt(T(i.ba,i),o)}function li(i){i.B&&(h.clearTimeout(i.B),i.B=null)}Le.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(ec(this.i,this.A),this.L!=2&&(Ct(),Z(17)),Je(this),this.s=2,Pt(this)):Cr(this,this.S-i)};function Pt(i){i.j.G==0||i.J||Qr(i.j,i)}function Je(i){li(i);var o=i.M;o&&typeof o.ma=="function"&&o.ma(),i.M=null,vr(i.U),i.g&&(o=i.g,i.g=null,o.abort(),o.ma())}function ui(i,o){try{var c=i.j;if(c.G!=0&&(c.g==i||hi(c.h,i))){if(!i.K&&hi(c.h,i)&&c.G==3){try{var u=c.Da.g.parse(o)}catch{u=null}if(Array.isArray(u)&&u.length==3){var _=u;if(_[0]==0){e:if(!c.u){if(c.g)if(c.g.F+3e3<i.F)wn(c),yn(c);else break e;gi(c),Z(18)}}else c.za=_[1],0<c.za-c.T&&37500>_[2]&&c.F&&c.v==0&&!c.C&&(c.C=kt(T(c.Za,c),6e3));if(1>=Pr(c.h)&&c.ca){try{c.ca()}catch{}c.ca=void 0}}else Ye(c,11)}else if((i.K||c.g==i)&&wn(c),!V(o))for(_=c.Da.g.parse(o),o=0;o<_.length;o++){let N=_[o];if(c.T=N[0],N=N[1],c.G==2)if(N[0]=="c"){c.K=N[1],c.ia=N[2];const K=N[3];K!=null&&(c.la=K,c.j.info("VER="+c.la));const J=N[4];J!=null&&(c.Aa=J,c.j.info("SVER="+c.Aa));const ft=N[5];ft!=null&&typeof ft=="number"&&0<ft&&(u=1.5*ft,c.L=u,c.j.info("backChannelRequestTimeoutMs_="+u)),u=c;const ue=i.g;if(ue){const In=ue.g?ue.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(In){var E=u.h;E.g||In.indexOf("spdy")==-1&&In.indexOf("quic")==-1&&In.indexOf("h2")==-1||(E.j=E.l,E.g=new Set,E.h&&(di(E,E.h),E.h=null))}if(u.D){const vi=ue.g?ue.g.getResponseHeader("X-HTTP-Session-Id"):null;vi&&(u.ya=vi,U(u.I,u.D,vi))}}c.G=3,c.l&&c.l.ua(),c.ba&&(c.R=Date.now()-i.F,c.j.info("Handshake RTT: "+c.R+"ms")),u=c;var b=i;if(u.qa=ns(u,u.J?u.ia:null,u.W),b.K){Or(u.h,b);var M=b,z=u.L;z&&(M.I=z),M.B&&(li(M),hn(M)),u.g=b}else Yr(u);0<c.i.length&&_n(c)}else N[0]!="stop"&&N[0]!="close"||Ye(c,7);else c.G==3&&(N[0]=="stop"||N[0]=="close"?N[0]=="stop"?Ye(c,7):pi(c):N[0]!="noop"&&c.l&&c.l.ta(N),c.v=0)}}Ct(4)}catch{}}var rc=class{constructor(i,o){this.g=i,this.map=o}};function kr(i){this.l=i||10,h.PerformanceNavigationTiming?(i=h.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(h.chrome&&h.chrome.loadTimes&&h.chrome.loadTimes()&&h.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Rr(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Pr(i){return i.h?1:i.g?i.g.size:0}function hi(i,o){return i.h?i.h==o:i.g?i.g.has(o):!1}function di(i,o){i.g?i.g.add(o):i.h=o}function Or(i,o){i.h&&i.h==o?i.h=null:i.g&&i.g.has(o)&&i.g.delete(o)}kr.prototype.cancel=function(){if(this.i=Nr(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Nr(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let o=i.i;for(const c of i.g.values())o=o.concat(c.D);return o}return F(i.i)}function sc(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(f(i)){for(var o=[],c=i.length,u=0;u<c;u++)o.push(i[u]);return o}o=[],c=0;for(u in i)o[c++]=i[u];return o}function oc(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(f(i)||typeof i=="string"){var o=[];i=i.length;for(var c=0;c<i;c++)o.push(c);return o}o=[],c=0;for(const u in i)o[c++]=u;return o}}}function Dr(i,o){if(i.forEach&&typeof i.forEach=="function")i.forEach(o,void 0);else if(f(i)||typeof i=="string")Array.prototype.forEach.call(i,o,void 0);else for(var c=oc(i),u=sc(i),_=u.length,E=0;E<_;E++)o.call(void 0,u[E],c&&c[E],i)}var Lr=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ac(i,o){if(i){i=i.split("&");for(var c=0;c<i.length;c++){var u=i[c].indexOf("="),_=null;if(0<=u){var E=i[c].substring(0,u);_=i[c].substring(u+1)}else E=i[c];o(E,_?decodeURIComponent(_.replace(/\+/g," ")):"")}}}function Xe(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof Xe){this.h=i.h,dn(this,i.j),this.o=i.o,this.g=i.g,fn(this,i.s),this.l=i.l;var o=i.i,c=new Dt;c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),Mr(this,c),this.m=i.m}else i&&(o=String(i).match(Lr))?(this.h=!1,dn(this,o[1]||"",!0),this.o=Ot(o[2]||""),this.g=Ot(o[3]||"",!0),fn(this,o[4]),this.l=Ot(o[5]||"",!0),Mr(this,o[6]||"",!0),this.m=Ot(o[7]||"")):(this.h=!1,this.i=new Dt(null,this.h))}Xe.prototype.toString=function(){var i=[],o=this.j;o&&i.push(Nt(o,xr,!0),":");var c=this.g;return(c||o=="file")&&(i.push("//"),(o=this.o)&&i.push(Nt(o,xr,!0),"@"),i.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.s,c!=null&&i.push(":",String(c))),(c=this.l)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(Nt(c,c.charAt(0)=="/"?uc:lc,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",Nt(c,dc)),i.join("")};function Ae(i){return new Xe(i)}function dn(i,o,c){i.j=c?Ot(o,!0):o,i.j&&(i.j=i.j.replace(/:$/,""))}function fn(i,o){if(o){if(o=Number(o),isNaN(o)||0>o)throw Error("Bad port number "+o);i.s=o}else i.s=null}function Mr(i,o,c){o instanceof Dt?(i.i=o,fc(i.i,i.h)):(c||(o=Nt(o,hc)),i.i=new Dt(o,i.h))}function U(i,o,c){i.i.set(o,c)}function pn(i){return U(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function Ot(i,o){return i?o?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function Nt(i,o,c){return typeof i=="string"?(i=encodeURI(i).replace(o,cc),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function cc(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var xr=/[#\/\?@]/g,lc=/[#\?:]/g,uc=/[#\?]/g,hc=/[#\?@]/g,dc=/#/g;function Dt(i,o){this.h=this.g=null,this.i=i||null,this.j=!!o}function Me(i){i.g||(i.g=new Map,i.h=0,i.i&&ac(i.i,function(o,c){i.add(decodeURIComponent(o.replace(/\+/g," ")),c)}))}t=Dt.prototype,t.add=function(i,o){Me(this),this.i=null,i=ht(this,i);var c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(o),this.h+=1,this};function Ur(i,o){Me(i),o=ht(i,o),i.g.has(o)&&(i.i=null,i.h-=i.g.get(o).length,i.g.delete(o))}function Fr(i,o){return Me(i),o=ht(i,o),i.g.has(o)}t.forEach=function(i,o){Me(this),this.g.forEach(function(c,u){c.forEach(function(_){i.call(o,_,u,this)},this)},this)},t.na=function(){Me(this);const i=Array.from(this.g.values()),o=Array.from(this.g.keys()),c=[];for(let u=0;u<o.length;u++){const _=i[u];for(let E=0;E<_.length;E++)c.push(o[u])}return c},t.V=function(i){Me(this);let o=[];if(typeof i=="string")Fr(this,i)&&(o=o.concat(this.g.get(ht(this,i))));else{i=Array.from(this.g.values());for(let c=0;c<i.length;c++)o=o.concat(i[c])}return o},t.set=function(i,o){return Me(this),this.i=null,i=ht(this,i),Fr(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[o]),this.h+=1,this},t.get=function(i,o){return i?(i=this.V(i),0<i.length?String(i[0]):o):o};function jr(i,o,c){Ur(i,o),0<c.length&&(i.i=null,i.g.set(ht(i,o),F(c)),i.h+=c.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],o=Array.from(this.g.keys());for(var c=0;c<o.length;c++){var u=o[c];const E=encodeURIComponent(String(u)),b=this.V(u);for(u=0;u<b.length;u++){var _=E;b[u]!==""&&(_+="="+encodeURIComponent(String(b[u]))),i.push(_)}}return this.i=i.join("&")};function ht(i,o){return o=String(o),i.j&&(o=o.toLowerCase()),o}function fc(i,o){o&&!i.j&&(Me(i),i.i=null,i.g.forEach(function(c,u){var _=u.toLowerCase();u!=_&&(Ur(this,u),jr(this,_,c))},i)),i.j=o}function pc(i,o){const c=new Rt;if(h.Image){const u=new Image;u.onload=P(xe,c,"TestLoadImage: loaded",!0,o,u),u.onerror=P(xe,c,"TestLoadImage: error",!1,o,u),u.onabort=P(xe,c,"TestLoadImage: abort",!1,o,u),u.ontimeout=P(xe,c,"TestLoadImage: timeout",!1,o,u),h.setTimeout(function(){u.ontimeout&&u.ontimeout()},1e4),u.src=i}else o(!1)}function gc(i,o){const c=new Rt,u=new AbortController,_=setTimeout(()=>{u.abort(),xe(c,"TestPingServer: timeout",!1,o)},1e4);fetch(i,{signal:u.signal}).then(E=>{clearTimeout(_),E.ok?xe(c,"TestPingServer: ok",!0,o):xe(c,"TestPingServer: server error",!1,o)}).catch(()=>{clearTimeout(_),xe(c,"TestPingServer: error",!1,o)})}function xe(i,o,c,u,_){try{_&&(_.onload=null,_.onerror=null,_.onabort=null,_.ontimeout=null),u(c)}catch{}}function mc(){this.g=new Xa}function vc(i,o,c){const u=c||"";try{Dr(i,function(_,E){let b=_;I(_)&&(b=ei(_)),o.push(u+E+"="+encodeURIComponent(b))})}catch(_){throw o.push(u+"type="+encodeURIComponent("_badmap")),_}}function gn(i){this.l=i.Ub||null,this.j=i.eb||!1}R(gn,ti),gn.prototype.g=function(){return new mn(this.l,this.j)},gn.prototype.i=function(i){return function(){return i}}({});function mn(i,o){q.call(this),this.D=i,this.o=o,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(mn,q),t=mn.prototype,t.open=function(i,o){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=o,this.readyState=1,Mt(this)},t.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const o={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(o.body=i),(this.D||h).fetch(new Request(this.A,o)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Lt(this)),this.readyState=0},t.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Mt(this)),this.g&&(this.readyState=3,Mt(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof h.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Br(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function Br(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}t.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var o=i.value?i.value:new Uint8Array(0);(o=this.v.decode(o,{stream:!i.done}))&&(this.response=this.responseText+=o)}i.done?Lt(this):Mt(this),this.readyState==3&&Br(this)}},t.Ra=function(i){this.g&&(this.response=this.responseText=i,Lt(this))},t.Qa=function(i){this.g&&(this.response=i,Lt(this))},t.ga=function(){this.g&&Lt(this)};function Lt(i){i.readyState=4,i.l=null,i.j=null,i.v=null,Mt(i)}t.setRequestHeader=function(i,o){this.u.append(i,o)},t.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],o=this.h.entries();for(var c=o.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=o.next();return i.join(`\r
`)};function Mt(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(mn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Vr(i){let o="";return W(i,function(c,u){o+=u,o+=":",o+=c,o+=`\r
`}),o}function fi(i,o,c){e:{for(u in c){var u=!1;break e}u=!0}u||(c=Vr(c),typeof i=="string"?c!=null&&encodeURIComponent(String(c)):U(i,o,c))}function H(i){q.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(H,q);var yc=/^https?$/i,_c=["POST","PUT"];t=H.prototype,t.Ha=function(i){this.J=i},t.ea=function(i,o,c,u){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);o=o?o.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():oi.g(),this.v=this.o?yr(this.o):yr(oi),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(o,String(i),!0),this.B=!1}catch(E){Hr(this,E);return}if(i=c||"",c=new Map(this.headers),u)if(Object.getPrototypeOf(u)===Object.prototype)for(var _ in u)c.set(_,u[_]);else if(typeof u.keys=="function"&&typeof u.get=="function")for(const E of u.keys())c.set(E,u.get(E));else throw Error("Unknown input type for opt_headers: "+String(u));u=Array.from(c.keys()).find(E=>E.toLowerCase()=="content-type"),_=h.FormData&&i instanceof h.FormData,!(0<=Array.prototype.indexOf.call(_c,o,void 0))||u||_||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[E,b]of c)this.g.setRequestHeader(E,b);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{zr(this),this.u=!0,this.g.send(i),this.u=!1}catch(E){Hr(this,E)}};function Hr(i,o){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=o,i.m=5,$r(i),vn(i)}function $r(i){i.A||(i.A=!0,Y(i,"complete"),Y(i,"error"))}t.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,Y(this,"complete"),Y(this,"abort"),vn(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),vn(this,!0)),H.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Wr(this):this.bb())},t.bb=function(){Wr(this)};function Wr(i){if(i.h&&typeof l<"u"&&(!i.v[1]||Se(i)!=4||i.Z()!=2)){if(i.u&&Se(i)==4)pr(i.Ea,0,i);else if(Y(i,"readystatechange"),Se(i)==4){i.h=!1;try{const b=i.Z();e:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var o=!0;break e;default:o=!1}var c;if(!(c=o)){var u;if(u=b===0){var _=String(i.D).match(Lr)[1]||null;!_&&h.self&&h.self.location&&(_=h.self.location.protocol.slice(0,-1)),u=!yc.test(_?_.toLowerCase():"")}c=u}if(c)Y(i,"complete"),Y(i,"success");else{i.m=6;try{var E=2<Se(i)?i.g.statusText:""}catch{E=""}i.l=E+" ["+i.Z()+"]",$r(i)}}finally{vn(i)}}}}function vn(i,o){if(i.g){zr(i);const c=i.g,u=i.v[0]?()=>{}:null;i.g=null,i.v=null,o||Y(i,"ready");try{c.onreadystatechange=u}catch{}}}function zr(i){i.I&&(h.clearTimeout(i.I),i.I=null)}t.isActive=function(){return!!this.g};function Se(i){return i.g?i.g.readyState:0}t.Z=function(){try{return 2<Se(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(i){if(this.g){var o=this.g.responseText;return i&&o.indexOf(i)==0&&(o=o.substring(i.length)),Ja(o)}};function Gr(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function wc(i){const o={};i=(i.g&&2<=Se(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let u=0;u<i.length;u++){if(V(i[u]))continue;var c=v(i[u]);const _=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const E=o[_]||[];o[_]=E,E.push(c)}y(o,function(u){return u.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function xt(i,o,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||o}function qr(i){this.Aa=0,this.i=[],this.j=new Rt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=xt("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=xt("baseRetryDelayMs",5e3,i),this.cb=xt("retryDelaySeedMs",1e4,i),this.Wa=xt("forwardChannelMaxRetries",2,i),this.wa=xt("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new kr(i&&i.concurrentRequestLimit),this.Da=new mc,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=qr.prototype,t.la=8,t.G=1,t.connect=function(i,o,c,u){Z(0),this.W=i,this.H=o||{},c&&u!==void 0&&(this.H.OSID=c,this.H.OAID=u),this.F=this.X,this.I=ns(this,null,this.W),_n(this)};function pi(i){if(Kr(i),i.G==3){var o=i.U++,c=Ae(i.I);if(U(c,"SID",i.K),U(c,"RID",o),U(c,"TYPE","terminate"),Ut(i,c),o=new Le(i,i.j,o),o.L=2,o.v=pn(Ae(c)),c=!1,h.navigator&&h.navigator.sendBeacon)try{c=h.navigator.sendBeacon(o.v.toString(),"")}catch{}!c&&h.Image&&(new Image().src=o.v,c=!0),c||(o.g=is(o.j,null),o.g.ea(o.v)),o.F=Date.now(),hn(o)}ts(i)}function yn(i){i.g&&(mi(i),i.g.cancel(),i.g=null)}function Kr(i){yn(i),i.u&&(h.clearTimeout(i.u),i.u=null),wn(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&h.clearTimeout(i.s),i.s=null)}function _n(i){if(!Rr(i.h)&&!i.s){i.s=!0;var o=i.Ga;ne||bt(),be||(ne(),be=!0),ct.add(o,i),i.B=0}}function Ic(i,o){return Pr(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=o.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=kt(T(i.Ga,i,o),es(i,i.B)),i.B++,!0)}t.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const _=new Le(this,this.j,i);let E=this.o;if(this.S&&(E?(E=d(E),m(E,this.S)):E=this.S),this.m!==null||this.O||(_.H=E,E=null),this.P)e:{for(var o=0,c=0;c<this.i.length;c++){t:{var u=this.i[c];if("__data__"in u.map&&(u=u.map.__data__,typeof u=="string")){u=u.length;break t}u=void 0}if(u===void 0)break;if(o+=u,4096<o){o=c;break e}if(o===4096||c===this.i.length-1){o=c+1;break e}}o=1e3}else o=1e3;o=Xr(this,_,o),c=Ae(this.I),U(c,"RID",i),U(c,"CVER",22),this.D&&U(c,"X-HTTP-Session-Id",this.D),Ut(this,c),E&&(this.O?o="headers="+encodeURIComponent(String(Vr(E)))+"&"+o:this.m&&fi(c,this.m,E)),di(this.h,_),this.Ua&&U(c,"TYPE","init"),this.P?(U(c,"$req",o),U(c,"SID","null"),_.T=!0,ci(_,c,null)):ci(_,c,o),this.G=2}}else this.G==3&&(i?Jr(this,i):this.i.length==0||Rr(this.h)||Jr(this))};function Jr(i,o){var c;o?c=o.l:c=i.U++;const u=Ae(i.I);U(u,"SID",i.K),U(u,"RID",c),U(u,"AID",i.T),Ut(i,u),i.m&&i.o&&fi(u,i.m,i.o),c=new Le(i,i.j,c,i.B+1),i.m===null&&(c.H=i.o),o&&(i.i=o.D.concat(i.i)),o=Xr(i,c,1e3),c.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),di(i.h,c),ci(c,u,o)}function Ut(i,o){i.H&&W(i.H,function(c,u){U(o,u,c)}),i.l&&Dr({},function(c,u){U(o,u,c)})}function Xr(i,o,c){c=Math.min(i.i.length,c);var u=i.l?T(i.l.Na,i.l,i):null;e:{var _=i.i;let E=-1;for(;;){const b=["count="+c];E==-1?0<c?(E=_[0].g,b.push("ofs="+E)):E=0:b.push("ofs="+E);let M=!0;for(let z=0;z<c;z++){let N=_[z].g;const K=_[z].map;if(N-=E,0>N)E=Math.max(0,_[z].g-100),M=!1;else try{vc(K,b,"req"+N+"_")}catch{u&&u(K)}}if(M){u=b.join("&");break e}}}return i=i.i.splice(0,c),o.D=i,u}function Yr(i){if(!i.g&&!i.u){i.Y=1;var o=i.Fa;ne||bt(),be||(ne(),be=!0),ct.add(o,i),i.v=0}}function gi(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=kt(T(i.Fa,i),es(i,i.v)),i.v++,!0)}t.Fa=function(){if(this.u=null,Zr(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=kt(T(this.ab,this),i)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Z(10),yn(this),Zr(this))};function mi(i){i.A!=null&&(h.clearTimeout(i.A),i.A=null)}function Zr(i){i.g=new Le(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var o=Ae(i.qa);U(o,"RID","rpc"),U(o,"SID",i.K),U(o,"AID",i.T),U(o,"CI",i.F?"0":"1"),!i.F&&i.ja&&U(o,"TO",i.ja),U(o,"TYPE","xmlhttp"),Ut(i,o),i.m&&i.o&&fi(o,i.m,i.o),i.L&&(i.g.I=i.L);var c=i.g;i=i.ia,c.L=1,c.v=pn(Ae(o)),c.m=null,c.P=!0,Ar(c,i)}t.Za=function(){this.C!=null&&(this.C=null,yn(this),gi(this),Z(19))};function wn(i){i.C!=null&&(h.clearTimeout(i.C),i.C=null)}function Qr(i,o){var c=null;if(i.g==o){wn(i),mi(i),i.g=null;var u=2}else if(hi(i.h,o))c=o.D,Or(i.h,o),u=1;else return;if(i.G!=0){if(o.o)if(u==1){c=o.m?o.m.length:0,o=Date.now()-o.F;var _=i.B;u=ri(),Y(u,new Er(u,c)),_n(i)}else Yr(i);else if(_=o.s,_==3||_==0&&0<o.X||!(u==1&&Ic(i,o)||u==2&&gi(i)))switch(c&&0<c.length&&(o=i.h,o.i=o.i.concat(c)),_){case 1:Ye(i,5);break;case 4:Ye(i,10);break;case 3:Ye(i,6);break;default:Ye(i,2)}}}function es(i,o){let c=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(c*=2),c*o}function Ye(i,o){if(i.j.info("Error code "+o),o==2){var c=T(i.fb,i),u=i.Xa;const _=!u;u=new Xe(u||"//www.google.com/images/cleardot.gif"),h.location&&h.location.protocol=="http"||dn(u,"https"),pn(u),_?pc(u.toString(),c):gc(u.toString(),c)}else Z(2);i.G=0,i.l&&i.l.sa(o),ts(i),Kr(i)}t.fb=function(i){i?(this.j.info("Successfully pinged google.com"),Z(2)):(this.j.info("Failed to ping google.com"),Z(1))};function ts(i){if(i.G=0,i.ka=[],i.l){const o=Nr(i.h);(o.length!=0||i.i.length!=0)&&(D(i.ka,o),D(i.ka,i.i),i.h.i.length=0,F(i.i),i.i.length=0),i.l.ra()}}function ns(i,o,c){var u=c instanceof Xe?Ae(c):new Xe(c);if(u.g!="")o&&(u.g=o+"."+u.g),fn(u,u.s);else{var _=h.location;u=_.protocol,o=o?o+"."+_.hostname:_.hostname,_=+_.port;var E=new Xe(null);u&&dn(E,u),o&&(E.g=o),_&&fn(E,_),c&&(E.l=c),u=E}return c=i.D,o=i.ya,c&&o&&U(u,c,o),U(u,"VER",i.la),Ut(i,u),u}function is(i,o,c){if(o&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return o=i.Ca&&!i.pa?new H(new gn({eb:c})):new H(i.pa),o.Ha(i.J),o}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function rs(){}t=rs.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function oe(i,o){q.call(this),this.g=new qr(o),this.l=i,this.h=o&&o.messageUrlParams||null,i=o&&o.messageHeaders||null,o&&o.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=o&&o.initMessageHeaders||null,o&&o.messageContentType&&(i?i["X-WebChannel-Content-Type"]=o.messageContentType:i={"X-WebChannel-Content-Type":o.messageContentType}),o&&o.va&&(i?i["X-WebChannel-Client-Profile"]=o.va:i={"X-WebChannel-Client-Profile":o.va}),this.g.S=i,(i=o&&o.Sb)&&!V(i)&&(this.g.m=i),this.v=o&&o.supportsCrossDomainXhr||!1,this.u=o&&o.sendRawJson||!1,(o=o&&o.httpSessionIdParam)&&!V(o)&&(this.g.D=o,i=this.h,i!==null&&o in i&&(i=this.h,o in i&&delete i[o])),this.j=new dt(this)}R(oe,q),oe.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},oe.prototype.close=function(){pi(this.g)},oe.prototype.o=function(i){var o=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.u&&(c={},c.__data__=ei(i),i=c);o.i.push(new rc(o.Ya++,i)),o.G==3&&_n(o)},oe.prototype.N=function(){this.g.l=null,delete this.j,pi(this.g),delete this.g,oe.aa.N.call(this)};function ss(i){ni.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var o=i.__sm__;if(o){e:{for(const c in o){i=c;break e}i=void 0}(this.i=i)&&(i=this.i,o=o!==null&&i in o?o[i]:void 0),this.data=o}else this.data=i}R(ss,ni);function os(){ii.call(this),this.status=1}R(os,ii);function dt(i){this.g=i}R(dt,rs),dt.prototype.ua=function(){Y(this.g,"a")},dt.prototype.ta=function(i){Y(this.g,new ss(i))},dt.prototype.sa=function(i){Y(this.g,new os)},dt.prototype.ra=function(){Y(this.g,"b")},oe.prototype.send=oe.prototype.o,oe.prototype.open=oe.prototype.m,oe.prototype.close=oe.prototype.close,si.NO_ERROR=0,si.TIMEOUT=8,si.HTTP_ERROR=6,nc.COMPLETE="complete",Ya.EventType=St,St.OPEN="a",St.CLOSE="b",St.ERROR="c",St.MESSAGE="d",q.prototype.listen=q.prototype.K,H.prototype.listenOnce=H.prototype.L,H.prototype.getLastError=H.prototype.Ka,H.prototype.getLastErrorCode=H.prototype.Ba,H.prototype.getStatus=H.prototype.Z,H.prototype.getResponseJson=H.prototype.Oa,H.prototype.getResponseText=H.prototype.oa,H.prototype.send=H.prototype.ea,H.prototype.setWithCredentials=H.prototype.Ha}).apply(typeof bn<"u"?bn:typeof self<"u"?self:typeof window<"u"?window:{});const Bs="@firebase/firestore",Vs="4.7.17";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Q.UNAUTHENTICATED=new Q(null),Q.GOOGLE_CREDENTIALS=new Q("google-credentials-uid"),Q.FIRST_PARTY=new Q("first-party-uid"),Q.MOCK_USER=new Q("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tn="11.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It=new Bn("@firebase/firestore");function fe(t,...e){if(It.logLevel<=L.DEBUG){const n=e.map(ir);It.debug(`Firestore (${tn}): ${t}`,...n)}}function fa(t,...e){if(It.logLevel<=L.ERROR){const n=e.map(ir);It.error(`Firestore (${tn}): ${t}`,...n)}}function Sd(t,...e){if(It.logLevel<=L.WARN){const n=e.map(ir);It.warn(`Firestore (${tn}): ${t}`,...n)}}function ir(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pa(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,ga(t,r,n)}function ga(t,e,n){let r=`FIRESTORE (${tn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw fa(r),new Error(r)}function $t(t,e,n,r){let s="Unexpected state";typeof n=="string"?s=n:r=n,t||ga(e,s,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ie={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class re extends me{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Cd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Q.UNAUTHENTICATED))}shutdown(){}}class kd{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class Rd{constructor(e){this.t=e,this.currentUser=Q.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){$t(this.o===void 0,42304);let r=this.i;const s=f=>this.i!==r?(r=this.i,n(f)):Promise.resolve();let a=new Wt;this.o=()=>{this.i++,this.currentUser=this.u(),a.resolve(),a=new Wt,e.enqueueRetryable(()=>s(this.currentUser))};const l=()=>{const f=a;e.enqueueRetryable(async()=>{await f.promise,await s(this.currentUser)})},h=f=>{fe("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=f,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit(f=>h(f)),setTimeout(()=>{if(!this.auth){const f=this.t.getImmediate({optional:!0});f?h(f):(fe("FirebaseAuthCredentialsProvider","Auth not yet detected"),a.resolve(),a=new Wt)}},0),l()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(fe("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?($t(typeof r.accessToken=="string",31837,{l:r}),new ma(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return $t(e===null||typeof e=="string",2055,{h:e}),new Q(e)}}class Pd{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=Q.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Od{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new Pd(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(Q.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Hs{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Nd{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,he(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){$t(this.o===void 0,3512);const r=a=>{a.error!=null&&fe("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${a.error.message}`);const l=a.token!==this.m;return this.m=a.token,fe("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?n(a.token):Promise.resolve()};this.o=a=>{e.enqueueRetryable(()=>r(a))};const s=a=>{fe("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=a,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(a=>s(a)),setTimeout(()=>{if(!this.appCheck){const a=this.V.getImmediate({optional:!0});a?s(a):fe("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Hs(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?($t(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new Hs(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function Dd(t){return t.name==="IndexedDbTransactionError"}const Bi="(default)";class Fn{constructor(e,n){this.projectId=e,this.database=n||Bi}static empty(){return new Fn("","")}get isDefaultDatabase(){return this.database===Bi}isEqual(e){return e instanceof Fn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $s,O;(O=$s||($s={}))[O.OK=0]="OK",O[O.CANCELLED=1]="CANCELLED",O[O.UNKNOWN=2]="UNKNOWN",O[O.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",O[O.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",O[O.NOT_FOUND=5]="NOT_FOUND",O[O.ALREADY_EXISTS=6]="ALREADY_EXISTS",O[O.PERMISSION_DENIED=7]="PERMISSION_DENIED",O[O.UNAUTHENTICATED=16]="UNAUTHENTICATED",O[O.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",O[O.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",O[O.ABORTED=10]="ABORTED",O[O.OUT_OF_RANGE=11]="OUT_OF_RANGE",O[O.UNIMPLEMENTED=12]="UNIMPLEMENTED",O[O.INTERNAL=13]="INTERNAL",O[O.UNAVAILABLE=14]="UNAVAILABLE",O[O.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new da([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ld=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Md=1048576;function Ai(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xd{constructor(e,n,r=1e3,s=1.5,a=6e4){this.xi=e,this.timerId=n,this.A_=r,this.R_=s,this.V_=a,this.m_=0,this.f_=null,this.g_=Date.now(),this.reset()}reset(){this.m_=0}p_(){this.m_=this.V_}y_(e){this.cancel();const n=Math.floor(this.m_+this.w_()),r=Math.max(0,Date.now()-this.g_),s=Math.max(0,n-r);s>0&&fe("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.m_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.f_=this.xi.enqueueAfterDelay(this.timerId,s,()=>(this.g_=Date.now(),e())),this.m_*=this.R_,this.m_<this.A_&&(this.m_=this.A_),this.m_>this.V_&&(this.m_=this.V_)}b_(){this.f_!==null&&(this.f_.skipDelay(),this.f_=null)}cancel(){this.f_!==null&&(this.f_.cancel(),this.f_=null)}w_(){return(Math.random()-.5)*this.m_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(e,n,r,s,a){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=a,this.deferred=new Wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(l=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,a){const l=Date.now()+r,h=new rr(e,n,l,s,a);return h.start(r),h}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new re(ie.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var Ws,zs;(zs=Ws||(Ws={})).xa="default",zs.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ud(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gs=new Map;function Fd(t,e,n,r){if(e===!0&&r===!0)throw new re(ie.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function jd(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":pa(12329,{type:typeof t})}function Bd(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new re(ie.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=jd(t);throw new re(ie.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va="firestore.googleapis.com",qs=!0;class Ks{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new re(ie.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=va,this.ssl=qs}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:qs;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Ld;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Md)throw new re(ie.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Fd("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ud((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(a){if(a.timeoutSeconds!==void 0){if(isNaN(a.timeoutSeconds))throw new re(ie.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (must not be NaN)`);if(a.timeoutSeconds<5)throw new re(ie.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (minimum allowed value is 5)`);if(a.timeoutSeconds>30)throw new re(ie.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ya{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ks({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new re(ie.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new re(ie.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ks(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Cd;switch(r.type){case"firstParty":return new Od(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new re(ie.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Gs.get(n);r&&(fe("ComponentProvider","Removing Datastore"),Gs.delete(n),r.terminate())}(this),Promise.resolve()}}function Vd(t,e,n,r={}){var s;t=Bd(t,ya);const a=Jt(e),l=t._getSettings(),h=Object.assign(Object.assign({},l),{emulatorOptions:t._getEmulatorOptions()}),f=`${e}:${n}`;a&&(Io(`https://${f}`),Eo("Firestore",!0)),l.host!==va&&l.host!==f&&Sd("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const I=Object.assign(Object.assign({},l),{host:f,ssl:a,emulatorOptions:r});if(!nt(I,h)&&(t._setSettings(I),r.mockUserToken)){let A,S;if(typeof r.mockUserToken=="string")A=r.mockUserToken,S=Q.MOCK_USER;else{A=jc(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const T=r.mockUserToken.sub||r.mockUserToken.user_id;if(!T)throw new re(ie.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");S=new Q(T)}t._authCredentials=new kd(new ma(A,S))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Js="AsyncQueue";class Xs{constructor(e=Promise.resolve()){this.Ju=[],this.Yu=!1,this.Zu=[],this.Xu=null,this.ec=!1,this.tc=!1,this.nc=[],this.x_=new xd(this,"async_queue_retry"),this.rc=()=>{const r=Ai();r&&fe(Js,"Visibility state changed to "+r.visibilityState),this.x_.b_()},this.sc=e;const n=Ai();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.rc)}get isShuttingDown(){return this.Yu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.oc(),this._c(e)}enterRestrictedMode(e){if(!this.Yu){this.Yu=!0,this.tc=e||!1;const n=Ai();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.rc)}}enqueue(e){if(this.oc(),this.Yu)return new Promise(()=>{});const n=new Wt;return this._c(()=>this.Yu&&this.tc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Ju.push(e),this.ac()))}async ac(){if(this.Ju.length!==0){try{await this.Ju[0](),this.Ju.shift(),this.x_.reset()}catch(e){if(!Dd(e))throw e;fe(Js,"Operation failed with retryable error: "+e)}this.Ju.length>0&&this.x_.y_(()=>this.ac())}}_c(e){const n=this.sc.then(()=>(this.ec=!0,e().catch(r=>{throw this.Xu=r,this.ec=!1,fa("INTERNAL UNHANDLED ERROR: ",Ys(r)),r}).then(r=>(this.ec=!1,r))));return this.sc=n,n}enqueueAfterDelay(e,n,r){this.oc(),this.nc.indexOf(e)>-1&&(n=0);const s=rr.createAndSchedule(this,e,n,r,a=>this.uc(a));return this.Zu.push(s),s}oc(){this.Xu&&pa(47125,{cc:Ys(this.Xu)})}verifyOperationInProgress(){}async lc(){let e;do e=this.sc,await e;while(e!==this.sc)}hc(e){for(const n of this.Zu)if(n.timerId===e)return!0;return!1}Pc(e){return this.lc().then(()=>{this.Zu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Zu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.lc()})}Tc(e){this.nc.push(e)}uc(e){const n=this.Zu.indexOf(e);this.Zu.splice(n,1)}}function Ys(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class Hd extends ya{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new Xs,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Xs(e),this._firestoreClient=void 0,await e}}}function $d(t,e){const n=typeof t=="object"?t:Po(),r=typeof t=="string"?t:Bi,s=Yt(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const a=Uc("firestore");a&&Vd(s,...a)}return s}(function(e,n=!0){(function(s){tn=s})(Et),we(new pe("firestore",(r,{instanceIdentifier:s,options:a})=>{const l=r.getProvider("app").getImmediate(),h=new Hd(new Rd(r.getProvider("auth-internal")),new Nd(l,r.getProvider("app-check-internal")),function(I,A){if(!Object.prototype.hasOwnProperty.apply(I.options,["projectId"]))throw new re(ie.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Fn(I.options.projectId,A)}(l,s),l);return a=Object.assign({useFetchStreams:n},a),h._setSettings(a),h},"PUBLIC").setMultipleInstances(!0)),ae(Bs,Vs,e),ae(Bs,Vs,"esm2017")})();var Wd="firebase",zd="11.9.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ae(Wd,zd,"app");const _a="@firebase/installations",sr="0.6.17";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wa=1e4,Ia=`w:${sr}`,Ea="FIS_v2",Gd="https://firebaseinstallations.googleapis.com/v1",qd=60*60*1e3,Kd="installations",Jd="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xd={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},rt=new ot(Kd,Jd,Xd);function Ta(t){return t instanceof me&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ba({projectId:t}){return`${Gd}/projects/${t}/installations`}function Aa(t){return{token:t.token,requestStatus:2,expiresIn:Zd(t.expiresIn),creationTime:Date.now()}}async function Sa(t,e){const r=(await e.json()).error;return rt.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Ca({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function Yd(t,{refreshToken:e}){const n=Ca(t);return n.append("Authorization",Qd(e)),n}async function ka(t){const e=await t();return e.status>=500&&e.status<600?t():e}function Zd(t){return Number(t.replace("s","000"))}function Qd(t){return`${Ea} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ef({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=ba(t),s=Ca(t),a=e.getImmediate({optional:!0});if(a){const I=await a.getHeartbeatsHeader();I&&s.append("x-firebase-client",I)}const l={fid:n,authVersion:Ea,appId:t.appId,sdkVersion:Ia},h={method:"POST",headers:s,body:JSON.stringify(l)},f=await ka(()=>fetch(r,h));if(f.ok){const I=await f.json();return{fid:I.fid||n,registrationStatus:2,refreshToken:I.refreshToken,authToken:Aa(I.authToken)}}else throw await Sa("Create Installation",f)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ra(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tf(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nf=/^[cdef][\w-]{21}$/,Vi="";function rf(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=sf(t);return nf.test(n)?n:Vi}catch{return Vi}}function sf(t){return tf(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zn(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pa=new Map;function Oa(t,e){const n=zn(t);Na(n,e),of(n,e)}function Na(t,e){const n=Pa.get(t);if(n)for(const r of n)r(e)}function of(t,e){const n=af();n&&n.postMessage({key:t,fid:e}),cf()}let tt=null;function af(){return!tt&&"BroadcastChannel"in self&&(tt=new BroadcastChannel("[Firebase] FID Change"),tt.onmessage=t=>{Na(t.data.key,t.data.fid)}),tt}function cf(){Pa.size===0&&tt&&(tt.close(),tt=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf="firebase-installations-database",uf=1,st="firebase-installations-store";let Si=null;function or(){return Si||(Si=ko(lf,uf,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(st)}}})),Si}async function jn(t,e){const n=zn(t),s=(await or()).transaction(st,"readwrite"),a=s.objectStore(st),l=await a.get(n);return await a.put(e,n),await s.done,(!l||l.fid!==e.fid)&&Oa(t,e.fid),e}async function Da(t){const e=zn(t),r=(await or()).transaction(st,"readwrite");await r.objectStore(st).delete(e),await r.done}async function Gn(t,e){const n=zn(t),s=(await or()).transaction(st,"readwrite"),a=s.objectStore(st),l=await a.get(n),h=e(l);return h===void 0?await a.delete(n):await a.put(h,n),await s.done,h&&(!l||l.fid!==h.fid)&&Oa(t,h.fid),h}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ar(t){let e;const n=await Gn(t.appConfig,r=>{const s=hf(r),a=df(t,s);return e=a.registrationPromise,a.installationEntry});return n.fid===Vi?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function hf(t){const e=t||{fid:rf(),registrationStatus:0};return La(e)}function df(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(rt.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=ff(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:pf(t)}:{installationEntry:e}}async function ff(t,e){try{const n=await ef(t,e);return jn(t.appConfig,n)}catch(n){throw Ta(n)&&n.customData.serverCode===409?await Da(t.appConfig):await jn(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function pf(t){let e=await Zs(t.appConfig);for(;e.registrationStatus===1;)await Ra(100),e=await Zs(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await ar(t);return r||n}return e}function Zs(t){return Gn(t,e=>{if(!e)throw rt.create("installation-not-found");return La(e)})}function La(t){return gf(t)?{fid:t.fid,registrationStatus:0}:t}function gf(t){return t.registrationStatus===1&&t.registrationTime+wa<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mf({appConfig:t,heartbeatServiceProvider:e},n){const r=vf(t,n),s=Yd(t,n),a=e.getImmediate({optional:!0});if(a){const I=await a.getHeartbeatsHeader();I&&s.append("x-firebase-client",I)}const l={installation:{sdkVersion:Ia,appId:t.appId}},h={method:"POST",headers:s,body:JSON.stringify(l)},f=await ka(()=>fetch(r,h));if(f.ok){const I=await f.json();return Aa(I)}else throw await Sa("Generate Auth Token",f)}function vf(t,{fid:e}){return`${ba(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cr(t,e=!1){let n;const r=await Gn(t.appConfig,a=>{if(!Ma(a))throw rt.create("not-registered");const l=a.authToken;if(!e&&wf(l))return a;if(l.requestStatus===1)return n=yf(t,e),a;{if(!navigator.onLine)throw rt.create("app-offline");const h=Ef(a);return n=_f(t,h),h}});return n?await n:r.authToken}async function yf(t,e){let n=await Qs(t.appConfig);for(;n.authToken.requestStatus===1;)await Ra(100),n=await Qs(t.appConfig);const r=n.authToken;return r.requestStatus===0?cr(t,e):r}function Qs(t){return Gn(t,e=>{if(!Ma(e))throw rt.create("not-registered");const n=e.authToken;return Tf(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function _f(t,e){try{const n=await mf(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await jn(t.appConfig,r),n}catch(n){if(Ta(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Da(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await jn(t.appConfig,r)}throw n}}function Ma(t){return t!==void 0&&t.registrationStatus===2}function wf(t){return t.requestStatus===2&&!If(t)}function If(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+qd}function Ef(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function Tf(t){return t.requestStatus===1&&t.requestTime+wa<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bf(t){const e=t,{installationEntry:n,registrationPromise:r}=await ar(e);return r?r.catch(console.error):cr(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Af(t,e=!1){const n=t;return await Sf(n),(await cr(n,e)).token}async function Sf(t){const{registrationPromise:e}=await ar(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cf(t){if(!t||!t.options)throw Ci("App Configuration");if(!t.name)throw Ci("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Ci(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Ci(t){return rt.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xa="installations",kf="installations-internal",Rf=t=>{const e=t.getProvider("app").getImmediate(),n=Cf(e),r=Yt(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Pf=t=>{const e=t.getProvider("app").getImmediate(),n=Yt(e,xa).getImmediate();return{getId:()=>bf(n),getToken:s=>Af(n,s)}};function Of(){we(new pe(xa,Rf,"PUBLIC")),we(new pe(kf,Pf,"PRIVATE"))}Of();ae(_a,sr);ae(_a,sr,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eo="analytics",Nf="firebase_id",Df="origin",Lf=60*1e3,Mf="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",lr="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const se=new Bn("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xf={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},ce=new ot("analytics","Analytics",xf);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uf(t){if(!t.startsWith(lr)){const e=ce.create("invalid-gtag-resource",{gtagURL:t});return se.warn(e.message),""}return t}function Ua(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function Ff(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function jf(t,e){const n=Ff("firebase-js-sdk-policy",{createScriptURL:Uf}),r=document.createElement("script"),s=`${lr}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function Bf(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function Vf(t,e,n,r,s,a){const l=r[s];try{if(l)await e[l];else{const f=(await Ua(n)).find(I=>I.measurementId===s);f&&await e[f.appId]}}catch(h){se.error(h)}t("config",s,a)}async function Hf(t,e,n,r,s){try{let a=[];if(s&&s.send_to){let l=s.send_to;Array.isArray(l)||(l=[l]);const h=await Ua(n);for(const f of l){const I=h.find(S=>S.measurementId===f),A=I&&e[I.appId];if(A)a.push(A);else{a=[];break}}}a.length===0&&(a=Object.values(e)),await Promise.all(a),t("event",r,s||{})}catch(a){se.error(a)}}function $f(t,e,n,r){async function s(a,...l){try{if(a==="event"){const[h,f]=l;await Hf(t,e,n,h,f)}else if(a==="config"){const[h,f]=l;await Vf(t,e,n,r,h,f)}else if(a==="consent"){const[h,f]=l;t("consent",h,f)}else if(a==="get"){const[h,f,I]=l;t("get",h,f,I)}else if(a==="set"){const[h]=l;t("set",h)}else t(a,...l)}catch(h){se.error(h)}}return s}function Wf(t,e,n,r,s){let a=function(...l){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(a=window[s]),window[s]=$f(a,t,e,n),{gtagCore:a,wrappedGtag:window[s]}}function zf(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(lr)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gf=30,qf=1e3;class Kf{constructor(e={},n=qf){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Fa=new Kf;function Jf(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function Xf(t){var e;const{appId:n,apiKey:r}=t,s={method:"GET",headers:Jf(r)},a=Mf.replace("{app-id}",n),l=await fetch(a,s);if(l.status!==200&&l.status!==304){let h="";try{const f=await l.json();!((e=f.error)===null||e===void 0)&&e.message&&(h=f.error.message)}catch{}throw ce.create("config-fetch-failed",{httpStatus:l.status,responseMessage:h})}return l.json()}async function Yf(t,e=Fa,n){const{appId:r,apiKey:s,measurementId:a}=t.options;if(!r)throw ce.create("no-app-id");if(!s){if(a)return{measurementId:a,appId:r};throw ce.create("no-api-key")}const l=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},h=new ep;return setTimeout(async()=>{h.abort()},Lf),ja({appId:r,apiKey:s,measurementId:a},l,h,e)}async function ja(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=Fa){var a;const{appId:l,measurementId:h}=t;try{await Zf(r,e)}catch(f){if(h)return se.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${h} provided in the "measurementId" field in the local Firebase config. [${f==null?void 0:f.message}]`),{appId:l,measurementId:h};throw f}try{const f=await Xf(t);return s.deleteThrottleMetadata(l),f}catch(f){const I=f;if(!Qf(I)){if(s.deleteThrottleMetadata(l),h)return se.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${h} provided in the "measurementId" field in the local Firebase config. [${I==null?void 0:I.message}]`),{appId:l,measurementId:h};throw f}const A=Number((a=I==null?void 0:I.customData)===null||a===void 0?void 0:a.httpStatus)===503?hs(n,s.intervalMillis,Gf):hs(n,s.intervalMillis),S={throttleEndTimeMillis:Date.now()+A,backoffCount:n+1};return s.setThrottleMetadata(l,S),se.debug(`Calling attemptFetch again in ${A} millis`),ja(t,S,r,s)}}function Zf(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),a=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(a),r(ce.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Qf(t){if(!(t instanceof me)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class ep{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function tp(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const a=await e,l=Object.assign(Object.assign({},r),{send_to:a});t("event",n,l)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function np(){if(bo())try{await Ao()}catch(t){return se.warn(ce.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return se.warn(ce.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function ip(t,e,n,r,s,a,l){var h;const f=Yf(t);f.then(P=>{n[P.measurementId]=P.appId,t.options.measurementId&&P.measurementId!==t.options.measurementId&&se.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${P.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(P=>se.error(P)),e.push(f);const I=np().then(P=>{if(P)return r.getId()}),[A,S]=await Promise.all([f,I]);zf(a)||jf(a,A.measurementId),s("js",new Date);const T=(h=l==null?void 0:l.config)!==null&&h!==void 0?h:{};return T[Df]="firebase",T.update=!0,S!=null&&(T[Nf]=S),s("config",A.measurementId,T),A.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(e){this.app=e}_delete(){return delete zt[this.app.options.appId],Promise.resolve()}}let zt={},to=[];const no={};let ki="dataLayer",sp="gtag",io,Ba,ro=!1;function op(){const t=[];if(To()&&t.push("This is a browser extension environment."),Gc()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=ce.create("invalid-analytics-context",{errorInfo:e});se.warn(n.message)}}function ap(t,e,n){op();const r=t.options.appId;if(!r)throw ce.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)se.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw ce.create("no-api-key");if(zt[r]!=null)throw ce.create("already-exists",{id:r});if(!ro){Bf(ki);const{wrappedGtag:a,gtagCore:l}=Wf(zt,to,no,ki,sp);Ba=a,io=l,ro=!0}return zt[r]=ip(t,to,no,e,io,ki,n),new rp(t)}function cp(t,e,n,r){t=Ee(t),tp(Ba,zt[t.app.options.appId],e,n,r).catch(s=>se.error(s))}const so="@firebase/analytics",oo="0.10.16";function lp(){we(new pe(eo,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return ap(r,s,n)},"PUBLIC")),we(new pe("analytics-internal",t,"PRIVATE")),ae(so,oo),ae(so,oo,"esm2017");function t(e){try{const n=e.getProvider(eo).getImmediate();return{logEvent:(r,s,a)=>cp(n,r,s,a)}}catch(n){throw ce.create("interop-component-reg-failed",{reason:n})}}}lp();const up={apiKey:"AIzaSyDTRCTWxRCq0xqPeFrom0mC5nuur3Zxy04",authDomain:"wushu-toolkit.firebaseapp.com",projectId:"wushu-toolkit",storageBucket:"wushu-toolkit.firebasestorage.app",messagingSenderId:"577649891937",appId:"1:577649891937:web:55e582b4215440741aa820",measurementId:"G-B4YVBN76JQ"},Va=Ro(up),Ha=bd(Va);$d(Va);async function pp(t,e){const r=(await uh(Ha,t,e)).user;console.log(r);const s=crypto.randomUUID();localStorage.setItem("sessionToken",s)}async function gp(){localStorage.removeItem("sessionToken"),await fh(Ha)}export{Rn as C,Ie as T,Sc as _,$i as a,uo as b,fo as c,po as d,ho as e,Ha as f,Hi as g,pp as h,Cc as i,Ac as j,gp as l,fp as o,dp as s,ao as u};
