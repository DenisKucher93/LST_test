(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function d(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=d(e);fetch(e.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const c=async()=>{let t=document.querySelector(".inputSearch").value;const r={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Token dc3a7d155cb6dbaaa463850ef2dfb8e470ccd8ee;"},body:JSON.stringify({query:t})};try{const a=await fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",r);if(!a.ok)throw new Error(`HTTP error! status: ${a.status}`);const p=(await a.json()).suggestions,o=document.querySelector(".searchResult");o.innerHTML="",p.forEach(i=>{const n=document.createElement("div");n.textContent=i.unrestricted_value,n.classList.add("result-item"),n.onclick=()=>{s(i),o.innerHTML=""},o.appendChild(n)})}catch(a){console.log("Ошибка:",a)}},s=t=>{let e=document.querySelector(".addressDisplay");e||(e=document.createElement("div"),e.className="addressDisplay",document.querySelector("#app").appendChild(e)),e.innerHTML=`
        <p>Индекс: ${t.data.postal_code||"Не указано"}</p>
        <p>Регион: ${t.data.region_with_type||"Не указано"}</p>
        <p>Город: ${t.data.city_with_type||"Не указано"}</p>
        <p>Район: ${t.data.city||t.data.area_with_type||"Не указано"}</p>
        <p>Улица: ${t.data.street_with_type||t.data.settlement_with_type||"Не указано"}</p>
        <p>Номер дома: ${t.data.house||"Не указано"}</p>
        <p>Корпус: ${t.data.block||"Не указано"}</p>
        <p>Кваритира: ${t.data.flat||"Не указано"}</p>
      `};document.querySelector(".inputSearch").addEventListener("input",c)});document.querySelector("#app").innerHTML=`
  <div>
    <div class="inputSearchContainer">
      <input class="inputSearch" type="text" />
    </div>
    <div class="searchResult"></div>
    <div class="aaddressDisplay"></div>
  </div>
`;
