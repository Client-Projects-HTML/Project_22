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

ApexScripts.toggleRTL = () => {
  const isRTL = document.documentElement.dir === 'rtl';
  document.documentElement.dir = isRTL ? 'ltr' : 'rtl';
  localStorage.setItem('apexRTL', !isRTL);
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

// Export for Node (Jest) environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApexScripts;
}

// Bind events in browser environment
if (typeof window !== 'undefined') {
  window.ApexScripts = ApexScripts;
  
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
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', ApexScripts.toggleRTL);
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
        const inactiveClasses = ['bg-brand-cardDark', 'border', 'border-neutral-800', 'text-neutral-400'];
        ApexScripts.filterGallery(filter, button, 'filter-btn', 'gallery-card', activeClasses, inactiveClasses);
      });
    });
  });
}
