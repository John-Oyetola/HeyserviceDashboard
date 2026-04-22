// Hey Service - Site Data Registry
// All monitored facilities across all brands

const SITE_DATA = [
    // ===== WAGAMAMA =====
    { id: 'wagamama-leeds', brand: 'Wagamama', location: 'Leeds, West Yorkshire', grease: 10, temp: 28, wind: 14, demister: true, airflow: 'GOOD' },
    { id: 'wagamama-manchester', brand: 'Wagamama', location: 'Manchester, Greater Manchester', grease: 52, temp: 34, wind: 8, demister: true, airflow: 'MODERATE' },
    { id: 'wagamama-birmingham', brand: 'Wagamama', location: 'Birmingham, West Midlands', grease: 88, temp: 41, wind: 5, demister: false, airflow: 'POOR' },
    { id: 'wagamama-london', brand: 'Wagamama', location: 'Soho, London', grease: 22, temp: 26, wind: 16, demister: true, airflow: 'GOOD' },
    { id: 'wagamama-bristol', brand: 'Wagamama', location: 'Bristol, Somerset', grease: 67, temp: 33, wind: 7, demister: true, airflow: 'MODERATE' },

    // ===== FIVE GUYS =====
    { id: 'fiveguys-wakefield', brand: 'Five Guys', location: 'Wakefield, West Yorkshire', grease: 15, temp: 27, wind: 13, demister: true, airflow: 'GOOD' },
    { id: 'fiveguys-sheffield', brand: 'Five Guys', location: 'Sheffield, South Yorkshire', grease: 91, temp: 44, wind: 4, demister: false, airflow: 'POOR' },
    { id: 'fiveguys-nottingham', brand: 'Five Guys', location: 'Nottingham, East Midlands', grease: 38, temp: 29, wind: 11, demister: true, airflow: 'GOOD' },
    { id: 'fiveguys-liverpool', brand: 'Five Guys', location: 'Liverpool, Merseyside', grease: 73, temp: 36, wind: 6, demister: true, airflow: 'MODERATE' },
    { id: 'fiveguys-edinburgh', brand: 'Five Guys', location: 'Edinburgh, Scotland', grease: 8, temp: 24, wind: 18, demister: true, airflow: 'GOOD' },

    // ===== ZAAP =====
    { id: 'zaap-leeds', brand: 'Zaap', location: 'Leeds City Centre, West Yorkshire', grease: 30, temp: 29, wind: 12, demister: true, airflow: 'GOOD' },
    { id: 'zaap-nottingham', brand: 'Zaap', location: 'Nottingham, East Midlands', grease: 85, temp: 42, wind: 4, demister: false, airflow: 'POOR' },
    { id: 'zaap-newcastle', brand: 'Zaap', location: 'Newcastle, Tyne and Wear', grease: 48, temp: 31, wind: 9, demister: true, airflow: 'MODERATE' },
    { id: 'zaap-york', brand: 'Zaap', location: 'York, North Yorkshire', grease: 18, temp: 25, wind: 15, demister: true, airflow: 'GOOD' },
    { id: 'zaap-manchester', brand: 'Zaap', location: 'Northern Quarter, Manchester', grease: 62, temp: 35, wind: 7, demister: true, airflow: 'MODERATE' },

    // ===== PREMIER INN =====
    { id: 'premierinn-wakefield', brand: 'Premier Inn', location: 'Wakefield, West Yorkshire', grease: 5, temp: 23, wind: 17, demister: true, airflow: 'GOOD' },
    { id: 'premierinn-london', brand: 'Premier Inn', location: 'Kings Cross, London', grease: 58, temp: 33, wind: 8, demister: true, airflow: 'MODERATE' },
    { id: 'premierinn-cardiff', brand: 'Premier Inn', location: 'Cardiff, Wales', grease: 94, temp: 45, wind: 3, demister: false, airflow: 'POOR' },
    { id: 'premierinn-glasgow', brand: 'Premier Inn', location: 'Glasgow, Scotland', grease: 41, temp: 30, wind: 10, demister: true, airflow: 'GOOD' },
    { id: 'premierinn-bath', brand: 'Premier Inn', location: 'Bath, Somerset', grease: 76, temp: 37, wind: 6, demister: true, airflow: 'MODERATE' },

    // ===== BAR+BLOCK =====
    { id: 'barblock-leeds', brand: 'Bar+Block', location: 'Leeds, West Yorkshire', grease: 20, temp: 26, wind: 14, demister: true, airflow: 'GOOD' },
    { id: 'barblock-manchester', brand: 'Bar+Block', location: 'Deansgate, Manchester', grease: 83, temp: 40, wind: 5, demister: false, airflow: 'POOR' },
    { id: 'barblock-birmingham', brand: 'Bar+Block', location: 'Birmingham, West Midlands', grease: 55, temp: 32, wind: 8, demister: true, airflow: 'MODERATE' },
    { id: 'barblock-london', brand: 'Bar+Block', location: 'Aldgate, London', grease: 35, temp: 28, wind: 12, demister: true, airflow: 'GOOD' },
    { id: 'barblock-exeter', brand: 'Bar+Block', location: 'Exeter, Devon', grease: 70, temp: 35, wind: 7, demister: true, airflow: 'MODERATE' },

    // ===== G.O.O.D.M.A.N =====
    { id: 'goodman-mayfair', brand: 'G.O.O.D.M.A.N', location: 'Mayfair, London', grease: 12, temp: 25, wind: 15, demister: true, airflow: 'GOOD' },
    { id: 'goodman-canarywharf', brand: 'G.O.O.D.M.A.N', location: 'Canary Wharf, London', grease: 60, temp: 34, wind: 8, demister: true, airflow: 'MODERATE' },
    { id: 'goodman-cityoflondon', brand: 'G.O.O.D.M.A.N', location: 'City of London, London', grease: 90, temp: 43, wind: 4, demister: false, airflow: 'POOR' },
    { id: 'goodman-manchester', brand: 'G.O.O.D.M.A.N', location: 'Spinningfields, Manchester', grease: 28, temp: 27, wind: 13, demister: true, airflow: 'GOOD' },
    { id: 'goodman-leeds', brand: 'G.O.O.D.M.A.N', location: 'The Headrow, Leeds', grease: 75, temp: 36, wind: 6, demister: true, airflow: 'MODERATE' },

    // ===== THAI EXPRESS =====
    { id: 'thaiexpress-leeds', brand: 'Thai Express', location: 'Trinity Centre, Leeds', grease: 42, temp: 30, wind: 10, demister: true, airflow: 'GOOD' },
    { id: 'thaiexpress-london', brand: 'Thai Express', location: 'Covent Garden, London', grease: 86, temp: 42, wind: 4, demister: false, airflow: 'POOR' },
    { id: 'thaiexpress-reading', brand: 'Thai Express', location: 'Reading, Berkshire', grease: 25, temp: 26, wind: 14, demister: true, airflow: 'GOOD' },
    { id: 'thaiexpress-brighton', brand: 'Thai Express', location: 'Brighton, East Sussex', grease: 64, temp: 34, wind: 7, demister: true, airflow: 'MODERATE' },
    { id: 'thaiexpress-oxford', brand: 'Thai Express', location: 'Oxford, Oxfordshire', grease: 50, temp: 31, wind: 9, demister: true, airflow: 'MODERATE' },

    // ===== COTE =====
    { id: 'cote-cheltenham', brand: 'Cote', location: 'Cheltenham, Gloucestershire', grease: 8, temp: 24, wind: 16, demister: true, airflow: 'GOOD' },
    { id: 'cote-london', brand: 'Cote', location: 'Covent Garden, London', grease: 72, temp: 36, wind: 6, demister: true, airflow: 'MODERATE' },
    { id: 'cote-edinburgh', brand: 'Cote', location: 'Edinburgh, Scotland', grease: 95, temp: 46, wind: 3, demister: false, airflow: 'POOR' },
    { id: 'cote-cambridge', brand: 'Cote', location: 'Cambridge, Cambridgeshire', grease: 33, temp: 28, wind: 12, demister: true, airflow: 'GOOD' },
    { id: 'cote-bath', brand: 'Cote', location: 'Bath, Somerset', grease: 57, temp: 33, wind: 8, demister: true, airflow: 'MODERATE' }
];

// === Helper Functions ===

function getSiteStatus(grease) {
    if (grease <= 45) return { label: 'Safe', class: 'status-safe', color: 'var(--color-success)', colorHex: '#2e7d32' };
    if (grease <= 80) return { label: 'Warning', class: 'status-warn', color: 'var(--color-warning)', colorHex: '#ef6c00' };
    return { label: 'Danger', class: 'status-danger', color: 'var(--color-danger)', colorHex: '#c62828' };
}

function getSiteVideo(grease) {
    if (grease <= 45) return 'Images/Clean Vent.mp4';
    if (grease <= 80) return 'Images/Midlevel Vent.mp4';
    return 'Images/Dirty Vent.mp4';
}

function getGreaseUm(grease) {
    // Scale: 0% = ~50um, 100% = ~500um
    return Math.round(50 + (grease / 100) * 450) + 'um';
}

function getGaugeRotation(grease) {
    // Maps 0-100% to -90deg to +90deg
    return (grease * 1.8) - 90;
}

function getSiteById(id) {
    return SITE_DATA.find(s => s.id === id) || null;
}

function getGroupedByBrand() {
    const grouped = {};
    SITE_DATA.forEach(site => {
        if (!grouped[site.brand]) grouped[site.brand] = [];
        grouped[site.brand].push(site);
    });
    return grouped;
}
