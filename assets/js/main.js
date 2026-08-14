// Export module for Jest testing, while keeping it safe for the browser
const ApexScripts = {};

ApexScripts.updateThemeIcons = (isDark) => {
  document.querySelectorAll('.theme-sun').forEach(icon => {
    if (isDark) icon.classList.remove('hidden');
    else icon.classList.add('hidden');
  });
  document.querySelectorAll('.theme-moon').forEach(icon => {
    if (isDark) icon.classList.add('hidden');
    else icon.classList.remove('hidden');
  });
};

ApexScripts.toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('apexTheme', isDark ? 'dark' : 'light');
  ApexScripts.updateThemeIcons(isDark);
};

let lastRTLToggleTime = 0;

ApexScripts.updateRTLUI = (isRTL) => {
  document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
    if (isRTL) {
      btn.classList.add('border-brand-red', 'text-brand-red', 'bg-brand-red/10');
    } else {
      btn.classList.remove('border-brand-red', 'text-brand-red', 'bg-brand-red/10');
    }
  });
};

ApexScripts.toggleRTL = () => {
  const now = Date.now();
  if (now - lastRTLToggleTime < 100) return;
  lastRTLToggleTime = now;

  const currentDir = document.documentElement.getAttribute('dir') || document.documentElement.dir || 'ltr';
  const isRTL = currentDir === 'rtl';
  const newDir = isRTL ? 'ltr' : 'rtl';

  document.documentElement.dir = newDir;
  document.documentElement.setAttribute('dir', newDir);
  localStorage.setItem('apexDir', newDir);
  localStorage.setItem('apexRTL', (!isRTL).toString());
  
  ApexScripts.updateRTLUI(!isRTL);
};

ApexScripts.toggleNotifications = (e) => {
  if (e) e.stopPropagation();
  const notifMenu = document.getElementById('notificationsDropdown');
  if (notifMenu) {
    notifMenu.classList.toggle('hidden');
  }
};

ApexScripts.clearNotifications = () => {
  const notifBadge = document.getElementById('notifBadge');
  if (notifBadge) notifBadge.classList.add('hidden');
  const notifList = document.getElementById('notifList');
  if (notifList) {
    notifList.innerHTML = `<p class="text-xs text-neutral-400 text-center py-4">No unread notifications.</p>`;
  }
};

ApexScripts.dismissNotification = (btn) => {
  const item = btn.closest('.p-2\\.5') || btn.parentElement;
  if (item) item.remove();
  const notifList = document.getElementById('notifList');
  const notifBadge = document.getElementById('notifBadge');
  if (notifList) {
    const count = notifList.querySelectorAll('.p-2\\.5').length;
    if (count === 0) {
      notifList.innerHTML = `<p class="text-xs text-neutral-400 text-center py-4">No unread notifications.</p>`;
      if (notifBadge) notifBadge.classList.add('hidden');
    } else if (notifBadge) {
      notifBadge.textContent = count;
    }
  }
};

ApexScripts.openMenu = () => {
  const menuDrawer = document.getElementById('mobile-menu-drawer');
  const menuOverlay = document.getElementById('mobile-menu-overlay');
  if (menuOverlay && menuDrawer) {
    menuOverlay.classList.remove('hidden');
    menuDrawer.classList.remove('hidden');
    menuDrawer.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  }
};

ApexScripts.closeMenu = () => {
  const menuDrawer = document.getElementById('mobile-menu-drawer');
  const menuOverlay = document.getElementById('mobile-menu-overlay');
  if (menuOverlay && menuDrawer) {
    menuOverlay.classList.add('hidden');
    menuDrawer.classList.add('hidden');
    menuDrawer.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }
};

ApexScripts.toggleDashboardSidebar = () => {
  const sidebar = document.getElementById('dashboard-sidebar');
  const overlay = document.getElementById('dashboard-overlay');
  if (sidebar && overlay) {
    if (sidebar.classList.contains('translate-x-full')) {
      sidebar.classList.remove('translate-x-full');
      overlay.classList.remove('hidden');
    } else {
      sidebar.classList.add('translate-x-full');
      overlay.classList.add('hidden');
    }
  }
};

ApexScripts.filterGallery = (filter, button, buttonsClass, itemsClass, activeClasses, inactiveClasses) => {
  document.querySelectorAll('.' + buttonsClass).forEach(btn => {
    btn.classList.remove(...activeClasses);
    btn.classList.add(...inactiveClasses);
  });

  button.classList.remove(...inactiveClasses);
  button.classList.add(...activeClasses);

  document.querySelectorAll('.' + itemsClass).forEach(item => {
    if (filter === 'all' || item.getAttribute('data-category') === filter) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
};

// Toast Notification System
ApexScripts.showToast = (message, type = 'success') => {
  let toast = document.getElementById('dashboardToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'dashboardToast';
    toast.className = 'fixed bottom-5 right-5 rtl:right-auto rtl:left-5 z-[70] px-5 py-3.5 rounded-2xl bg-brand-charcoal text-white dark:bg-white dark:text-brand-charcoal shadow-2xl flex items-center gap-3 text-xs font-bold transition-all transform translate-y-10 opacity-0 pointer-events-none';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="w-2.5 h-2.5 rounded-full ${type === 'success' ? 'bg-emerald-500' : 'bg-brand-red'} animate-ping"></span> ${message}`;
  toast.classList.remove('translate-y-10', 'opacity-0', 'pointer-events-none');
  
  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0', 'pointer-events-none');
  }, 3500);
};

// Reschedule Modal Logic
ApexScripts.openRescheduleModal = (serviceName, vehicleName, currentDate, currentTime) => {
  const modal = document.getElementById('rescheduleModal');
  if (!modal) return;
  const sName = document.getElementById('rescheduleServiceName');
  const vName = document.getElementById('rescheduleVehicleName');
  if (sName) sName.textContent = serviceName || 'Brake Pad Replacement';
  if (vName) vName.textContent = vehicleName || '2021 Ford F-150';
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

ApexScripts.closeRescheduleModal = () => {
  const modal = document.getElementById('rescheduleModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

ApexScripts.submitReschedule = (e) => {
  if (e) e.preventDefault();
  const newDate = document.getElementById('rescheduleDate')?.value || '2026-08-20';
  const newTime = document.getElementById('rescheduleTime')?.value || '10:00 AM - 12:00 PM';
  
  const parts = newDate.split('-');
  const year = parts[0] || '2026';
  const monthIdx = parseInt(parts[1] || '8', 10) - 1;
  const day = parts[2] || '20';
  const monthNames = ["AUG", "SEP", "OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"];
  const d = new Date(year, monthIdx, day);
  const monthStr = monthNames[d.getMonth()] || "AUG";
  const dayStr = d.getDate() || 20;

  const monthEl = document.getElementById('apptMonthDisplay');
  const dayEl = document.getElementById('apptDayDisplay');
  const timeEl = document.getElementById('apptTimeDisplay');

  if (monthEl) monthEl.textContent = monthStr;
  if (dayEl) dayEl.textContent = dayStr;
  if (timeEl) timeEl.textContent = newTime;

  ApexScripts.closeRescheduleModal();
  ApexScripts.showToast(`✅ Appointment rescheduled to ${monthStr} ${dayStr} at ${newTime}!`);
  
  const notifList = document.getElementById('notifList');
  const notifBadge = document.getElementById('notifBadge');
  if (notifList) {
    const emptyMsg = notifList.querySelector('p');
    if (emptyMsg && emptyMsg.textContent.includes('No unread')) notifList.innerHTML = '';
    const newNotif = document.createElement('div');
    newNotif.className = "p-2.5 bg-neutral-50 dark:bg-neutral-900/60 rounded-xl border border-neutral-200 dark:border-neutral-800/80 flex items-start gap-2.5 relative group";
    newNotif.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold text-brand-charcoal dark:text-white">Appointment Rescheduled</p>
        <p class="text-[11px] text-neutral-500 dark:text-neutral-400">Brake Pad Replacement moved to ${monthStr} ${dayStr}.</p>
        <span class="text-[9px] text-neutral-400 font-mono">Just now</span>
      </div>
      <button type="button" onclick="dismissNotification(this)" class="text-neutral-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1">
        <i data-lucide="x" class="w-3 h-3"></i>
      </button>
    `;
    notifList.insertBefore(newNotif, notifList.firstChild);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
  if (notifBadge) {
    notifBadge.classList.remove('hidden');
    const count = parseInt(notifBadge.textContent || '0') + 1;
    notifBadge.textContent = count;
  }
};

// PDF Modal Logic
ApexScripts.openPdfModal = (invoiceNum, dateStr, vehicleStr, serviceStr, costStr) => {
  const modal = document.getElementById('viewPdfModal');
  if (!modal) return;
  
  const invEl = document.getElementById('pdfInvoiceNum');
  const dateEl = document.getElementById('pdfDate');
  const vehEl = document.getElementById('pdfVehicle');
  const servEl = document.getElementById('pdfService');
  const costEl = document.getElementById('pdfTotalCost');

  if (invEl) invEl.textContent = invoiceNum || '#INV-2026-0312';
  if (dateEl) dateEl.textContent = dateStr || 'Mar 12, 2026';
  if (vehEl) vehEl.textContent = vehicleStr || '2018 Toyota Camry';
  if (servEl) servEl.textContent = serviceStr || 'Full Synthetic Oil Change';
  if (costEl) costEl.textContent = costStr || '$69.99';
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

ApexScripts.closePdfModal = () => {
  const modal = document.getElementById('viewPdfModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

ApexScripts.downloadPdfFile = (invoiceNum) => {
  const inv = (invoiceNum || 'INV-2026-0312').replace('#', '');
  ApexScripts.showToast(`📄 Downloading Apex_Invoice_${inv}.pdf...`);
  if (typeof window !== 'undefined' && window.URL && window.Blob) {
    const blob = new Blob([`APEX AUTO CARE OFFICIAL INVOICE\nInvoice #: ${inv}\nCustomer: John Doe\nStatus: PAID`], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Apex_Invoice_${inv}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

// Invoices Export Modal Logic
ApexScripts.openInvoicesModal = () => {
  const modal = document.getElementById('invoicesExportModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

ApexScripts.closeInvoicesModal = () => {
  const modal = document.getElementById('invoicesExportModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

let currentExportFormat = 'zip';

ApexScripts.selectExportFormat = (fmt) => {
  currentExportFormat = fmt;
  const buttons = document.querySelectorAll('.export-fmt-btn');
  buttons.forEach(btn => {
    btn.className = 'p-3 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 text-center transition-all export-fmt-btn';
  });

  let activeBtnId = 'fmtZipBtn';
  if (fmt === 'pdf') activeBtnId = 'fmtPdfBtn';
  if (fmt === 'csv') activeBtnId = 'fmtCsvBtn';
  const activeBtn = document.getElementById(activeBtnId);
  if (activeBtn) {
    activeBtn.className = 'p-3 bg-brand-red text-white font-bold rounded-xl border border-brand-red text-xs text-center shadow-md transition-all export-fmt-btn';
  }
};

ApexScripts.downloadInvoicesBundle = (fmt) => {
  const format = fmt || currentExportFormat || 'zip';
  ApexScripts.closeInvoicesModal();

  let fileContent = "";
  let fileName = `Invoices_Export_2026.${format}`;
  let mimeType = "text/plain";

  if (format === 'csv') {
    mimeType = "text/csv";
    fileContent = "Invoice Number,Date,Vehicle,Service Details,Mileage,Cost,Status\n" +
                  "#INV-2026-0312,2026-03-12,2018 Toyota Camry,Full Synthetic Oil Change,42500 mi,$69.99,PAID\n" +
                  "#INV-2025-1005,2025-10-05,2018 Toyota Camry,Tire Rotation & Alignment,36120 mi,$120.00,PAID\n" +
                  "#INV-2025-0618,2025-06-18,2021 Ford F-150,Annual Diagnostic Check,22000 mi,$45.00,PAID\n";
  } else if (format === 'pdf') {
    mimeType = "application/pdf";
    fileName = "Invoices_Summary_2026.pdf";
    fileContent = "%PDF-1.4 APEX AUTO CARE INVOICES SUMMARY 2026\n" +
                  "Total Services: 3 Records\nTotal Paid: $234.99\n" +
                  "1. #INV-2026-0312 | Mar 12, 2026 | Toyota Camry | $69.99\n" +
                  "2. #INV-2025-1005 | Oct 05, 2025 | Toyota Camry | $120.00\n" +
                  "3. #INV-2025-0618 | Jun 18, 2025 | Ford F-150 | $45.00\n";
  } else {
    fileName = "Invoices_Bundle_2026.zip";
    mimeType = "application/zip";
    fileContent = "APEX AUTO CARE INVOICE ZIP BUNDLE CONTAINING 3 INVOICE STATEMENTS";
  }

  // Trigger browser download
  if (typeof document !== 'undefined' && document.createElement) {
    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  ApexScripts.showToast(`📦 Exporting service invoices (${fileName})...`);
};

// Add Vehicle Modal Logic
ApexScripts.openAddVehicleModal = () => {
  const modal = document.getElementById('addVehicleModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

ApexScripts.closeAddVehicleModal = () => {
  const modal = document.getElementById('addVehicleModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

ApexScripts.submitAddVehicle = (e) => {
  if (e) e.preventDefault();
  const year = document.getElementById('vehYear')?.value || '2023';
  const make = document.getElementById('vehMake')?.value || 'Honda';
  const model = document.getElementById('vehModel')?.value || 'Civic';
  const license = document.getElementById('vehLicense')?.value || '8XYZ456';
  const vehicleName = `${year} ${make} ${model}`;

  // 1. Append new vehicle card to My Vehicles container (#myVehiclesList)
  const vehList = document.getElementById('myVehiclesList');
  if (vehList) {
    const newCard = document.createElement('div');
    newCard.className = "bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-2xl flex items-center gap-4 transition-all";
    newCard.innerHTML = `
      <div class="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
        <i data-lucide="car" class="w-6 h-6"></i>
      </div>
      <div>
        <h4 class="text-brand-charcoal dark:text-white font-bold text-sm">${vehicleName}</h4>
        <p class="text-xs text-neutral-500">License: ${license}</p>
      </div>
    `;
    vehList.appendChild(newCard);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // 2. Add as selected option in booking dropdowns (#bookVehicle)
  const bookSelects = document.querySelectorAll('#bookVehicle');
  bookSelects.forEach(select => {
    const opt = document.createElement('option');
    opt.value = vehicleName;
    opt.textContent = `${vehicleName} (Lic # ${license})`;
    opt.selected = true;
    select.insertBefore(opt, select.lastElementChild);
  });

  ApexScripts.closeAddVehicleModal();
  ApexScripts.showToast(`✅ ${vehicleName} registered to My Garage!`);
};

// In-Dashboard Booking Handler
ApexScripts.handleInDashboardBooking = (e) => {
  if (e) e.preventDefault();
  const vehicle = document.getElementById('bookVehicle')?.value || '2018 Toyota Camry';
  const service = document.getElementById('bookService')?.value || 'Full Synthetic Oil Change';
  const dateVal = document.getElementById('bookDate')?.value || '2026-08-20';
  const timeVal = document.getElementById('bookTime')?.value || '09:00 AM';

  // Format month and day
  let monthStr = "AUG";
  let dayStr = "20";
  if (dateVal) {
    const d = new Date(dateVal + 'T00:00:00');
    if (!isNaN(d)) {
      monthStr = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      dayStr = d.getDate();
    }
  }

  // 1. Append row to Upcoming Appointments Table (#upcomingAppointmentsTableBody)
  const tbody = document.getElementById('upcomingAppointmentsTableBody');
  if (tbody) {
    const tr = document.createElement('tr');
    tr.className = "hover:bg-neutral-200 dark:bg-neutral-800/50 transition-colors";
    tr.innerHTML = `
      <td class="p-4 align-top">
        <div class="bg-brand-red/10 text-brand-red rounded-lg p-2 text-center w-14">
          <span class="block text-xs font-bold uppercase">${monthStr}</span>
          <span class="block text-lg font-serif font-bold">${dayStr}</span>
        </div>
      </td>
      <td class="p-4 align-top">
        <p class="text-sm font-bold text-brand-charcoal dark:text-white mb-1">${service}</p>
        <p class="text-xs text-neutral-500 dark:text-neutral-400">${vehicle}</p>
      </td>
      <td class="p-4 align-top hidden sm:table-cell">
        <p class="text-sm text-neutral-600 dark:text-neutral-300">${timeVal}</p>
        <p class="text-[11px] font-mono text-emerald-400 mt-1 uppercase">Confirmed</p>
      </td>
      <td class="p-4 align-top text-right">
        <button type="button" onclick="openRescheduleModal('${service.replace(/'/g, "\\'")}', '${vehicle.replace(/'/g, "\\'")}', '${monthStr} ${dayStr}', '${timeVal}')" class="px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-brand-charcoal dark:hover:text-white hover:border-neutral-500 rounded text-xs font-semibold transition-colors">Reschedule</button>
      </td>
    `;
    tbody.insertBefore(tr, tbody.firstChild);
  }

  // 2. Add notification to bell dropdown
  const notifList = document.getElementById('notifList');
  const notifBadge = document.getElementById('notifBadge');
  if (notifList) {
    const emptyMsg = notifList.querySelector('p');
    if (emptyMsg && emptyMsg.textContent.includes('No unread')) notifList.innerHTML = '';
    const newNotif = document.createElement('div');
    newNotif.className = "p-2.5 bg-neutral-50 dark:bg-neutral-900/60 rounded-xl border border-neutral-200 dark:border-neutral-800/80 flex items-start gap-2.5 relative group";
    newNotif.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold text-brand-charcoal dark:text-white">Appointment Confirmed</p>
        <p class="text-[11px] text-neutral-500 dark:text-neutral-400">${service} on ${monthStr} ${dayStr} at ${timeVal}.</p>
        <span class="text-[9px] text-neutral-400 font-mono">Just now</span>
      </div>
      <button type="button" onclick="dismissNotification(this)" class="text-neutral-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1">
        <i data-lucide="x" class="w-3 h-3"></i>
      </button>
    `;
    notifList.insertBefore(newNotif, notifList.firstChild);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
  if (notifBadge) {
    notifBadge.classList.remove('hidden');
    const count = parseInt(notifBadge.textContent || '0') + 1;
    notifBadge.textContent = count;
  }

  ApexScripts.showToast(`✅ Appointment Booked & Added to Upcoming Appointments!`);

  if (typeof switchSection === 'function') {
    switchSection('overview');
  }
};

// Export for Node (Jest) environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApexScripts;
}

// Bind events in browser environment
if (typeof window !== 'undefined') {
  window.ApexScripts = ApexScripts;
  window.toggleDirectionRTL = ApexScripts.toggleRTL;
  window.toggleDashboardSidebar = ApexScripts.toggleDashboardSidebar;
  window.toggleNotificationsMenu = ApexScripts.toggleNotifications;
  window.clearNotifications = ApexScripts.clearNotifications;
  window.dismissNotification = ApexScripts.dismissNotification;
  window.openRescheduleModal = ApexScripts.openRescheduleModal;
  window.closeRescheduleModal = ApexScripts.closeRescheduleModal;
  window.submitReschedule = ApexScripts.submitReschedule;
  window.openPdfModal = ApexScripts.openPdfModal;
  window.closePdfModal = ApexScripts.closePdfModal;
  window.downloadPdfFile = ApexScripts.downloadPdfFile;
  window.openInvoicesModal = ApexScripts.openInvoicesModal;
  window.closeInvoicesModal = ApexScripts.closeInvoicesModal;
  window.downloadInvoicesBundle = ApexScripts.downloadInvoicesBundle;
  window.selectExportFormat = ApexScripts.selectExportFormat;
  window.openAddVehicleModal = ApexScripts.openAddVehicleModal;
  window.closeAddVehicleModal = ApexScripts.closeAddVehicleModal;
  window.submitAddVehicle = ApexScripts.submitAddVehicle;
  window.handleInDashboardBooking = ApexScripts.handleInDashboardBooking;

  
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  
    // Theme
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    ApexScripts.updateThemeIcons(isCurrentlyDark);
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', ApexScripts.toggleTheme);
    });
  
    // RTL
    const isCurrentlyRTL = document.documentElement.getAttribute('dir') === 'rtl' || document.documentElement.dir === 'rtl';
    ApexScripts.updateRTLUI(isCurrentlyRTL);
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', ApexScripts.toggleRTL);
    });

    // Close notifications dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const notifMenu = document.getElementById('notificationsDropdown');
      const notifBtn = document.getElementById('notifBellBtn');
      if (notifMenu && !notifMenu.classList.contains('hidden')) {
        if (!notifMenu.contains(e.target) && (!notifBtn || !notifBtn.contains(e.target))) {
          notifMenu.classList.add('hidden');
        }
      }
    });
  
    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuClose = document.getElementById('mobile-menu-close');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
  
    if (menuBtn) menuBtn.addEventListener('click', ApexScripts.openMenu);
    if (menuClose) menuClose.addEventListener('click', ApexScripts.closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', ApexScripts.closeMenu);
  
    // Gallery Filters for index.html
    document.querySelectorAll('.portfolio-filter-btn').forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        const activeClasses = ['bg-brand-red', 'text-white'];
        const inactiveClasses = ['bg-neutral-200', 'dark:bg-neutral-800', 'text-neutral-700', 'dark:text-neutral-300'];
        ApexScripts.filterGallery(filter, button, 'portfolio-filter-btn', 'portfolio-item', activeClasses, inactiveClasses);
      });
    });
  
    // Gallery Filters for gallery.html
    document.querySelectorAll('.filter-btn').forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        const activeClasses = ['bg-brand-red', 'text-white', 'shadow-lg', 'shadow-brand-red/20'];
        const inactiveClasses = ['bg-neutral-100', 'dark:bg-brand-cardDark', 'border', 'border-neutral-200', 'dark:border-neutral-800', 'text-neutral-600', 'dark:text-neutral-400'];
        ApexScripts.filterGallery(filter, button, 'filter-btn', 'gallery-card', activeClasses, inactiveClasses);
      });
    });
  });
}

