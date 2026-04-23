// custom-site.js — Dynamic site data population for custom-site.html
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const siteId = params.get('id');
    if (!siteId) return;

    // Try registered site data first, then custom localStorage sites
    let site = getSiteById(siteId);
    let isCustom = false;

    if (!site) {
        // Check custom sites
        const customSites = JSON.parse(localStorage.getItem('heyCustomSites') || '[]');
        const custom = customSites.find(s => s.id === siteId);
        if (custom) {
            site = { brand: custom.name, location: custom.location, grease: 10, temp: 30, wind: 12, demister: true, airflow: 'GOOD' };
            isCustom = true;
        }
    }

    if (!site) return;

    // Compute derived values
    const status = getSiteStatus(site.grease);
    const greaseUm = getGreaseUm(site.grease);
    const videoSrc = getSiteVideo(site.grease);
    const gaugeRot = getGaugeRotation(site.grease);
    const displayName = site.brand + ' — ' + site.location;

    // Page title
    document.title = site.brand + ' (' + site.location + ') | Hey Service Dashboard';

    // Header & breadcrumb
    document.getElementById('siteTitle').textContent = site.brand;
    document.getElementById('siteLocation').textContent = '📍 ' + site.location;
    document.getElementById('breadcrumbSiteName').textContent = site.brand + ' — ' + site.location;

    // Status badge
    const badge = document.getElementById('statusBadge');
    badge.className = 'status-indicator ' + status.class;
    document.getElementById('statusDot').style.backgroundColor = status.color;
    document.getElementById('statusLabel').textContent = status.label + ' State';

    // Gauge
    document.getElementById('gaugeNeedle').style.transform = 'rotate(' + gaugeRot + 'deg)';
    const gaugeVal = document.getElementById('gaugeValue');
    gaugeVal.textContent = site.grease + '%';
    gaugeVal.style.color = status.color;

    // Demister & Airflow badges
    const demBadge = document.getElementById('demisterBadge');
    if (site.demister) {
        demBadge.textContent = 'YES';
        demBadge.style.color = 'var(--color-success)';
        demBadge.style.background = 'rgba(46,125,50,0.1)';
    } else {
        demBadge.textContent = 'NO';
        demBadge.style.color = 'var(--color-danger)';
        demBadge.style.background = 'rgba(198,40,40,0.1)';
    }

    const airBadge = document.getElementById('airflowBadge');
    airBadge.textContent = site.airflow;
    if (site.airflow === 'GOOD') {
        airBadge.style.color = 'var(--color-success)';
        airBadge.style.background = 'rgba(46,125,50,0.1)';
    } else if (site.airflow === 'MODERATE') {
        airBadge.style.color = 'var(--color-warning)';
        airBadge.style.background = 'rgba(245,124,0,0.1)';
    } else {
        airBadge.style.color = 'var(--color-danger)';
        airBadge.style.background = 'rgba(198,40,40,0.1)';
    }

    // Data cards
    document.getElementById('tempValue').textContent = site.temp + '°C';
    document.getElementById('windValue').textContent = site.wind + ' knots';
    document.getElementById('greaseUmValue').textContent = greaseUm;
    document.getElementById('greaseUmValue').style.color = status.color;

    const rangeLabel = document.getElementById('greaseRangeLabel');
    if (site.grease <= 45) {
        rangeLabel.textContent = 'Nominal range';
        rangeLabel.style.color = 'var(--color-success)';
    } else if (site.grease <= 80) {
        rangeLabel.textContent = 'Approaching limit';
        rangeLabel.style.color = 'var(--color-warning)';
    } else {
        rangeLabel.textContent = 'Critical — requires cleaning';
        rangeLabel.style.color = 'var(--color-danger)';
    }

    // Camera feeds — use correct video based on grease level
    const cameraGrid = document.getElementById('cameraGrid');
    cameraGrid.innerHTML = '';
    for (let i = 1; i <= 4; i++) {
        cameraGrid.innerHTML += `
            <div class="camera-feed camera-feed-container">
                <video src="${videoSrc}" autoplay loop muted playsinline class="camera-video"></video>
                <div class="camera-label">
                    <div class="camera-live-dot"></div>
                    CAM 0${i}
                </div>
            </div>
        `;
    }
});
