const z=document.getElementById("productForm"),u=document.getElementById("uploadProductImages"),p=document.getElementById("productImageInput"),s=document.getElementById("productImagesJson"),d=document.getElementById("productImagesPreview"),c=document.getElementById("sizesJson"),o=document.getElementById("sizesBoard"),f=document.getElementById("newSizeInput"),N=document.getElementById("addSizeButton"),S=document.getElementById("uploadStatus"),B=document.getElementById("productSubmitButton");let E=!1;const b=(e,t,n)=>{if(!(e instanceof HTMLButtonElement))return;const a=e.dataset.defaultLabel||e.textContent||"";e.dataset.defaultLabel||(e.dataset.defaultLabel=a),e.disabled=t,e.setAttribute("aria-busy",String(t)),e.textContent=t?n:e.dataset.defaultLabel||a},v=(e="")=>{S instanceof HTMLElement&&(S.textContent=e)},m=()=>{try{return JSON.parse(s?.value||"[]")}catch{return[]}},l=()=>{try{return JSON.parse(c?.value||"[]")}catch{return[]}},y=e=>{c&&(c.value=JSON.stringify(e))},g=()=>{if(!o)return;const e=l();if(!e.length){o.innerHTML='<p class="empty-note">Aun no hay tallas. Agrega una para comenzar.</p>';return}o.innerHTML=e.map((t,n)=>`
          <article class="size-card ${t.available?"available":"unavailable"}" data-size-index="${n}">
            <div class="size-card-main">
              <strong>Talla ${t.size}</strong>
              <span>${t.available?"Disponible":"Agotada"}</span>
            </div>
            <div class="size-card-actions">
              <button type="button" class="size-toggle">${t.available?"Marcar agotada":"Marcar disponible"}</button>
              <button type="button" class="size-remove" data-remove-size="${n}">Eliminar</button>
            </div>
          </article>
        `).join(""),o.querySelectorAll(".size-toggle").forEach(t=>{t.addEventListener("click",()=>{const n=t.closest("[data-size-index]"),a=Number(n?.getAttribute("data-size-index")),r=l();Number.isNaN(a)||!r[a]||(r[a].available=!r[a].available,y(r),g())})}),o.querySelectorAll("[data-remove-size]").forEach(t=>{t.addEventListener("click",()=>{const n=Number(t.getAttribute("data-remove-size")),a=l();Number.isNaN(n)||(a.splice(n,1),y(a),g())})})},I=()=>{const e=m();if(!d)return;if(!e.length){d.innerHTML='<p class="empty-note">Sube imagenes para ver la previsualizacion.</p>';return}const t=e[0]?.url||e[0],n=e.map((a,r)=>`
          <article class="preview-item">
            <div class="preview-thumb-wrap">
              <img src="${a.url||a}" alt="Imagen ${r+1}" />
              <span class="preview-badge">#${r+1}</span>
            </div>
            <button type="button" class="preview-remove" data-remove-image="${r}">Quitar</button>
          </article>
        `).join("");d.innerHTML=`
      <article class="preview-main">
        <img src="${t}" alt="Imagen principal" />
        <p>Imagen principal</p>
      </article>
      <div class="preview-thumbs-grid">${n}</div>
    `,d.querySelectorAll("[data-remove-image]").forEach(a=>{a.addEventListener("click",()=>{const r=Number(a.getAttribute("data-remove-image")),i=m();Number.isNaN(r)||(i.splice(r,1),s&&(s.value=JSON.stringify(i)),I())})})},h=async()=>{const e=Array.from(p?.files||[]);if(e.length){for(const t of e){const n=new FormData;n.append("file",t);const a=await fetch("/api/admin/upload-image",{method:"POST",body:n});if(!a.ok)throw new Error("Error al subir una imagen");const r=await a.json(),i=m();i.push(r),s&&(s.value=JSON.stringify(i))}p&&(p.value=""),I()}};u?.addEventListener("click",async()=>{if(u instanceof HTMLButtonElement)try{b(u,!0,"Subiendo..."),v("Subiendo imagenes..."),await h(),v("Imagenes subidas correctamente.")}catch(e){alert(e instanceof Error?e.message:"No se pudo subir la imagen"),v("No se pudieron subir las imagenes.")}finally{b(u,!1,"Subiendo...")}});N?.addEventListener("click",()=>{const e=String(f?.value||"").trim();if(!e)return;const t=l();if(t.some(n=>String(n.size)===e)){alert("Esa talla ya existe");return}t.push({size:e,available:!0}),y(t),f&&(f.value=""),g()});z?.addEventListener("submit",()=>{E||(E=!0,s&&(s.value=JSON.stringify(m())),c&&(c.value=JSON.stringify(l())),b(B,!0,"Guardando..."))});g();I();
