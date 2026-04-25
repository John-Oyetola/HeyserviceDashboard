// Hey Service - Main JavaScript

// Secure authentication via backend server.py API endpoints.

document.addEventListener('DOMContentLoaded', () => {

    // Bubble Animation Generator for elements with .animation-container
    const animContainers = document.querySelectorAll('.animation-container');

    animContainers.forEach(container => {
        // 12 on phones, 20 on tablets/laptops, 40 on large desktops
        const isPhone  = window.innerWidth <= 600;
        const isTablet = window.innerWidth <= 1199;
        const bubbleCount = isPhone ? 12 : isTablet ? 20 : 40;

        // Dynamic distribution points
        const leftLimit = Math.floor(bubbleCount * 0.375);
        const rightLimit = leftLimit * 2;

        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            // Random size
            let size = Math.random() * 100 + 40; // Desktop: 40px - 140px
            if (isPhone) size = Math.random() * 30 + 30; // Mobile: 30px - 60px

            // Distributed layout
            let left;
            if (i < leftLimit) {
                left = Math.random() * 30;         // 0% - 30% (Left)
            } else if (i < rightLimit) {
                left = Math.random() * 30 + 70;    // 70% - 100% (Right)
            } else {
                left = Math.random() * 40 + 30;    // 30% - 70% (Middle)
            }

            const top = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = Math.random() * 1.5 + 2;

            // Vivid, fully-saturated colour palette
            const allowedColors = [
                '#43a047', // vivid green
                '#1e88e5', // vivid blue
                '#8e24aa', // vivid purple
                '#e53935', // vivid red
                '#fb8c00', // vivid orange
                '#00acc1', // vivid teal
                '#d81b60'  // vivid pink
            ];
            const randomColor = allowedColors[Math.floor(Math.random() * allowedColors.length)];

            bubble.style.backgroundColor = randomColor;
            bubble.style.opacity = '1';           // Full opacity on all pages
            bubble.style.width  = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left   = `${left}%`;
            bubble.style.top    = `${top}%`;
            bubble.style.animationDelay    = `${delay}s`;
            bubble.style.animationDuration = `${duration}s`;

            container.appendChild(bubble);
        }
    });

    // Password Visibility Toggle
    const togglePasswordBtn = document.getElementById('togglePasswordBtn');
    const passwordInput = document.getElementById('password');
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const currentType = passwordInput.getAttribute('type');
            passwordInput.setAttribute('type', currentType === 'password' ? 'text' : 'password');
        });
    }

    // === Secure Server-Side Login Handler ===
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const usernameInput = document.getElementById('username').value.trim();
            const passwordInput = document.getElementById('password').value.trim();
            const errorMessage = document.getElementById('errorMessage');
            const submitBtn = loginForm.querySelector('button[type="submit"]');

            // UI Feedback
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Authenticating...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('https://heyservicedashboard.onrender.com/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: usernameInput, password: passwordInput })
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    // Store role, username, and brand assignment
                    localStorage.setItem('heyServiceRole', result.role);
                    localStorage.setItem('heyServiceUser', result.username);
                    localStorage.setItem('heyServiceBrand', result.assigned_brand || 'all');
                    localStorage.setItem('heyServiceCompany', result.company || '');
                    window.location.href = 'dashboard.html';
                } else {
                    if (errorMessage) {
                        errorMessage.style.display = 'block';
                        errorMessage.textContent = result.error || 'Invalid username or password.';
                    }
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                console.error('Login error:', error);
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = 'Connection error. Make sure server.py is running.';
                }
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Dark Mode Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggleBtn');

    const LOGO_HEADER_LIGHT = 'Images/logo.png';
    const LOGO_HEADER_DARK  = 'Images/HEY CMYK LOGO_WhiteText.svg';
    const LOGO_FOOTER       = 'Images/HEY WHITE LOGO.svg';

    function applyLogos(isDark) {
        // Header: logo.png in light, white text SVG in dark
        document.querySelectorAll('.header-logo').forEach(img => {
            img.src = isDark ? LOGO_HEADER_DARK : LOGO_HEADER_LIGHT;
        });
        // Footer: always HEY WHITE LOGO
        document.querySelectorAll('.footer-logo').forEach(img => {
            img.src = LOGO_FOOTER;
        });
    }

    // Apply theme + logos on page load
    const savedTheme = localStorage.getItem('heyServiceTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    applyLogos(document.body.classList.contains('dark-theme'));

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('heyServiceTheme', isDark ? 'dark' : 'light');
            applyLogos(isDark);
        });
    }

    // Role applier (Handles view based on stored role)
    const currentRole = localStorage.getItem('heyServiceRole');
    if (currentRole) {
        document.body.setAttribute('data-role', currentRole);

        // Update navigation UI conditionally based on role
        const engOnlyItems = document.querySelectorAll('.engineer-only');
        const clientOnlyItems = document.querySelectorAll('.client-only');

        if (currentRole === 'user') {
            engOnlyItems.forEach(item => item.style.display = 'none');
            clientOnlyItems.forEach(item => item.style.display = 'block');
        } else if (currentRole === 'engineer') {
            engOnlyItems.forEach(item => item.style.display = 'block');
            clientOnlyItems.forEach(item => item.style.display = 'none');
        }
    }

    // === Login Welcome Banner (dashboard page) ===
    const welcomeBanner = document.getElementById('loginWelcomeBanner');
    if (welcomeBanner) {
        const bannerShown = sessionStorage.getItem('welcomeBannerShown');
        if (!bannerShown) {
            const user    = localStorage.getItem('heyServiceUser')    || 'User';
            const role    = localStorage.getItem('heyServiceRole')    || 'user';
            const company = localStorage.getItem('heyServiceCompany') || 'Hey Service';
            const roleLabel = role === 'engineer' ? 'Engineer (Admin)' : 'Client';

            welcomeBanner.innerHTML = `
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <div>
                    <strong>Logged in as: ${roleLabel}</strong><br>
                    <span>${user} &mdash; ${company}</span>
                </div>
                <button class="welcome-banner-close" onclick="this.parentElement.style.display='none'" aria-label="Dismiss">&times;</button>
            `;
            welcomeBanner.style.display = 'flex';
            sessionStorage.setItem('welcomeBannerShown', '1');

            // Auto-dismiss after 6 seconds
            setTimeout(() => {
                welcomeBanner.style.opacity = '0';
                setTimeout(() => welcomeBanner.style.display = 'none', 400);
            }, 6000);
        }
    }

    // === Quote / Contact Form Feedback ===
    const quoteForm = document.getElementById('quoteContactForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('quoteSubmitBtn');
            const successMsg = document.getElementById('quoteSuccessMsg');
            const originalText = btn.textContent;

            // Button loading state
            btn.textContent = 'Sending...';
            btn.disabled = true;

            try {
                const formData = new FormData(quoteForm);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(Object.fromEntries(formData))
                });

                if (response.ok) {
                    // Real success — hide form, show confirmation
                    quoteForm.style.display = 'none';
                    if (successMsg) {
                        successMsg.style.display = 'flex';
                        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    alert('Sorry, there was a problem sending your request. Please email us directly at enquiries@theheygroup.net');
                }
            } catch (err) {
                btn.textContent = originalText;
                btn.disabled = false;
                alert('Connection error. Please email us directly at enquiries@theheygroup.net');
            }
        });
    }

    // Close mobile nav when clicking any link and handle smooth scroll
    const navLinksList = document.querySelectorAll('.nav-links a');
    const navToggles = document.querySelectorAll('.hamburger-toggle');
    navLinksList.forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu
            navToggles.forEach(toggle => toggle.checked = false);
            
            // Extract the target hash (e.g. #quote)
            const href = link.getAttribute('href');
            if (href) {
                let targetId = '';
                if (href.startsWith('#')) {
                    targetId = href;
                } else if (href.includes('#')) {
                    // Extract hash if it starts with index.html#quote
                    const urlObj = new URL(href, window.location.href);
                    if (urlObj.pathname === window.location.pathname) {
                        targetId = urlObj.hash;
                    }
                }
                
                if (targetId) {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        // Small timeout lets the menu closing animation start before jumping
                        setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth' }), 150);
                    }
                }
            }
        });
    });

    // Global Search Logic
    const searchForm = document.getElementById('globalSearchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = document.getElementById('searchInput').value.toLowerCase().trim();
            if (!query) return;

            // Simple mock search index mapping keywords to pages
            const index = [
                { url: 'dashboard.html', terms: ['dashboard', 'sites', 'north', 'east', 'west', 'south', 'status', 'overview', 'monitored'] },
                { url: 'site-details.html', terms: ['details', 'demister', 'emergency', 'report', 'gauge', 'temperature', 'latency', 'cleaning'] },
                { url: 'login.html', terms: ['login', 'account', 'password', 'sign'] },
                { url: 'index.html', terms: ['home', 'monitoring', 'features', 'alert', 'operations', 'visualize'] }
            ];

            let foundUrl = 'index.html'; // default fallback pattern
            for (let page of index) {
                if (page.terms.some(term => query.includes(term) || term.includes(query))) {
                    foundUrl = page.url;
                    break;
                }
            }

            // Redirect with query parameter
            window.location.href = foundUrl + '?search=' + encodeURIComponent(query);
        });
    }

    // Auto-highlight exact text logic on load
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) {
        setTimeout(() => {
            window.find(searchParam); // Natively highlights searched text
        }, 500);
    }

    // === Mailto Email Submission Engine ===

    // Universal Mailto Form Handler
    const mailtoForms = document.querySelectorAll('.mailto-form');
    mailtoForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract Subject from form dataset
            const subject = encodeURIComponent(form.getAttribute('data-subject') || "New Website Submission");

            // Extract all inputs matching 'name'
            let bodyText = "Hello Admin,\n\nA new submission has been received from the Hey Service Portal:\n\n";
            bodyText += "---------------------------------------\n";

            const inputs = form.querySelectorAll('input[name], select[name], textarea[name]');
            inputs.forEach(input => {
                const title = input.getAttribute('name');
                const val = input.value;
                bodyText += `${title}: ${val}\n`;
            });
            bodyText += "---------------------------------------\n";

            const bodyEncoded = encodeURIComponent(bodyText);

            // Re-route browser strictly to pre-filled email native client
            window.location.href = `mailto:johnoyetolaoluwafemi113@gmail.com?subject=${subject}&body=${bodyEncoded}`;

            // Reset and cleanly close out modal if it resides inside one
            form.reset();
            const modal = form.closest('.modal-overlay');
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.style.display = 'none', 300);
            }
        });
    });

    // === Create Account Modal Triggers ===
    const openCreateBtn = document.getElementById('openCreateAccountBtn');
    const closeCreateBtn = document.getElementById('closeCreateAccountBtn');
    const createModal = document.getElementById('createAccountModal');

    if (openCreateBtn && createModal) {
        openCreateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            createModal.style.display = 'flex';
            setTimeout(() => createModal.classList.add('active'), 10);
        });
    }

    if (closeCreateBtn && createModal) {
        closeCreateBtn.addEventListener('click', () => {
            createModal.classList.remove('active');
            setTimeout(() => createModal.style.display = 'none', 300);
        });
        createModal.addEventListener('click', (e) => {
            if (e.target === createModal) {
                createModal.classList.remove('active');
                setTimeout(() => createModal.style.display = 'none', 300);
            }
        });
    }

    // === Create Account Form Submission (via API) ===
    const createAccountForm = document.getElementById('createAccountForm');
    if (createAccountForm) {
        createAccountForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('regSubmitBtn');
            const msg = document.getElementById('createAccountMsg');
            const origText = btn.textContent;
            btn.textContent = 'Creating...';
            btn.disabled = true;

            try {
                const response = await fetch('https://heyservicedashboard.onrender.com/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        company: document.getElementById('regCompany').value.trim(),
                        email: document.getElementById('regEmail').value.trim(),
                        username: document.getElementById('regUsername').value.trim(),
                        password: document.getElementById('regPassword').value.trim()
                    })
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    msg.style.display = 'block';
                    msg.style.backgroundColor = 'rgba(46,125,50,0.1)';
                    msg.style.color = 'var(--color-success)';
                    msg.textContent = result.message;
                    createAccountForm.reset();
                    setTimeout(() => {
                        createModal.classList.remove('active');
                        setTimeout(() => { createModal.style.display = 'none'; msg.style.display = 'none'; }, 300);
                    }, 2500);
                } else {
                    msg.style.display = 'block';
                    msg.style.backgroundColor = 'rgba(198,40,40,0.1)';
                    msg.style.color = 'var(--color-danger)';
                    msg.textContent = result.error || 'Registration failed.';
                }
            } catch (error) {
                msg.style.display = 'block';
                msg.style.backgroundColor = 'rgba(198,40,40,0.1)';
                msg.style.color = 'var(--color-danger)';
                msg.textContent = 'Connection error. Make sure server.py is running.';
            }

            btn.textContent = origText;
            btn.disabled = false;
        });
    }

    // === Forgot Password Modal Triggers ===
    const openForgotBtn = document.getElementById('openForgotPasswordBtn');
    const closeForgotBtn = document.getElementById('closeForgotPasswordBtn');
    const forgotModal = document.getElementById('forgotPasswordModal');

    if (openForgotBtn && forgotModal) {
        openForgotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            forgotModal.style.display = 'flex';
            setTimeout(() => forgotModal.classList.add('active'), 10);
        });
    }

    if (closeForgotBtn && forgotModal) {
        closeForgotBtn.addEventListener('click', () => {
            forgotModal.classList.remove('active');
            setTimeout(() => forgotModal.style.display = 'none', 300);
        });
        forgotModal.addEventListener('click', (e) => {
            if (e.target === forgotModal) {
                forgotModal.classList.remove('active');
                setTimeout(() => forgotModal.style.display = 'none', 300);
            }
        });
    }

    // === Forgot Password Form Submission (via API) ===
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('fpSubmitBtn');
            const msg = document.getElementById('forgotPasswordMsg');
            const origText = btn.textContent;
            btn.textContent = 'Resetting...';
            btn.disabled = true;

            try {
                const response = await fetch('https://heyservicedashboard.onrender.com/api/forgot-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: document.getElementById('fpEmail').value.trim(),
                        username: document.getElementById('fpUsername').value.trim(),
                        newPassword: document.getElementById('fpNewPassword').value.trim()
                    })
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    msg.style.display = 'block';
                    msg.style.backgroundColor = 'rgba(46,125,50,0.1)';
                    msg.style.color = 'var(--color-success)';
                    msg.textContent = result.message;
                    forgotPasswordForm.reset();
                    setTimeout(() => {
                        forgotModal.classList.remove('active');
                        setTimeout(() => { forgotModal.style.display = 'none'; msg.style.display = 'none'; }, 300);
                    }, 2500);
                } else {
                    msg.style.display = 'block';
                    msg.style.backgroundColor = 'rgba(198,40,40,0.1)';
                    msg.style.color = 'var(--color-danger)';
                    msg.textContent = result.error || 'Password reset failed.';
                }
            } catch (error) {
                msg.style.display = 'block';
                msg.style.backgroundColor = 'rgba(198,40,40,0.1)';
                msg.style.color = 'var(--color-danger)';
                msg.textContent = 'Connection error. Make sure server.py is running.';
            }

            btn.textContent = origText;
            btn.disabled = false;
        });
    }

    // === Avatar Profile Dropdown & Alarm Logic ===
    const profileWidgets = document.querySelectorAll('.profile-widget');
    const profileDropdowns = document.querySelectorAll('#profileDropdown');
    const dropdownUsernameTexts = document.querySelectorAll('#dropdownUsernameText');
    const alarmToggles = document.querySelectorAll('#alarmToggle');
    const alarmModals = document.querySelectorAll('#alarmSummaryModal');

    // Grab the literal logged in user from caching engine natively
    const storedUsername = localStorage.getItem('heyServiceUser') || 'Demo User';

    // Inject literal username strictly into the dropdowns
    dropdownUsernameTexts.forEach(txt => txt.textContent = storedUsername);

    // Profile Dropdown Interactions
    profileWidgets.forEach((widget, index) => {
        widget.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent window click closure immediately
            const dropdown = profileDropdowns[index];
            if (dropdown) {
                const isHidden = dropdown.style.display === 'none';
                // Toggle display cleanly without destroying styles
                dropdown.style.display = isHidden ? 'block' : 'none';
                widget.style.borderColor = isHidden ? 'var(--theme-secondary)' : 'var(--border-color)';
            }
        });
    });

    // Close Modals on an outside native window click
    document.addEventListener('click', () => {
        profileDropdowns.forEach((dropdown, index) => {
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
                if (profileWidgets[index]) profileWidgets[index].style.borderColor = 'var(--border-color)';
            }
        });
    });

    // Prevent dropdown self-closing blindly when interacting inside it
    profileDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => e.stopPropagation());
    });

    // Engineer Alarm Security Script Execution
    if (localStorage.getItem('heyServiceRole') === 'engineer') {
        alarmToggles.forEach((toggle, index) => {
            toggle.style.display = 'block'; // Visibly unhide button universally 
            toggle.addEventListener('click', () => {
                if (alarmModals[index]) alarmModals[index].style.display = 'block';
            });
        });

        // Auto-show daily alarm definitively on their very first session load
        if (!sessionStorage.getItem('engineerAlarmSeen')) {
            setTimeout(() => {
                if (alarmModals[0]) alarmModals[0].style.display = 'block';
                sessionStorage.setItem('engineerAlarmSeen', 'true');
            }, 1200);
        }
    }
});

// Logout function
function logout() {
    localStorage.removeItem('heyServiceRole');
    localStorage.removeItem('heyServiceUser');
    localStorage.removeItem('heyServiceBrand');
    localStorage.removeItem('heyServiceCompany');
    window.location.href = 'index.html';
}
