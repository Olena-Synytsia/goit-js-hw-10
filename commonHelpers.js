import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as C,i as v}from"./assets/vendor-77e16229.js";const e=document.querySelector("button[data-start]"),l=document.querySelector("span.value[data-seconds]"),m=document.querySelector("span.value[data-minutes]"),f=document.querySelector("span.value[data-hours]"),h=document.querySelector("span.value[data-days]"),c=document.getElementById("datetime-picker");let i=null,r=0;const S={enableTime:!0,dateFormat:"Y-m-d H:i",time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){i=t[0],i<new Date?(e.disabled=!0,v.error({position:"topRight",messageColor:"white",backgroundColor:"red",message:"Please choose a date in the future"})):e.disabled=!1}};C(c,S);e.addEventListener("click",x);function x(){e.disabled=!0,c.disabled=!0,r&&clearInterval(r),r=setInterval(()=>{const n=i-new Date;if(n<=0){clearInterval(r),c.disabled=!1,e.disabled=!1,D();return}const{days:o,hours:s,minutes:a,seconds:u}=g(n);w({days:o,hours:s,minutes:a,seconds:u})},1e3)}function g(t){const u=Math.floor(t/864e5),y=Math.floor(t%864e5/36e5),p=Math.floor(t%864e5%36e5/6e4),b=Math.floor(t%864e5%36e5%6e4/1e3);return{days:u,hours:y,minutes:p,seconds:b}}function d(t){return String(t).padStart(2,"0")}function w(t){const n=d(t.days),o=d(t.hours),s=d(t.minutes),a=d(t.seconds);h.textContent=n,f.textContent=o,m.textContent=s,l.textContent=a}function D(){e.disabled=!1,c.disabled=!1,h.textContent="00",f.textContent="00",m.textContent="00",l.textContent="00"}
//# sourceMappingURL=commonHelpers.js.map
