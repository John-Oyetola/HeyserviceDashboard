
    // Dark Mode Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // Check local storage for theme preference on load
    if (localStorage.getItem('heyServiceTheme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('heyServiceTheme', isDark ? 'dark' : 'light');
        });
    }
