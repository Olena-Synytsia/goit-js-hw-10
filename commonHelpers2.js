import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as r}from"./assets/vendor-77e16229.js";const s=document.querySelector("form");s.addEventListener("submit",l);function l(i){i.preventDefault();const t=s.delay.value,o=s.state.value;new Promise((e,m)=>{setTimeout(()=>{o==="fulfilled"?e(t):m(t)},t)}).then(e=>{r.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`})},e=>{r.error({title:"Error",message:`❌ Rejected promise in ${e}ms`})})}
//# sourceMappingURL=commonHelpers2.js.map
