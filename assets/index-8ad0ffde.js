(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const p={context:void 0,registry:void 0};function Y(e){p.context=e}const Qe=(e,t)=>e===t,re=Symbol("solid-proxy"),se={equals:Qe};let Te=Ve;const T=1,oe=2,$e={owned:null,cleanups:null,context:null,owner:null},he={};var y=null;let ge=null,w=null,x=null,R=null,ce=0;function je(e,t){const n=w,r=y,s=e.length===0,o=t===void 0?r:t,i=s?$e:{owned:null,cleanups:null,context:o?o.context:null,owner:o},l=s?e:()=>e(()=>S(()=>ae(i)));y=i,w=null;try{return N(l,!0)}finally{w=n,y=r}}function O(e,t){t=t?Object.assign({},se,t):se;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.value)),Ue(n,s));return[Be.bind(n),r]}function Ce(e,t,n){const r=ue(e,t,!0,T);X(r)}function D(e,t,n){const r=ue(e,t,!1,T);X(r)}function Ze(e,t,n){Te=lt;const r=ue(e,t,!1,T);(!n||!n.render)&&(r.user=!0),R?R.push(r):X(r)}function E(e,t,n){n=n?Object.assign({},se,n):se;const r=ue(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,X(r),Be.bind(r)}function et(e,t,n){let r,s,o;arguments.length===2&&typeof t=="object"||arguments.length===1?(r=!0,s=e,o=t||{}):(r=e,s=t,o=n||{});let i=null,l=he,c=null,a=!1,u="initialValue"in o,f=typeof r=="function"&&E(r);const d=new Set,[A,P]=(o.storage||O)(o.initialValue),[b,_]=O(void 0),[$,K]=O(void 0,{equals:!1}),[B,j]=O(u?"ready":"unresolved");if(p.context){c=`${p.context.id}${p.context.count++}`;let h;o.ssrLoadFrom==="initial"?l=o.initialValue:p.load&&(h=p.load(c))&&(l=h[0])}function C(h,g,m,L){return i===h&&(i=null,L!==void 0&&(u=!0),(h===l||g===l)&&o.onHydrated&&queueMicrotask(()=>o.onHydrated(L,{value:g})),l=he,Z(g,m)),g}function Z(h,g){N(()=>{g===void 0&&P(()=>h),j(g!==void 0?"errored":u?"ready":"unresolved"),_(g);for(const m of d.keys())m.decrement();d.clear()},!1)}function F(){const h=st,g=A(),m=b();if(m!==void 0&&!i)throw m;return w&&!w.user&&h&&Ce(()=>{$(),i&&(h.resolved||d.has(h)||(h.increment(),d.add(h)))}),g}function z(h=!0){if(h!==!1&&a)return;a=!1;const g=f?f():r;if(g==null||g===!1){C(i,S(A));return}const m=l!==he?l:S(()=>s(g,{value:A(),refetching:h}));return typeof m!="object"||!(m&&"then"in m)?(C(i,m,void 0,g),m):(i=m,a=!0,queueMicrotask(()=>a=!1),N(()=>{j(u?"refreshing":"pending"),K()},!1),m.then(L=>C(m,L,void 0,g),L=>C(m,void 0,qe(L),g)))}return Object.defineProperties(F,{state:{get:()=>B()},error:{get:()=>b()},loading:{get(){const h=B();return h==="pending"||h==="refreshing"}},latest:{get(){if(!u)return F();const h=b();if(h&&!i)throw h;return A()}}}),f?Ce(()=>z(!1)):z(!1),[F,{refetch:z,mutate:P}]}function S(e){if(w===null)return e();const t=w;w=null;try{return e()}finally{w=t}}function Ie(e,t,n){const r=Array.isArray(e);let s,o=n&&n.defer;return i=>{let l;if(r){l=Array(e.length);for(let a=0;a<e.length;a++)l[a]=e[a]()}else l=e();if(o){o=!1;return}const c=S(()=>t(l,s,i));return s=l,c}}function An(e){Ze(()=>S(e))}function ke(e){return y===null||(y.cleanups===null?y.cleanups=[e]:y.cleanups.push(e)),e}function tt(){return y}function nt(e,t){const n=y,r=w;y=e,w=null;try{return N(t,!0)}catch(s){xe(s)}finally{y=n,w=r}}function rt(e){const t=w,n=y;return Promise.resolve().then(()=>{w=t,y=n;let r;return N(e,!1),w=y=null,r?r.done:void 0})}function De(e,t){const n=Symbol("context");return{id:n,Provider:ct(n),defaultValue:e}}function Ee(e){return y&&y.context&&y.context[e.id]!==void 0?y.context[e.id]:e.defaultValue}function ve(e){const t=E(e),n=E(()=>pe(t()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}let st;function Be(){if(this.sources&&this.state)if(this.state===T)X(this);else{const e=x;x=null,N(()=>le(this),!1),x=e}if(w){const e=this.observers?this.observers.length:0;w.sources?(w.sources.push(this),w.sourceSlots.push(e)):(w.sources=[this],w.sourceSlots=[e]),this.observers?(this.observers.push(w),this.observerSlots.push(w.sources.length-1)):(this.observers=[w],this.observerSlots=[w.sources.length-1])}return this.value}function Ue(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&N(()=>{for(let s=0;s<e.observers.length;s+=1){const o=e.observers[s],i=ge&&ge.running;i&&ge.disposed.has(o),(i?!o.tState:!o.state)&&(o.pure?x.push(o):R.push(o),o.observers&&Me(o)),i||(o.state=T)}if(x.length>1e6)throw x=[],new Error},!1)),t}function X(e){if(!e.fn)return;ae(e);const t=y,n=w,r=ce;w=y=e,ot(e,e.value,r),w=n,y=t}function ot(e,t,n){let r;try{r=e.fn(t)}catch(s){return e.pure&&(e.state=T,e.owned&&e.owned.forEach(ae),e.owned=null),e.updatedAt=n+1,xe(s)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Ue(e,r):e.value=r,e.updatedAt=n)}function ue(e,t,n,r=T,s){const o={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:y,context:y?y.context:null,pure:n};return y===null||y!==$e&&(y.owned?y.owned.push(o):y.owned=[o]),o}function ie(e){if(e.state===0)return;if(e.state===oe)return le(e);if(e.suspense&&S(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ce);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===T)X(e);else if(e.state===oe){const r=x;x=null,N(()=>le(e,t[0]),!1),x=r}}function N(e,t){if(x)return e();let n=!1;t||(x=[]),R?n=!0:R=[],ce++;try{const r=e();return it(n),r}catch(r){n||(R=null),x=null,xe(r)}}function it(e){if(x&&(Ve(x),x=null),e)return;const t=R;R=null,t.length&&N(()=>Te(t),!1)}function Ve(e){for(let t=0;t<e.length;t++)ie(e[t])}function lt(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:ie(r)}if(p.context){if(p.count){p.effects||(p.effects=[]),p.effects.push(...e.slice(0,n));return}else p.effects&&(e=[...p.effects,...e],n+=p.effects.length,delete p.effects);Y()}for(t=0;t<n;t++)ie(e[t])}function le(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const s=r.state;s===T?r!==t&&(!r.updatedAt||r.updatedAt<ce)&&ie(r):s===oe&&le(r,t)}}}function Me(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=oe,n.pure?x.push(n):R.push(n),n.observers&&Me(n))}}function ae(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const o=s.pop(),i=n.observerSlots.pop();r<s.length&&(o.sourceSlots[i]=r,s[r]=o,n.observerSlots[r]=i)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)ae(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function qe(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function xe(e,t=y){throw qe(e)}function pe(e){if(typeof e=="function"&&!e.length)return pe(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=pe(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function ct(e,t){return function(r){let s;return D(()=>s=S(()=>(y.context={...y.context,[e]:r.value},ve(()=>r.children))),void 0),s}}function v(e,t){return S(()=>e(t||{}))}function te(){return!0}const we={get(e,t,n){return t===re?n:e.get(t)},has(e,t){return t===re?!0:e.has(t)},set:te,deleteProperty:te,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:te,deleteProperty:te}},ownKeys(e){return e.keys()}};function me(e){return(e=typeof e=="function"?e():e)?e:{}}function ut(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function be(...e){let t=!1;for(let o=0;o<e.length;o++){const i=e[o];t=t||!!i&&re in i,e[o]=typeof i=="function"?(t=!0,E(i)):i}if(t)return new Proxy({get(o){for(let i=e.length-1;i>=0;i--){const l=me(e[i])[o];if(l!==void 0)return l}},has(o){for(let i=e.length-1;i>=0;i--)if(o in me(e[i]))return!0;return!1},keys(){const o=[];for(let i=0;i<e.length;i++)o.push(...Object.keys(me(e[i])));return[...new Set(o)]}},we);const n={},r={},s=new Set;for(let o=e.length-1;o>=0;o--){const i=e[o];if(!i)continue;const l=Object.getOwnPropertyNames(i);for(let c=0,a=l.length;c<a;c++){const u=l[c];if(u==="__proto__"||u==="constructor")continue;const f=Object.getOwnPropertyDescriptor(i,u);if(!s.has(u))f.get?(s.add(u),Object.defineProperty(n,u,{enumerable:!0,configurable:!0,get:ut.bind(r[u]=[f.get.bind(i)])})):(f.value!==void 0&&s.add(u),n[u]=f.value);else{const d=r[u];d?f.get?d.push(f.get.bind(i)):f.value!==void 0&&d.push(()=>f.value):n[u]===void 0&&(n[u]=f.value)}}}return n}function at(e,...t){if(re in e){const s=new Set(t.length>1?t.flat():t[0]),o=t.map(i=>new Proxy({get(l){return i.includes(l)?e[l]:void 0},has(l){return i.includes(l)&&l in e},keys(){return i.filter(l=>l in e)}},we));return o.push(new Proxy({get(i){return s.has(i)?void 0:e[i]},has(i){return s.has(i)?!1:i in e},keys(){return Object.keys(e).filter(i=>!s.has(i))}},we)),o}const n={},r=t.map(()=>({}));for(const s of Object.getOwnPropertyNames(e)){const o=Object.getOwnPropertyDescriptor(e,s),i=!o.get&&!o.set&&o.enumerable&&o.writable&&o.configurable;let l=!1,c=0;for(const a of t)a.includes(s)&&(l=!0,i?r[c][s]=o.value:Object.defineProperty(r[c],s,o)),++c;l||(i?n[s]=o.value:Object.defineProperty(n,s,o))}return[...r,n]}function M(e){let t,n;const r=s=>{const o=p.context;if(o){const[l,c]=O();p.count||(p.count=0),p.count++,(n||(n=e())).then(a=>{Y(o),p.count--,c(()=>a.default),Y()}),t=l}else if(!t){const[l]=et(()=>(n||(n=e())).then(c=>c.default));t=l}let i;return E(()=>(i=t())&&S(()=>{if(!o)return i(s);const l=p.context;Y(o);const c=i(s);return Y(l),c}))};return r.preload=()=>n||((n=e()).then(s=>t=()=>s.default),n),r}const ft=e=>`Stale read from <${e}>.`;function Ke(e){const t=e.keyed,n=E(()=>e.when,void 0,{equals:(r,s)=>t?r===s:!r==!s});return E(()=>{const r=n();if(r){const s=e.children;return typeof s=="function"&&s.length>0?S(()=>s(t?r:()=>{if(!S(n))throw ft("Show");return e.when})):s}return e.fallback},void 0,void 0)}const dt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],ht=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...dt]),gt=new Set(["innerHTML","textContent","innerText","children"]),mt=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),yt=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function pt(e,t){const n=yt[e];return typeof n=="object"?n[t]?n.$:void 0:n}const wt=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),bt={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function At(e,t,n){let r=n.length,s=t.length,o=r,i=0,l=0,c=t[s-1].nextSibling,a=null;for(;i<s||l<o;){if(t[i]===n[l]){i++,l++;continue}for(;t[s-1]===n[o-1];)s--,o--;if(s===i){const u=o<r?l?n[l-1].nextSibling:n[o-l]:c;for(;l<o;)e.insertBefore(n[l++],u)}else if(o===l)for(;i<s;)(!a||!a.has(t[i]))&&t[i].remove(),i++;else if(t[i]===n[o-1]&&n[l]===t[s-1]){const u=t[--s].nextSibling;e.insertBefore(n[l++],t[i++].nextSibling),e.insertBefore(n[--o],u),t[s]=n[o]}else{if(!a){a=new Map;let f=l;for(;f<o;)a.set(n[f],f++)}const u=a.get(t[i]);if(u!=null)if(l<u&&u<o){let f=i,d=1,A;for(;++f<s&&f<o&&!((A=a.get(t[f]))==null||A!==u+d);)d++;if(d>u-l){const P=t[i];for(;l<u;)e.insertBefore(n[l++],P)}else e.replaceChild(n[l++],t[i++])}else i++;else t[i++].remove()}}}const Le="_$DX_DELEGATE";function Pt(e,t,n,r={}){let s;return je(o=>{s=o,t===document?e():_t(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{s(),t.textContent=""}}function Et(e,t,n){let r;const s=()=>{const i=document.createElement("template");return i.innerHTML=e,n?i.content.firstChild.firstChild:i.content.firstChild},o=t?()=>S(()=>document.importNode(r||(r=s()),!0)):()=>(r||(r=s())).cloneNode(!0);return o.cloneNode=o,o}function Fe(e,t=window.document){const n=t[Le]||(t[Le]=new Set);for(let r=0,s=e.length;r<s;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,Tt))}}function Ae(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function vt(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function xt(e,t){t==null?e.removeAttribute("class"):e.className=t}function St(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const s=n[0];e.addEventListener(t,n[0]=o=>s.call(e,n[1],o))}else e.addEventListener(t,n)}function Ct(e,t,n={}){const r=Object.keys(t||{}),s=Object.keys(n);let o,i;for(o=0,i=s.length;o<i;o++){const l=s[o];!l||l==="undefined"||t[l]||(Oe(e,l,!1),delete n[l])}for(o=0,i=r.length;o<i;o++){const l=r[o],c=!!t[l];!l||l==="undefined"||n[l]===c||!c||(Oe(e,l,!0),n[l]=c)}return n}function Lt(e,t,n){if(!t)return n?Ae(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),t||(t={});let s,o;for(o in n)t[o]==null&&r.removeProperty(o),delete n[o];for(o in t)s=t[o],s!==n[o]&&(r.setProperty(o,s),n[o]=s);return n}function Ot(e,t={},n,r){const s={};return r||D(()=>s.children=W(e,t.children,s.children)),D(()=>t.ref&&t.ref(e)),D(()=>Rt(e,t,n,!0,s,!0)),s}function _t(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return W(e,t,r,n);D(s=>W(e,t(),s,n),r)}function Rt(e,t,n,r,s={},o=!1){t||(t={});for(const i in s)if(!(i in t)){if(i==="children")continue;s[i]=_e(e,i,null,s[i],n,o)}for(const i in t){if(i==="children"){r||W(e,t.children);continue}const l=t[i];s[i]=_e(e,i,l,s[i],n,o)}}function Nt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function Oe(e,t,n){const r=t.trim().split(/\s+/);for(let s=0,o=r.length;s<o;s++)e.classList.toggle(r[s],n)}function _e(e,t,n,r,s,o){let i,l,c,a,u;if(t==="style")return Lt(e,n,r);if(t==="classList")return Ct(e,n,r);if(n===r)return r;if(t==="ref")o||n(e);else if(t.slice(0,3)==="on:"){const f=t.slice(3);r&&e.removeEventListener(f,r),n&&e.addEventListener(f,n)}else if(t.slice(0,10)==="oncapture:"){const f=t.slice(10);r&&e.removeEventListener(f,r,!0),n&&e.addEventListener(f,n,!0)}else if(t.slice(0,2)==="on"){const f=t.slice(2).toLowerCase(),d=wt.has(f);if(!d&&r){const A=Array.isArray(r)?r[0]:r;e.removeEventListener(f,A)}(d||n)&&(St(e,f,n,d),d&&Fe([f]))}else if(t.slice(0,5)==="attr:")Ae(e,t.slice(5),n);else if((u=t.slice(0,5)==="prop:")||(c=gt.has(t))||!s&&((a=pt(t,e.tagName))||(l=ht.has(t)))||(i=e.nodeName.includes("-")))u&&(t=t.slice(5),l=!0),t==="class"||t==="className"?xt(e,n):i&&!l&&!c?e[Nt(t)]=n:e[a||t]=n;else{const f=s&&t.indexOf(":")>-1&&bt[t.split(":")[0]];f?vt(e,f,t,n):Ae(e,mt[t]||t,n)}return n}function Tt(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),p.registry&&!p.done&&(p.done=_$HY.done=!0);n;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r.call(n,s,e):r.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function W(e,t,n,r,s){if(p.context){!n&&(n=[...e.childNodes]);let l=[];for(let c=0;c<n.length;c++){const a=n[c];a.nodeType===8&&a.data.slice(0,2)==="!$"?a.remove():l.push(a)}n=l}for(;typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,i=r!==void 0;if(e=i&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if(p.context)return n;if(o==="number"&&(t=t.toString()),i){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=H(e,n,r,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean"){if(p.context)return n;n=H(e,n,r)}else{if(o==="function")return D(()=>{let l=t();for(;typeof l=="function";)l=l();n=W(e,l,n,r)}),()=>n;if(Array.isArray(t)){const l=[],c=n&&Array.isArray(n);if(Pe(l,t,n,s))return D(()=>n=W(e,l,n,r,!0)),()=>n;if(p.context){if(!l.length)return n;for(let a=0;a<l.length;a++)if(l[a].parentNode)return n=l}if(l.length===0){if(n=H(e,n,r),i)return n}else c?n.length===0?Re(e,l,r):At(e,n,l):(n&&H(e),Re(e,l));n=l}else if(t.nodeType){if(p.context&&t.parentNode)return n=i?[t]:t;if(Array.isArray(n)){if(i)return n=H(e,n,r,t);H(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function Pe(e,t,n,r){let s=!1;for(let o=0,i=t.length;o<i;o++){let l=t[o],c=n&&n[o],a;if(!(l==null||l===!0||l===!1))if((a=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))s=Pe(e,l,c)||s;else if(a==="function")if(r){for(;typeof l=="function";)l=l();s=Pe(e,Array.isArray(l)?l:[l],Array.isArray(c)?c:[c])||s}else e.push(l),s=!0;else{const u=String(l);c&&c.nodeType===3&&c.data===u?e.push(c):e.push(document.createTextNode(u))}}return s}function Re(e,t,n=null){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function H(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let o=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(s!==l){const c=l.parentNode===e;!o&&!i?c?e.replaceChild(s,l):e.insertBefore(s,n):c&&l.remove()}else o=!0}}else e.insertBefore(s,n);return[s]}const $t=!1;const jt="modulepreload",It=function(e){return"/"+e},Ne={},q=function(t,n,r){if(!n||n.length===0)return t();const s=document.getElementsByTagName("link");return Promise.all(n.map(o=>{if(o=It(o),o in Ne)return;Ne[o]=!0;const i=o.endsWith(".css"),l=i?'[rel="stylesheet"]':"";if(!!r)for(let u=s.length-1;u>=0;u--){const f=s[u];if(f.href===o&&(!i||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${l}`))return;const a=document.createElement("link");if(a.rel=i?"stylesheet":jt,i||(a.as="script",a.crossOrigin=""),a.href=o,document.head.appendChild(a),i)return new Promise((u,f)=>{a.addEventListener("load",u),a.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>t()).catch(o=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o})};function kt(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function Dt([e,t],n,r){return[n?()=>n(e()):e,r?s=>t(r(s)):t]}function Bt(e){try{return document.querySelector(e)}catch{return null}}function Ut(e,t){const n=Bt(`#${e}`);n?n.scrollIntoView():t&&window.scrollTo(0,0)}function Vt(e,t,n,r){let s=!1;const o=l=>typeof l=="string"?{value:l}:l,i=Dt(O(o(e()),{equals:(l,c)=>l.value===c.value}),void 0,l=>(!s&&t(l),l));return n&&ke(n((l=e())=>{s=!0,i[1](o(l)),s=!1})),{signal:i,utils:r}}function Mt(e){if(e){if(Array.isArray(e))return{signal:e}}else return{signal:O({value:""})};return e}function qt(){return Vt(()=>({value:window.location.pathname+window.location.search+window.location.hash,state:history.state}),({value:e,replace:t,scroll:n,state:r})=>{t?window.history.replaceState(r,"",e):window.history.pushState(r,"",e),Ut(window.location.hash.slice(1),n)},e=>kt(window,"popstate",()=>e()),{go:e=>window.history.go(e)})}function Kt(){let e=new Set;function t(s){return e.add(s),()=>e.delete(s)}let n=!1;function r(s,o){if(n)return!(n=!1);const i={to:s,options:o,defaultPrevented:!1,preventDefault:()=>i.defaultPrevented=!0};for(const l of e)l.listener({...i,from:l.location,retry:c=>{c&&(n=!0),l.navigate(s,o)}});return!i.defaultPrevented}return{subscribe:t,confirm:r}}const Ft=/^(?:[a-z0-9]+:)?\/\//i,Ht=/^\/+|(\/)\/+$/g;function V(e,t=!1){const n=e.replace(Ht,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function ne(e,t,n){if(Ft.test(t))return;const r=V(e),s=n&&V(n);let o="";return!s||t.startsWith("/")?o=r:s.toLowerCase().indexOf(r.toLowerCase())!==0?o=r+s:o=s,(o||"/")+V(t,!o)}function Wt(e,t){if(e==null)throw new Error(t);return e}function He(e,t){return V(e).replace(/\/*(\*.*)?$/g,"")+V(t)}function Xt(e){const t={};return e.searchParams.forEach((n,r)=>{t[r]=n}),t}function zt(e,t,n){const[r,s]=e.split("/*",2),o=r.split("/").filter(Boolean),i=o.length;return l=>{const c=l.split("/").filter(Boolean),a=c.length-i;if(a<0||a>0&&s===void 0&&!t)return null;const u={path:i?"":"/",params:{}},f=d=>n===void 0?void 0:n[d];for(let d=0;d<i;d++){const A=o[d],P=c[d],b=A[0]===":",_=b?A.slice(1):A;if(b&&ye(P,f(_)))u.params[_]=P;else if(b||!ye(P,A))return null;u.path+=`/${P}`}if(s){const d=a?c.slice(-a).join("/"):"";if(ye(d,f(s)))u.params[s]=d;else return null}return u}}function ye(e,t){const n=r=>r.localeCompare(e,void 0,{sensitivity:"base"})===0;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function Gt(e){const[t,n]=e.pattern.split("/*",2),r=t.split("/").filter(Boolean);return r.reduce((s,o)=>s+(o.startsWith(":")?2:3),r.length-(n===void 0?0:1))}function We(e){const t=new Map,n=tt();return new Proxy({},{get(r,s){return t.has(s)||nt(n,()=>t.set(s,E(()=>e()[s]))),t.get(s)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function Xe(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),r=e.slice(t.index+t[0].length);const s=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(r);)s.push(n+=t[1]),r=r.slice(t[0].length);return Xe(r).reduce((o,i)=>[...o,...s.map(l=>l+i)],[])}const Jt=100,ze=De(),fe=De(),de=()=>Wt(Ee(ze),"Make sure your app is wrapped in a <Router />");let Q;const Se=()=>Q||Ee(fe)||de().base,Yt=e=>{const t=Se();return E(()=>t.resolvePath(e()))},Qt=e=>{const t=de();return E(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},Zt=()=>de().location;function en(e,t="",n){const{component:r,data:s,children:o}=e,i=!o||Array.isArray(o)&&!o.length,l={key:e,element:r?()=>v(r,{}):()=>{const{element:c}=e;return c===void 0&&n?v(n,{}):c},preload:e.component?r.preload:e.preload,data:s};return Ge(e.path).reduce((c,a)=>{for(const u of Xe(a)){const f=He(t,u),d=i?f:f.split("/*",1)[0];c.push({...l,originalPath:u,pattern:d,matcher:zt(d,!i,e.matchFilters)})}return c},[])}function tn(e,t=0){return{routes:e,score:Gt(e[e.length-1])*1e4-t,matcher(n){const r=[];for(let s=e.length-1;s>=0;s--){const o=e[s],i=o.matcher(n);if(!i)return null;r.unshift({...i,route:o})}return r}}}function Ge(e){return Array.isArray(e)?e:[e]}function Je(e,t="",n,r=[],s=[]){const o=Ge(e);for(let i=0,l=o.length;i<l;i++){const c=o[i];if(c&&typeof c=="object"&&c.hasOwnProperty("path")){const a=en(c,t,n);for(const u of a){r.push(u);const f=Array.isArray(c.children)&&c.children.length===0;if(c.children&&!f)Je(c.children,u.pattern,n,r,s);else{const d=tn([...r],s.length);s.push(d)}r.pop()}}}return r.length?s:s.sort((i,l)=>l.score-i.score)}function nn(e,t){for(let n=0,r=e.length;n<r;n++){const s=e[n].matcher(t);if(s)return s}return[]}function rn(e,t){const n=new URL("http://sar"),r=E(c=>{const a=e();try{return new URL(a,n)}catch{return console.error(`Invalid path ${a}`),c}},n,{equals:(c,a)=>c.href===a.href}),s=E(()=>r().pathname),o=E(()=>r().search,!0),i=E(()=>r().hash),l=E(()=>"");return{get pathname(){return s()},get search(){return o()},get hash(){return i()},get state(){return t()},get key(){return l()},query:We(Ie(o,()=>Xt(r())))}}function sn(e,t="",n,r){const{signal:[s,o],utils:i={}}=Mt(e),l=i.parsePath||(h=>h),c=i.renderPath||(h=>h),a=i.beforeLeave||Kt(),u=ne("",t),f=void 0;if(u===void 0)throw new Error(`${u} is not a valid base path`);u&&!s().value&&o({value:u,replace:!0,scroll:!1});const[d,A]=O(!1),P=async h=>{A(!0);try{await rt(h)}finally{A(!1)}},[b,_]=O(s().value),[$,K]=O(s().state),B=rn(b,$),j=[],C={pattern:u,params:{},path:()=>u,outlet:()=>null,resolvePath(h){return ne(u,h)}};if(n)try{Q=C,C.data=n({data:void 0,params:{},location:B,navigate:F(C)})}finally{Q=void 0}function Z(h,g,m){S(()=>{if(typeof g=="number"){g&&(i.go?a.confirm(g,m)&&i.go(g):console.warn("Router integration does not support relative routing"));return}const{replace:L,resolve:ee,scroll:I,state:G}={replace:!1,resolve:!0,scroll:!0,...m},k=ee?h.resolvePath(g):ne("",g);if(k===void 0)throw new Error(`Path '${g}' is not a routable path`);if(j.length>=Jt)throw new Error("Too many redirects");const J=b();if((k!==J||G!==$())&&!$t){if(a.confirm(k,m)){const Ye=j.push({value:J,replace:L,scroll:I,state:$()});P(()=>{_(k),K(G)}).then(()=>{j.length===Ye&&z({value:k,state:G})})}}})}function F(h){return h=h||Ee(fe)||C,(g,m)=>Z(h,g,m)}function z(h){const g=j[0];g&&((h.value!==g.value||h.state!==g.state)&&o({...h,replace:g.replace,scroll:g.scroll}),j.length=0)}D(()=>{const{value:h,state:g}=s();S(()=>{h!==b()&&P(()=>{_(h),K(g)})})});{let h=function(g){if(g.defaultPrevented||g.button!==0||g.metaKey||g.altKey||g.ctrlKey||g.shiftKey)return;const m=g.composedPath().find(J=>J instanceof Node&&J.nodeName.toUpperCase()==="A");if(!m||!m.hasAttribute("link"))return;const L=m.href;if(m.target||!L&&!m.hasAttribute("state"))return;const ee=(m.getAttribute("rel")||"").split(/\s+/);if(m.hasAttribute("download")||ee&&ee.includes("external"))return;const I=new URL(L);if(I.origin!==window.location.origin||u&&I.pathname&&!I.pathname.toLowerCase().startsWith(u.toLowerCase()))return;const G=l(I.pathname+I.search+I.hash),k=m.getAttribute("state");g.preventDefault(),Z(C,G,{resolve:!1,replace:m.hasAttribute("replace"),scroll:!m.hasAttribute("noscroll"),state:k&&JSON.parse(k)})};Fe(["click"]),document.addEventListener("click",h),ke(()=>document.removeEventListener("click",h))}return{base:C,out:f,location:B,isRouting:d,renderPath:c,parsePath:l,navigatorFactory:F,beforeLeave:a}}function on(e,t,n,r,s){const{base:o,location:i,navigatorFactory:l}=e,{pattern:c,element:a,preload:u,data:f}=r().route,d=E(()=>r().path);u&&u();const A={parent:t,pattern:c,get child(){return n()},path:d,params:s,data:t.data,outlet:a,resolvePath(P){return ne(o.path(),P,d())}};if(f)try{Q=A,A.data=f({data:t.data,params:s,location:i,navigate:l(A)})}finally{Q=void 0}return A}const ln=Et("<a link>"),cn=e=>{const{source:t,url:n,base:r,data:s,out:o}=e,i=t||qt(),l=sn(i,r,s);return v(ze.Provider,{value:l,get children(){return e.children}})},un=e=>{const t=de(),n=Se(),r=ve(()=>e.children),s=E(()=>Je(r(),He(n.pattern,e.base||""),an)),o=E(()=>nn(s(),t.location.pathname)),i=We(()=>{const u=o(),f={};for(let d=0;d<u.length;d++)Object.assign(f,u[d].params);return f});t.out&&t.out.matches.push(o().map(({route:u,path:f,params:d})=>({originalPath:u.originalPath,pattern:u.pattern,path:f,params:d})));const l=[];let c;const a=E(Ie(o,(u,f,d)=>{let A=f&&u.length===f.length;const P=[];for(let b=0,_=u.length;b<_;b++){const $=f&&f[b],K=u[b];d&&$&&K.route.key===$.route.key?P[b]=d[b]:(A=!1,l[b]&&l[b](),je(B=>{l[b]=B,P[b]=on(t,P[b-1]||n,()=>a()[b+1],()=>o()[b],i)}))}return l.splice(u.length).forEach(b=>b()),d&&A?d:(c=P[0],P)}));return v(Ke,{get when(){return a()&&c},keyed:!0,children:u=>v(fe.Provider,{value:u,get children(){return u.outlet()}})})},U=e=>{const t=ve(()=>e.children);return be(e,{get children(){return t()}})},an=()=>{const e=Se();return v(Ke,{get when(){return e.child},keyed:!0,children:t=>v(fe.Provider,{value:t,get children(){return t.outlet()}})})};function Pn(e){e=be({inactiveClass:"inactive",activeClass:"active"},e);const[,t]=at(e,["href","state","class","activeClass","inactiveClass","end"]),n=Yt(()=>e.href),r=Qt(n),s=Zt(),o=E(()=>{const i=n();if(i===void 0)return!1;const l=V(i.split(/[?#]/,1)[0]).toLowerCase(),c=V(s.pathname).toLowerCase();return e.end?l===c:c.startsWith(l)});return(()=>{const i=ln();return Ot(i,be(t,{get href(){return r()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!o(),[e.activeClass]:o(),...t.classList}},get"aria-current"(){return o()?"page":void 0}}),!1,!1),i})()}const fn=M(()=>q(()=>import("./Home-eb99ea08.js"),["assets/Home-eb99ea08.js","assets/Navbar-feedd60d.js"])),dn=M(()=>q(()=>import("./Teams-2591b062.js"),["assets/Teams-2591b062.js","assets/Navbar-feedd60d.js"])),hn=M(()=>q(()=>import("./Events-8623199c.js"),["assets/Events-8623199c.js","assets/Navbar-feedd60d.js"])),gn=M(()=>q(()=>import("./Contact-46d2f419.js"),["assets/Contact-46d2f419.js","assets/Navbar-feedd60d.js"])),mn=M(()=>q(()=>import("./Sponsors-77b913a8.js"),["assets/Sponsors-77b913a8.js","assets/Navbar-feedd60d.js"])),yn=M(()=>q(()=>import("./FormSubmitted-206ed532.js"),["assets/FormSubmitted-206ed532.js","assets/Navbar-feedd60d.js"])),pn=M(()=>q(()=>import("./Apply-1ca7b55f.js"),[])),wn=()=>v(un,{get children(){return[v(U,{path:"/",component:fn}),v(U,{path:"/teams",component:dn}),v(U,{path:"/events",component:hn}),v(U,{path:"/contact",component:gn}),v(U,{path:"/sponsor",component:mn}),v(U,{path:"/formsubmitted",component:yn}),v(U,{path:"/apply",component:pn})]}}),bn=document.getElementById("root");Pt(()=>v(cn,{get children(){return v(wn,{})}}),bn);export{Pn as A,D as a,O as b,v as c,E as d,Fe as e,xt as f,Ze as g,_t as i,An as o,Ae as s,Et as t};