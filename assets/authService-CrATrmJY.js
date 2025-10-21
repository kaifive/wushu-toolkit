import{r as F,R as x,n as yn,_ as Ge,a as Re,c as qe,P as C,e as mc}from"./index-DsyuJ70c.js";function no(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return F.useMemo(function(){return t.every(function(n){return n==null})?null:function(n){t.forEach(function(r){vc(r,n)})}},t)}function vc(t,e){if(t!=null)if(yc(t))t(e);else try{t.current=e}catch{throw new Error('Cannot assign value "'.concat(e,'" to ref "').concat(t,'"'))}}function yc(t){return!!(t&&{}.toString.call(t)=="[object Function]")}function _c(t,e){if(t==null)return{};var n={},r=Object.keys(t),s,a;for(a=0;a<r.length;a++)s=r[a],!(e.indexOf(s)>=0)&&(n[s]=t[s]);return n}function Si(t,e){return Si=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,s){return r.__proto__=s,r},Si(t,e)}function Ic(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,Si(t,e)}var rs={disabled:!1},io=x.createContext(null),Ec=function(e){return e.scrollTop},Ft="unmounted",Qe="exited",Ze="entering",gt="entered",Ai="exiting",Oe=function(t){Ic(e,t);function e(r,s){var a;a=t.call(this,r,s)||this;var l=s,h=l&&!l.isMounting?r.enter:r.appear,p;return a.appearStatus=null,r.in?h?(p=Qe,a.appearStatus=Ze):p=gt:r.unmountOnExit||r.mountOnEnter?p=Ft:p=Qe,a.state={status:p},a.nextCallback=null,a}e.getDerivedStateFromProps=function(s,a){var l=s.in;return l&&a.status===Ft?{status:Qe}:null};var n=e.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(s){var a=null;if(s!==this.props){var l=this.state.status;this.props.in?l!==Ze&&l!==gt&&(a=Ze):(l===Ze||l===gt)&&(a=Ai)}this.updateStatus(!1,a)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var s=this.props.timeout,a,l,h;return a=l=h=s,s!=null&&typeof s!="number"&&(a=s.exit,l=s.enter,h=s.appear!==void 0?s.appear:l),{exit:a,enter:l,appear:h}},n.updateStatus=function(s,a){if(s===void 0&&(s=!1),a!==null)if(this.cancelNextCallback(),a===Ze){if(this.props.unmountOnExit||this.props.mountOnEnter){var l=this.props.nodeRef?this.props.nodeRef.current:yn.findDOMNode(this);l&&Ec(l)}this.performEnter(s)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Qe&&this.setState({status:Ft})},n.performEnter=function(s){var a=this,l=this.props.enter,h=this.context?this.context.isMounting:s,p=this.props.nodeRef?[h]:[yn.findDOMNode(this),h],E=p[0],b=p[1],S=this.getTimeouts(),R=h?S.appear:S.enter;if(!s&&!l||rs.disabled){this.safeSetState({status:gt},function(){a.props.onEntered(E)});return}this.props.onEnter(E,b),this.safeSetState({status:Ze},function(){a.props.onEntering(E,b),a.onTransitionEnd(R,function(){a.safeSetState({status:gt},function(){a.props.onEntered(E,b)})})})},n.performExit=function(){var s=this,a=this.props.exit,l=this.getTimeouts(),h=this.props.nodeRef?void 0:yn.findDOMNode(this);if(!a||rs.disabled){this.safeSetState({status:Qe},function(){s.props.onExited(h)});return}this.props.onExit(h),this.safeSetState({status:Ai},function(){s.props.onExiting(h),s.onTransitionEnd(l.exit,function(){s.safeSetState({status:Qe},function(){s.props.onExited(h)})})})},n.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(s,a){a=this.setNextCallback(a),this.setState(s,a)},n.setNextCallback=function(s){var a=this,l=!0;return this.nextCallback=function(h){l&&(l=!1,a.nextCallback=null,s(h))},this.nextCallback.cancel=function(){l=!1},this.nextCallback},n.onTransitionEnd=function(s,a){this.setNextCallback(a);var l=this.props.nodeRef?this.props.nodeRef.current:yn.findDOMNode(this),h=s==null&&!this.props.addEndListener;if(!l||h){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var p=this.props.nodeRef?[this.nextCallback]:[l,this.nextCallback],E=p[0],b=p[1];this.props.addEndListener(E,b)}s!=null&&setTimeout(this.nextCallback,s)},n.render=function(){var s=this.state.status;if(s===Ft)return null;var a=this.props,l=a.children;a.in,a.mountOnEnter,a.unmountOnExit,a.appear,a.enter,a.exit,a.timeout,a.addEndListener,a.onEnter,a.onEntering,a.onEntered,a.onExit,a.onExiting,a.onExited,a.nodeRef;var h=_c(a,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return x.createElement(io.Provider,{value:null},typeof l=="function"?l(s,h):x.cloneElement(x.Children.only(l),h))},e}(x.Component);Oe.contextType=io;Oe.propTypes={};function pt(){}Oe.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:pt,onEntering:pt,onEntered:pt,onExit:pt,onExiting:pt,onExited:pt};Oe.UNMOUNTED=Ft;Oe.EXITED=Qe;Oe.ENTERING=Ze;Oe.ENTERED=gt;Oe.EXITING=Ai;var ro=Oe,Fi=F.forwardRef(function(t,e){var n=t.className,r=t.dark,s=t.disabled,a=t.white,l=Ge(t,["className","dark","disabled","white"]);return x.createElement("button",Re({type:"button",className:qe("btn","btn-close",{"btn-close-white":a},s,n),"aria-label":"Close",disabled:s},r&&{"data-coreui-theme":"dark"},l,{ref:e}))});Fi.propTypes={className:C.string,dark:C.bool,disabled:C.bool,white:C.bool};Fi.displayName="CCloseButton";var ji=F.forwardRef(function(t,e){var n=t.className,r=n===void 0?"modal-backdrop":n,s=t.visible,a=Ge(t,["className","visible"]),l=F.useRef(null),h=no(e,l);return x.createElement(ro,{in:s,mountOnEnter:!0,nodeRef:l,timeout:150,unmountOnExit:!0},function(p){return x.createElement("div",Re({className:qe(r,"fade",{show:p==="entered"})},a,{ref:h}))})});ji.propTypes={className:C.string,visible:C.bool};ji.displayName="CBackdrop";var wc=function(t){return t?typeof t=="function"?t():t:document.body},Sn=function(t){var e=t.children,n=t.container,r=t.portal,s=F.useState(null),a=s[0],l=s[1];return F.useEffect(function(){r&&l(wc(n)||document.body)},[n,r]),typeof window<"u"&&r&&a?mc.createPortal(e,a):x.createElement(x.Fragment,null,e)};Sn.propTypes={children:C.node,container:C.any,portal:C.bool};Sn.displayName="CConditionalPortal";var Bi=F.forwardRef(function(t,e){var n=t.children,r=t.className,s=Ge(t,["children","className"]);return x.createElement("div",Re({className:qe("modal-content",r)},s,{ref:e}),n)});Bi.propTypes={children:C.node,className:C.string};Bi.displayName="CModalContent";var Vi=F.forwardRef(function(t,e){var n,r=t.children,s=t.alignment,a=t.className,l=t.fullscreen,h=t.scrollable,p=t.size,E=Ge(t,["children","alignment","className","fullscreen","scrollable","size"]);return x.createElement("div",Re({className:qe("modal-dialog",(n={"modal-dialog-centered":s==="center"},n[typeof l=="boolean"?"modal-fullscreen":"modal-fullscreen-".concat(l,"-down")]=l,n["modal-dialog-scrollable"]=h,n["modal-".concat(p)]=p,n),a)},E,{ref:e}),r)});Vi.propTypes={alignment:C.oneOf(["top","center"]),children:C.node,className:C.string,fullscreen:C.oneOfType([C.bool,C.oneOf(["sm","md","lg","xl","xxl"])]),scrollable:C.bool,size:C.oneOf(["sm","lg","xl"])};Vi.displayName="CModalDialog";var so=F.createContext({}),oo=F.forwardRef(function(t,e){var n=t.children,r=t.alignment,s=t.backdrop,a=s===void 0?!0:s,l=t.className,h=t.duration,p=h===void 0?150:h,E=t.focus,b=E===void 0?!0:E,S=t.fullscreen,R=t.keyboard,D=R===void 0?!0:R,k=t.onClose,j=t.onClosePrevented,M=t.onShow,re=t.portal,G=re===void 0?!0:re,$=t.scrollable,ie=t.size,me=t.transition,W=me===void 0?!0:me,y=t.unmountOnClose,d=y===void 0?!0:y,g=t.visible,m=Ge(t,["children","alignment","backdrop","className","duration","focus","fullscreen","keyboard","onClose","onClosePrevented","onShow","portal","scrollable","size","transition","unmountOnClose","visible"]),v=F.useRef(null),I=F.useRef(null),f=F.useRef(null),ce=no(e,I),De=F.useState(g),ve=De[0],we=De[1],Le=F.useState(!1),ct=Le[0],bt=Le[1],Hn={visible:ve,setVisible:we};F.useEffect(function(){we(g)},[g]),F.useEffect(function(){var V;return ve?(v.current=document.activeElement,document.addEventListener("mouseup",H),document.addEventListener("keydown",en)):(V=v.current)===null||V===void 0||V.focus(),function(){document.removeEventListener("mouseup",H),document.removeEventListener("keydown",en)}},[ve]);var le=function(){return a==="static"?bt(!0):(we(!1),k&&k())};F.useLayoutEffect(function(){j&&j(),setTimeout(function(){return bt(!1)},p)},[ct]),F.useLayoutEffect(function(){return ve?(document.body.classList.add("modal-open"),a&&(document.body.style.overflow="hidden",document.body.style.paddingRight="0px"),setTimeout(function(){var V;b&&((V=I.current)===null||V===void 0||V.focus())},W?p:0)):(document.body.classList.remove("modal-open"),a&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))),function(){document.body.classList.remove("modal-open"),a&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))}},[ve]);var H=function(V){I.current&&I.current==V.target&&le()},en=function(V){V.key==="Escape"&&D&&le()};return x.createElement(x.Fragment,null,x.createElement(ro,{in:ve,mountOnEnter:!0,nodeRef:I,onEnter:M,onExit:k,unmountOnExit:d,timeout:W?p:0},function(V){return x.createElement(Sn,{portal:G},x.createElement(so.Provider,{value:Hn},x.createElement("div",Re({className:qe("modal",{"modal-static":ct,fade:W,show:V==="entered"},l),tabIndex:-1},ve?{"aria-modal":!0,role:"dialog"}:{"aria-hidden":"true"},{style:Re({},V!=="exited"&&{display:"block"})},m,{ref:ce}),x.createElement(Vi,{alignment:r,fullscreen:S,scrollable:$,size:ie},x.createElement(Bi,{ref:f},n)))))}),a&&x.createElement(Sn,{portal:G},x.createElement(ji,{visible:ve})))});oo.propTypes={alignment:C.oneOf(["top","center"]),backdrop:C.oneOfType([C.bool,C.oneOf(["static"])]),children:C.node,className:C.string,duration:C.number,focus:C.bool,fullscreen:C.oneOfType([C.bool,C.oneOf(["sm","md","lg","xl","xxl"])]),keyboard:C.bool,onClose:C.func,onClosePrevented:C.func,onShow:C.func,portal:C.bool,scrollable:C.bool,size:C.oneOf(["sm","lg","xl"]),transition:C.bool,unmountOnClose:C.bool,visible:C.bool};oo.displayName="CModal";var ao=F.forwardRef(function(t,e){var n=t.children,r=t.className,s=Ge(t,["children","className"]);return x.createElement("div",Re({className:qe("modal-footer",r)},s,{ref:e}),n)});ao.propTypes={children:C.node,className:C.string};ao.displayName="CModalFooter";var co=F.forwardRef(function(t,e){var n=t.children,r=t.className,s=t.closeButton,a=s===void 0?!0:s,l=Ge(t,["children","className","closeButton"]),h=F.useContext(so).setVisible;return x.createElement("div",Re({className:qe("modal-header",r)},l,{ref:e}),n,a&&x.createElement(Fi,{onClick:function(){return h(!1)}}))});co.propTypes={children:C.node,className:C.string,closeButton:C.bool};co.displayName="CModalHeader";var lo=F.forwardRef(function(t,e){var n=t.children,r=t.as,s=r===void 0?"h5":r,a=t.className,l=Ge(t,["children","as","className"]);return x.createElement(s,Re({className:qe("modal-title",a)},l,{ref:e}),n)});lo.propTypes={as:C.elementType,children:C.node,className:C.string};lo.displayName="CModalTitle";const Tc=()=>{};var ss={};/**
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
 */const uo=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},bc=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const a=t[n++];e[r++]=String.fromCharCode((s&31)<<6|a&63)}else if(s>239&&s<365){const a=t[n++],l=t[n++],h=t[n++],p=((s&7)<<18|(a&63)<<12|(l&63)<<6|h&63)-65536;e[r++]=String.fromCharCode(55296+(p>>10)),e[r++]=String.fromCharCode(56320+(p&1023))}else{const a=t[n++],l=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(a&63)<<6|l&63)}}return e.join("")},ho={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const a=t[s],l=s+1<t.length,h=l?t[s+1]:0,p=s+2<t.length,E=p?t[s+2]:0,b=a>>2,S=(a&3)<<4|h>>4;let R=(h&15)<<2|E>>6,D=E&63;p||(D=64,l||(R=64)),r.push(n[b],n[S],n[R],n[D])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(uo(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):bc(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const a=n[t.charAt(s++)],h=s<t.length?n[t.charAt(s)]:0;++s;const E=s<t.length?n[t.charAt(s)]:64;++s;const S=s<t.length?n[t.charAt(s)]:64;if(++s,a==null||h==null||E==null||S==null)throw new Sc;const R=a<<2|h>>4;if(r.push(R),E!==64){const D=h<<4&240|E>>2;if(r.push(D),S!==64){const k=E<<6&192|S;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Sc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ac=function(t){const e=uo(t);return ho.encodeByteArray(e,!0)},An=function(t){return Ac(t).replace(/\./g,"")},fo=function(t){try{return ho.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Cc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Rc=()=>Cc().__FIREBASE_DEFAULTS__,kc=()=>{if(typeof process>"u"||typeof ss>"u")return;const t=ss.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Pc=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&fo(t[1]);return e&&JSON.parse(e)},Hi=()=>{try{return Tc()||Rc()||kc()||Pc()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},po=t=>{var e,n;return(n=(e=Hi())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Oc=t=>{const e=po(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},go=()=>{var t;return(t=Hi())===null||t===void 0?void 0:t.config},mo=t=>{var e;return(e=Hi())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class Nc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function Dc(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,a=t.sub||t.user_id;if(!a)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:a,user_id:a,firebase:{sign_in_provider:"custom",identities:{}}},t);return[An(JSON.stringify(n)),An(JSON.stringify(l)),""].join(".")}/**
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
 */function Z(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Lc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Z())}function Mc(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function vo(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function xc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Uc(){const t=Z();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function yo(){try{return typeof indexedDB=="object"}catch{return!1}}function _o(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var a;e(((a=s.error)===null||a===void 0?void 0:a.message)||"")}}catch(n){e(n)}})}function Fc(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const jc="FirebaseError";class ge extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=jc,Object.setPrototypeOf(this,ge.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ot.prototype.create)}}class ot{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,a=this.errors[e],l=a?Bc(a,r):"Error",h=`${this.serviceName}: ${l} (${s}).`;return new ge(s,h,r)}}function Bc(t,e){return t.replace(Vc,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Vc=/\{\$([^}]+)}/g;function Hc(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function nt(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const a=t[s],l=e[s];if(os(a)&&os(l)){if(!nt(a,l))return!1}else if(a!==l)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function os(t){return t!==null&&typeof t=="object"}/**
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
 */function Kt(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function jt(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,a]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(a)}}),e}function Bt(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function $c(t,e){const n=new Wc(t,e);return n.subscribe.bind(n)}class Wc{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");zc(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=pi),s.error===void 0&&(s.error=pi),s.complete===void 0&&(s.complete=pi);const a=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),a}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function zc(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function pi(){}/**
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
 */const Gc=1e3,qc=2,Kc=4*60*60*1e3,Jc=.5;function as(t,e=Gc,n=qc){const r=e*Math.pow(n,t),s=Math.round(Jc*r*(Math.random()-.5)*2);return Math.min(Kc,r+s)}/**
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
 */function Ee(t){return t&&t._delegate?t._delegate:t}class fe{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class Xc{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new Nc;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(a){if(s)return null;throw a}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Qc(e))try{this.getOrInitializeService({instanceIdentifier:et})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const a=this.getOrInitializeService({instanceIdentifier:s});r.resolve(a)}catch{}}}}clearInstance(e=et){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=et){return this.instances.has(e)}getOptions(e=et){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[a,l]of this.instancesDeferred.entries()){const h=this.normalizeInstanceIdentifier(a);r===h&&l.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),a=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;a.add(e),this.onInitCallbacks.set(s,a);const l=this.instances.get(s);return l&&e(l,s),()=>{a.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Yc(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=et){return this.component?this.component.multipleInstances?e:et:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Yc(t){return t===et?void 0:t}function Qc(t){return t.instantiationMode==="EAGER"}/**
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
 */class Zc{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Xc(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var N;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(N||(N={}));const el={debug:N.DEBUG,verbose:N.VERBOSE,info:N.INFO,warn:N.WARN,error:N.ERROR,silent:N.SILENT},tl=N.INFO,nl={[N.DEBUG]:"log",[N.VERBOSE]:"log",[N.INFO]:"info",[N.WARN]:"warn",[N.ERROR]:"error"},il=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=nl[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Mn{constructor(e){this.name=e,this._logLevel=tl,this._logHandler=il,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in N))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?el[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,N.DEBUG,...e),this._logHandler(this,N.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,N.VERBOSE,...e),this._logHandler(this,N.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,N.INFO,...e),this._logHandler(this,N.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,N.WARN,...e),this._logHandler(this,N.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,N.ERROR,...e),this._logHandler(this,N.ERROR,...e)}}const rl=(t,e)=>e.some(n=>t instanceof n);let cs,ls;function sl(){return cs||(cs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ol(){return ls||(ls=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Io=new WeakMap,Ci=new WeakMap,Eo=new WeakMap,gi=new WeakMap,$i=new WeakMap;function al(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",a),t.removeEventListener("error",l)},a=()=>{n($e(t.result)),s()},l=()=>{r(t.error),s()};t.addEventListener("success",a),t.addEventListener("error",l)});return e.then(n=>{n instanceof IDBCursor&&Io.set(n,t)}).catch(()=>{}),$i.set(e,t),e}function cl(t){if(Ci.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",l),t.removeEventListener("abort",l)},a=()=>{n(),s()},l=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",a),t.addEventListener("error",l),t.addEventListener("abort",l)});Ci.set(t,e)}let Ri={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ci.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Eo.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return $e(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function ll(t){Ri=t(Ri)}function ul(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(mi(this),e,...n);return Eo.set(r,e.sort?e.sort():[e]),$e(r)}:ol().includes(t)?function(...e){return t.apply(mi(this),e),$e(Io.get(this))}:function(...e){return $e(t.apply(mi(this),e))}}function hl(t){return typeof t=="function"?ul(t):(t instanceof IDBTransaction&&cl(t),rl(t,sl())?new Proxy(t,Ri):t)}function $e(t){if(t instanceof IDBRequest)return al(t);if(gi.has(t))return gi.get(t);const e=hl(t);return e!==t&&(gi.set(t,e),$i.set(e,t)),e}const mi=t=>$i.get(t);function wo(t,e,{blocked:n,upgrade:r,blocking:s,terminated:a}={}){const l=indexedDB.open(t,e),h=$e(l);return r&&l.addEventListener("upgradeneeded",p=>{r($e(l.result),p.oldVersion,p.newVersion,$e(l.transaction),p)}),n&&l.addEventListener("blocked",p=>n(p.oldVersion,p.newVersion,p)),h.then(p=>{a&&p.addEventListener("close",()=>a()),s&&p.addEventListener("versionchange",E=>s(E.oldVersion,E.newVersion,E))}).catch(()=>{}),h}const dl=["get","getKey","getAll","getAllKeys","count"],fl=["put","add","delete","clear"],vi=new Map;function us(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(vi.get(e))return vi.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=fl.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||dl.includes(n)))return;const a=async function(l,...h){const p=this.transaction(l,s?"readwrite":"readonly");let E=p.store;return r&&(E=E.index(h.shift())),(await Promise.all([E[n](...h),s&&p.done]))[0]};return vi.set(e,a),a}ll(t=>({...t,get:(e,n,r)=>us(e,n)||t.get(e,n,r),has:(e,n)=>!!us(e,n)||t.has(e,n)}));/**
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
 */class pl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(gl(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function gl(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ki="@firebase/app",hs="0.11.2";/**
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
 */const ke=new Mn("@firebase/app"),ml="@firebase/app-compat",vl="@firebase/analytics-compat",yl="@firebase/analytics",_l="@firebase/app-check-compat",Il="@firebase/app-check",El="@firebase/auth",wl="@firebase/auth-compat",Tl="@firebase/database",bl="@firebase/data-connect",Sl="@firebase/database-compat",Al="@firebase/functions",Cl="@firebase/functions-compat",Rl="@firebase/installations",kl="@firebase/installations-compat",Pl="@firebase/messaging",Ol="@firebase/messaging-compat",Nl="@firebase/performance",Dl="@firebase/performance-compat",Ll="@firebase/remote-config",Ml="@firebase/remote-config-compat",xl="@firebase/storage",Ul="@firebase/storage-compat",Fl="@firebase/firestore",jl="@firebase/vertexai",Bl="@firebase/firestore-compat",Vl="firebase",Hl="11.4.0";/**
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
 */const Pi="[DEFAULT]",$l={[ki]:"fire-core",[ml]:"fire-core-compat",[yl]:"fire-analytics",[vl]:"fire-analytics-compat",[Il]:"fire-app-check",[_l]:"fire-app-check-compat",[El]:"fire-auth",[wl]:"fire-auth-compat",[Tl]:"fire-rtdb",[bl]:"fire-data-connect",[Sl]:"fire-rtdb-compat",[Al]:"fire-fn",[Cl]:"fire-fn-compat",[Rl]:"fire-iid",[kl]:"fire-iid-compat",[Pl]:"fire-fcm",[Ol]:"fire-fcm-compat",[Nl]:"fire-perf",[Dl]:"fire-perf-compat",[Ll]:"fire-rc",[Ml]:"fire-rc-compat",[xl]:"fire-gcs",[Ul]:"fire-gcs-compat",[Fl]:"fire-fst",[Bl]:"fire-fst-compat",[jl]:"fire-vertex","fire-js":"fire-js",[Vl]:"fire-js-all"};/**
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
 */const Cn=new Map,Wl=new Map,Oi=new Map;function ds(t,e){try{t.container.addComponent(e)}catch(n){ke.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ie(t){const e=t.name;if(Oi.has(e))return ke.debug(`There were multiple attempts to register component ${e}.`),!1;Oi.set(e,t);for(const n of Cn.values())ds(n,t);for(const n of Wl.values())ds(n,t);return!0}function Jt(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function he(t){return t==null?!1:t.settings!==void 0}/**
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
 */const zl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},We=new ot("app","Firebase",zl);/**
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
 */class Gl{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new fe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw We.create("app-deleted",{appName:this._name})}}/**
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
 */const wt=Hl;function To(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Pi,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw We.create("bad-app-name",{appName:String(s)});if(n||(n=go()),!n)throw We.create("no-options");const a=Cn.get(s);if(a){if(nt(n,a.options)&&nt(r,a.config))return a;throw We.create("duplicate-app",{appName:s})}const l=new Zc(s);for(const p of Oi.values())l.addComponent(p);const h=new Gl(n,r,l);return Cn.set(s,h),h}function bo(t=Pi){const e=Cn.get(t);if(!e&&t===Pi&&go())return To();if(!e)throw We.create("no-app",{appName:t});return e}function oe(t,e,n){var r;let s=(r=$l[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const a=s.match(/\s|\//),l=e.match(/\s|\//);if(a||l){const h=[`Unable to register library "${s}" with version "${e}":`];a&&h.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&l&&h.push("and"),l&&h.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ke.warn(h.join(" "));return}Ie(new fe(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const ql="firebase-heartbeat-database",Kl=1,zt="firebase-heartbeat-store";let yi=null;function So(){return yi||(yi=wo(ql,Kl,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(zt)}catch(n){console.warn(n)}}}}).catch(t=>{throw We.create("idb-open",{originalErrorMessage:t.message})})),yi}async function Jl(t){try{const n=(await So()).transaction(zt),r=await n.objectStore(zt).get(Ao(t));return await n.done,r}catch(e){if(e instanceof ge)ke.warn(e.message);else{const n=We.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ke.warn(n.message)}}}async function fs(t,e){try{const r=(await So()).transaction(zt,"readwrite");await r.objectStore(zt).put(e,Ao(t)),await r.done}catch(n){if(n instanceof ge)ke.warn(n.message);else{const r=We.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});ke.warn(r.message)}}}function Ao(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Xl=1024,Yl=30;class Ql{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new eu(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=ps();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(l=>l.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:s}),this._heartbeatsCache.heartbeats.length>Yl){const l=tu(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(l,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){ke.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=ps(),{heartbeatsToSend:r,unsentEntries:s}=Zl(this._heartbeatsCache.heartbeats),a=An(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(n){return ke.warn(n),""}}}function ps(){return new Date().toISOString().substring(0,10)}function Zl(t,e=Xl){const n=[];let r=t.slice();for(const s of t){const a=n.find(l=>l.agent===s.agent);if(a){if(a.dates.push(s.date),gs(n)>e){a.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),gs(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class eu{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return yo()?_o().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Jl(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return fs(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return fs(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function gs(t){return An(JSON.stringify({version:2,heartbeats:t})).length}function tu(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
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
 */function nu(t){Ie(new fe("platform-logger",e=>new pl(e),"PRIVATE")),Ie(new fe("heartbeat",e=>new Ql(e),"PRIVATE")),oe(ki,hs,t),oe(ki,hs,"esm2017"),oe("fire-js","")}nu("");function Wi(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Co(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const iu=Co,Ro=new ot("auth","Firebase",Co());/**
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
 */const Rn=new Mn("@firebase/auth");function ru(t,...e){Rn.logLevel<=N.WARN&&Rn.warn(`Auth (${wt}): ${t}`,...e)}function En(t,...e){Rn.logLevel<=N.ERROR&&Rn.error(`Auth (${wt}): ${t}`,...e)}/**
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
 */function pe(t,...e){throw zi(t,...e)}function ye(t,...e){return zi(t,...e)}function ko(t,e,n){const r=Object.assign(Object.assign({},iu()),{[e]:n});return new ot("auth","Firebase",r).create(e,{appName:t.name})}function ze(t){return ko(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function zi(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Ro.create(t,...e)}function A(t,e,...n){if(!t)throw zi(e,...n)}function Se(t){const e="INTERNAL ASSERTION FAILED: "+t;throw En(e),new Error(e)}function Pe(t,e){t||Se(e)}/**
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
 */function Ni(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function su(){return ms()==="http:"||ms()==="https:"}function ms(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function ou(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(su()||vo()||"connection"in navigator)?navigator.onLine:!0}function au(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Xt{constructor(e,n){this.shortDelay=e,this.longDelay=n,Pe(n>e,"Short delay should be less than long delay!"),this.isMobile=Lc()||xc()}get(){return ou()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Gi(t,e){Pe(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Po{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Se("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Se("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Se("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const cu={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const lu=new Xt(3e4,6e4);function Ke(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Ne(t,e,n,r,s={}){return Oo(t,s,async()=>{let a={},l={};r&&(e==="GET"?l=r:a={body:JSON.stringify(r)});const h=Kt(Object.assign({key:t.config.apiKey},l)).slice(1),p=await t._getAdditionalHeaders();p["Content-Type"]="application/json",t.languageCode&&(p["X-Firebase-Locale"]=t.languageCode);const E=Object.assign({method:e,headers:p},a);return Mc()||(E.referrerPolicy="no-referrer"),Po.fetch()(No(t,t.config.apiHost,n,h),E)})}async function Oo(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},cu),e);try{const s=new hu(t),a=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const l=await a.json();if("needConfirmation"in l)throw _n(t,"account-exists-with-different-credential",l);if(a.ok&&!("errorMessage"in l))return l;{const h=a.ok?l.errorMessage:l.error.message,[p,E]=h.split(" : ");if(p==="FEDERATED_USER_ID_ALREADY_LINKED")throw _n(t,"credential-already-in-use",l);if(p==="EMAIL_EXISTS")throw _n(t,"email-already-in-use",l);if(p==="USER_DISABLED")throw _n(t,"user-disabled",l);const b=r[p]||p.toLowerCase().replace(/[_\s]+/g,"-");if(E)throw ko(t,b,E);pe(t,b)}}catch(s){if(s instanceof ge)throw s;pe(t,"network-request-failed",{message:String(s)})}}async function xn(t,e,n,r,s={}){const a=await Ne(t,e,n,r,s);return"mfaPendingCredential"in a&&pe(t,"multi-factor-auth-required",{_serverResponse:a}),a}function No(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Gi(t.config,s):`${t.config.apiScheme}://${s}`}function uu(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class hu{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(ye(this.auth,"network-request-failed")),lu.get())})}}function _n(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=ye(t,e,r);return s.customData._tokenResponse=n,s}function vs(t){return t!==void 0&&t.enterprise!==void 0}class du{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return uu(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function fu(t,e){return Ne(t,"GET","/v2/recaptchaConfig",Ke(t,e))}/**
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
 */async function pu(t,e){return Ne(t,"POST","/v1/accounts:delete",e)}async function Do(t,e){return Ne(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Vt(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function gu(t,e=!1){const n=Ee(t),r=await n.getIdToken(e),s=qi(r);A(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const a=typeof s.firebase=="object"?s.firebase:void 0,l=a==null?void 0:a.sign_in_provider;return{claims:s,token:r,authTime:Vt(_i(s.auth_time)),issuedAtTime:Vt(_i(s.iat)),expirationTime:Vt(_i(s.exp)),signInProvider:l||null,signInSecondFactor:(a==null?void 0:a.sign_in_second_factor)||null}}function _i(t){return Number(t)*1e3}function qi(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return En("JWT malformed, contained fewer than 3 sections"),null;try{const s=fo(n);return s?JSON.parse(s):(En("Failed to decode base64 JWT payload"),null)}catch(s){return En("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function ys(t){const e=qi(t);return A(e,"internal-error"),A(typeof e.exp<"u","internal-error"),A(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Gt(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof ge&&mu(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function mu({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class vu{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Di{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Vt(this.lastLoginAt),this.creationTime=Vt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function kn(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Gt(t,Do(n,{idToken:r}));A(s==null?void 0:s.users.length,n,"internal-error");const a=s.users[0];t._notifyReloadListener(a);const l=!((e=a.providerUserInfo)===null||e===void 0)&&e.length?Lo(a.providerUserInfo):[],h=_u(t.providerData,l),p=t.isAnonymous,E=!(t.email&&a.passwordHash)&&!(h!=null&&h.length),b=p?E:!1,S={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:h,metadata:new Di(a.createdAt,a.lastLoginAt),isAnonymous:b};Object.assign(t,S)}async function yu(t){const e=Ee(t);await kn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function _u(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Lo(t){return t.map(e=>{var{providerId:n}=e,r=Wi(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function Iu(t,e){const n=await Oo(t,{},async()=>{const r=Kt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:a}=t.config,l=No(t,s,"/v1/token",`key=${a}`),h=await t._getAdditionalHeaders();return h["Content-Type"]="application/x-www-form-urlencoded",Po.fetch()(l,{method:"POST",headers:h,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Eu(t,e){return Ne(t,"POST","/v2/accounts:revokeToken",Ke(t,e))}/**
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
 */class vt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){A(e.idToken,"internal-error"),A(typeof e.idToken<"u","internal-error"),A(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ys(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){A(e.length!==0,"internal-error");const n=ys(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(A(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:a}=await Iu(e,n);this.updateTokensAndExpiration(r,s,Number(a))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:a}=n,l=new vt;return r&&(A(typeof r=="string","internal-error",{appName:e}),l.refreshToken=r),s&&(A(typeof s=="string","internal-error",{appName:e}),l.accessToken=s),a&&(A(typeof a=="number","internal-error",{appName:e}),l.expirationTime=a),l}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new vt,this.toJSON())}_performRefresh(){return Se("not implemented")}}/**
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
 */function Fe(t,e){A(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Ae{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,a=Wi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new vu(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new Di(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const n=await Gt(this,this.stsTokenManager.getToken(this.auth,e));return A(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return gu(this,e)}reload(){return yu(this)}_assign(e){this!==e&&(A(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Ae(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){A(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await kn(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(he(this.auth.app))return Promise.reject(ze(this.auth));const e=await this.getIdToken();return await Gt(this,pu(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,a,l,h,p,E,b;const S=(r=n.displayName)!==null&&r!==void 0?r:void 0,R=(s=n.email)!==null&&s!==void 0?s:void 0,D=(a=n.phoneNumber)!==null&&a!==void 0?a:void 0,k=(l=n.photoURL)!==null&&l!==void 0?l:void 0,j=(h=n.tenantId)!==null&&h!==void 0?h:void 0,M=(p=n._redirectEventId)!==null&&p!==void 0?p:void 0,re=(E=n.createdAt)!==null&&E!==void 0?E:void 0,G=(b=n.lastLoginAt)!==null&&b!==void 0?b:void 0,{uid:$,emailVerified:ie,isAnonymous:me,providerData:W,stsTokenManager:y}=n;A($&&y,e,"internal-error");const d=vt.fromJSON(this.name,y);A(typeof $=="string",e,"internal-error"),Fe(S,e.name),Fe(R,e.name),A(typeof ie=="boolean",e,"internal-error"),A(typeof me=="boolean",e,"internal-error"),Fe(D,e.name),Fe(k,e.name),Fe(j,e.name),Fe(M,e.name),Fe(re,e.name),Fe(G,e.name);const g=new Ae({uid:$,auth:e,email:R,emailVerified:ie,displayName:S,isAnonymous:me,photoURL:k,phoneNumber:D,tenantId:j,stsTokenManager:d,createdAt:re,lastLoginAt:G});return W&&Array.isArray(W)&&(g.providerData=W.map(m=>Object.assign({},m))),M&&(g._redirectEventId=M),g}static async _fromIdTokenResponse(e,n,r=!1){const s=new vt;s.updateFromServerResponse(n);const a=new Ae({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await kn(a),a}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];A(s.localId!==void 0,"internal-error");const a=s.providerUserInfo!==void 0?Lo(s.providerUserInfo):[],l=!(s.email&&s.passwordHash)&&!(a!=null&&a.length),h=new vt;h.updateFromIdToken(r);const p=new Ae({uid:s.localId,auth:e,stsTokenManager:h,isAnonymous:l}),E={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Di(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(a!=null&&a.length)};return Object.assign(p,E),p}}/**
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
 */const _s=new Map;function Ce(t){Pe(t instanceof Function,"Expected a class definition");let e=_s.get(t);return e?(Pe(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,_s.set(t,e),e)}/**
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
 */class Mo{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Mo.type="NONE";const Is=Mo;/**
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
 */function wn(t,e,n){return`firebase:${t}:${e}:${n}`}class yt{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:a}=this.auth;this.fullUserKey=wn(this.userKey,s.apiKey,a),this.fullPersistenceKey=wn("persistence",s.apiKey,a),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ae._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new yt(Ce(Is),e,r);const s=(await Promise.all(n.map(async E=>{if(await E._isAvailable())return E}))).filter(E=>E);let a=s[0]||Ce(Is);const l=wn(r,e.config.apiKey,e.name);let h=null;for(const E of n)try{const b=await E._get(l);if(b){const S=Ae._fromJSON(e,b);E!==a&&(h=S),a=E;break}}catch{}const p=s.filter(E=>E._shouldAllowMigration);return!a._shouldAllowMigration||!p.length?new yt(a,e,r):(a=p[0],h&&await a._set(l,h.toJSON()),await Promise.all(n.map(async E=>{if(E!==a)try{await E._remove(l)}catch{}})),new yt(a,e,r))}}/**
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
 */function Es(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(jo(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(xo(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Vo(e))return"Blackberry";if(Ho(e))return"Webos";if(Uo(e))return"Safari";if((e.includes("chrome/")||Fo(e))&&!e.includes("edge/"))return"Chrome";if(Bo(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function xo(t=Z()){return/firefox\//i.test(t)}function Uo(t=Z()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Fo(t=Z()){return/crios\//i.test(t)}function jo(t=Z()){return/iemobile/i.test(t)}function Bo(t=Z()){return/android/i.test(t)}function Vo(t=Z()){return/blackberry/i.test(t)}function Ho(t=Z()){return/webos/i.test(t)}function Ki(t=Z()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function wu(t=Z()){var e;return Ki(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Tu(){return Uc()&&document.documentMode===10}function $o(t=Z()){return Ki(t)||Bo(t)||Ho(t)||Vo(t)||/windows phone/i.test(t)||jo(t)}/**
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
 */function Wo(t,e=[]){let n;switch(t){case"Browser":n=Es(Z());break;case"Worker":n=`${Es(Z())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${wt}/${r}`}/**
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
 */class bu{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=a=>new Promise((l,h)=>{try{const p=e(a);l(p)}catch(p){h(p)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function Su(t,e={}){return Ne(t,"GET","/v2/passwordPolicy",Ke(t,e))}/**
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
 */const Au=6;class Cu{constructor(e){var n,r,s,a;const l=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=l.minPasswordLength)!==null&&n!==void 0?n:Au,l.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=l.maxPasswordLength),l.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=l.containsLowercaseCharacter),l.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=l.containsUppercaseCharacter),l.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=l.containsNumericCharacter),l.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=l.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(a=e.forceUpgradeOnSignin)!==null&&a!==void 0?a:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,a,l,h;const p={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,p),this.validatePasswordCharacterOptions(e,p),p.isValid&&(p.isValid=(n=p.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),p.isValid&&(p.isValid=(r=p.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),p.isValid&&(p.isValid=(s=p.containsLowercaseLetter)!==null&&s!==void 0?s:!0),p.isValid&&(p.isValid=(a=p.containsUppercaseLetter)!==null&&a!==void 0?a:!0),p.isValid&&(p.isValid=(l=p.containsNumericCharacter)!==null&&l!==void 0?l:!0),p.isValid&&(p.isValid=(h=p.containsNonAlphanumericCharacter)!==null&&h!==void 0?h:!0),p}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,a){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=a))}}/**
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
 */class Ru{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ws(this),this.idTokenSubscription=new ws(this),this.beforeStateQueue=new bu(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ro,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Ce(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await yt.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Do(this,{idToken:e}),r=await Ae._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(he(this.app)){const l=this.app.settings.authIdToken;return l?new Promise(h=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(l).then(h,h))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const l=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,h=s==null?void 0:s._redirectEventId,p=await this.tryRedirectSignIn(e);(!l||l===h)&&(p!=null&&p.user)&&(s=p.user,a=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(s)}catch(l){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(l))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return A(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await kn(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=au()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(he(this.app))return Promise.reject(ze(this));const n=e?Ee(e):null;return n&&A(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&A(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return he(this.app)?Promise.reject(ze(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return he(this.app)?Promise.reject(ze(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ce(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Su(this),n=new Cu(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ot("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await Eu(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Ce(e)||this._popupRedirectResolver;A(n,this,"argument-error"),this.redirectPersistenceManager=await yt.create(this,[Ce(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const a=typeof n=="function"?n:n.next.bind(n);let l=!1;const h=this._isInitialized?Promise.resolve():this._initializationPromise;if(A(h,this,"internal-error"),h.then(()=>{l||a(this.currentUser)}),typeof n=="function"){const p=e.addObserver(n,r,s);return()=>{l=!0,p()}}else{const p=e.addObserver(n);return()=>{l=!0,p()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return A(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Wo(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;if(he(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&ru(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function at(t){return Ee(t)}class ws{constructor(e){this.auth=e,this.observer=null,this.addObserver=$c(n=>this.observer=n)}get next(){return A(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Un={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ku(t){Un=t}function zo(t){return Un.loadJS(t)}function Pu(){return Un.recaptchaEnterpriseScript}function Ou(){return Un.gapiScript}function Nu(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class Du{constructor(){this.enterprise=new Lu}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class Lu{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const Mu="recaptcha-enterprise",Go="NO_RECAPTCHA";class xu{constructor(e){this.type=Mu,this.auth=at(e)}async verify(e="verify",n=!1){async function r(a){if(!n){if(a.tenantId==null&&a._agentRecaptchaConfig!=null)return a._agentRecaptchaConfig.siteKey;if(a.tenantId!=null&&a._tenantRecaptchaConfigs[a.tenantId]!==void 0)return a._tenantRecaptchaConfigs[a.tenantId].siteKey}return new Promise(async(l,h)=>{fu(a,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(p=>{if(p.recaptchaKey===void 0)h(new Error("recaptcha Enterprise site key undefined"));else{const E=new du(p);return a.tenantId==null?a._agentRecaptchaConfig=E:a._tenantRecaptchaConfigs[a.tenantId]=E,l(E.siteKey)}}).catch(p=>{h(p)})})}function s(a,l,h){const p=window.grecaptcha;vs(p)?p.enterprise.ready(()=>{p.enterprise.execute(a,{action:e}).then(E=>{l(E)}).catch(()=>{l(Go)})}):h(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Du().execute("siteKey",{action:"verify"}):new Promise((a,l)=>{r(this.auth).then(h=>{if(!n&&vs(window.grecaptcha))s(h,a,l);else{if(typeof window>"u"){l(new Error("RecaptchaVerifier is only supported in browser"));return}let p=Pu();p.length!==0&&(p+=h),zo(p).then(()=>{s(h,a,l)}).catch(E=>{l(E)})}}).catch(h=>{l(h)})})}}async function Ts(t,e,n,r=!1,s=!1){const a=new xu(t);let l;if(s)l=Go;else try{l=await a.verify(n)}catch{l=await a.verify(n,!0)}const h=Object.assign({},e);if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in h){const p=h.phoneEnrollmentInfo.phoneNumber,E=h.phoneEnrollmentInfo.recaptchaToken;Object.assign(h,{phoneEnrollmentInfo:{phoneNumber:p,recaptchaToken:E,captchaResponse:l,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in h){const p=h.phoneSignInInfo.recaptchaToken;Object.assign(h,{phoneSignInInfo:{recaptchaToken:p,captchaResponse:l,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return h}return r?Object.assign(h,{captchaResp:l}):Object.assign(h,{captchaResponse:l}),Object.assign(h,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(h,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),h}async function Li(t,e,n,r,s){var a;if(!((a=t._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const l=await Ts(t,e,n,n==="getOobCode");return r(t,l)}else return r(t,e).catch(async l=>{if(l.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const h=await Ts(t,e,n,n==="getOobCode");return r(t,h)}else return Promise.reject(l)})}/**
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
 */function Uu(t,e){const n=Jt(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),a=n.getOptions();if(nt(a,e??{}))return s;pe(s,"already-initialized")}return n.initialize({options:e})}function Fu(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Ce);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function ju(t,e,n){const r=at(t);A(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,a=qo(e),{host:l,port:h}=Bu(e),p=h===null?"":`:${h}`,E={url:`${a}//${l}${p}/`},b=Object.freeze({host:l,port:h,protocol:a.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){A(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),A(nt(E,r.config.emulator)&&nt(b,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=E,r.emulatorConfig=b,r.settings.appVerificationDisabledForTesting=!0,Vu()}function qo(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Bu(t){const e=qo(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const a=s[1];return{host:a,port:bs(r.substr(a.length+1))}}else{const[a,l]=r.split(":");return{host:a,port:bs(l)}}}function bs(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Vu(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Ji{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Se("not implemented")}_getIdTokenResponse(e){return Se("not implemented")}_linkToIdToken(e,n){return Se("not implemented")}_getReauthenticationResolver(e){return Se("not implemented")}}async function Hu(t,e){return Ne(t,"POST","/v1/accounts:signUp",e)}/**
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
 */async function $u(t,e){return xn(t,"POST","/v1/accounts:signInWithPassword",Ke(t,e))}async function Wu(t,e){return Ne(t,"POST","/v1/accounts:sendOobCode",Ke(t,e))}async function zu(t,e){return Wu(t,e)}/**
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
 */async function Gu(t,e){return xn(t,"POST","/v1/accounts:signInWithEmailLink",Ke(t,e))}async function qu(t,e){return xn(t,"POST","/v1/accounts:signInWithEmailLink",Ke(t,e))}/**
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
 */class qt extends Ji{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new qt(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new qt(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Li(e,n,"signInWithPassword",$u);case"emailLink":return Gu(e,{email:this._email,oobCode:this._password});default:pe(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Li(e,r,"signUpPassword",Hu);case"emailLink":return qu(e,{idToken:n,email:this._email,oobCode:this._password});default:pe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function _t(t,e){return xn(t,"POST","/v1/accounts:signInWithIdp",Ke(t,e))}/**
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
 */const Ku="http://localhost";class it extends Ji{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new it(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):pe("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,a=Wi(n,["providerId","signInMethod"]);if(!r||!s)return null;const l=new it(r,s);return l.idToken=a.idToken||void 0,l.accessToken=a.accessToken||void 0,l.secret=a.secret,l.nonce=a.nonce,l.pendingToken=a.pendingToken||null,l}_getIdTokenResponse(e){const n=this.buildRequest();return _t(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,_t(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,_t(e,n)}buildRequest(){const e={requestUri:Ku,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Kt(n)}return e}}/**
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
 */function Ju(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Xu(t){const e=jt(Bt(t)).link,n=e?jt(Bt(e)).deep_link_id:null,r=jt(Bt(t)).deep_link_id;return(r?jt(Bt(r)).link:null)||r||n||e||t}class Xi{constructor(e){var n,r,s,a,l,h;const p=jt(Bt(e)),E=(n=p.apiKey)!==null&&n!==void 0?n:null,b=(r=p.oobCode)!==null&&r!==void 0?r:null,S=Ju((s=p.mode)!==null&&s!==void 0?s:null);A(E&&b&&S,"argument-error"),this.apiKey=E,this.operation=S,this.code=b,this.continueUrl=(a=p.continueUrl)!==null&&a!==void 0?a:null,this.languageCode=(l=p.languageCode)!==null&&l!==void 0?l:null,this.tenantId=(h=p.tenantId)!==null&&h!==void 0?h:null}static parseLink(e){const n=Xu(e);try{return new Xi(n)}catch{return null}}}/**
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
 */class Tt{constructor(){this.providerId=Tt.PROVIDER_ID}static credential(e,n){return qt._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Xi.parseLink(n);return A(r,"argument-error"),qt._fromEmailAndCode(e,r.code,r.tenantId)}}Tt.PROVIDER_ID="password";Tt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Tt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Ko{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Yt extends Ko{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class je extends Yt{constructor(){super("facebook.com")}static credential(e){return it._fromParams({providerId:je.PROVIDER_ID,signInMethod:je.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return je.credentialFromTaggedObject(e)}static credentialFromError(e){return je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return je.credential(e.oauthAccessToken)}catch{return null}}}je.FACEBOOK_SIGN_IN_METHOD="facebook.com";je.PROVIDER_ID="facebook.com";/**
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
 */class Be extends Yt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return it._fromParams({providerId:Be.PROVIDER_ID,signInMethod:Be.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Be.credentialFromTaggedObject(e)}static credentialFromError(e){return Be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Be.credential(n,r)}catch{return null}}}Be.GOOGLE_SIGN_IN_METHOD="google.com";Be.PROVIDER_ID="google.com";/**
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
 */class Ve extends Yt{constructor(){super("github.com")}static credential(e){return it._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ve.credential(e.oauthAccessToken)}catch{return null}}}Ve.GITHUB_SIGN_IN_METHOD="github.com";Ve.PROVIDER_ID="github.com";/**
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
 */class He extends Yt{constructor(){super("twitter.com")}static credential(e,n){return it._fromParams({providerId:He.PROVIDER_ID,signInMethod:He.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return He.credentialFromTaggedObject(e)}static credentialFromError(e){return He.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return He.credential(n,r)}catch{return null}}}He.TWITTER_SIGN_IN_METHOD="twitter.com";He.PROVIDER_ID="twitter.com";/**
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
 */class It{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const a=await Ae._fromIdTokenResponse(e,r,s),l=Ss(r);return new It({user:a,providerId:l,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Ss(r);return new It({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Ss(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class Pn extends ge{constructor(e,n,r,s){var a;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Pn.prototype),this.customData={appName:e.name,tenantId:(a=e.tenantId)!==null&&a!==void 0?a:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Pn(e,n,r,s)}}function Jo(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(a=>{throw a.code==="auth/multi-factor-auth-required"?Pn._fromErrorAndOperation(t,a,e,r):a})}async function Yu(t,e,n=!1){const r=await Gt(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return It._forOperation(t,"link",r)}/**
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
 */async function Qu(t,e,n=!1){const{auth:r}=t;if(he(r.app))return Promise.reject(ze(r));const s="reauthenticate";try{const a=await Gt(t,Jo(r,s,e,t),n);A(a.idToken,r,"internal-error");const l=qi(a.idToken);A(l,r,"internal-error");const{sub:h}=l;return A(t.uid===h,r,"user-mismatch"),It._forOperation(t,s,a)}catch(a){throw(a==null?void 0:a.code)==="auth/user-not-found"&&pe(r,"user-mismatch"),a}}/**
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
 */async function Xo(t,e,n=!1){if(he(t.app))return Promise.reject(ze(t));const r="signIn",s=await Jo(t,r,e),a=await It._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(a.user),a}async function Zu(t,e){return Xo(at(t),e)}/**
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
 */async function eh(t){const e=at(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function ip(t,e,n){const r=at(t);await Li(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",zu)}function th(t,e,n){return he(t.app)?Promise.reject(ze(t)):Zu(Ee(t),Tt.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&eh(t),r})}function nh(t,e,n,r){return Ee(t).onIdTokenChanged(e,n,r)}function ih(t,e,n){return Ee(t).beforeAuthStateChanged(e,n)}function rp(t,e,n,r){return Ee(t).onAuthStateChanged(e,n,r)}function rh(t){return Ee(t).signOut()}const On="__sak";/**
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
 */class Yo{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(On,"1"),this.storage.removeItem(On),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const sh=1e3,oh=10;class Qo extends Yo{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=$o(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((l,h,p)=>{this.notifyListeners(l,p)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const l=this.storage.getItem(r);!n&&this.localCache[r]===l||this.notifyListeners(r,l)},a=this.storage.getItem(r);Tu()&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,oh):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},sh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Qo.type="LOCAL";const ah=Qo;/**
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
 */class Zo extends Yo{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Zo.type="SESSION";const ea=Zo;/**
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
 */function ch(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Fn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Fn(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:a}=n.data,l=this.handlersMap[s];if(!(l!=null&&l.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const h=Array.from(l).map(async E=>E(n.origin,a)),p=await ch(h);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:p})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Fn.receivers=[];/**
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
 */function Yi(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class lh{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let a,l;return new Promise((h,p)=>{const E=Yi("",20);s.port1.start();const b=setTimeout(()=>{p(new Error("unsupported_event"))},r);l={messageChannel:s,onMessage(S){const R=S;if(R.data.eventId===E)switch(R.data.status){case"ack":clearTimeout(b),a=setTimeout(()=>{p(new Error("timeout"))},3e3);break;case"done":clearTimeout(a),h(R.data.response);break;default:clearTimeout(b),clearTimeout(a),p(new Error("invalid_response"));break}}},this.handlers.add(l),s.port1.addEventListener("message",l.onMessage),this.target.postMessage({eventType:e,eventId:E,data:n},[s.port2])}).finally(()=>{l&&this.removeMessageHandler(l)})}}/**
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
 */function _e(){return window}function uh(t){_e().location.href=t}/**
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
 */function ta(){return typeof _e().WorkerGlobalScope<"u"&&typeof _e().importScripts=="function"}async function hh(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function dh(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function fh(){return ta()?self:null}/**
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
 */const na="firebaseLocalStorageDb",ph=1,Nn="firebaseLocalStorage",ia="fbase_key";class Qt{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function jn(t,e){return t.transaction([Nn],e?"readwrite":"readonly").objectStore(Nn)}function gh(){const t=indexedDB.deleteDatabase(na);return new Qt(t).toPromise()}function Mi(){const t=indexedDB.open(na,ph);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Nn,{keyPath:ia})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Nn)?e(r):(r.close(),await gh(),e(await Mi()))})})}async function As(t,e,n){const r=jn(t,!0).put({[ia]:e,value:n});return new Qt(r).toPromise()}async function mh(t,e){const n=jn(t,!1).get(e),r=await new Qt(n).toPromise();return r===void 0?null:r.value}function Cs(t,e){const n=jn(t,!0).delete(e);return new Qt(n).toPromise()}const vh=800,yh=3;class ra{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Mi(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>yh)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ta()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Fn._getInstance(fh()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await hh(),!this.activeServiceWorker)return;this.sender=new lh(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||dh()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Mi();return await As(e,On,"1"),await Cs(e,On),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>As(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>mh(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Cs(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const a=jn(s,!1).getAll();return new Qt(a).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:a}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(a)&&(this.notifyListeners(s,a),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),vh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ra.type="LOCAL";const _h=ra;new Xt(3e4,6e4);/**
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
 */function Ih(t,e){return e?Ce(e):(A(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Qi extends Ji{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return _t(e,this._buildIdpRequest())}_linkToIdToken(e,n){return _t(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return _t(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Eh(t){return Xo(t.auth,new Qi(t),t.bypassAuthState)}function wh(t){const{auth:e,user:n}=t;return A(n,e,"internal-error"),Qu(n,new Qi(t),t.bypassAuthState)}async function Th(t){const{auth:e,user:n}=t;return A(n,e,"internal-error"),Yu(n,new Qi(t),t.bypassAuthState)}/**
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
 */class sa{constructor(e,n,r,s,a=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=a,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:a,error:l,type:h}=e;if(l){this.reject(l);return}const p={auth:this.auth,requestUri:n,sessionId:r,tenantId:a||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(h)(p))}catch(E){this.reject(E)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Eh;case"linkViaPopup":case"linkViaRedirect":return Th;case"reauthViaPopup":case"reauthViaRedirect":return wh;default:pe(this.auth,"internal-error")}}resolve(e){Pe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Pe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const bh=new Xt(2e3,1e4);class mt extends sa{constructor(e,n,r,s,a){super(e,n,s,a),this.provider=r,this.authWindow=null,this.pollId=null,mt.currentPopupAction&&mt.currentPopupAction.cancel(),mt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return A(e,this.auth,"internal-error"),e}async onExecution(){Pe(this.filter.length===1,"Popup operations only handle one event");const e=Yi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ye(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ye(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,mt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ye(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,bh.get())};e()}}mt.currentPopupAction=null;/**
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
 */const Sh="pendingRedirect",Tn=new Map;class Ah extends sa{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Tn.get(this.auth._key());if(!e){try{const r=await Ch(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Tn.set(this.auth._key(),e)}return this.bypassAuthState||Tn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ch(t,e){const n=Ph(e),r=kh(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Rh(t,e){Tn.set(t._key(),e)}function kh(t){return Ce(t._redirectPersistence)}function Ph(t){return wn(Sh,t.config.apiKey,t.name)}async function Oh(t,e,n=!1){if(he(t.app))return Promise.reject(ze(t));const r=at(t),s=Ih(r,e),l=await new Ah(r,s,n).execute();return l&&!n&&(delete l.user._redirectEventId,await r._persistUserIfCurrent(l.user),await r._setRedirectUser(null,e)),l}/**
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
 */const Nh=10*60*1e3;class Dh{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Lh(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!oa(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(ye(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Nh&&this.cachedEventUids.clear(),this.cachedEventUids.has(Rs(e))}saveEventToCache(e){this.cachedEventUids.add(Rs(e)),this.lastProcessedEventTime=Date.now()}}function Rs(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function oa({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Lh(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return oa(t);default:return!1}}/**
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
 */async function Mh(t,e={}){return Ne(t,"GET","/v1/projects",e)}/**
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
 */const xh=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Uh=/^https?/;async function Fh(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Mh(t);for(const n of e)try{if(jh(n))return}catch{}pe(t,"unauthorized-domain")}function jh(t){const e=Ni(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const l=new URL(t);return l.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&l.hostname===r}if(!Uh.test(n))return!1;if(xh.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Bh=new Xt(3e4,6e4);function ks(){const t=_e().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Vh(t){return new Promise((e,n)=>{var r,s,a;function l(){ks(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ks(),n(ye(t,"network-request-failed"))},timeout:Bh.get()})}if(!((s=(r=_e().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((a=_e().gapi)===null||a===void 0)&&a.load)l();else{const h=Nu("iframefcb");return _e()[h]=()=>{gapi.load?l():n(ye(t,"network-request-failed"))},zo(`${Ou()}?onload=${h}`).catch(p=>n(p))}}).catch(e=>{throw bn=null,e})}let bn=null;function Hh(t){return bn=bn||Vh(t),bn}/**
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
 */const $h=new Xt(5e3,15e3),Wh="__/auth/iframe",zh="emulator/auth/iframe",Gh={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},qh=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Kh(t){const e=t.config;A(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Gi(e,zh):`https://${t.config.authDomain}/${Wh}`,r={apiKey:e.apiKey,appName:t.name,v:wt},s=qh.get(t.config.apiHost);s&&(r.eid=s);const a=t._getFrameworks();return a.length&&(r.fw=a.join(",")),`${n}?${Kt(r).slice(1)}`}async function Jh(t){const e=await Hh(t),n=_e().gapi;return A(n,t,"internal-error"),e.open({where:document.body,url:Kh(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Gh,dontclear:!0},r=>new Promise(async(s,a)=>{await r.restyle({setHideOnLeave:!1});const l=ye(t,"network-request-failed"),h=_e().setTimeout(()=>{a(l)},$h.get());function p(){_e().clearTimeout(h),s(r)}r.ping(p).then(p,()=>{a(l)})}))}/**
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
 */const Xh={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Yh=500,Qh=600,Zh="_blank",ed="http://localhost";class Ps{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function td(t,e,n,r=Yh,s=Qh){const a=Math.max((window.screen.availHeight-s)/2,0).toString(),l=Math.max((window.screen.availWidth-r)/2,0).toString();let h="";const p=Object.assign(Object.assign({},Xh),{width:r.toString(),height:s.toString(),top:a,left:l}),E=Z().toLowerCase();n&&(h=Fo(E)?Zh:n),xo(E)&&(e=e||ed,p.scrollbars="yes");const b=Object.entries(p).reduce((R,[D,k])=>`${R}${D}=${k},`,"");if(wu(E)&&h!=="_self")return nd(e||"",h),new Ps(null);const S=window.open(e||"",h,b);A(S,t,"popup-blocked");try{S.focus()}catch{}return new Ps(S)}function nd(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const id="__/auth/handler",rd="emulator/auth/handler",sd=encodeURIComponent("fac");async function Os(t,e,n,r,s,a){A(t.config.authDomain,t,"auth-domain-config-required"),A(t.config.apiKey,t,"invalid-api-key");const l={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:wt,eventId:s};if(e instanceof Ko){e.setDefaultLanguage(t.languageCode),l.providerId=e.providerId||"",Hc(e.getCustomParameters())||(l.customParameters=JSON.stringify(e.getCustomParameters()));for(const[b,S]of Object.entries({}))l[b]=S}if(e instanceof Yt){const b=e.getScopes().filter(S=>S!=="");b.length>0&&(l.scopes=b.join(","))}t.tenantId&&(l.tid=t.tenantId);const h=l;for(const b of Object.keys(h))h[b]===void 0&&delete h[b];const p=await t._getAppCheckToken(),E=p?`#${sd}=${encodeURIComponent(p)}`:"";return`${od(t)}?${Kt(h).slice(1)}${E}`}function od({config:t}){return t.emulator?Gi(t,rd):`https://${t.authDomain}/${id}`}/**
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
 */const Ii="webStorageSupport";class ad{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ea,this._completeRedirectFn=Oh,this._overrideRedirectResult=Rh}async _openPopup(e,n,r,s){var a;Pe((a=this.eventManagers[e._key()])===null||a===void 0?void 0:a.manager,"_initialize() not called before _openPopup()");const l=await Os(e,n,r,Ni(),s);return td(e,l,Yi())}async _openRedirect(e,n,r,s){await this._originValidation(e);const a=await Os(e,n,r,Ni(),s);return uh(a),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:a}=this.eventManagers[n];return s?Promise.resolve(s):(Pe(a,"If manager is not set, promise should be"),a)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await Jh(e),r=new Dh(e);return n.register("authEvent",s=>(A(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ii,{type:Ii},s=>{var a;const l=(a=s==null?void 0:s[0])===null||a===void 0?void 0:a[Ii];l!==void 0&&n(!!l),pe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Fh(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return $o()||Uo()||Ki()}}const cd=ad;var Ns="@firebase/auth",Ds="1.9.1";/**
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
 */class ld{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){A(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function ud(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function hd(t){Ie(new fe("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:l,authDomain:h}=r.options;A(l&&!l.includes(":"),"invalid-api-key",{appName:r.name});const p={apiKey:l,authDomain:h,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Wo(t)},E=new Ru(r,s,a,p);return Fu(E,n),E},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Ie(new fe("auth-internal",e=>{const n=at(e.getProvider("auth").getImmediate());return(r=>new ld(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),oe(Ns,Ds,ud(t)),oe(Ns,Ds,"esm2017")}/**
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
 */const dd=5*60,fd=mo("authIdTokenMaxAge")||dd;let Ls=null;const pd=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>fd)return;const s=n==null?void 0:n.token;Ls!==s&&(Ls=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function gd(t=bo()){const e=Jt(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Uu(t,{popupRedirectResolver:cd,persistence:[_h,ah,ea]}),r=mo("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const a=new URL(r,location.origin);if(location.origin===a.origin){const l=pd(a.toString());ih(n,l,()=>l(n.currentUser)),nh(n,h=>l(h))}}const s=po("auth");return s&&ju(n,`http://${s}`),n}function md(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}ku({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const a=ye("internal-error");a.customData=s,n(a)},r.type="text/javascript",r.charset="UTF-8",md().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});hd("Browser");var Ms=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var aa;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,d){function g(){}g.prototype=d.prototype,y.D=d.prototype,y.prototype=new g,y.prototype.constructor=y,y.C=function(m,v,I){for(var f=Array(arguments.length-2),ce=2;ce<arguments.length;ce++)f[ce-2]=arguments[ce];return d.prototype[v].apply(m,f)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(y,d,g){g||(g=0);var m=Array(16);if(typeof d=="string")for(var v=0;16>v;++v)m[v]=d.charCodeAt(g++)|d.charCodeAt(g++)<<8|d.charCodeAt(g++)<<16|d.charCodeAt(g++)<<24;else for(v=0;16>v;++v)m[v]=d[g++]|d[g++]<<8|d[g++]<<16|d[g++]<<24;d=y.g[0],g=y.g[1],v=y.g[2];var I=y.g[3],f=d+(I^g&(v^I))+m[0]+3614090360&4294967295;d=g+(f<<7&4294967295|f>>>25),f=I+(v^d&(g^v))+m[1]+3905402710&4294967295,I=d+(f<<12&4294967295|f>>>20),f=v+(g^I&(d^g))+m[2]+606105819&4294967295,v=I+(f<<17&4294967295|f>>>15),f=g+(d^v&(I^d))+m[3]+3250441966&4294967295,g=v+(f<<22&4294967295|f>>>10),f=d+(I^g&(v^I))+m[4]+4118548399&4294967295,d=g+(f<<7&4294967295|f>>>25),f=I+(v^d&(g^v))+m[5]+1200080426&4294967295,I=d+(f<<12&4294967295|f>>>20),f=v+(g^I&(d^g))+m[6]+2821735955&4294967295,v=I+(f<<17&4294967295|f>>>15),f=g+(d^v&(I^d))+m[7]+4249261313&4294967295,g=v+(f<<22&4294967295|f>>>10),f=d+(I^g&(v^I))+m[8]+1770035416&4294967295,d=g+(f<<7&4294967295|f>>>25),f=I+(v^d&(g^v))+m[9]+2336552879&4294967295,I=d+(f<<12&4294967295|f>>>20),f=v+(g^I&(d^g))+m[10]+4294925233&4294967295,v=I+(f<<17&4294967295|f>>>15),f=g+(d^v&(I^d))+m[11]+2304563134&4294967295,g=v+(f<<22&4294967295|f>>>10),f=d+(I^g&(v^I))+m[12]+1804603682&4294967295,d=g+(f<<7&4294967295|f>>>25),f=I+(v^d&(g^v))+m[13]+4254626195&4294967295,I=d+(f<<12&4294967295|f>>>20),f=v+(g^I&(d^g))+m[14]+2792965006&4294967295,v=I+(f<<17&4294967295|f>>>15),f=g+(d^v&(I^d))+m[15]+1236535329&4294967295,g=v+(f<<22&4294967295|f>>>10),f=d+(v^I&(g^v))+m[1]+4129170786&4294967295,d=g+(f<<5&4294967295|f>>>27),f=I+(g^v&(d^g))+m[6]+3225465664&4294967295,I=d+(f<<9&4294967295|f>>>23),f=v+(d^g&(I^d))+m[11]+643717713&4294967295,v=I+(f<<14&4294967295|f>>>18),f=g+(I^d&(v^I))+m[0]+3921069994&4294967295,g=v+(f<<20&4294967295|f>>>12),f=d+(v^I&(g^v))+m[5]+3593408605&4294967295,d=g+(f<<5&4294967295|f>>>27),f=I+(g^v&(d^g))+m[10]+38016083&4294967295,I=d+(f<<9&4294967295|f>>>23),f=v+(d^g&(I^d))+m[15]+3634488961&4294967295,v=I+(f<<14&4294967295|f>>>18),f=g+(I^d&(v^I))+m[4]+3889429448&4294967295,g=v+(f<<20&4294967295|f>>>12),f=d+(v^I&(g^v))+m[9]+568446438&4294967295,d=g+(f<<5&4294967295|f>>>27),f=I+(g^v&(d^g))+m[14]+3275163606&4294967295,I=d+(f<<9&4294967295|f>>>23),f=v+(d^g&(I^d))+m[3]+4107603335&4294967295,v=I+(f<<14&4294967295|f>>>18),f=g+(I^d&(v^I))+m[8]+1163531501&4294967295,g=v+(f<<20&4294967295|f>>>12),f=d+(v^I&(g^v))+m[13]+2850285829&4294967295,d=g+(f<<5&4294967295|f>>>27),f=I+(g^v&(d^g))+m[2]+4243563512&4294967295,I=d+(f<<9&4294967295|f>>>23),f=v+(d^g&(I^d))+m[7]+1735328473&4294967295,v=I+(f<<14&4294967295|f>>>18),f=g+(I^d&(v^I))+m[12]+2368359562&4294967295,g=v+(f<<20&4294967295|f>>>12),f=d+(g^v^I)+m[5]+4294588738&4294967295,d=g+(f<<4&4294967295|f>>>28),f=I+(d^g^v)+m[8]+2272392833&4294967295,I=d+(f<<11&4294967295|f>>>21),f=v+(I^d^g)+m[11]+1839030562&4294967295,v=I+(f<<16&4294967295|f>>>16),f=g+(v^I^d)+m[14]+4259657740&4294967295,g=v+(f<<23&4294967295|f>>>9),f=d+(g^v^I)+m[1]+2763975236&4294967295,d=g+(f<<4&4294967295|f>>>28),f=I+(d^g^v)+m[4]+1272893353&4294967295,I=d+(f<<11&4294967295|f>>>21),f=v+(I^d^g)+m[7]+4139469664&4294967295,v=I+(f<<16&4294967295|f>>>16),f=g+(v^I^d)+m[10]+3200236656&4294967295,g=v+(f<<23&4294967295|f>>>9),f=d+(g^v^I)+m[13]+681279174&4294967295,d=g+(f<<4&4294967295|f>>>28),f=I+(d^g^v)+m[0]+3936430074&4294967295,I=d+(f<<11&4294967295|f>>>21),f=v+(I^d^g)+m[3]+3572445317&4294967295,v=I+(f<<16&4294967295|f>>>16),f=g+(v^I^d)+m[6]+76029189&4294967295,g=v+(f<<23&4294967295|f>>>9),f=d+(g^v^I)+m[9]+3654602809&4294967295,d=g+(f<<4&4294967295|f>>>28),f=I+(d^g^v)+m[12]+3873151461&4294967295,I=d+(f<<11&4294967295|f>>>21),f=v+(I^d^g)+m[15]+530742520&4294967295,v=I+(f<<16&4294967295|f>>>16),f=g+(v^I^d)+m[2]+3299628645&4294967295,g=v+(f<<23&4294967295|f>>>9),f=d+(v^(g|~I))+m[0]+4096336452&4294967295,d=g+(f<<6&4294967295|f>>>26),f=I+(g^(d|~v))+m[7]+1126891415&4294967295,I=d+(f<<10&4294967295|f>>>22),f=v+(d^(I|~g))+m[14]+2878612391&4294967295,v=I+(f<<15&4294967295|f>>>17),f=g+(I^(v|~d))+m[5]+4237533241&4294967295,g=v+(f<<21&4294967295|f>>>11),f=d+(v^(g|~I))+m[12]+1700485571&4294967295,d=g+(f<<6&4294967295|f>>>26),f=I+(g^(d|~v))+m[3]+2399980690&4294967295,I=d+(f<<10&4294967295|f>>>22),f=v+(d^(I|~g))+m[10]+4293915773&4294967295,v=I+(f<<15&4294967295|f>>>17),f=g+(I^(v|~d))+m[1]+2240044497&4294967295,g=v+(f<<21&4294967295|f>>>11),f=d+(v^(g|~I))+m[8]+1873313359&4294967295,d=g+(f<<6&4294967295|f>>>26),f=I+(g^(d|~v))+m[15]+4264355552&4294967295,I=d+(f<<10&4294967295|f>>>22),f=v+(d^(I|~g))+m[6]+2734768916&4294967295,v=I+(f<<15&4294967295|f>>>17),f=g+(I^(v|~d))+m[13]+1309151649&4294967295,g=v+(f<<21&4294967295|f>>>11),f=d+(v^(g|~I))+m[4]+4149444226&4294967295,d=g+(f<<6&4294967295|f>>>26),f=I+(g^(d|~v))+m[11]+3174756917&4294967295,I=d+(f<<10&4294967295|f>>>22),f=v+(d^(I|~g))+m[2]+718787259&4294967295,v=I+(f<<15&4294967295|f>>>17),f=g+(I^(v|~d))+m[9]+3951481745&4294967295,y.g[0]=y.g[0]+d&4294967295,y.g[1]=y.g[1]+(v+(f<<21&4294967295|f>>>11))&4294967295,y.g[2]=y.g[2]+v&4294967295,y.g[3]=y.g[3]+I&4294967295}r.prototype.u=function(y,d){d===void 0&&(d=y.length);for(var g=d-this.blockSize,m=this.B,v=this.h,I=0;I<d;){if(v==0)for(;I<=g;)s(this,y,I),I+=this.blockSize;if(typeof y=="string"){for(;I<d;)if(m[v++]=y.charCodeAt(I++),v==this.blockSize){s(this,m),v=0;break}}else for(;I<d;)if(m[v++]=y[I++],v==this.blockSize){s(this,m),v=0;break}}this.h=v,this.o+=d},r.prototype.v=function(){var y=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);y[0]=128;for(var d=1;d<y.length-8;++d)y[d]=0;var g=8*this.o;for(d=y.length-8;d<y.length;++d)y[d]=g&255,g/=256;for(this.u(y),y=Array(16),d=g=0;4>d;++d)for(var m=0;32>m;m+=8)y[g++]=this.g[d]>>>m&255;return y};function a(y,d){var g=h;return Object.prototype.hasOwnProperty.call(g,y)?g[y]:g[y]=d(y)}function l(y,d){this.h=d;for(var g=[],m=!0,v=y.length-1;0<=v;v--){var I=y[v]|0;m&&I==d||(g[v]=I,m=!1)}this.g=g}var h={};function p(y){return-128<=y&&128>y?a(y,function(d){return new l([d|0],0>d?-1:0)}):new l([y|0],0>y?-1:0)}function E(y){if(isNaN(y)||!isFinite(y))return S;if(0>y)return M(E(-y));for(var d=[],g=1,m=0;y>=g;m++)d[m]=y/g|0,g*=4294967296;return new l(d,0)}function b(y,d){if(y.length==0)throw Error("number format error: empty string");if(d=d||10,2>d||36<d)throw Error("radix out of range: "+d);if(y.charAt(0)=="-")return M(b(y.substring(1),d));if(0<=y.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=E(Math.pow(d,8)),m=S,v=0;v<y.length;v+=8){var I=Math.min(8,y.length-v),f=parseInt(y.substring(v,v+I),d);8>I?(I=E(Math.pow(d,I)),m=m.j(I).add(E(f))):(m=m.j(g),m=m.add(E(f)))}return m}var S=p(0),R=p(1),D=p(16777216);t=l.prototype,t.m=function(){if(j(this))return-M(this).m();for(var y=0,d=1,g=0;g<this.g.length;g++){var m=this.i(g);y+=(0<=m?m:4294967296+m)*d,d*=4294967296}return y},t.toString=function(y){if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(k(this))return"0";if(j(this))return"-"+M(this).toString(y);for(var d=E(Math.pow(y,6)),g=this,m="";;){var v=ie(g,d).g;g=re(g,v.j(d));var I=((0<g.g.length?g.g[0]:g.h)>>>0).toString(y);if(g=v,k(g))return I+m;for(;6>I.length;)I="0"+I;m=I+m}},t.i=function(y){return 0>y?0:y<this.g.length?this.g[y]:this.h};function k(y){if(y.h!=0)return!1;for(var d=0;d<y.g.length;d++)if(y.g[d]!=0)return!1;return!0}function j(y){return y.h==-1}t.l=function(y){return y=re(this,y),j(y)?-1:k(y)?0:1};function M(y){for(var d=y.g.length,g=[],m=0;m<d;m++)g[m]=~y.g[m];return new l(g,~y.h).add(R)}t.abs=function(){return j(this)?M(this):this},t.add=function(y){for(var d=Math.max(this.g.length,y.g.length),g=[],m=0,v=0;v<=d;v++){var I=m+(this.i(v)&65535)+(y.i(v)&65535),f=(I>>>16)+(this.i(v)>>>16)+(y.i(v)>>>16);m=f>>>16,I&=65535,f&=65535,g[v]=f<<16|I}return new l(g,g[g.length-1]&-2147483648?-1:0)};function re(y,d){return y.add(M(d))}t.j=function(y){if(k(this)||k(y))return S;if(j(this))return j(y)?M(this).j(M(y)):M(M(this).j(y));if(j(y))return M(this.j(M(y)));if(0>this.l(D)&&0>y.l(D))return E(this.m()*y.m());for(var d=this.g.length+y.g.length,g=[],m=0;m<2*d;m++)g[m]=0;for(m=0;m<this.g.length;m++)for(var v=0;v<y.g.length;v++){var I=this.i(m)>>>16,f=this.i(m)&65535,ce=y.i(v)>>>16,De=y.i(v)&65535;g[2*m+2*v]+=f*De,G(g,2*m+2*v),g[2*m+2*v+1]+=I*De,G(g,2*m+2*v+1),g[2*m+2*v+1]+=f*ce,G(g,2*m+2*v+1),g[2*m+2*v+2]+=I*ce,G(g,2*m+2*v+2)}for(m=0;m<d;m++)g[m]=g[2*m+1]<<16|g[2*m];for(m=d;m<2*d;m++)g[m]=0;return new l(g,0)};function G(y,d){for(;(y[d]&65535)!=y[d];)y[d+1]+=y[d]>>>16,y[d]&=65535,d++}function $(y,d){this.g=y,this.h=d}function ie(y,d){if(k(d))throw Error("division by zero");if(k(y))return new $(S,S);if(j(y))return d=ie(M(y),d),new $(M(d.g),M(d.h));if(j(d))return d=ie(y,M(d)),new $(M(d.g),d.h);if(30<y.g.length){if(j(y)||j(d))throw Error("slowDivide_ only works with positive integers.");for(var g=R,m=d;0>=m.l(y);)g=me(g),m=me(m);var v=W(g,1),I=W(m,1);for(m=W(m,2),g=W(g,2);!k(m);){var f=I.add(m);0>=f.l(y)&&(v=v.add(g),I=f),m=W(m,1),g=W(g,1)}return d=re(y,v.j(d)),new $(v,d)}for(v=S;0<=y.l(d);){for(g=Math.max(1,Math.floor(y.m()/d.m())),m=Math.ceil(Math.log(g)/Math.LN2),m=48>=m?1:Math.pow(2,m-48),I=E(g),f=I.j(d);j(f)||0<f.l(y);)g-=m,I=E(g),f=I.j(d);k(I)&&(I=R),v=v.add(I),y=re(y,f)}return new $(v,y)}t.A=function(y){return ie(this,y).h},t.and=function(y){for(var d=Math.max(this.g.length,y.g.length),g=[],m=0;m<d;m++)g[m]=this.i(m)&y.i(m);return new l(g,this.h&y.h)},t.or=function(y){for(var d=Math.max(this.g.length,y.g.length),g=[],m=0;m<d;m++)g[m]=this.i(m)|y.i(m);return new l(g,this.h|y.h)},t.xor=function(y){for(var d=Math.max(this.g.length,y.g.length),g=[],m=0;m<d;m++)g[m]=this.i(m)^y.i(m);return new l(g,this.h^y.h)};function me(y){for(var d=y.g.length+1,g=[],m=0;m<d;m++)g[m]=y.i(m)<<1|y.i(m-1)>>>31;return new l(g,y.h)}function W(y,d){var g=d>>5;d%=32;for(var m=y.g.length-g,v=[],I=0;I<m;I++)v[I]=0<d?y.i(I+g)>>>d|y.i(I+g+1)<<32-d:y.i(I+g);return new l(v,y.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.A,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=E,l.fromString=b,aa=l}).apply(typeof Ms<"u"?Ms:typeof self<"u"?self:typeof window<"u"?window:{});var In=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,o,c){return i==Array.prototype||i==Object.prototype||(i[o]=c.value),i};function n(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof In=="object"&&In];for(var o=0;o<i.length;++o){var c=i[o];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=n(this);function s(i,o){if(o)e:{var c=r;i=i.split(".");for(var u=0;u<i.length-1;u++){var _=i[u];if(!(_ in c))break e;c=c[_]}i=i[i.length-1],u=c[i],o=o(u),o!=u&&o!=null&&e(c,i,{configurable:!0,writable:!0,value:o})}}function a(i,o){i instanceof String&&(i+="");var c=0,u=!1,_={next:function(){if(!u&&c<i.length){var w=c++;return{value:o(w,i[w]),done:!1}}return u=!0,{done:!0,value:void 0}}};return _[Symbol.iterator]=function(){return _},_}s("Array.prototype.values",function(i){return i||function(){return a(this,function(o,c){return c})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},h=this||self;function p(i){var o=typeof i;return o=o!="object"?o:i?Array.isArray(i)?"array":o:"null",o=="array"||o=="object"&&typeof i.length=="number"}function E(i){var o=typeof i;return o=="object"&&i!=null||o=="function"}function b(i,o,c){return i.call.apply(i.bind,arguments)}function S(i,o,c){if(!i)throw Error();if(2<arguments.length){var u=Array.prototype.slice.call(arguments,2);return function(){var _=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(_,u),i.apply(o,_)}}return function(){return i.apply(o,arguments)}}function R(i,o,c){return R=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?b:S,R.apply(null,arguments)}function D(i,o){var c=Array.prototype.slice.call(arguments,1);return function(){var u=c.slice();return u.push.apply(u,arguments),i.apply(this,u)}}function k(i,o){function c(){}c.prototype=o.prototype,i.aa=o.prototype,i.prototype=new c,i.prototype.constructor=i,i.Qb=function(u,_,w){for(var T=Array(arguments.length-2),L=2;L<arguments.length;L++)T[L-2]=arguments[L];return o.prototype[_].apply(u,T)}}function j(i){const o=i.length;if(0<o){const c=Array(o);for(let u=0;u<o;u++)c[u]=i[u];return c}return[]}function M(i,o){for(let c=1;c<arguments.length;c++){const u=arguments[c];if(p(u)){const _=i.length||0,w=u.length||0;i.length=_+w;for(let T=0;T<w;T++)i[_+T]=u[T]}else i.push(u)}}class re{constructor(o,c){this.i=o,this.j=c,this.h=0,this.g=null}get(){let o;return 0<this.h?(this.h--,o=this.g,this.g=o.next,o.next=null):o=this.i(),o}}function G(i){return/^[\s\xa0]*$/.test(i)}function $(){var i=h.navigator;return i&&(i=i.userAgent)?i:""}function ie(i){return ie[" "](i),i}ie[" "]=function(){};var me=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function W(i,o,c){for(const u in i)o.call(c,i[u],u,i)}function y(i,o){for(const c in i)o.call(void 0,i[c],c,i)}function d(i){const o={};for(const c in i)o[c]=i[c];return o}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function m(i,o){let c,u;for(let _=1;_<arguments.length;_++){u=arguments[_];for(c in u)i[c]=u[c];for(let w=0;w<g.length;w++)c=g[w],Object.prototype.hasOwnProperty.call(u,c)&&(i[c]=u[c])}}function v(i){var o=1;i=i.split(":");const c=[];for(;0<o&&i.length;)c.push(i.shift()),o--;return i.length&&c.push(i.join(":")),c}function I(i){h.setTimeout(()=>{throw i},0)}function f(){var i=ct;let o=null;return i.g&&(o=i.g,i.g=i.g.next,i.g||(i.h=null),o.next=null),o}class ce{constructor(){this.h=this.g=null}add(o,c){const u=De.get();u.set(o,c),this.h?this.h.next=u:this.g=u,this.h=u}}var De=new re(()=>new ve,i=>i.reset());class ve{constructor(){this.next=this.g=this.h=null}set(o,c){this.h=o,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let we,Le=!1,ct=new ce,bt=()=>{const i=h.Promise.resolve(void 0);we=()=>{i.then(Hn)}};var Hn=()=>{for(var i;i=f();){try{i.h.call(i.g)}catch(c){I(c)}var o=De;o.j(i),100>o.h&&(o.h++,i.next=o.g,o.g=i)}Le=!1};function le(){this.s=this.s,this.C=this.C}le.prototype.s=!1,le.prototype.ma=function(){this.s||(this.s=!0,this.N())},le.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function H(i,o){this.type=i,this.g=this.target=o,this.defaultPrevented=!1}H.prototype.h=function(){this.defaultPrevented=!0};var en=function(){if(!h.addEventListener||!Object.defineProperty)return!1;var i=!1,o=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};h.addEventListener("test",c,o),h.removeEventListener("test",c,o)}catch{}return i}();function V(i,o){if(H.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var c=this.type=i.type,u=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=o,o=i.relatedTarget){if(me){e:{try{ie(o.nodeName);var _=!0;break e}catch{}_=!1}_||(o=null)}}else c=="mouseover"?o=i.fromElement:c=="mouseout"&&(o=i.toElement);this.relatedTarget=o,u?(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:xa[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&V.aa.h.call(this)}}k(V,H);var xa={2:"touch",3:"pen",4:"mouse"};V.prototype.h=function(){V.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var tn="closure_listenable_"+(1e6*Math.random()|0),Ua=0;function Fa(i,o,c,u,_){this.listener=i,this.proxy=null,this.src=o,this.type=c,this.capture=!!u,this.ha=_,this.key=++Ua,this.da=this.fa=!1}function nn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function rn(i){this.src=i,this.g={},this.h=0}rn.prototype.add=function(i,o,c,u,_){var w=i.toString();i=this.g[w],i||(i=this.g[w]=[],this.h++);var T=Wn(i,o,u,_);return-1<T?(o=i[T],c||(o.fa=!1)):(o=new Fa(o,this.src,w,!!u,_),o.fa=c,i.push(o)),o};function $n(i,o){var c=o.type;if(c in i.g){var u=i.g[c],_=Array.prototype.indexOf.call(u,o,void 0),w;(w=0<=_)&&Array.prototype.splice.call(u,_,1),w&&(nn(o),i.g[c].length==0&&(delete i.g[c],i.h--))}}function Wn(i,o,c,u){for(var _=0;_<i.length;++_){var w=i[_];if(!w.da&&w.listener==o&&w.capture==!!c&&w.ha==u)return _}return-1}var zn="closure_lm_"+(1e6*Math.random()|0),Gn={};function ar(i,o,c,u,_){if(Array.isArray(o)){for(var w=0;w<o.length;w++)ar(i,o[w],c,u,_);return null}return c=ur(c),i&&i[tn]?i.K(o,c,E(u)?!!u.capture:!1,_):ja(i,o,c,!1,u,_)}function ja(i,o,c,u,_,w){if(!o)throw Error("Invalid event type");var T=E(_)?!!_.capture:!!_,L=Kn(i);if(L||(i[zn]=L=new rn(i)),c=L.add(o,c,u,T,w),c.proxy)return c;if(u=Ba(),c.proxy=u,u.src=i,u.listener=c,i.addEventListener)en||(_=T),_===void 0&&(_=!1),i.addEventListener(o.toString(),u,_);else if(i.attachEvent)i.attachEvent(lr(o.toString()),u);else if(i.addListener&&i.removeListener)i.addListener(u);else throw Error("addEventListener and attachEvent are unavailable.");return c}function Ba(){function i(c){return o.call(i.src,i.listener,c)}const o=Va;return i}function cr(i,o,c,u,_){if(Array.isArray(o))for(var w=0;w<o.length;w++)cr(i,o[w],c,u,_);else u=E(u)?!!u.capture:!!u,c=ur(c),i&&i[tn]?(i=i.i,o=String(o).toString(),o in i.g&&(w=i.g[o],c=Wn(w,c,u,_),-1<c&&(nn(w[c]),Array.prototype.splice.call(w,c,1),w.length==0&&(delete i.g[o],i.h--)))):i&&(i=Kn(i))&&(o=i.g[o.toString()],i=-1,o&&(i=Wn(o,c,u,_)),(c=-1<i?o[i]:null)&&qn(c))}function qn(i){if(typeof i!="number"&&i&&!i.da){var o=i.src;if(o&&o[tn])$n(o.i,i);else{var c=i.type,u=i.proxy;o.removeEventListener?o.removeEventListener(c,u,i.capture):o.detachEvent?o.detachEvent(lr(c),u):o.addListener&&o.removeListener&&o.removeListener(u),(c=Kn(o))?($n(c,i),c.h==0&&(c.src=null,o[zn]=null)):nn(i)}}}function lr(i){return i in Gn?Gn[i]:Gn[i]="on"+i}function Va(i,o){if(i.da)i=!0;else{o=new V(o,this);var c=i.listener,u=i.ha||i.src;i.fa&&qn(i),i=c.call(u,o)}return i}function Kn(i){return i=i[zn],i instanceof rn?i:null}var Jn="__closure_events_fn_"+(1e9*Math.random()>>>0);function ur(i){return typeof i=="function"?i:(i[Jn]||(i[Jn]=function(o){return i.handleEvent(o)}),i[Jn])}function q(){le.call(this),this.i=new rn(this),this.M=this,this.F=null}k(q,le),q.prototype[tn]=!0,q.prototype.removeEventListener=function(i,o,c,u){cr(this,i,o,c,u)};function X(i,o){var c,u=i.F;if(u)for(c=[];u;u=u.F)c.push(u);if(i=i.M,u=o.type||o,typeof o=="string")o=new H(o,i);else if(o instanceof H)o.target=o.target||i;else{var _=o;o=new H(u,i),m(o,_)}if(_=!0,c)for(var w=c.length-1;0<=w;w--){var T=o.g=c[w];_=sn(T,u,!0,o)&&_}if(T=o.g=i,_=sn(T,u,!0,o)&&_,_=sn(T,u,!1,o)&&_,c)for(w=0;w<c.length;w++)T=o.g=c[w],_=sn(T,u,!1,o)&&_}q.prototype.N=function(){if(q.aa.N.call(this),this.i){var i=this.i,o;for(o in i.g){for(var c=i.g[o],u=0;u<c.length;u++)nn(c[u]);delete i.g[o],i.h--}}this.F=null},q.prototype.K=function(i,o,c,u){return this.i.add(String(i),o,!1,c,u)},q.prototype.L=function(i,o,c,u){return this.i.add(String(i),o,!0,c,u)};function sn(i,o,c,u){if(o=i.i.g[String(o)],!o)return!0;o=o.concat();for(var _=!0,w=0;w<o.length;++w){var T=o[w];if(T&&!T.da&&T.capture==c){var L=T.listener,z=T.ha||T.src;T.fa&&$n(i.i,T),_=L.call(z,u)!==!1&&_}}return _&&!u.defaultPrevented}function hr(i,o,c){if(typeof i=="function")c&&(i=R(i,c));else if(i&&typeof i.handleEvent=="function")i=R(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(o)?-1:h.setTimeout(i,o||0)}function dr(i){i.g=hr(()=>{i.g=null,i.i&&(i.i=!1,dr(i))},i.l);const o=i.h;i.h=null,i.m.apply(null,o)}class Ha extends le{constructor(o,c){super(),this.m=o,this.l=c,this.h=null,this.i=!1,this.g=null}j(o){this.h=arguments,this.g?this.i=!0:dr(this)}N(){super.N(),this.g&&(h.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function St(i){le.call(this),this.h=i,this.g={}}k(St,le);var fr=[];function pr(i){W(i.g,function(o,c){this.g.hasOwnProperty(c)&&qn(o)},i),i.g={}}St.prototype.N=function(){St.aa.N.call(this),pr(this)},St.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Xn=h.JSON.stringify,$a=h.JSON.parse,Wa=class{stringify(i){return h.JSON.stringify(i,void 0)}parse(i){return h.JSON.parse(i,void 0)}};function Yn(){}Yn.prototype.h=null;function gr(i){return i.h||(i.h=i.i())}function za(){}var At={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Qn(){H.call(this,"d")}k(Qn,H);function Zn(){H.call(this,"c")}k(Zn,H);var lt={},mr=null;function ei(){return mr=mr||new q}lt.La="serverreachability";function vr(i){H.call(this,lt.La,i)}k(vr,H);function Ct(i){const o=ei();X(o,new vr(o))}lt.STAT_EVENT="statevent";function yr(i,o){H.call(this,lt.STAT_EVENT,i),this.stat=o}k(yr,H);function Y(i){const o=ei();X(o,new yr(o,i))}lt.Ma="timingevent";function _r(i,o){H.call(this,lt.Ma,i),this.size=o}k(_r,H);function Rt(i,o){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return h.setTimeout(function(){i()},o)}function kt(){this.g=!0}kt.prototype.xa=function(){this.g=!1};function Ga(i,o,c,u,_,w){i.info(function(){if(i.g)if(w)for(var T="",L=w.split("&"),z=0;z<L.length;z++){var O=L[z].split("=");if(1<O.length){var K=O[0];O=O[1];var J=K.split("_");T=2<=J.length&&J[1]=="type"?T+(K+"="+O+"&"):T+(K+"=redacted&")}}else T=null;else T=w;return"XMLHTTP REQ ("+u+") [attempt "+_+"]: "+o+`
`+c+`
`+T})}function qa(i,o,c,u,_,w,T){i.info(function(){return"XMLHTTP RESP ("+u+") [ attempt "+_+"]: "+o+`
`+c+`
`+w+" "+T})}function ut(i,o,c,u){i.info(function(){return"XMLHTTP TEXT ("+o+"): "+Ja(i,c)+(u?" "+u:"")})}function Ka(i,o){i.info(function(){return"TIMEOUT: "+o})}kt.prototype.info=function(){};function Ja(i,o){if(!i.g)return o;if(!o)return null;try{var c=JSON.parse(o);if(c){for(i=0;i<c.length;i++)if(Array.isArray(c[i])){var u=c[i];if(!(2>u.length)){var _=u[1];if(Array.isArray(_)&&!(1>_.length)){var w=_[0];if(w!="noop"&&w!="stop"&&w!="close")for(var T=1;T<_.length;T++)_[T]=""}}}}return Xn(c)}catch{return o}}var ti={NO_ERROR:0,TIMEOUT:8},Xa={},ni;function on(){}k(on,Yn),on.prototype.g=function(){return new XMLHttpRequest},on.prototype.i=function(){return{}},ni=new on;function Me(i,o,c,u){this.j=i,this.i=o,this.l=c,this.R=u||1,this.U=new St(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ir}function Ir(){this.i=null,this.g="",this.h=!1}var Er={},ii={};function ri(i,o,c){i.L=1,i.v=un(Te(o)),i.m=c,i.P=!0,wr(i,null)}function wr(i,o){i.F=Date.now(),an(i),i.A=Te(i.v);var c=i.A,u=i.R;Array.isArray(u)||(u=[String(u)]),xr(c.i,"t",u),i.C=0,c=i.j.J,i.h=new Ir,i.g=es(i.j,c?o:null,!i.m),0<i.O&&(i.M=new Ha(R(i.Y,i,i.g),i.O)),o=i.U,c=i.g,u=i.ca;var _="readystatechange";Array.isArray(_)||(_&&(fr[0]=_.toString()),_=fr);for(var w=0;w<_.length;w++){var T=ar(c,_[w],u||o.handleEvent,!1,o.h||o);if(!T)break;o.g[T.key]=T}o=i.H?d(i.H):{},i.m?(i.u||(i.u="POST"),o["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,o)):(i.u="GET",i.g.ea(i.A,i.u,null,o)),Ct(),Ga(i.i,i.u,i.A,i.l,i.R,i.m)}Me.prototype.ca=function(i){i=i.target;const o=this.M;o&&be(i)==3?o.j():this.Y(i)},Me.prototype.Y=function(i){try{if(i==this.g)e:{const J=be(this.g);var o=this.g.Ba();const ft=this.g.Z();if(!(3>J)&&(J!=3||this.g&&(this.h.h||this.g.oa()||$r(this.g)))){this.J||J!=4||o==7||(o==8||0>=ft?Ct(3):Ct(2)),si(this);var c=this.g.Z();this.X=c;t:if(Tr(this)){var u=$r(this.g);i="";var _=u.length,w=be(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Je(this),Pt(this);var T="";break t}this.h.i=new h.TextDecoder}for(o=0;o<_;o++)this.h.h=!0,i+=this.h.i.decode(u[o],{stream:!(w&&o==_-1)});u.length=0,this.h.g+=i,this.C=0,T=this.h.g}else T=this.g.oa();if(this.o=c==200,qa(this.i,this.u,this.A,this.l,this.R,J,c),this.o){if(this.T&&!this.K){t:{if(this.g){var L,z=this.g;if((L=z.g?z.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!G(L)){var O=L;break t}}O=null}if(c=O)ut(this.i,this.l,c,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,oi(this,c);else{this.o=!1,this.s=3,Y(12),Je(this),Pt(this);break e}}if(this.P){c=!0;let ue;for(;!this.J&&this.C<T.length;)if(ue=Ya(this,T),ue==ii){J==4&&(this.s=4,Y(14),c=!1),ut(this.i,this.l,null,"[Incomplete Response]");break}else if(ue==Er){this.s=4,Y(15),ut(this.i,this.l,T,"[Invalid Chunk]"),c=!1;break}else ut(this.i,this.l,ue,null),oi(this,ue);if(Tr(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),J!=4||T.length!=0||this.h.h||(this.s=1,Y(16),c=!1),this.o=this.o&&c,!c)ut(this.i,this.l,T,"[Invalid Chunked Response]"),Je(this),Pt(this);else if(0<T.length&&!this.W){this.W=!0;var K=this.j;K.g==this&&K.ba&&!K.M&&(K.j.info("Great, no buffering proxy detected. Bytes received: "+T.length),di(K),K.M=!0,Y(11))}}else ut(this.i,this.l,T,null),oi(this,T);J==4&&Je(this),this.o&&!this.J&&(J==4?Xr(this.j,this):(this.o=!1,an(this)))}else pc(this.g),c==400&&0<T.indexOf("Unknown SID")?(this.s=3,Y(12)):(this.s=0,Y(13)),Je(this),Pt(this)}}}catch{}finally{}};function Tr(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function Ya(i,o){var c=i.C,u=o.indexOf(`
`,c);return u==-1?ii:(c=Number(o.substring(c,u)),isNaN(c)?Er:(u+=1,u+c>o.length?ii:(o=o.slice(u,u+c),i.C=u+c,o)))}Me.prototype.cancel=function(){this.J=!0,Je(this)};function an(i){i.S=Date.now()+i.I,br(i,i.I)}function br(i,o){if(i.B!=null)throw Error("WatchDog timer not null");i.B=Rt(R(i.ba,i),o)}function si(i){i.B&&(h.clearTimeout(i.B),i.B=null)}Me.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(Ka(this.i,this.A),this.L!=2&&(Ct(),Y(17)),Je(this),this.s=2,Pt(this)):br(this,this.S-i)};function Pt(i){i.j.G==0||i.J||Xr(i.j,i)}function Je(i){si(i);var o=i.M;o&&typeof o.ma=="function"&&o.ma(),i.M=null,pr(i.U),i.g&&(o=i.g,i.g=null,o.abort(),o.ma())}function oi(i,o){try{var c=i.j;if(c.G!=0&&(c.g==i||ai(c.h,i))){if(!i.K&&ai(c.h,i)&&c.G==3){try{var u=c.Da.g.parse(o)}catch{u=null}if(Array.isArray(u)&&u.length==3){var _=u;if(_[0]==0){e:if(!c.u){if(c.g)if(c.g.F+3e3<i.F)mn(c),pn(c);else break e;hi(c),Y(18)}}else c.za=_[1],0<c.za-c.T&&37500>_[2]&&c.F&&c.v==0&&!c.C&&(c.C=Rt(R(c.Za,c),6e3));if(1>=Cr(c.h)&&c.ca){try{c.ca()}catch{}c.ca=void 0}}else Ye(c,11)}else if((i.K||c.g==i)&&mn(c),!G(o))for(_=c.Da.g.parse(o),o=0;o<_.length;o++){let O=_[o];if(c.T=O[0],O=O[1],c.G==2)if(O[0]=="c"){c.K=O[1],c.ia=O[2];const K=O[3];K!=null&&(c.la=K,c.j.info("VER="+c.la));const J=O[4];J!=null&&(c.Aa=J,c.j.info("SVER="+c.Aa));const ft=O[5];ft!=null&&typeof ft=="number"&&0<ft&&(u=1.5*ft,c.L=u,c.j.info("backChannelRequestTimeoutMs_="+u)),u=c;const ue=i.g;if(ue){const vn=ue.g?ue.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(vn){var w=u.h;w.g||vn.indexOf("spdy")==-1&&vn.indexOf("quic")==-1&&vn.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(ci(w,w.h),w.h=null))}if(u.D){const fi=ue.g?ue.g.getResponseHeader("X-HTTP-Session-Id"):null;fi&&(u.ya=fi,U(u.I,u.D,fi))}}c.G=3,c.l&&c.l.ua(),c.ba&&(c.R=Date.now()-i.F,c.j.info("Handshake RTT: "+c.R+"ms")),u=c;var T=i;if(u.qa=Zr(u,u.J?u.ia:null,u.W),T.K){Rr(u.h,T);var L=T,z=u.L;z&&(L.I=z),L.B&&(si(L),an(L)),u.g=T}else Kr(u);0<c.i.length&&gn(c)}else O[0]!="stop"&&O[0]!="close"||Ye(c,7);else c.G==3&&(O[0]=="stop"||O[0]=="close"?O[0]=="stop"?Ye(c,7):ui(c):O[0]!="noop"&&c.l&&c.l.ta(O),c.v=0)}}Ct(4)}catch{}}var Qa=class{constructor(i,o){this.g=i,this.map=o}};function Sr(i){this.l=i||10,h.PerformanceNavigationTiming?(i=h.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(h.chrome&&h.chrome.loadTimes&&h.chrome.loadTimes()&&h.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ar(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function Cr(i){return i.h?1:i.g?i.g.size:0}function ai(i,o){return i.h?i.h==o:i.g?i.g.has(o):!1}function ci(i,o){i.g?i.g.add(o):i.h=o}function Rr(i,o){i.h&&i.h==o?i.h=null:i.g&&i.g.has(o)&&i.g.delete(o)}Sr.prototype.cancel=function(){if(this.i=kr(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function kr(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let o=i.i;for(const c of i.g.values())o=o.concat(c.D);return o}return j(i.i)}function Za(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(p(i)){for(var o=[],c=i.length,u=0;u<c;u++)o.push(i[u]);return o}o=[],c=0;for(u in i)o[c++]=i[u];return o}function ec(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(p(i)||typeof i=="string"){var o=[];i=i.length;for(var c=0;c<i;c++)o.push(c);return o}o=[],c=0;for(const u in i)o[c++]=u;return o}}}function Pr(i,o){if(i.forEach&&typeof i.forEach=="function")i.forEach(o,void 0);else if(p(i)||typeof i=="string")Array.prototype.forEach.call(i,o,void 0);else for(var c=ec(i),u=Za(i),_=u.length,w=0;w<_;w++)o.call(void 0,u[w],c&&c[w],i)}var Or=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function tc(i,o){if(i){i=i.split("&");for(var c=0;c<i.length;c++){var u=i[c].indexOf("="),_=null;if(0<=u){var w=i[c].substring(0,u);_=i[c].substring(u+1)}else w=i[c];o(w,_?decodeURIComponent(_.replace(/\+/g," ")):"")}}}function Xe(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof Xe){this.h=i.h,cn(this,i.j),this.o=i.o,this.g=i.g,ln(this,i.s),this.l=i.l;var o=i.i,c=new Dt;c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),Nr(this,c),this.m=i.m}else i&&(o=String(i).match(Or))?(this.h=!1,cn(this,o[1]||"",!0),this.o=Ot(o[2]||""),this.g=Ot(o[3]||"",!0),ln(this,o[4]),this.l=Ot(o[5]||"",!0),Nr(this,o[6]||"",!0),this.m=Ot(o[7]||"")):(this.h=!1,this.i=new Dt(null,this.h))}Xe.prototype.toString=function(){var i=[],o=this.j;o&&i.push(Nt(o,Dr,!0),":");var c=this.g;return(c||o=="file")&&(i.push("//"),(o=this.o)&&i.push(Nt(o,Dr,!0),"@"),i.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.s,c!=null&&i.push(":",String(c))),(c=this.l)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(Nt(c,c.charAt(0)=="/"?rc:ic,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",Nt(c,oc)),i.join("")};function Te(i){return new Xe(i)}function cn(i,o,c){i.j=c?Ot(o,!0):o,i.j&&(i.j=i.j.replace(/:$/,""))}function ln(i,o){if(o){if(o=Number(o),isNaN(o)||0>o)throw Error("Bad port number "+o);i.s=o}else i.s=null}function Nr(i,o,c){o instanceof Dt?(i.i=o,ac(i.i,i.h)):(c||(o=Nt(o,sc)),i.i=new Dt(o,i.h))}function U(i,o,c){i.i.set(o,c)}function un(i){return U(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function Ot(i,o){return i?o?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function Nt(i,o,c){return typeof i=="string"?(i=encodeURI(i).replace(o,nc),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function nc(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var Dr=/[#\/\?@]/g,ic=/[#\?:]/g,rc=/[#\?]/g,sc=/[#\?@]/g,oc=/#/g;function Dt(i,o){this.h=this.g=null,this.i=i||null,this.j=!!o}function xe(i){i.g||(i.g=new Map,i.h=0,i.i&&tc(i.i,function(o,c){i.add(decodeURIComponent(o.replace(/\+/g," ")),c)}))}t=Dt.prototype,t.add=function(i,o){xe(this),this.i=null,i=ht(this,i);var c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(o),this.h+=1,this};function Lr(i,o){xe(i),o=ht(i,o),i.g.has(o)&&(i.i=null,i.h-=i.g.get(o).length,i.g.delete(o))}function Mr(i,o){return xe(i),o=ht(i,o),i.g.has(o)}t.forEach=function(i,o){xe(this),this.g.forEach(function(c,u){c.forEach(function(_){i.call(o,_,u,this)},this)},this)},t.na=function(){xe(this);const i=Array.from(this.g.values()),o=Array.from(this.g.keys()),c=[];for(let u=0;u<o.length;u++){const _=i[u];for(let w=0;w<_.length;w++)c.push(o[u])}return c},t.V=function(i){xe(this);let o=[];if(typeof i=="string")Mr(this,i)&&(o=o.concat(this.g.get(ht(this,i))));else{i=Array.from(this.g.values());for(let c=0;c<i.length;c++)o=o.concat(i[c])}return o},t.set=function(i,o){return xe(this),this.i=null,i=ht(this,i),Mr(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[o]),this.h+=1,this},t.get=function(i,o){return i?(i=this.V(i),0<i.length?String(i[0]):o):o};function xr(i,o,c){Lr(i,o),0<c.length&&(i.i=null,i.g.set(ht(i,o),j(c)),i.h+=c.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],o=Array.from(this.g.keys());for(var c=0;c<o.length;c++){var u=o[c];const w=encodeURIComponent(String(u)),T=this.V(u);for(u=0;u<T.length;u++){var _=w;T[u]!==""&&(_+="="+encodeURIComponent(String(T[u]))),i.push(_)}}return this.i=i.join("&")};function ht(i,o){return o=String(o),i.j&&(o=o.toLowerCase()),o}function ac(i,o){o&&!i.j&&(xe(i),i.i=null,i.g.forEach(function(c,u){var _=u.toLowerCase();u!=_&&(Lr(this,u),xr(this,_,c))},i)),i.j=o}function cc(i,o){const c=new kt;if(h.Image){const u=new Image;u.onload=D(Ue,c,"TestLoadImage: loaded",!0,o,u),u.onerror=D(Ue,c,"TestLoadImage: error",!1,o,u),u.onabort=D(Ue,c,"TestLoadImage: abort",!1,o,u),u.ontimeout=D(Ue,c,"TestLoadImage: timeout",!1,o,u),h.setTimeout(function(){u.ontimeout&&u.ontimeout()},1e4),u.src=i}else o(!1)}function lc(i,o){const c=new kt,u=new AbortController,_=setTimeout(()=>{u.abort(),Ue(c,"TestPingServer: timeout",!1,o)},1e4);fetch(i,{signal:u.signal}).then(w=>{clearTimeout(_),w.ok?Ue(c,"TestPingServer: ok",!0,o):Ue(c,"TestPingServer: server error",!1,o)}).catch(()=>{clearTimeout(_),Ue(c,"TestPingServer: error",!1,o)})}function Ue(i,o,c,u,_){try{_&&(_.onload=null,_.onerror=null,_.onabort=null,_.ontimeout=null),u(c)}catch{}}function uc(){this.g=new Wa}function hc(i,o,c){const u=c||"";try{Pr(i,function(_,w){let T=_;E(_)&&(T=Xn(_)),o.push(u+w+"="+encodeURIComponent(T))})}catch(_){throw o.push(u+"type="+encodeURIComponent("_badmap")),_}}function hn(i){this.l=i.Ub||null,this.j=i.eb||!1}k(hn,Yn),hn.prototype.g=function(){return new dn(this.l,this.j)},hn.prototype.i=function(i){return function(){return i}}({});function dn(i,o){q.call(this),this.D=i,this.o=o,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(dn,q),t=dn.prototype,t.open=function(i,o){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=o,this.readyState=1,Mt(this)},t.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const o={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(o.body=i),(this.D||h).fetch(new Request(this.A,o)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Lt(this)),this.readyState=0},t.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Mt(this)),this.g&&(this.readyState=3,Mt(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof h.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ur(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ur(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}t.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var o=i.value?i.value:new Uint8Array(0);(o=this.v.decode(o,{stream:!i.done}))&&(this.response=this.responseText+=o)}i.done?Lt(this):Mt(this),this.readyState==3&&Ur(this)}},t.Ra=function(i){this.g&&(this.response=this.responseText=i,Lt(this))},t.Qa=function(i){this.g&&(this.response=i,Lt(this))},t.ga=function(){this.g&&Lt(this)};function Lt(i){i.readyState=4,i.l=null,i.j=null,i.v=null,Mt(i)}t.setRequestHeader=function(i,o){this.u.append(i,o)},t.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],o=this.h.entries();for(var c=o.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=o.next();return i.join(`\r
`)};function Mt(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(dn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Fr(i){let o="";return W(i,function(c,u){o+=u,o+=":",o+=c,o+=`\r
`}),o}function li(i,o,c){e:{for(u in c){var u=!1;break e}u=!0}u||(c=Fr(c),typeof i=="string"?c!=null&&encodeURIComponent(String(c)):U(i,o,c))}function B(i){q.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(B,q);var dc=/^https?$/i,fc=["POST","PUT"];t=B.prototype,t.Ha=function(i){this.J=i},t.ea=function(i,o,c,u){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);o=o?o.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ni.g(),this.v=this.o?gr(this.o):gr(ni),this.g.onreadystatechange=R(this.Ea,this);try{this.B=!0,this.g.open(o,String(i),!0),this.B=!1}catch(w){jr(this,w);return}if(i=c||"",c=new Map(this.headers),u)if(Object.getPrototypeOf(u)===Object.prototype)for(var _ in u)c.set(_,u[_]);else if(typeof u.keys=="function"&&typeof u.get=="function")for(const w of u.keys())c.set(w,u.get(w));else throw Error("Unknown input type for opt_headers: "+String(u));u=Array.from(c.keys()).find(w=>w.toLowerCase()=="content-type"),_=h.FormData&&i instanceof h.FormData,!(0<=Array.prototype.indexOf.call(fc,o,void 0))||u||_||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,T]of c)this.g.setRequestHeader(w,T);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Hr(this),this.u=!0,this.g.send(i),this.u=!1}catch(w){jr(this,w)}};function jr(i,o){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=o,i.m=5,Br(i),fn(i)}function Br(i){i.A||(i.A=!0,X(i,"complete"),X(i,"error"))}t.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,X(this,"complete"),X(this,"abort"),fn(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),fn(this,!0)),B.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Vr(this):this.bb())},t.bb=function(){Vr(this)};function Vr(i){if(i.h&&typeof l<"u"&&(!i.v[1]||be(i)!=4||i.Z()!=2)){if(i.u&&be(i)==4)hr(i.Ea,0,i);else if(X(i,"readystatechange"),be(i)==4){i.h=!1;try{const T=i.Z();e:switch(T){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var o=!0;break e;default:o=!1}var c;if(!(c=o)){var u;if(u=T===0){var _=String(i.D).match(Or)[1]||null;!_&&h.self&&h.self.location&&(_=h.self.location.protocol.slice(0,-1)),u=!dc.test(_?_.toLowerCase():"")}c=u}if(c)X(i,"complete"),X(i,"success");else{i.m=6;try{var w=2<be(i)?i.g.statusText:""}catch{w=""}i.l=w+" ["+i.Z()+"]",Br(i)}}finally{fn(i)}}}}function fn(i,o){if(i.g){Hr(i);const c=i.g,u=i.v[0]?()=>{}:null;i.g=null,i.v=null,o||X(i,"ready");try{c.onreadystatechange=u}catch{}}}function Hr(i){i.I&&(h.clearTimeout(i.I),i.I=null)}t.isActive=function(){return!!this.g};function be(i){return i.g?i.g.readyState:0}t.Z=function(){try{return 2<be(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(i){if(this.g){var o=this.g.responseText;return i&&o.indexOf(i)==0&&(o=o.substring(i.length)),$a(o)}};function $r(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function pc(i){const o={};i=(i.g&&2<=be(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let u=0;u<i.length;u++){if(G(i[u]))continue;var c=v(i[u]);const _=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const w=o[_]||[];o[_]=w,w.push(c)}y(o,function(u){return u.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function xt(i,o,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||o}function Wr(i){this.Aa=0,this.i=[],this.j=new kt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=xt("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=xt("baseRetryDelayMs",5e3,i),this.cb=xt("retryDelaySeedMs",1e4,i),this.Wa=xt("forwardChannelMaxRetries",2,i),this.wa=xt("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new Sr(i&&i.concurrentRequestLimit),this.Da=new uc,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Wr.prototype,t.la=8,t.G=1,t.connect=function(i,o,c,u){Y(0),this.W=i,this.H=o||{},c&&u!==void 0&&(this.H.OSID=c,this.H.OAID=u),this.F=this.X,this.I=Zr(this,null,this.W),gn(this)};function ui(i){if(zr(i),i.G==3){var o=i.U++,c=Te(i.I);if(U(c,"SID",i.K),U(c,"RID",o),U(c,"TYPE","terminate"),Ut(i,c),o=new Me(i,i.j,o),o.L=2,o.v=un(Te(c)),c=!1,h.navigator&&h.navigator.sendBeacon)try{c=h.navigator.sendBeacon(o.v.toString(),"")}catch{}!c&&h.Image&&(new Image().src=o.v,c=!0),c||(o.g=es(o.j,null),o.g.ea(o.v)),o.F=Date.now(),an(o)}Qr(i)}function pn(i){i.g&&(di(i),i.g.cancel(),i.g=null)}function zr(i){pn(i),i.u&&(h.clearTimeout(i.u),i.u=null),mn(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&h.clearTimeout(i.s),i.s=null)}function gn(i){if(!Ar(i.h)&&!i.s){i.s=!0;var o=i.Ga;we||bt(),Le||(we(),Le=!0),ct.add(o,i),i.B=0}}function gc(i,o){return Cr(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=o.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=Rt(R(i.Ga,i,o),Yr(i,i.B)),i.B++,!0)}t.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const _=new Me(this,this.j,i);let w=this.o;if(this.S&&(w?(w=d(w),m(w,this.S)):w=this.S),this.m!==null||this.O||(_.H=w,w=null),this.P)e:{for(var o=0,c=0;c<this.i.length;c++){t:{var u=this.i[c];if("__data__"in u.map&&(u=u.map.__data__,typeof u=="string")){u=u.length;break t}u=void 0}if(u===void 0)break;if(o+=u,4096<o){o=c;break e}if(o===4096||c===this.i.length-1){o=c+1;break e}}o=1e3}else o=1e3;o=qr(this,_,o),c=Te(this.I),U(c,"RID",i),U(c,"CVER",22),this.D&&U(c,"X-HTTP-Session-Id",this.D),Ut(this,c),w&&(this.O?o="headers="+encodeURIComponent(String(Fr(w)))+"&"+o:this.m&&li(c,this.m,w)),ci(this.h,_),this.Ua&&U(c,"TYPE","init"),this.P?(U(c,"$req",o),U(c,"SID","null"),_.T=!0,ri(_,c,null)):ri(_,c,o),this.G=2}}else this.G==3&&(i?Gr(this,i):this.i.length==0||Ar(this.h)||Gr(this))};function Gr(i,o){var c;o?c=o.l:c=i.U++;const u=Te(i.I);U(u,"SID",i.K),U(u,"RID",c),U(u,"AID",i.T),Ut(i,u),i.m&&i.o&&li(u,i.m,i.o),c=new Me(i,i.j,c,i.B+1),i.m===null&&(c.H=i.o),o&&(i.i=o.D.concat(i.i)),o=qr(i,c,1e3),c.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),ci(i.h,c),ri(c,u,o)}function Ut(i,o){i.H&&W(i.H,function(c,u){U(o,u,c)}),i.l&&Pr({},function(c,u){U(o,u,c)})}function qr(i,o,c){c=Math.min(i.i.length,c);var u=i.l?R(i.l.Na,i.l,i):null;e:{var _=i.i;let w=-1;for(;;){const T=["count="+c];w==-1?0<c?(w=_[0].g,T.push("ofs="+w)):w=0:T.push("ofs="+w);let L=!0;for(let z=0;z<c;z++){let O=_[z].g;const K=_[z].map;if(O-=w,0>O)w=Math.max(0,_[z].g-100),L=!1;else try{hc(K,T,"req"+O+"_")}catch{u&&u(K)}}if(L){u=T.join("&");break e}}}return i=i.i.splice(0,c),o.D=i,u}function Kr(i){if(!i.g&&!i.u){i.Y=1;var o=i.Fa;we||bt(),Le||(we(),Le=!0),ct.add(o,i),i.v=0}}function hi(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=Rt(R(i.Fa,i),Yr(i,i.v)),i.v++,!0)}t.Fa=function(){if(this.u=null,Jr(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=Rt(R(this.ab,this),i)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Y(10),pn(this),Jr(this))};function di(i){i.A!=null&&(h.clearTimeout(i.A),i.A=null)}function Jr(i){i.g=new Me(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var o=Te(i.qa);U(o,"RID","rpc"),U(o,"SID",i.K),U(o,"AID",i.T),U(o,"CI",i.F?"0":"1"),!i.F&&i.ja&&U(o,"TO",i.ja),U(o,"TYPE","xmlhttp"),Ut(i,o),i.m&&i.o&&li(o,i.m,i.o),i.L&&(i.g.I=i.L);var c=i.g;i=i.ia,c.L=1,c.v=un(Te(o)),c.m=null,c.P=!0,wr(c,i)}t.Za=function(){this.C!=null&&(this.C=null,pn(this),hi(this),Y(19))};function mn(i){i.C!=null&&(h.clearTimeout(i.C),i.C=null)}function Xr(i,o){var c=null;if(i.g==o){mn(i),di(i),i.g=null;var u=2}else if(ai(i.h,o))c=o.D,Rr(i.h,o),u=1;else return;if(i.G!=0){if(o.o)if(u==1){c=o.m?o.m.length:0,o=Date.now()-o.F;var _=i.B;u=ei(),X(u,new _r(u,c)),gn(i)}else Kr(i);else if(_=o.s,_==3||_==0&&0<o.X||!(u==1&&gc(i,o)||u==2&&hi(i)))switch(c&&0<c.length&&(o=i.h,o.i=o.i.concat(c)),_){case 1:Ye(i,5);break;case 4:Ye(i,10);break;case 3:Ye(i,6);break;default:Ye(i,2)}}}function Yr(i,o){let c=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(c*=2),c*o}function Ye(i,o){if(i.j.info("Error code "+o),o==2){var c=R(i.fb,i),u=i.Xa;const _=!u;u=new Xe(u||"//www.google.com/images/cleardot.gif"),h.location&&h.location.protocol=="http"||cn(u,"https"),un(u),_?cc(u.toString(),c):lc(u.toString(),c)}else Y(2);i.G=0,i.l&&i.l.sa(o),Qr(i),zr(i)}t.fb=function(i){i?(this.j.info("Successfully pinged google.com"),Y(2)):(this.j.info("Failed to ping google.com"),Y(1))};function Qr(i){if(i.G=0,i.ka=[],i.l){const o=kr(i.h);(o.length!=0||i.i.length!=0)&&(M(i.ka,o),M(i.ka,i.i),i.h.i.length=0,j(i.i),i.i.length=0),i.l.ra()}}function Zr(i,o,c){var u=c instanceof Xe?Te(c):new Xe(c);if(u.g!="")o&&(u.g=o+"."+u.g),ln(u,u.s);else{var _=h.location;u=_.protocol,o=o?o+"."+_.hostname:_.hostname,_=+_.port;var w=new Xe(null);u&&cn(w,u),o&&(w.g=o),_&&ln(w,_),c&&(w.l=c),u=w}return c=i.D,o=i.ya,c&&o&&U(u,c,o),U(u,"VER",i.la),Ut(i,u),u}function es(i,o,c){if(o&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return o=i.Ca&&!i.pa?new B(new hn({eb:c})):new B(i.pa),o.Ha(i.J),o}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function ts(){}t=ts.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function se(i,o){q.call(this),this.g=new Wr(o),this.l=i,this.h=o&&o.messageUrlParams||null,i=o&&o.messageHeaders||null,o&&o.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=o&&o.initMessageHeaders||null,o&&o.messageContentType&&(i?i["X-WebChannel-Content-Type"]=o.messageContentType:i={"X-WebChannel-Content-Type":o.messageContentType}),o&&o.va&&(i?i["X-WebChannel-Client-Profile"]=o.va:i={"X-WebChannel-Client-Profile":o.va}),this.g.S=i,(i=o&&o.Sb)&&!G(i)&&(this.g.m=i),this.v=o&&o.supportsCrossDomainXhr||!1,this.u=o&&o.sendRawJson||!1,(o=o&&o.httpSessionIdParam)&&!G(o)&&(this.g.D=o,i=this.h,i!==null&&o in i&&(i=this.h,o in i&&delete i[o])),this.j=new dt(this)}k(se,q),se.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},se.prototype.close=function(){ui(this.g)},se.prototype.o=function(i){var o=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.u&&(c={},c.__data__=Xn(i),i=c);o.i.push(new Qa(o.Ya++,i)),o.G==3&&gn(o)},se.prototype.N=function(){this.g.l=null,delete this.j,ui(this.g),delete this.g,se.aa.N.call(this)};function ns(i){Qn.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var o=i.__sm__;if(o){e:{for(const c in o){i=c;break e}i=void 0}(this.i=i)&&(i=this.i,o=o!==null&&i in o?o[i]:void 0),this.data=o}else this.data=i}k(ns,Qn);function is(){Zn.call(this),this.status=1}k(is,Zn);function dt(i){this.g=i}k(dt,ts),dt.prototype.ua=function(){X(this.g,"a")},dt.prototype.ta=function(i){X(this.g,new ns(i))},dt.prototype.sa=function(i){X(this.g,new is)},dt.prototype.ra=function(){X(this.g,"b")},se.prototype.send=se.prototype.o,se.prototype.open=se.prototype.m,se.prototype.close=se.prototype.close,ti.NO_ERROR=0,ti.TIMEOUT=8,ti.HTTP_ERROR=6,Xa.COMPLETE="complete",za.EventType=At,At.OPEN="a",At.CLOSE="b",At.ERROR="c",At.MESSAGE="d",q.prototype.listen=q.prototype.K,B.prototype.listenOnce=B.prototype.L,B.prototype.getLastError=B.prototype.Ka,B.prototype.getLastErrorCode=B.prototype.Ba,B.prototype.getStatus=B.prototype.Z,B.prototype.getResponseJson=B.prototype.Oa,B.prototype.getResponseText=B.prototype.oa,B.prototype.send=B.prototype.ea,B.prototype.setWithCredentials=B.prototype.Ha}).apply(typeof In<"u"?In:typeof self<"u"?self:typeof window<"u"?window:{});const xs="@firebase/firestore",Us="4.7.9";/**
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
 */let Zt="11.4.0";/**
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
 */const Et=new Mn("@firebase/firestore");function de(t,...e){if(Et.logLevel<=N.DEBUG){const n=e.map(Zi);Et.debug(`Firestore (${Zt}): ${t}`,...n)}}function ca(t,...e){if(Et.logLevel<=N.ERROR){const n=e.map(Zi);Et.error(`Firestore (${Zt}): ${t}`,...n)}}function vd(t,...e){if(Et.logLevel<=N.WARN){const n=e.map(Zi);Et.warn(`Firestore (${Zt}): ${t}`,...n)}}function Zi(t){if(typeof t=="string")return t;try{/**
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
 */function er(t="Unexpected state"){const e=`FIRESTORE (${Zt}) INTERNAL ASSERTION FAILED: `+t;throw ca(e),new Error(e)}function Ht(t,e){t||er()}/**
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
 */const ee={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class te extends ge{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class $t{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class la{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class yd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Q.UNAUTHENTICATED))}shutdown(){}}class _d{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class Id{constructor(e){this.t=e,this.currentUser=Q.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Ht(this.o===void 0);let r=this.i;const s=p=>this.i!==r?(r=this.i,n(p)):Promise.resolve();let a=new $t;this.o=()=>{this.i++,this.currentUser=this.u(),a.resolve(),a=new $t,e.enqueueRetryable(()=>s(this.currentUser))};const l=()=>{const p=a;e.enqueueRetryable(async()=>{await p.promise,await s(this.currentUser)})},h=p=>{de("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=p,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit(p=>h(p)),setTimeout(()=>{if(!this.auth){const p=this.t.getImmediate({optional:!0});p?h(p):(de("FirebaseAuthCredentialsProvider","Auth not yet detected"),a.resolve(),a=new $t)}},0),l()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(de("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ht(typeof r.accessToken=="string"),new la(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ht(e===null||typeof e=="string"),new Q(e)}}class Ed{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=Q.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class wd{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new Ed(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(Q.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Fs{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Td{constructor(e,n){this.A=n,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,he(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,n){Ht(this.o===void 0);const r=a=>{a.error!=null&&de("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${a.error.message}`);const l=a.token!==this.R;return this.R=a.token,de("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?n(a.token):Promise.resolve()};this.o=a=>{e.enqueueRetryable(()=>r(a))};const s=a=>{de("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=a,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(a=>s(a)),setTimeout(()=>{if(!this.appCheck){const a=this.A.getImmediate({optional:!0});a?s(a):de("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new Fs(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Ht(typeof n.token=="string"),this.R=n.token,new Fs(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function bd(t){return t.name==="IndexedDbTransactionError"}const xi="(default)";class Dn{constructor(e,n){this.projectId=e,this.database=n||xi}static empty(){return new Dn("","")}get isDefaultDatabase(){return this.database===xi}isEqual(e){return e instanceof Dn&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */var js,P;(P=js||(js={}))[P.OK=0]="OK",P[P.CANCELLED=1]="CANCELLED",P[P.UNKNOWN=2]="UNKNOWN",P[P.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",P[P.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",P[P.NOT_FOUND=5]="NOT_FOUND",P[P.ALREADY_EXISTS=6]="ALREADY_EXISTS",P[P.PERMISSION_DENIED=7]="PERMISSION_DENIED",P[P.UNAUTHENTICATED=16]="UNAUTHENTICATED",P[P.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",P[P.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",P[P.ABORTED=10]="ABORTED",P[P.OUT_OF_RANGE=11]="OUT_OF_RANGE",P[P.UNIMPLEMENTED=12]="UNIMPLEMENTED",P[P.INTERNAL=13]="INTERNAL",P[P.UNAVAILABLE=14]="UNAVAILABLE",P[P.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new aa([4294967295,4294967295],0);/**
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
 */const Sd=41943040;/**
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
 */const Ad=1048576;function Ei(){return typeof document<"u"?document:null}/**
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
 */class Cd{constructor(e,n,r=1e3,s=1.5,a=6e4){this.Ti=e,this.timerId=n,this.Go=r,this.zo=s,this.jo=a,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const n=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),s=Math.max(0,n-r);s>0&&de("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
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
 */class tr{constructor(e,n,r,s,a){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=a,this.deferred=new $t,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(l=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,a){const l=Date.now()+r,h=new tr(e,n,l,s,a);return h.start(r),h}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new te(ee.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var Bs,Vs;(Vs=Bs||(Bs={}))._a="default",Vs.Cache="cache";/**
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
 */function Rd(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const Hs=new Map;function kd(t,e,n,r){if(e===!0&&r===!0)throw new te(ee.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Pd(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":er()}function Od(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new te(ee.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Pd(t);throw new te(ee.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */const ua="firestore.googleapis.com",$s=!0;class Ws{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new te(ee.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=ua,this.ssl=$s}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:$s;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Sd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Ad)throw new te(ee.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}kd("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Rd((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(a){if(a.timeoutSeconds!==void 0){if(isNaN(a.timeoutSeconds))throw new te(ee.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (must not be NaN)`);if(a.timeoutSeconds<5)throw new te(ee.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (minimum allowed value is 5)`);if(a.timeoutSeconds>30)throw new te(ee.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ha{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ws({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new te(ee.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new te(ee.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ws(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new yd;switch(r.type){case"firstParty":return new wd(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new te(ee.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Hs.get(n);r&&(de("ComponentProvider","Removing Datastore"),Hs.delete(n),r.terminate())}(this),Promise.resolve()}}function Nd(t,e,n,r={}){var s;const a=(t=Od(t,ha))._getSettings(),l=Object.assign(Object.assign({},a),{emulatorOptions:t._getEmulatorOptions()}),h=`${e}:${n}`;a.host!==ua&&a.host!==h&&vd("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const p=Object.assign(Object.assign({},a),{host:h,ssl:!1,emulatorOptions:r});if(!nt(p,l)&&(t._setSettings(p),r.mockUserToken)){let E,b;if(typeof r.mockUserToken=="string")E=r.mockUserToken,b=Q.MOCK_USER;else{E=Dc(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const S=r.mockUserToken.sub||r.mockUserToken.user_id;if(!S)throw new te(ee.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");b=new Q(S)}t._authCredentials=new _d(new la(E,b))}}/**
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
 */const zs="AsyncQueue";class Gs{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new Cd(this,"async_queue_retry"),this.bu=()=>{const r=Ei();r&&de(zs,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.Su=e;const n=Ei();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.bu)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const n=Ei();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.bu)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const n=new $t;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!bd(e))throw e;de(zs,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const n=this.Su.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const s=function(l){let h=l.message||"";return l.stack&&(h=l.stack.includes(l.message)?l.stack:l.message+`
`+l.stack),h}(r);throw ca("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.pu=!1,r))));return this.Su=n,n}enqueueAfterDelay(e,n,r){this.Du(),this.wu.indexOf(e)>-1&&(n=0);const s=tr.createAndSchedule(this,e,n,r,a=>this.Fu(a));return this.fu.push(s),s}Du(){this.gu&&er()}verifyOperationInProgress(){}async Mu(){let e;do e=this.Su,await e;while(e!==this.Su)}xu(e){for(const n of this.fu)if(n.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.fu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const n=this.fu.indexOf(e);this.fu.splice(n,1)}}class Dd extends ha{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new Gs,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Gs(e),this._firestoreClient=void 0,await e}}}function Ld(t,e){const n=typeof t=="object"?t:bo(),r=typeof t=="string"?t:xi,s=Jt(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const a=Oc("firestore");a&&Nd(s,...a)}return s}(function(e,n=!0){(function(s){Zt=s})(wt),Ie(new fe("firestore",(r,{instanceIdentifier:s,options:a})=>{const l=r.getProvider("app").getImmediate(),h=new Dd(new Id(r.getProvider("auth-internal")),new Td(l,r.getProvider("app-check-internal")),function(E,b){if(!Object.prototype.hasOwnProperty.apply(E.options,["projectId"]))throw new te(ee.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Dn(E.options.projectId,b)}(l,s),l);return a=Object.assign({useFetchStreams:n},a),h._setSettings(a),h},"PUBLIC").setMultipleInstances(!0)),oe(xs,Us,e),oe(xs,Us,"esm2017")})();var Md="firebase",xd="11.4.0";/**
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
 */oe(Md,xd,"app");const da="@firebase/installations",nr="0.6.13";/**
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
 */const fa=1e4,pa=`w:${nr}`,ga="FIS_v2",Ud="https://firebaseinstallations.googleapis.com/v1",Fd=60*60*1e3,jd="installations",Bd="Installations";/**
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
 */const Vd={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},rt=new ot(jd,Bd,Vd);function ma(t){return t instanceof ge&&t.code.includes("request-failed")}/**
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
 */function va({projectId:t}){return`${Ud}/projects/${t}/installations`}function ya(t){return{token:t.token,requestStatus:2,expiresIn:$d(t.expiresIn),creationTime:Date.now()}}async function _a(t,e){const r=(await e.json()).error;return rt.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Ia({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function Hd(t,{refreshToken:e}){const n=Ia(t);return n.append("Authorization",Wd(e)),n}async function Ea(t){const e=await t();return e.status>=500&&e.status<600?t():e}function $d(t){return Number(t.replace("s","000"))}function Wd(t){return`${ga} ${t}`}/**
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
 */async function zd({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=va(t),s=Ia(t),a=e.getImmediate({optional:!0});if(a){const E=await a.getHeartbeatsHeader();E&&s.append("x-firebase-client",E)}const l={fid:n,authVersion:ga,appId:t.appId,sdkVersion:pa},h={method:"POST",headers:s,body:JSON.stringify(l)},p=await Ea(()=>fetch(r,h));if(p.ok){const E=await p.json();return{fid:E.fid||n,registrationStatus:2,refreshToken:E.refreshToken,authToken:ya(E.authToken)}}else throw await _a("Create Installation",p)}/**
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
 */function wa(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function Gd(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const qd=/^[cdef][\w-]{21}$/,Ui="";function Kd(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=Jd(t);return qd.test(n)?n:Ui}catch{return Ui}}function Jd(t){return Gd(t).substr(0,22)}/**
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
 */function Bn(t){return`${t.appName}!${t.appId}`}/**
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
 */const Ta=new Map;function ba(t,e){const n=Bn(t);Sa(n,e),Xd(n,e)}function Sa(t,e){const n=Ta.get(t);if(n)for(const r of n)r(e)}function Xd(t,e){const n=Yd();n&&n.postMessage({key:t,fid:e}),Qd()}let tt=null;function Yd(){return!tt&&"BroadcastChannel"in self&&(tt=new BroadcastChannel("[Firebase] FID Change"),tt.onmessage=t=>{Sa(t.data.key,t.data.fid)}),tt}function Qd(){Ta.size===0&&tt&&(tt.close(),tt=null)}/**
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
 */const Zd="firebase-installations-database",ef=1,st="firebase-installations-store";let wi=null;function ir(){return wi||(wi=wo(Zd,ef,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(st)}}})),wi}async function Ln(t,e){const n=Bn(t),s=(await ir()).transaction(st,"readwrite"),a=s.objectStore(st),l=await a.get(n);return await a.put(e,n),await s.done,(!l||l.fid!==e.fid)&&ba(t,e.fid),e}async function Aa(t){const e=Bn(t),r=(await ir()).transaction(st,"readwrite");await r.objectStore(st).delete(e),await r.done}async function Vn(t,e){const n=Bn(t),s=(await ir()).transaction(st,"readwrite"),a=s.objectStore(st),l=await a.get(n),h=e(l);return h===void 0?await a.delete(n):await a.put(h,n),await s.done,h&&(!l||l.fid!==h.fid)&&ba(t,h.fid),h}/**
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
 */async function rr(t){let e;const n=await Vn(t.appConfig,r=>{const s=tf(r),a=nf(t,s);return e=a.registrationPromise,a.installationEntry});return n.fid===Ui?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function tf(t){const e=t||{fid:Kd(),registrationStatus:0};return Ca(e)}function nf(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(rt.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=rf(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:sf(t)}:{installationEntry:e}}async function rf(t,e){try{const n=await zd(t,e);return Ln(t.appConfig,n)}catch(n){throw ma(n)&&n.customData.serverCode===409?await Aa(t.appConfig):await Ln(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function sf(t){let e=await qs(t.appConfig);for(;e.registrationStatus===1;)await wa(100),e=await qs(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await rr(t);return r||n}return e}function qs(t){return Vn(t,e=>{if(!e)throw rt.create("installation-not-found");return Ca(e)})}function Ca(t){return of(t)?{fid:t.fid,registrationStatus:0}:t}function of(t){return t.registrationStatus===1&&t.registrationTime+fa<Date.now()}/**
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
 */async function af({appConfig:t,heartbeatServiceProvider:e},n){const r=cf(t,n),s=Hd(t,n),a=e.getImmediate({optional:!0});if(a){const E=await a.getHeartbeatsHeader();E&&s.append("x-firebase-client",E)}const l={installation:{sdkVersion:pa,appId:t.appId}},h={method:"POST",headers:s,body:JSON.stringify(l)},p=await Ea(()=>fetch(r,h));if(p.ok){const E=await p.json();return ya(E)}else throw await _a("Generate Auth Token",p)}function cf(t,{fid:e}){return`${va(t)}/${e}/authTokens:generate`}/**
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
 */async function sr(t,e=!1){let n;const r=await Vn(t.appConfig,a=>{if(!Ra(a))throw rt.create("not-registered");const l=a.authToken;if(!e&&hf(l))return a;if(l.requestStatus===1)return n=lf(t,e),a;{if(!navigator.onLine)throw rt.create("app-offline");const h=ff(a);return n=uf(t,h),h}});return n?await n:r.authToken}async function lf(t,e){let n=await Ks(t.appConfig);for(;n.authToken.requestStatus===1;)await wa(100),n=await Ks(t.appConfig);const r=n.authToken;return r.requestStatus===0?sr(t,e):r}function Ks(t){return Vn(t,e=>{if(!Ra(e))throw rt.create("not-registered");const n=e.authToken;return pf(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function uf(t,e){try{const n=await af(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await Ln(t.appConfig,r),n}catch(n){if(ma(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Aa(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Ln(t.appConfig,r)}throw n}}function Ra(t){return t!==void 0&&t.registrationStatus===2}function hf(t){return t.requestStatus===2&&!df(t)}function df(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Fd}function ff(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function pf(t){return t.requestStatus===1&&t.requestTime+fa<Date.now()}/**
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
 */async function gf(t){const e=t,{installationEntry:n,registrationPromise:r}=await rr(e);return r?r.catch(console.error):sr(e).catch(console.error),n.fid}/**
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
 */async function mf(t,e=!1){const n=t;return await vf(n),(await sr(n,e)).token}async function vf(t){const{registrationPromise:e}=await rr(t);e&&await e}/**
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
 */function yf(t){if(!t||!t.options)throw Ti("App Configuration");if(!t.name)throw Ti("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Ti(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Ti(t){return rt.create("missing-app-config-values",{valueName:t})}/**
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
 */const ka="installations",_f="installations-internal",If=t=>{const e=t.getProvider("app").getImmediate(),n=yf(e),r=Jt(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Ef=t=>{const e=t.getProvider("app").getImmediate(),n=Jt(e,ka).getImmediate();return{getId:()=>gf(n),getToken:s=>mf(n,s)}};function wf(){Ie(new fe(ka,If,"PUBLIC")),Ie(new fe(_f,Ef,"PRIVATE"))}wf();oe(da,nr);oe(da,nr,"esm2017");/**
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
 */const Js="analytics",Tf="firebase_id",bf="origin",Sf=60*1e3,Af="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",or="https://www.googletagmanager.com/gtag/js";/**
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
 */const ne=new Mn("@firebase/analytics");/**
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
 */const Cf={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},ae=new ot("analytics","Analytics",Cf);/**
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
 */function Rf(t){if(!t.startsWith(or)){const e=ae.create("invalid-gtag-resource",{gtagURL:t});return ne.warn(e.message),""}return t}function Pa(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function kf(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function Pf(t,e){const n=kf("firebase-js-sdk-policy",{createScriptURL:Rf}),r=document.createElement("script"),s=`${or}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function Of(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function Nf(t,e,n,r,s,a){const l=r[s];try{if(l)await e[l];else{const p=(await Pa(n)).find(E=>E.measurementId===s);p&&await e[p.appId]}}catch(h){ne.error(h)}t("config",s,a)}async function Df(t,e,n,r,s){try{let a=[];if(s&&s.send_to){let l=s.send_to;Array.isArray(l)||(l=[l]);const h=await Pa(n);for(const p of l){const E=h.find(S=>S.measurementId===p),b=E&&e[E.appId];if(b)a.push(b);else{a=[];break}}}a.length===0&&(a=Object.values(e)),await Promise.all(a),t("event",r,s||{})}catch(a){ne.error(a)}}function Lf(t,e,n,r){async function s(a,...l){try{if(a==="event"){const[h,p]=l;await Df(t,e,n,h,p)}else if(a==="config"){const[h,p]=l;await Nf(t,e,n,r,h,p)}else if(a==="consent"){const[h,p]=l;t("consent",h,p)}else if(a==="get"){const[h,p,E]=l;t("get",h,p,E)}else if(a==="set"){const[h]=l;t("set",h)}else t(a,...l)}catch(h){ne.error(h)}}return s}function Mf(t,e,n,r,s){let a=function(...l){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(a=window[s]),window[s]=Lf(a,t,e,n),{gtagCore:a,wrappedGtag:window[s]}}function xf(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(or)&&n.src.includes(t))return n;return null}/**
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
 */const Uf=30,Ff=1e3;class jf{constructor(e={},n=Ff){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Oa=new jf;function Bf(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function Vf(t){var e;const{appId:n,apiKey:r}=t,s={method:"GET",headers:Bf(r)},a=Af.replace("{app-id}",n),l=await fetch(a,s);if(l.status!==200&&l.status!==304){let h="";try{const p=await l.json();!((e=p.error)===null||e===void 0)&&e.message&&(h=p.error.message)}catch{}throw ae.create("config-fetch-failed",{httpStatus:l.status,responseMessage:h})}return l.json()}async function Hf(t,e=Oa,n){const{appId:r,apiKey:s,measurementId:a}=t.options;if(!r)throw ae.create("no-app-id");if(!s){if(a)return{measurementId:a,appId:r};throw ae.create("no-api-key")}const l=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},h=new zf;return setTimeout(async()=>{h.abort()},Sf),Na({appId:r,apiKey:s,measurementId:a},l,h,e)}async function Na(t,{throttleEndTimeMillis:e,backoffCount:n},r,s=Oa){var a;const{appId:l,measurementId:h}=t;try{await $f(r,e)}catch(p){if(h)return ne.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${h} provided in the "measurementId" field in the local Firebase config. [${p==null?void 0:p.message}]`),{appId:l,measurementId:h};throw p}try{const p=await Vf(t);return s.deleteThrottleMetadata(l),p}catch(p){const E=p;if(!Wf(E)){if(s.deleteThrottleMetadata(l),h)return ne.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${h} provided in the "measurementId" field in the local Firebase config. [${E==null?void 0:E.message}]`),{appId:l,measurementId:h};throw p}const b=Number((a=E==null?void 0:E.customData)===null||a===void 0?void 0:a.httpStatus)===503?as(n,s.intervalMillis,Uf):as(n,s.intervalMillis),S={throttleEndTimeMillis:Date.now()+b,backoffCount:n+1};return s.setThrottleMetadata(l,S),ne.debug(`Calling attemptFetch again in ${b} millis`),Na(t,S,r,s)}}function $f(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),a=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(a),r(ae.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Wf(t){if(!(t instanceof ge)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class zf{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function Gf(t,e,n,r,s){if(s&&s.global){t("event",n,r);return}else{const a=await e,l=Object.assign(Object.assign({},r),{send_to:a});t("event",n,l)}}/**
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
 */async function qf(){if(yo())try{await _o()}catch(t){return ne.warn(ae.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return ne.warn(ae.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Kf(t,e,n,r,s,a,l){var h;const p=Hf(t);p.then(D=>{n[D.measurementId]=D.appId,t.options.measurementId&&D.measurementId!==t.options.measurementId&&ne.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${D.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(D=>ne.error(D)),e.push(p);const E=qf().then(D=>{if(D)return r.getId()}),[b,S]=await Promise.all([p,E]);xf(a)||Pf(a,b.measurementId),s("js",new Date);const R=(h=l==null?void 0:l.config)!==null&&h!==void 0?h:{};return R[bf]="firebase",R.update=!0,S!=null&&(R[Tf]=S),s("config",b.measurementId,R),b.measurementId}/**
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
 */class Jf{constructor(e){this.app=e}_delete(){return delete Wt[this.app.options.appId],Promise.resolve()}}let Wt={},Xs=[];const Ys={};let bi="dataLayer",Xf="gtag",Qs,Da,Zs=!1;function Yf(){const t=[];if(vo()&&t.push("This is a browser extension environment."),Fc()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,s)=>`(${s+1}) ${r}`).join(" "),n=ae.create("invalid-analytics-context",{errorInfo:e});ne.warn(n.message)}}function Qf(t,e,n){Yf();const r=t.options.appId;if(!r)throw ae.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)ne.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw ae.create("no-api-key");if(Wt[r]!=null)throw ae.create("already-exists",{id:r});if(!Zs){Of(bi);const{wrappedGtag:a,gtagCore:l}=Mf(Wt,Xs,Ys,bi,Xf);Da=a,Qs=l,Zs=!0}return Wt[r]=Kf(t,Xs,Ys,e,Qs,bi,n),new Jf(t)}function Zf(t,e,n,r){t=Ee(t),Gf(Da,Wt[t.app.options.appId],e,n,r).catch(s=>ne.error(s))}const eo="@firebase/analytics",to="0.10.12";function ep(){Ie(new fe(Js,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return Qf(r,s,n)},"PUBLIC")),Ie(new fe("analytics-internal",t,"PRIVATE")),oe(eo,to),oe(eo,to,"esm2017");function t(e){try{const n=e.getProvider(Js).getImmediate();return{logEvent:(r,s,a)=>Zf(n,r,s,a)}}catch(n){throw ae.create("interop-component-reg-failed",{reason:n})}}}ep();const tp={apiKey:"AIzaSyDTRCTWxRCq0xqPeFrom0mC5nuur3Zxy04",authDomain:"wushu-toolkit.firebaseapp.com",projectId:"wushu-toolkit",storageBucket:"wushu-toolkit.firebasestorage.app",messagingSenderId:"577649891937",appId:"1:577649891937:web:55e582b4215440741aa820",measurementId:"G-B4YVBN76JQ"},La=To(tp),Ma=gd(La);Ld(La);async function sp(t,e){const r=(await th(Ma,t,e)).user;console.log(r);const s=crypto.randomUUID();localStorage.setItem("sessionToken",s)}async function op(){localStorage.removeItem("sessionToken"),await rh(Ma)}export{Sn as C,ro as T,Ic as _,ji as a,oo as b,co as c,lo as d,ao as e,Ma as f,Fi as g,sp as h,Ec as i,_c as j,op as l,rp as o,ip as s,no as u};
