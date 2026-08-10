/**
 * @jest-environment jsdom
 */

const ApexScripts = require('./main.js');

describe('ApexScripts Template Logic', () => {
  
  beforeEach(() => {
    // Reset document
    document.documentElement.className = '';
    document.documentElement.dir = 'ltr';
    document.body.className = '';
    
    // Clear localStorage
    localStorage.clear();
    
    // Setup mock HTML
    document.body.innerHTML = `
      <div id="mobile-menu-overlay" class="hidden"></div>
      <div id="mobile-menu-drawer" class="hidden"></div>
      
      <i class="theme-sun hidden"></i>
      <i class="theme-moon"></i>
      
      <button class="portfolio-filter-btn bg-brand-red text-white" data-filter="all">All</button>
      <button class="portfolio-filter-btn bg-neutral-200 text-neutral-700" data-filter="engine">Engine</button>
      
      <div class="portfolio-item" data-category="engine" style="display: block;"></div>
      <div class="portfolio-item" data-category="brakes" style="display: block;"></div>
    `;
  });

  test('toggleTheme should toggle dark mode class and save to localStorage', () => {
    // Initial state: not dark
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
    
    // Call toggleTheme
    ApexScripts.toggleTheme();
    
    // Should now be dark
    expect(document.documentElement.classList.contains('dark')).toBeTruthy();
    expect(localStorage.getItem('apexTheme')).toBe('dark');
    
    // Call toggleTheme again
    ApexScripts.toggleTheme();
    
    // Should now be light
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
    expect(localStorage.getItem('apexTheme')).toBe('light');
  });

  test('updateThemeIcons should correctly hide/show sun and moon icons', () => {
    const sun = document.querySelector('.theme-sun');
    const moon = document.querySelector('.theme-moon');
    
    // Set to dark mode
    ApexScripts.updateThemeIcons(true);
    expect(sun.classList.contains('hidden')).toBeFalsy();
    expect(moon.classList.contains('hidden')).toBeTruthy();
    
    // Set to light mode
    ApexScripts.updateThemeIcons(false);
    expect(sun.classList.contains('hidden')).toBeTruthy();
    expect(moon.classList.contains('hidden')).toBeFalsy();
  });

  test('toggleRTL should toggle dir attribute and save to localStorage', () => {
    // Initial state: ltr
    expect(document.documentElement.dir).toBe('ltr');
    
    // Call toggleRTL
    ApexScripts.toggleRTL();
    
    // Should now be rtl
    expect(document.documentElement.dir).toBe('rtl');
    expect(localStorage.getItem('apexRTL')).toBe('true');
  });

  test('openMenu should display mobile drawer and overlay, and lock body scroll', () => {
    const drawer = document.getElementById('mobile-menu-drawer');
    const overlay = document.getElementById('mobile-menu-overlay');
    
    ApexScripts.openMenu();
    
    expect(drawer.classList.contains('hidden')).toBeFalsy();
    expect(drawer.classList.contains('flex')).toBeTruthy();
    expect(overlay.classList.contains('hidden')).toBeFalsy();
    expect(document.body.classList.contains('overflow-hidden')).toBeTruthy();
  });

  test('closeMenu should hide mobile drawer and overlay, and unlock body scroll', () => {
    const drawer = document.getElementById('mobile-menu-drawer');
    const overlay = document.getElementById('mobile-menu-overlay');
    
    // Open it first
    ApexScripts.openMenu();
    
    // Now close it
    ApexScripts.closeMenu();
    
    expect(drawer.classList.contains('hidden')).toBeTruthy();
    expect(drawer.classList.contains('flex')).toBeFalsy();
    expect(overlay.classList.contains('hidden')).toBeTruthy();
    expect(document.body.classList.contains('overflow-hidden')).toBeFalsy();
  });

  test('filterGallery should correctly hide and show items based on category', () => {
    const filterBtn = document.querySelector('button[data-filter="engine"]');
    const activeClasses = ['bg-brand-red', 'text-white'];
    const inactiveClasses = ['bg-neutral-200', 'text-neutral-700'];
    
    ApexScripts.filterGallery('engine', filterBtn, 'portfolio-filter-btn', 'portfolio-item', activeClasses, inactiveClasses);
    
    // Button styling should update
    expect(filterBtn.classList.contains('bg-brand-red')).toBeTruthy();
    
    // Items should filter
    const engineItem = document.querySelector('.portfolio-item[data-category="engine"]');
    const brakesItem = document.querySelector('.portfolio-item[data-category="brakes"]');
    
    expect(engineItem.style.display).toBe('block');
    expect(brakesItem.style.display).toBe('none');
  });

});
