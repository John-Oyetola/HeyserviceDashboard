// dashboard.js — All dashboard page logic extracted from inline script
document.addEventListener('DOMContentLoaded', () => {
    const role = localStorage.getItem('heyServiceRole') || 'user';
    const badge = document.getElementById('roleBadge');
    if (badge) badge.textContent = role === 'engineer' ? 'Engineer Mode' : 'Client Mode';

    // Render all branded sites
    renderAllSites();

    // Inject breadcrumb "Add New Site" for engineers only
    if (role === 'engineer') {
        const bc = document.getElementById('dashBreadcrumb');
        const sep = document.createElement('li');
        sep.className = 'breadcrumb-sep';
        sep.textContent = '/';
        const link = document.createElement('li');
        link.innerHTML = '<a href="#" onclick="openAddSiteModal(); return false;" class="breadcrumb-link">Add New Site</a>';
        bc.appendChild(sep);
        bc.appendChild(link);
    }
});

// === Render All Sites ===
function renderAllSites() {
    const container = document.getElementById('allSitesContainer');
    if (!container) return;
    container.innerHTML = '';
    const role = localStorage.getItem('heyServiceRole') || 'user';
    const assignedBrand = localStorage.getItem('heyServiceBrand') || 'all';
    const company = localStorage.getItem('heyServiceCompany') || '';
    const grouped = getGroupedByBrand();

    // If user has a specific brand assigned, show a welcome banner
    if (role === 'user' && assignedBrand && assignedBrand !== 'all') {
        const banner = document.createElement('div');
        banner.className = 'welcome-banner';
        banner.innerHTML = `
            <div class="welcome-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <div>
                <h3 class="welcome-title">Welcome, ${company || assignedBrand} Manager</h3>
                <p class="welcome-text">You are viewing all <strong>${assignedBrand}</strong> locations assigned to your account.</p>
            </div>
        `;
        container.appendChild(banner);
    }

    // Filter brands: users only see their assigned brand
    const brandsToShow = (role === 'user' && assignedBrand && assignedBrand !== 'all')
        ? { [assignedBrand]: grouped[assignedBrand] || [] }
        : grouped;

    for (const brand in brandsToShow) {
        if (!brandsToShow[brand] || brandsToShow[brand].length === 0) continue;

        // Brand header
        const header = document.createElement('h2');
        header.className = 'brand-header';
        header.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> ${brand}`;
        container.appendChild(header);

        // Grid wrapper
        const grid = document.createElement('div');
        grid.className = 'grid dashboard-grid';
        
        brandsToShow[brand].forEach(site => {
            const status = getSiteStatus(site.grease);
            const greaseUm = getGreaseUm(site.grease);
            const demisterLabel = site.demister ? 'Active' : 'Disabled';
            const demisterColor = site.demister ? 'var(--color-success)' : 'var(--color-danger)';
            const tempColor = site.temp > 38 ? 'var(--color-danger)' : site.temp > 30 ? 'var(--color-warning)' : 'var(--text-main)';

            const card = document.createElement('a');
            card.href = 'custom-site.html?id=' + encodeURIComponent(site.id);
            card.className = 'card site-card site-card-link';

            card.innerHTML = `
                <div class="site-card-header">
                    <div>
                        <h3 class="site-card-title">${site.brand}</h3>
                        <span class="site-card-location">📍 ${site.location}</span>
                    </div>
                    <span class="status-indicator ${status.class}">
                        <span class="status-dot" style="background-color: ${status.color};"></span>
                        ${status.label}
                    </span>
                </div>
                <div class="site-card-stats">
                    <div>Temp: <strong style="color:${tempColor};">${site.temp}°C</strong></div>
                    <div>Wind: <strong style="color:var(--text-main);">${site.wind} knots</strong></div>
                    <div>Demister: <strong style="color:${demisterColor};">${demisterLabel}</strong></div>
                    <div>Grease: <strong style="color:${status.color};">${greaseUm}</strong></div>
                </div>
                <div class="site-card-footer">
                    <span>Airflow: <strong style="color: ${site.airflow === 'GOOD' ? 'var(--color-success)' : site.airflow === 'MODERATE' ? 'var(--color-warning)' : 'var(--color-danger)'}">${site.airflow}</strong></span>
                    <span>Grease: ${site.grease}%</span>
                </div>
                ${role === 'engineer' ? `<button class="site-delete-btn" onclick="event.preventDefault(); event.stopPropagation(); deleteSite('${site.id}');" title="Remove Site">&times;</button>` : ''}
            `;
            grid.appendChild(card);
        });

        container.appendChild(grid);
    }

    // Also render any user-created custom sites
    renderCustomSites();
}

function renderCustomSites() {
    const customSites = JSON.parse(localStorage.getItem('heyCustomSites') || '[]');
    if (customSites.length === 0) return;
    const container = document.getElementById('allSitesContainer');
    const role = localStorage.getItem('heyServiceRole') || 'user';

    const header = document.createElement('h2');
    header.className = 'brand-header';
    header.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> Custom Sites`;
    container.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'grid dashboard-grid';

    customSites.forEach(site => {
        const card = document.createElement('a');
        card.href = 'custom-site.html?id=' + encodeURIComponent(site.id);
        card.className = 'card site-card site-card-link';
        card.innerHTML = `
            <div class="site-card-header">
                <div>
                    <h3 class="site-card-title">${site.name}</h3>
                    <span class="site-card-location">📍 ${site.location}</span>
                </div>
                <span class="status-indicator status-safe">
                    <span class="status-dot"></span>
                    Safe
                </span>
            </div>
            <div class="site-card-stats">
                <div>Temp: <strong style="color:var(--text-main);">30°C</strong></div>
                <div>Wind: <strong style="color:var(--text-main);">12 knots</strong></div>
                <div>Demister: <strong style="color:var(--color-success);">Active</strong></div>
                <div>Grease: <strong style="color:var(--color-success);">100um</strong></div>
            </div>
            <div class="site-card-footer">
                <span>Airflow: <strong style="color: var(--color-success)">GOOD</strong></span>
                <span>Grease: 10%</span>
            </div>
            ${role === 'engineer' ? `<button class="site-delete-btn" onclick="event.preventDefault(); event.stopPropagation(); deleteCustomSite('${site.id}');" title="Remove Site">&times;</button>` : ''}
        `;
        grid.appendChild(card);
    });
    container.appendChild(grid);
}

function deleteSite(id) {
    if (!confirm('Remove this site from the dashboard?')) return;
    const idx = SITE_DATA.findIndex(s => s.id === id);
    if (idx !== -1) {
        SITE_DATA.splice(idx, 1);
        let removed = JSON.parse(localStorage.getItem('heyRemovedSites') || '[]');
        removed.push(id);
        localStorage.setItem('heyRemovedSites', JSON.stringify(removed));
    }
    renderAllSites();
}

function deleteCustomSite(id) {
    if (!confirm('Remove this custom site from the dashboard?')) return;
    let customSites = JSON.parse(localStorage.getItem('heyCustomSites') || '[]');
    customSites = customSites.filter(s => s.id !== id);
    localStorage.setItem('heyCustomSites', JSON.stringify(customSites));
    renderAllSites();
}

// Apply persistent removals on load
(function applyRemovals() {
    const removed = JSON.parse(localStorage.getItem('heyRemovedSites') || '[]');
    removed.forEach(id => {
        const idx = SITE_DATA.findIndex(s => s.id === id);
        if (idx !== -1) SITE_DATA.splice(idx, 1);
    });
})();

// === Add New Site Modal ===
function openAddSiteModal() {
    const modal = document.getElementById('addSiteModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeAddSiteModal() {
    const modal = document.getElementById('addSiteModal');
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
}

document.getElementById('addSiteModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeAddSiteModal();
});

document.getElementById('addSiteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('newSiteName').value.trim();
    const location = document.getElementById('newSiteLocation').value.trim();
    if (!name || !location) return;

    const id = 'custom_' + Date.now();
    const customSites = JSON.parse(localStorage.getItem('heyCustomSites') || '[]');
    customSites.push({ id, name, location, created: new Date().toISOString() });
    localStorage.setItem('heyCustomSites', JSON.stringify(customSites));

    e.target.reset();
    closeAddSiteModal();
    renderAllSites();
});

// === Daily Alarm Summary System ===
function buildAlarmSummary() {
    const container = document.getElementById('alarmBrandList');
    if (!container) return;
    container.innerHTML = '';

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('summaryDateLabel').textContent = 'Report for: ' + dateStr;

    const grouped = getGroupedByBrand();

    for (const brand in grouped) {
        const sites = grouped[brand];
        let safeCount = 0, warnCount = 0, dangerCount = 0;
        sites.forEach(s => {
            const st = getSiteStatus(s.grease);
            if (st.label === 'Safe') safeCount++;
            else if (st.label === 'Warning') warnCount++;
            else dangerCount++;
        });

        let brandBg, brandColor, brandLabel;
        if (dangerCount > 0) {
            brandBg = 'rgba(198,40,40,0.08)'; brandColor = 'var(--color-danger)'; brandLabel = dangerCount + ' Danger';
        } else if (warnCount > 0) {
            brandBg = 'rgba(245,124,0,0.08)'; brandColor = 'var(--color-warning)'; brandLabel = warnCount + ' Warning';
        } else {
            brandBg = 'rgba(46,125,50,0.08)'; brandColor = 'var(--color-success)'; brandLabel = 'All Safe';
        }

        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'margin-bottom: 0.6rem;';

        const row = document.createElement('div');
        row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 1rem; padding: 0.7rem 0.8rem; background: ' + brandBg + '; border-radius: 8px; cursor: pointer; transition: background 0.2s; user-select: none;';
        row.innerHTML = `
            <span style="display: flex; align-items: center; gap: 0.4rem;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="alarm-chevron" style="transition: transform 0.25s;">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                ${brand}
            </span>
            <span style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem;">
                <span class="text-success">${safeCount} ✓</span>
                ${warnCount > 0 ? '<span class="text-warning">' + warnCount + ' ⚠</span>' : ''}
                ${dangerCount > 0 ? '<span class="text-danger">' + dangerCount + ' ✕</span>' : ''}
            </span>
        `;

        const panel = document.createElement('div');
        panel.style.cssText = 'display: none; padding: 0.6rem 0 0 0;';

        sites.forEach(s => {
            const st = getSiteStatus(s.grease);
            const um = getGreaseUm(s.grease);
            let statusBg;
            if (st.label === 'Safe') statusBg = 'rgba(46,125,50,0.06)';
            else if (st.label === 'Warning') statusBg = 'rgba(245,124,0,0.06)';
            else statusBg = 'rgba(198,40,40,0.06)';

            const loc = document.createElement('div');
            loc.style.cssText = 'background: ' + statusBg + '; border-left: 3px solid ' + st.colorHex + '; border-radius: 0 6px 6px 0; padding: 0.6rem 0.8rem; margin-bottom: 0.5rem;';
            loc.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                    <strong style="font-size: 0.9rem; color: var(--text-main);">📍 ${s.location}</strong>
                    <span style="color: ${st.color}; font-weight: 700; font-size: 0.8rem; padding: 0.15rem 0.5rem; background: white; border-radius: 4px; border: 1px solid ${st.colorHex}20;">${st.label}</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.3rem; font-size: 0.78rem; color: var(--text-muted);">
                    <div>Temp: <strong>${s.temp}°C</strong></div>
                    <div>Wind: <strong>${s.wind} kn</strong></div>
                    <div>Grease: <strong style="color: ${st.color};">${s.grease}% (${um})</strong></div>
                    <div>Demister: <strong style="color: ${s.demister ? 'var(--color-success)' : 'var(--color-danger)'};">${s.demister ? 'ON' : 'OFF'}</strong></div>
                    <div>Airflow: <strong style="color: ${s.airflow === 'GOOD' ? 'var(--color-success)' : s.airflow === 'MODERATE' ? 'var(--color-warning)' : 'var(--color-danger)'};">${s.airflow}</strong></div>
                    <div>Video: <strong>${s.grease <= 45 ? 'Clean' : s.grease <= 80 ? 'Midlevel' : 'Dirty'}</strong></div>
                </div>
            `;
            panel.appendChild(loc);
        });

        row.addEventListener('click', () => {
            const isOpen = panel.style.display !== 'none';
            panel.style.display = isOpen ? 'none' : 'block';
            const chevron = row.querySelector('.alarm-chevron');
            chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        });

        wrapper.appendChild(row);
        wrapper.appendChild(panel);
        container.appendChild(wrapper);
    }
}

function openAlarmSummary() {
    buildAlarmSummary();
    const modal = document.getElementById('alarmSummaryModal');
    modal.style.display = 'flex';
}

// Override main.js alarm logic with our dynamic version
document.addEventListener('DOMContentLoaded', () => {
    const alarmBtn = document.getElementById('alarmToggle');
    if (alarmBtn && localStorage.getItem('heyServiceRole') === 'engineer') {
        const newBtn = alarmBtn.cloneNode(true);
        alarmBtn.parentNode.replaceChild(newBtn, alarmBtn);
        newBtn.style.display = 'block';
        newBtn.addEventListener('click', openAlarmSummary);

        if (!sessionStorage.getItem('engineerAlarmSeen')) {
            setTimeout(() => {
                openAlarmSummary();
                sessionStorage.setItem('engineerAlarmSeen', 'true');
            }, 1200);
        }
    }
});
