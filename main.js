// HIC Finance Management System - Application Logic
// ponytail: native DOM APIs, native localStorage, zero third-party dependencies

// --- DEFAULT SETTINGS ---
const DEFAULT_RATES = {
  worshipLeader: 500,
  musician: 300,
  backupSinger: 200,
  pastor: 1500,
  snacks: 500
};

// --- INITIAL STATE ---
let ledger = JSON.parse(localStorage.getItem('hic_ledger')) || [];
let rates = JSON.parse(localStorage.getItem('hic_rates')) || { ...DEFAULT_RATES };
let theme = localStorage.getItem('hic_theme') || 'dark';

// --- DOM ELEMENTS ---
const totalBalanceVal = document.getElementById('totalBalanceVal');
const totalInflowsVal = document.getElementById('totalInflowsVal');
const totalOutflowsVal = document.getElementById('totalOutflowsVal');
const transactionsList = document.getElementById('transactionsList');
const emptyState = document.getElementById('emptyState');
const filterType = document.getElementById('filterType');
const breakdownContainer = document.getElementById('breakdownContainer');

// Modals and Forms
const inflowForm = document.getElementById('inflowForm');
const outflowForm = document.getElementById('outflowForm');
const settingsForm = document.getElementById('settingsForm');
const backupSingersList = document.getElementById('backupSingersList');
const addBackupSingerBtn = document.getElementById('addBackupSingerBtn');
const triggerPrintBtn = document.getElementById('triggerPrintBtn');
const printableArea = document.getElementById('printableDocumentArea');

// Global modal references
window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('active');
  
  // Set default dates if applicable
  const today = new Date().toISOString().split('T')[0];
  if (modalId === 'inflowModal' && !document.getElementById('inflowDate').value) {
    document.getElementById('inflowDate').value = today;
  }
  if (modalId === 'outflowModal' && !document.getElementById('outflowDate').value) {
    document.getElementById('outflowDate').value = today;
    // Set default amounts in the inputs based on configuration
    document.getElementById('saturdaySnacks').value = rates.snacks;
    document.getElementById('pastorGift').value = rates.pastor;
  }
  if (modalId === 'settingsModal') {
    document.getElementById('rateWorshipLeader').value = rates.worshipLeader;
    document.getElementById('rateMusician').value = rates.musician;
    document.getElementById('rateBackupSinger').value = rates.backupSinger;
    document.getElementById('ratePastor').value = rates.pastor;
    document.getElementById('rateSnacks').value = rates.snacks;
  }
};

window.closeModal = function(modalId) {
  document.getElementById(modalId).classList.remove('active');
};

// --- THEME TOGGLE ---
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');

function updateThemeUI() {
  if (theme === 'light') {
    document.documentElement.classList.add('light-theme');
    // Moon Icon SVG
    themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
  } else {
    document.documentElement.classList.remove('light-theme');
    // Sun Icon SVG
    themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
  }
}

themeToggleBtn.addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('hic_theme', theme);
  updateThemeUI();
});

// --- DATA PERSISTENCE & RENDER ---
function saveLedger() {
  localStorage.setItem('hic_ledger', JSON.stringify(ledger));
  renderApp();
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
}

function renderApp() {
  let totalInflows = 0;
  let totalOutflows = 0;

  // Breakdown aggregators
  let totalTithes = 0;
  let totalOffering = 0;
  let totalSpecialOffering = 0;

  let totalWL_Gifts = 0;
  let totalMusicians_Gifts = 0;
  let totalBackups_Gifts = 0;
  let totalSnacks = 0;
  let totalPastorGifts = 0;
  let totalRenovations = 0;
  let totalLabor = 0;
  let totalFellowship = 0;

  // Filtered transactions
  const selectedFilter = filterType.value;
  const filteredLedger = ledger.filter(item => {
    // Summarize aggregates regardless of filter
    if (item.type === 'inflow') {
      totalInflows += item.amount;
      totalTithes += parseFloat(item.details?.tithes || 0);
      totalOffering += parseFloat(item.details?.offering || 0);
      totalSpecialOffering += parseFloat(item.details?.specialOffering || 0);
    } else {
      totalOutflows += item.amount;
      totalWL_Gifts += parseFloat(item.details?.loveGifts?.worshipLeader || 0);
      totalMusicians_Gifts += 
        parseFloat(item.details?.loveGifts?.drummer || 0) +
        parseFloat(item.details?.loveGifts?.keyboardist || 0) +
        parseFloat(item.details?.loveGifts?.bassist || 0) +
        parseFloat(item.details?.loveGifts?.guitarist1 || 0) +
        parseFloat(item.details?.loveGifts?.guitarist2 || 0);
      totalBackups_Gifts += parseFloat(item.details?.backupSingersCount || 0) * rates.backupSinger;
      totalSnacks += parseFloat(item.details?.snacks || 0);
      totalPastorGifts += parseFloat(item.details?.pastorGift || 0);
      totalRenovations += parseFloat(item.details?.renovationEquipment || 0);
      totalLabor += parseFloat(item.details?.laborCost || 0);
      totalFellowship += parseFloat(item.details?.musicFellowship || 0);
    }

    if (selectedFilter === 'all') return true;
    return item.type === selectedFilter;
  });

  // Sort by date descending
  filteredLedger.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Render main summary metrics
  totalInflowsVal.textContent = formatCurrency(totalInflows);
  totalOutflowsVal.textContent = formatCurrency(totalOutflows);
  totalBalanceVal.textContent = formatCurrency(totalInflows - totalOutflows);

  // Render Table
  transactionsList.innerHTML = '';
  if (filteredLedger.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    filteredLedger.forEach(tx => {
      const tr = document.createElement('tr');
      
      const formattedDate = new Date(tx.date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
      });

      const badgeType = tx.type === 'inflow' 
        ? `<span class="badge badge-inflow">Inflow</span>`
        : `<span class="badge badge-outflow">Outflow</span>`;

      tr.innerHTML = `
        <td>${formattedDate}</td>
        <td>${badgeType}</td>
        <td>${tx.description || 'Sunday Transaction'}</td>
        <td style="font-weight: 600; color: ${tx.type === 'inflow' ? 'var(--inflow-color)' : 'var(--outflow-color)'}">
          ${tx.type === 'inflow' ? '+' : '-'}${formatCurrency(tx.amount)}
        </td>
        <td>
          <div class="action-menu">
            <button class="btn btn-secondary" style="padding: 0.35rem 0.7rem; font-size: 0.75rem;" onclick="viewDocument(${tx.id})">View Slip</button>
            <button class="btn btn-secondary" style="padding: 0.35rem 0.7rem; font-size: 0.75rem; color: var(--outflow-color);" onclick="deleteTransaction(${tx.id})">Delete</button>
          </div>
        </td>
      `;
      transactionsList.appendChild(tr);
    });
  }

  // Render Sidebar breakdown statistics
  breakdownContainer.innerHTML = `
    <div style="font-weight: 600; color: var(--primary); margin-bottom: 0.25rem;">INFLOW BREAKDOWN</div>
    <div class="print-row"><span>Sunday Tithes</span><strong>${formatCurrency(totalTithes)}</strong></div>
    <div class="print-row"><span>General Offering</span><strong>${formatCurrency(totalOffering)}</strong></div>
    <div class="print-row"><span>Special Offerings</span><strong>${formatCurrency(totalSpecialOffering)}</strong></div>
    
    <div class="print-divider" style="margin: 0.5rem 0; border-top-color: var(--border-color);"></div>
    
    <div style="font-weight: 600; color: var(--accent-teal); margin-bottom: 0.25rem; margin-top: 0.5rem;">OUTFLOW BREAKDOWN</div>
    <div class="print-row"><span>Worship Leaders</span><strong>${formatCurrency(totalWL_Gifts)}</strong></div>
    <div class="print-row"><span>Instruments</span><strong>${formatCurrency(totalMusicians_Gifts)}</strong></div>
    <div class="print-row"><span>Backup Singers</span><strong>${formatCurrency(totalBackups_Gifts)}</strong></div>
    <div class="print-row"><span>Saturday Snacks</span><strong>${formatCurrency(totalSnacks)}</strong></div>
    <div class="print-row"><span>Pastor Love Gift</span><strong>${formatCurrency(totalPastorGifts)}</strong></div>
    <div class="print-row"><span>Sanctuary Renovation</span><strong>${formatCurrency(totalRenovations)}</strong></div>
    <div class="print-row"><span>Labor (Repairs/Clean)</span><strong>${formatCurrency(totalLabor)}</strong></div>
    <div class="print-row"><span>Music Fellowship</span><strong>${formatCurrency(totalFellowship)}</strong></div>
  `;
}

// --- DYNAMIC BACKUP SINGERS INPUTS ---
let backupSingerCount = 0;

function addBackupSingerField(name = '') {
  backupSingerCount++;
  const div = document.createElement('div');
  div.className = 'backup-singer-row';
  div.id = `backupRow_${backupSingerCount}`;
  div.innerHTML = `
    <input type="text" class="backup-singer-name" placeholder="Backup Singer Name" value="${name}" required style="flex: 1;">
    <button type="button" class="btn btn-secondary" onclick="removeBackupSingerField(${backupSingerCount})" style="padding: 0.5rem 0.75rem;">&times;</button>
  `;
  backupSingersList.appendChild(div);
}

window.removeBackupSingerField = function(id) {
  const row = document.getElementById(`backupRow_${id}`);
  if (row) row.remove();
};

addBackupSingerBtn.addEventListener('click', () => addBackupSingerField());

// --- SUBMIT TRANSACTIONS ---

// Inflow Form Submission
inflowForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const date = document.getElementById('inflowDate').value;
  const tithes = parseFloat(document.getElementById('titheAmt').value || 0);
  const offering = parseFloat(document.getElementById('offeringAmt').value || 0);
  const specialOffering = parseFloat(document.getElementById('specialOfferingAmt').value || 0);
  const remarks = document.getElementById('inflowRemarks').value;

  const totalAmount = tithes + offering + specialOffering;

  if (totalAmount <= 0) {
    alert('Please enter a valid amount for tithe, offering or special offerings.');
    return;
  }

  const tx = {
    id: Date.now(),
    date,
    type: 'inflow',
    description: remarks || 'Sunday Service Inflows',
    amount: totalAmount,
    details: { tithes, offering, specialOffering }
  };

  ledger.push(tx);
  saveLedger();
  
  inflowForm.reset();
  closeModal('inflowModal');
  
  // Instantly view and offer printing
  viewDocument(tx.id);
});

// Outflow Form Submission
outflowForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const date = document.getElementById('outflowDate').value;
  const remarks = document.getElementById('outflowRemarks').value;
  
  // Musicians love gift calculations
  const wlChecked = document.getElementById('lgWorshipLeader').checked;
  const drummerChecked = document.getElementById('lgDrummer').checked;
  const keyChecked = document.getElementById('lgKeyboardist').checked;
  const bassistChecked = document.getElementById('lgBassist').checked;
  const gt1Checked = document.getElementById('lgGuitarist1').checked;
  const gt2Checked = document.getElementById('lgGuitarist2').checked;

  const loveGifts = {
    worshipLeader: wlChecked ? rates.worshipLeader : 0,
    drummer: drummerChecked ? rates.musician : 0,
    keyboardist: keyChecked ? rates.musician : 0,
    bassist: bassistChecked ? rates.musician : 0,
    guitarist1: gt1Checked ? rates.musician : 0,
    guitarist2: gt2Checked ? rates.musician : 0
  };

  // Backup singers
  const backupSingerInputs = document.querySelectorAll('.backup-singer-name');
  const backupSingersNames = Array.from(backupSingerInputs).map(input => input.value.trim());
  const backupSingersCount = backupSingersNames.length;
  const backupSingersTotal = backupSingersCount * rates.backupSinger;

  // Other Expenses
  const snacks = parseFloat(document.getElementById('saturdaySnacks').value || 0);
  const pastorGift = parseFloat(document.getElementById('pastorGift').value || 0);
  const renovationEquipment = parseFloat(document.getElementById('renovationEquipment').value || 0);
  const laborCost = parseFloat(document.getElementById('laborCost').value || 0);
  const musicFellowship = parseFloat(document.getElementById('musicFellowship').value || 0);

  // Total Outflows
  const loveGiftsTotal = Object.values(loveGifts).reduce((a, b) => a + b, 0);
  const totalAmount = loveGiftsTotal + backupSingersTotal + snacks + pastorGift + renovationEquipment + laborCost + musicFellowship;

  if (totalAmount <= 0) {
    alert('Please enter or select at least one outflow disbursement.');
    return;
  }

  const tx = {
    id: Date.now(),
    date,
    type: 'outflow',
    description: remarks || 'Sunday Service Outflows',
    amount: totalAmount,
    details: {
      loveGifts,
      backupSingersCount,
      backupSingersNames,
      snacks,
      pastorGift,
      renovationEquipment,
      laborCost,
      musicFellowship
    }
  };

  ledger.push(tx);
  saveLedger();

  outflowForm.reset();
  backupSingersList.innerHTML = '';
  closeModal('outflowModal');

  // Instantly view and offer printing
  viewDocument(tx.id);
});

// Settings Form Submission
settingsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  rates = {
    worshipLeader: parseFloat(document.getElementById('rateWorshipLeader').value),
    musician: parseFloat(document.getElementById('rateMusician').value),
    backupSinger: parseFloat(document.getElementById('rateBackupSinger').value),
    pastor: parseFloat(document.getElementById('ratePastor').value),
    snacks: parseFloat(document.getElementById('rateSnacks').value)
  };
  localStorage.setItem('hic_rates', JSON.stringify(rates));
  alert('Rates settings updated successfully!');
  closeModal('settingsModal');
  renderApp();
});

// --- DOCUMENT VIEWER AND PRINT ---
window.viewDocument = function(id) {
  const tx = ledger.find(item => item.id === id);
  if (!tx) return;

  const formattedDate = new Date(tx.date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  });

  let documentHtml = '';

  if (tx.type === 'inflow') {
    document.getElementById('printModalTitle').innerText = 'Sunday Financial Receipt';
    
    documentHtml = `
      <div class="print-header">
        <div class="print-title">HOPE IN CHRIST CHURCH</div>
        <div class="print-subtitle">Sunday Financial Receipt</div>
        <div style="font-size: 0.75rem;">Receipt Date: ${formattedDate}</div>
        <div style="font-size: 0.75rem; color: #555;">ID: ${tx.id}</div>
      </div>
      <div class="print-divider"></div>
      
      <div class="print-row"><strong>Category</strong><strong>Amount</strong></div>
      <div class="print-divider"></div>
      
      <div class="print-row"><span>Tithes Collection</span><span>${formatCurrency(tx.details.tithes || 0)}</span></div>
      <div class="print-row"><span>General Offertory</span><span>${formatCurrency(tx.details.offering || 0)}</span></div>
      <div class="print-row"><span>Special Thanksgiving Offerings</span><span>${formatCurrency(tx.details.specialOffering || 0)}</span></div>
      
      <div class="print-divider"></div>
      <div class="print-row total"><span>TOTAL INFLOW RECEIVED</span><span>${formatCurrency(tx.amount)}</span></div>
      
      <div style="margin-top: 1.5rem; font-size: 0.8rem;">
        <strong>Remarks:</strong> ${tx.description}
      </div>
      
      <div class="print-signatures">
        <div>
          <div class="signature-line">Prepared By (Treasurer)</div>
        </div>
        <div>
          <div class="signature-line">Verified By (Pastor)</div>
        </div>
      </div>
    `;
  } else {
    document.getElementById('printModalTitle').innerText = 'Sunday Cash Voucher';
    
    // Love gift breakdown lines
    let musiciansLine = '';
    const lg = tx.details.loveGifts || {};
    if (lg.worshipLeader) musiciansLine += `<div class="print-row" style="padding-left: 1rem;"><span>- Worship Leader</span><span>${formatCurrency(lg.worshipLeader)}</span></div>`;
    if (lg.drummer) musiciansLine += `<div class="print-row" style="padding-left: 1rem;"><span>- Drummer</span><span>${formatCurrency(lg.drummer)}</span></div>`;
    if (lg.keyboardist) musiciansLine += `<div class="print-row" style="padding-left: 1rem;"><span>- Keyboardist</span><span>${formatCurrency(lg.keyboardist)}</span></div>`;
    if (lg.bassist) musiciansLine += `<div class="print-row" style="padding-left: 1rem;"><span>- Bassist</span><span>${formatCurrency(lg.bassist)}</span></div>`;
    if (lg.guitarist1) musiciansLine += `<div class="print-row" style="padding-left: 1rem;"><span>- Lead Guitarist</span><span>${formatCurrency(lg.guitarist1)}</span></div>`;
    if (lg.guitarist2) musiciansLine += `<div class="print-row" style="padding-left: 1rem;"><span>- Rhythm Guitarist</span><span>${formatCurrency(lg.guitarist2)}</span></div>`;
    
    let backupsLine = '';
    if (tx.details.backupSingersCount > 0) {
      backupsLine = `<div class="print-row" style="padding-left: 1rem;"><span>- Backup Singers (${tx.details.backupSingersCount} heads)</span><span>${formatCurrency(tx.details.backupSingersCount * rates.backupSinger)}</span></div>`;
      if (tx.details.backupSingersNames && tx.details.backupSingersNames.length > 0) {
        backupsLine += `<div style="font-size: 0.75rem; color: #555; padding-left: 2rem;">Names: ${tx.details.backupSingersNames.join(', ')}</div>`;
      }
    }

    documentHtml = `
      <div class="print-header">
        <div class="print-title">HOPE IN CHRIST CHURCH</div>
        <div class="print-subtitle">Cash Outflow Voucher</div>
        <div style="font-size: 0.75rem;">Voucher Date: ${formattedDate}</div>
        <div style="font-size: 0.75rem; color: #555;">ID: ${tx.id}</div>
      </div>
      <div class="print-divider"></div>
      
      <div class="print-row"><strong>Category Details</strong><strong>Amount</strong></div>
      <div class="print-divider"></div>
      
      <div class="print-row" style="font-weight: 500;"><span>Worship Team Love Gifts:</span></div>
      ${musiciansLine}
      ${backupsLine}
      
      <div class="print-divider" style="margin: 0.25rem 0; border-top-style: dotted;"></div>
      <div class="print-row"><span>Saturday Practice Snacks</span><span>${formatCurrency(tx.details.snacks || 0)}</span></div>
      <div class="print-row"><span>Pastor's Love Gift Allowance</span><span>${formatCurrency(tx.details.pastorGift || 0)}</span></div>
      <div class="print-row"><span>Equipment Purchases / Renovations</span><span>${formatCurrency(tx.details.renovationEquipment || 0)}</span></div>
      <div class="print-row"><span>Labor Compensation (Cleaning/Repairs)</span><span>${formatCurrency(tx.details.laborCost || 0)}</span></div>
      <div class="print-row"><span>Music Fellowship Fund</span><span>${formatCurrency(tx.details.musicFellowship || 0)}</span></div>
      
      <div class="print-divider"></div>
      <div class="print-row total"><span>TOTAL CASH DISBURSED</span><span>${formatCurrency(tx.amount)}</span></div>
      
      <div style="margin-top: 1.5rem; font-size: 0.8rem;">
        <strong>Memo:</strong> ${tx.description}
      </div>
      
      <div class="print-signatures">
        <div>
          <div class="signature-line">Prepared By (Treasurer)</div>
        </div>
        <div>
          <div class="signature-line">Received By (Representative)</div>
        </div>
      </div>
    `;
  }

  printableArea.innerHTML = documentHtml;
  openModal('printModalOverlay');
};

triggerPrintBtn.addEventListener('click', () => {
  window.print();
});

// --- DELETE TRANSACTION ---
window.deleteTransaction = function(id) {
  if (confirm('Are you sure you want to delete this transaction record? This cannot be undone.')) {
    ledger = ledger.filter(item => item.id !== id);
    saveLedger();
  }
};

// --- DATA MANAGEMENT (EXPORT / IMPORT) ---

// Export ledger to JSON
document.getElementById('exportBtn').addEventListener('click', () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ledger, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `HIC_Finance_Ledger_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
});

// Import ledger from JSON file trigger
document.getElementById('importBtn').addEventListener('click', () => {
  document.getElementById('importFileInput').click();
});

document.getElementById('importFileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const importedData = JSON.parse(evt.target.result);
      if (Array.isArray(importedData)) {
        if (confirm(`Are you sure you want to load ${importedData.length} records? This will merge with your existing transaction history.`)) {
          // Merge items by filtering out duplicates by id
          const existingIds = new Set(ledger.map(item => item.id));
          const newItems = importedData.filter(item => !existingIds.has(item.id));
          ledger = [...ledger, ...newItems];
          saveLedger();
          alert(`Successfully imported ${newItems.length} new records!`);
        }
      } else {
        alert('Invalid file format. The file must contain a ledger array.');
      }
    } catch (err) {
      alert('Error parsing JSON file. Please make sure it is a valid backup file.');
    }
  };
  reader.readAsText(file);
});

// --- BOOTSTRAP APP ---
// Set initial bindings
filterType.addEventListener('change', renderApp);
document.getElementById('newInflowBtn').addEventListener('click', () => openModal('inflowModal'));
document.getElementById('newOutflowBtn').addEventListener('click', () => openModal('outflowModal'));
document.getElementById('settingsBtn').addEventListener('click', () => openModal('settingsModal'));

// Initialize UI
updateThemeUI();
renderApp();
