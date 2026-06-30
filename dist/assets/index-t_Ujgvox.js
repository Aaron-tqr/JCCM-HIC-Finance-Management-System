(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&d(r)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const X={worshipLeader:500,musician:300,backupSinger:200,pastor:1500,snacks:500};let p=JSON.parse(localStorage.getItem("hic_ledger"))||[],l=JSON.parse(localStorage.getItem("hic_rates"))||{...X},L=localStorage.getItem("hic_theme")||"dark";const Y=document.getElementById("totalBalanceVal"),ee=document.getElementById("totalInflowsVal"),te=document.getElementById("totalOutflowsVal"),U=document.getElementById("transactionsList"),z=document.getElementById("emptyState"),j=document.getElementById("filterType"),ne=document.getElementById("breakdownContainer"),q=document.getElementById("inflowForm"),J=document.getElementById("outflowForm"),se=document.getElementById("settingsForm"),Z=document.getElementById("backupSingersList"),ae=document.getElementById("addBackupSingerBtn"),ie=document.getElementById("triggerPrintBtn"),oe=document.getElementById("printableDocumentArea");window.openModal=function(i){document.getElementById(i).classList.add("active");const o=new Date().toISOString().split("T")[0];i==="inflowModal"&&!document.getElementById("inflowDate").value&&(document.getElementById("inflowDate").value=o),i==="outflowModal"&&!document.getElementById("outflowDate").value&&(document.getElementById("outflowDate").value=o,document.getElementById("saturdaySnacks").value=l.snacks,document.getElementById("pastorGift").value=l.pastor),i==="settingsModal"&&(document.getElementById("rateWorshipLeader").value=l.worshipLeader,document.getElementById("rateMusician").value=l.musician,document.getElementById("rateBackupSinger").value=l.backupSinger,document.getElementById("ratePastor").value=l.pastor,document.getElementById("rateSnacks").value=l.snacks)};window.closeModal=function(i){document.getElementById(i).classList.remove("active")};const re=document.getElementById("themeToggleBtn"),K=document.getElementById("themeIcon");function Q(){L==="light"?(document.documentElement.classList.add("light-theme"),K.innerHTML='<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'):(document.documentElement.classList.remove("light-theme"),K.innerHTML='<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>')}re.addEventListener("click",()=>{L=L==="dark"?"light":"dark",localStorage.setItem("hic_theme",L),Q()});function F(){localStorage.setItem("hic_ledger",JSON.stringify(p)),$()}function a(i){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(i)}function $(){let i=0,e=0,o=0,d=0,t=0,n=0,r=0,c=0,B=0,y=0,k=0,w=0,h=0;const b=j.value,v=p.filter(s=>{var u,m,g,T,E,I,f,S,O,D,M,A,G,R,x,N,P,H,_,V,W;return s.type==="inflow"?(i+=s.amount,o+=parseFloat(((u=s.details)==null?void 0:u.tithes)||0),d+=parseFloat(((m=s.details)==null?void 0:m.offering)||0),t+=parseFloat(((g=s.details)==null?void 0:g.specialOffering)||0)):(e+=s.amount,n+=parseFloat(((E=(T=s.details)==null?void 0:T.loveGifts)==null?void 0:E.worshipLeader)||0),r+=parseFloat(((f=(I=s.details)==null?void 0:I.loveGifts)==null?void 0:f.drummer)||0)+parseFloat(((O=(S=s.details)==null?void 0:S.loveGifts)==null?void 0:O.keyboardist)||0)+parseFloat(((M=(D=s.details)==null?void 0:D.loveGifts)==null?void 0:M.bassist)||0)+parseFloat(((G=(A=s.details)==null?void 0:A.loveGifts)==null?void 0:G.guitarist1)||0)+parseFloat(((x=(R=s.details)==null?void 0:R.loveGifts)==null?void 0:x.guitarist2)||0),c+=parseFloat(((N=s.details)==null?void 0:N.backupSingersCount)||0)*l.backupSinger,B+=parseFloat(((P=s.details)==null?void 0:P.snacks)||0),y+=parseFloat(((H=s.details)==null?void 0:H.pastorGift)||0),k+=parseFloat(((_=s.details)==null?void 0:_.renovationEquipment)||0),w+=parseFloat(((V=s.details)==null?void 0:V.laborCost)||0),h+=parseFloat(((W=s.details)==null?void 0:W.musicFellowship)||0)),b==="all"?!0:s.type===b});v.sort((s,u)=>new Date(u.date)-new Date(s.date)),ee.textContent=a(i),te.textContent=a(e),Y.textContent=a(i-e),U.innerHTML="",v.length===0?z.style.display="block":(z.style.display="none",v.forEach(s=>{const u=document.createElement("tr"),m=new Date(s.date).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",timeZone:"UTC"}),g=s.type==="inflow"?'<span class="badge badge-inflow">Inflow</span>':'<span class="badge badge-outflow">Outflow</span>';u.innerHTML=`
        <td>${m}</td>
        <td>${g}</td>
        <td>${s.description||"Sunday Transaction"}</td>
        <td style="font-weight: 600; color: ${s.type==="inflow"?"var(--inflow-color)":"var(--outflow-color)"}">
          ${s.type==="inflow"?"+":"-"}${a(s.amount)}
        </td>
        <td>
          <div class="action-menu">
            <button class="btn btn-secondary" style="padding: 0.35rem 0.7rem; font-size: 0.75rem;" onclick="viewDocument(${s.id})">View Slip</button>
            <button class="btn btn-secondary" style="padding: 0.35rem 0.7rem; font-size: 0.75rem; color: var(--outflow-color);" onclick="deleteTransaction(${s.id})">Delete</button>
          </div>
        </td>
      `,U.appendChild(u)})),ne.innerHTML=`
    <div style="font-weight: 600; color: var(--primary); margin-bottom: 0.25rem;">INFLOW BREAKDOWN</div>
    <div class="print-row"><span>Sunday Tithes</span><strong>${a(o)}</strong></div>
    <div class="print-row"><span>General Offering</span><strong>${a(d)}</strong></div>
    <div class="print-row"><span>Special Offerings</span><strong>${a(t)}</strong></div>
    
    <div class="print-divider" style="margin: 0.5rem 0; border-top-color: var(--border-color);"></div>
    
    <div style="font-weight: 600; color: var(--accent-teal); margin-bottom: 0.25rem; margin-top: 0.5rem;">OUTFLOW BREAKDOWN</div>
    <div class="print-row"><span>Worship Leaders</span><strong>${a(n)}</strong></div>
    <div class="print-row"><span>Instruments</span><strong>${a(r)}</strong></div>
    <div class="print-row"><span>Backup Singers</span><strong>${a(c)}</strong></div>
    <div class="print-row"><span>Saturday Snacks</span><strong>${a(B)}</strong></div>
    <div class="print-row"><span>Pastor Love Gift</span><strong>${a(y)}</strong></div>
    <div class="print-row"><span>Sanctuary Renovation</span><strong>${a(k)}</strong></div>
    <div class="print-row"><span>Labor (Repairs/Clean)</span><strong>${a(w)}</strong></div>
    <div class="print-row"><span>Music Fellowship</span><strong>${a(h)}</strong></div>
  `}let C=0;function le(i=""){C++;const e=document.createElement("div");e.className="backup-singer-row",e.id=`backupRow_${C}`,e.innerHTML=`
    <input type="text" class="backup-singer-name" placeholder="Backup Singer Name" value="${i}" required style="flex: 1;">
    <button type="button" class="btn btn-secondary" onclick="removeBackupSingerField(${C})" style="padding: 0.5rem 0.75rem;">&times;</button>
  `,Z.appendChild(e)}window.removeBackupSingerField=function(i){const e=document.getElementById(`backupRow_${i}`);e&&e.remove()};ae.addEventListener("click",()=>le());q.addEventListener("submit",i=>{i.preventDefault();const e=document.getElementById("inflowDate").value,o=parseFloat(document.getElementById("titheAmt").value||0),d=parseFloat(document.getElementById("offeringAmt").value||0),t=parseFloat(document.getElementById("specialOfferingAmt").value||0),n=document.getElementById("inflowRemarks").value,r=o+d+t;if(r<=0){alert("Please enter a valid amount for tithe, offering or special offerings.");return}const c={id:Date.now(),date:e,type:"inflow",description:n||"Sunday Service Inflows",amount:r,details:{tithes:o,offering:d,specialOffering:t}};p.push(c),F(),q.reset(),closeModal("inflowModal"),viewDocument(c.id)});J.addEventListener("submit",i=>{i.preventDefault();const e=document.getElementById("outflowDate").value,o=document.getElementById("outflowRemarks").value,d=document.getElementById("lgWorshipLeader").checked,t=document.getElementById("lgDrummer").checked,n=document.getElementById("lgKeyboardist").checked,r=document.getElementById("lgBassist").checked,c=document.getElementById("lgGuitarist1").checked,B=document.getElementById("lgGuitarist2").checked,y={worshipLeader:d?l.worshipLeader:0,drummer:t?l.musician:0,keyboardist:n?l.musician:0,bassist:r?l.musician:0,guitarist1:c?l.musician:0,guitarist2:B?l.musician:0},k=document.querySelectorAll(".backup-singer-name"),w=Array.from(k).map(f=>f.value.trim()),h=w.length,b=h*l.backupSinger,v=parseFloat(document.getElementById("saturdaySnacks").value||0),s=parseFloat(document.getElementById("pastorGift").value||0),u=parseFloat(document.getElementById("renovationEquipment").value||0),m=parseFloat(document.getElementById("laborCost").value||0),g=parseFloat(document.getElementById("musicFellowship").value||0),E=Object.values(y).reduce((f,S)=>f+S,0)+b+v+s+u+m+g;if(E<=0){alert("Please enter or select at least one outflow disbursement.");return}const I={id:Date.now(),date:e,type:"outflow",description:o||"Sunday Service Outflows",amount:E,details:{loveGifts:y,backupSingersCount:h,backupSingersNames:w,snacks:v,pastorGift:s,renovationEquipment:u,laborCost:m,musicFellowship:g}};p.push(I),F(),J.reset(),Z.innerHTML="",closeModal("outflowModal"),viewDocument(I.id)});se.addEventListener("submit",i=>{i.preventDefault(),l={worshipLeader:parseFloat(document.getElementById("rateWorshipLeader").value),musician:parseFloat(document.getElementById("rateMusician").value),backupSinger:parseFloat(document.getElementById("rateBackupSinger").value),pastor:parseFloat(document.getElementById("ratePastor").value),snacks:parseFloat(document.getElementById("rateSnacks").value)},localStorage.setItem("hic_rates",JSON.stringify(l)),alert("Rates settings updated successfully!"),closeModal("settingsModal"),$()});window.viewDocument=function(i){const e=p.find(t=>t.id===i);if(!e)return;const o=new Date(e.date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",timeZone:"UTC"});let d="";if(e.type==="inflow")document.getElementById("printModalTitle").innerText="Sunday Financial Receipt",d=`
      <div class="print-header">
        <div class="print-title">HOPE IN CHRIST CHURCH</div>
        <div class="print-subtitle">Sunday Financial Receipt</div>
        <div style="font-size: 0.75rem;">Receipt Date: ${o}</div>
        <div style="font-size: 0.75rem; color: #555;">ID: ${e.id}</div>
      </div>
      <div class="print-divider"></div>
      
      <div class="print-row"><strong>Category</strong><strong>Amount</strong></div>
      <div class="print-divider"></div>
      
      <div class="print-row"><span>Tithes Collection</span><span>${a(e.details.tithes||0)}</span></div>
      <div class="print-row"><span>General Offertory</span><span>${a(e.details.offering||0)}</span></div>
      <div class="print-row"><span>Special Thanksgiving Offerings</span><span>${a(e.details.specialOffering||0)}</span></div>
      
      <div class="print-divider"></div>
      <div class="print-row total"><span>TOTAL INFLOW RECEIVED</span><span>${a(e.amount)}</span></div>
      
      <div style="margin-top: 1.5rem; font-size: 0.8rem;">
        <strong>Remarks:</strong> ${e.description}
      </div>
      
      <div class="print-signatures">
        <div>
          <div class="signature-line">Prepared By (Treasurer)</div>
        </div>
        <div>
          <div class="signature-line">Verified By (Pastor)</div>
        </div>
      </div>
    `;else{document.getElementById("printModalTitle").innerText="Sunday Cash Voucher";let t="";const n=e.details.loveGifts||{};n.worshipLeader&&(t+=`<div class="print-row" style="padding-left: 1rem;"><span>- Worship Leader</span><span>${a(n.worshipLeader)}</span></div>`),n.drummer&&(t+=`<div class="print-row" style="padding-left: 1rem;"><span>- Drummer</span><span>${a(n.drummer)}</span></div>`),n.keyboardist&&(t+=`<div class="print-row" style="padding-left: 1rem;"><span>- Keyboardist</span><span>${a(n.keyboardist)}</span></div>`),n.bassist&&(t+=`<div class="print-row" style="padding-left: 1rem;"><span>- Bassist</span><span>${a(n.bassist)}</span></div>`),n.guitarist1&&(t+=`<div class="print-row" style="padding-left: 1rem;"><span>- Lead Guitarist</span><span>${a(n.guitarist1)}</span></div>`),n.guitarist2&&(t+=`<div class="print-row" style="padding-left: 1rem;"><span>- Rhythm Guitarist</span><span>${a(n.guitarist2)}</span></div>`);let r="";e.details.backupSingersCount>0&&(r=`<div class="print-row" style="padding-left: 1rem;"><span>- Backup Singers (${e.details.backupSingersCount} heads)</span><span>${a(e.details.backupSingersCount*l.backupSinger)}</span></div>`,e.details.backupSingersNames&&e.details.backupSingersNames.length>0&&(r+=`<div style="font-size: 0.75rem; color: #555; padding-left: 2rem;">Names: ${e.details.backupSingersNames.join(", ")}</div>`)),d=`
      <div class="print-header">
        <div class="print-title">HOPE IN CHRIST CHURCH</div>
        <div class="print-subtitle">Cash Outflow Voucher</div>
        <div style="font-size: 0.75rem;">Voucher Date: ${o}</div>
        <div style="font-size: 0.75rem; color: #555;">ID: ${e.id}</div>
      </div>
      <div class="print-divider"></div>
      
      <div class="print-row"><strong>Category Details</strong><strong>Amount</strong></div>
      <div class="print-divider"></div>
      
      <div class="print-row" style="font-weight: 500;"><span>Worship Team Love Gifts:</span></div>
      ${t}
      ${r}
      
      <div class="print-divider" style="margin: 0.25rem 0; border-top-style: dotted;"></div>
      <div class="print-row"><span>Saturday Practice Snacks</span><span>${a(e.details.snacks||0)}</span></div>
      <div class="print-row"><span>Pastor's Love Gift Allowance</span><span>${a(e.details.pastorGift||0)}</span></div>
      <div class="print-row"><span>Equipment Purchases / Renovations</span><span>${a(e.details.renovationEquipment||0)}</span></div>
      <div class="print-row"><span>Labor Compensation (Cleaning/Repairs)</span><span>${a(e.details.laborCost||0)}</span></div>
      <div class="print-row"><span>Music Fellowship Fund</span><span>${a(e.details.musicFellowship||0)}</span></div>
      
      <div class="print-divider"></div>
      <div class="print-row total"><span>TOTAL CASH DISBURSED</span><span>${a(e.amount)}</span></div>
      
      <div style="margin-top: 1.5rem; font-size: 0.8rem;">
        <strong>Memo:</strong> ${e.description}
      </div>
      
      <div class="print-signatures">
        <div>
          <div class="signature-line">Prepared By (Treasurer)</div>
        </div>
        <div>
          <div class="signature-line">Received By (Representative)</div>
        </div>
      </div>
    `}oe.innerHTML=d,openModal("printModalOverlay")};ie.addEventListener("click",()=>{window.print()});window.deleteTransaction=function(i){confirm("Are you sure you want to delete this transaction record? This cannot be undone.")&&(p=p.filter(e=>e.id!==i),F())};document.getElementById("exportBtn").addEventListener("click",()=>{const i="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(p,null,2)),e=document.createElement("a");e.setAttribute("href",i),e.setAttribute("download",`HIC_Finance_Ledger_${new Date().toISOString().split("T")[0]}.json`),document.body.appendChild(e),e.click(),e.remove()});document.getElementById("importBtn").addEventListener("click",()=>{document.getElementById("importFileInput").click()});document.getElementById("importFileInput").addEventListener("change",i=>{const e=i.target.files[0];if(!e)return;const o=new FileReader;o.onload=function(d){try{const t=JSON.parse(d.target.result);if(Array.isArray(t)){if(confirm(`Are you sure you want to load ${t.length} records? This will merge with your existing transaction history.`)){const n=new Set(p.map(c=>c.id)),r=t.filter(c=>!n.has(c.id));p=[...p,...r],F(),alert(`Successfully imported ${r.length} new records!`)}}else alert("Invalid file format. The file must contain a ledger array.")}catch{alert("Error parsing JSON file. Please make sure it is a valid backup file.")}},o.readAsText(e)});j.addEventListener("change",$);document.getElementById("newInflowBtn").addEventListener("click",()=>openModal("inflowModal"));document.getElementById("newOutflowBtn").addEventListener("click",()=>openModal("outflowModal"));document.getElementById("settingsBtn").addEventListener("click",()=>openModal("settingsModal"));Q();$();
