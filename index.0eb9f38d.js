const e=document.querySelector(":root"),r=["var(--red)","var(--blue)","var(--white)"],o=Array.from(document.querySelectorAll(".fw-1")),t=Array.from(document.querySelectorAll(".fw-2")),l=Array.from(document.querySelectorAll(".fw-3")),c=[o,t,l],u=document.querySelector(".fc-1"),f=document.querySelector(".fc-2"),n=document.querySelector(".fc-3"),y=[u,f,n],d=document.querySelector(".lchr-1"),m=document.querySelector(".lchr-2"),a=document.querySelector(".lchr-3"),s=[d,m,a];!function(){let o=[];for(;o.length<3;){let e=Math.floor(Math.random()*r.length);o.includes(r[e])||o.push(r[e])}for(let e in c)c[e].map(r=>{r.style.backgroundColor=o[e],r.style.filter=`drop-shadow(0 0 0.4em ${o[e]})`});for(let e in s)s[e].style.setProperty("--dropShadow-color",`${o[e]}`),s[e].style.setProperty("--boxShadow-color",`${o[e]}`);for(let r=0;r<y.length;r++)e.style.setProperty(`--fw${r+1}-offset`,`${y[r].offsetTop}px`)}();
//# sourceMappingURL=index.0eb9f38d.js.map