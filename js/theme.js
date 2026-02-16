// Theme Management System
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Initialize theme from localStorage or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        
        // Add theme toggle to all navbars
        this.addThemeToggleToNavbars();
        
        // Set up event listeners
        this.setupEventListeners();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeToggleIcon(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeToggleIcon(theme) {
        const toggleButtons = document.querySelectorAll('#theme-toggle i');
        toggleButtons.forEach(icon => {
            if (theme === 'dark') {
                icon.classList.remove('bi-moon', 'fas fa-moon');
                icon.classList.add('bi-sun', 'fas fa-sun');
            } else {
                icon.classList.remove('bi-sun', 'fas fa-sun');
                icon.classList.add('bi-moon', 'fas fa-moon');
            }
        });
    }

    addThemeToggleToNavbars() {
        // Find all navbar containers that don't have theme toggle
        const navbars = document.querySelectorAll('.d-none.d-lg-flex.align-items-center, .d-flex.align-items-center');
        
        navbars.forEach(navbar => {
            // Check if theme toggle already exists
            if (!navbar.querySelector('#theme-toggle')) {
                const themeToggle = document.createElement('div');
                themeToggle.id = 'theme-toggle';
                themeToggle.className = 'nav-item nav-link me-2';
                themeToggle.style.cursor = 'pointer';
                themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
                
                // Insert before the login button or at the end
                const loginBtn = navbar.querySelector('.btn-primary, .btn-logout');
                if (loginBtn) {
                    navbar.insertBefore(themeToggle, loginBtn);
                } else {
                    navbar.appendChild(themeToggle);
                }
            }
        });
    }

    setupEventListeners() {
        // Add click event listener to all theme toggles
        document.addEventListener('click', (e) => {
            if (e.target.closest('#theme-toggle')) {
                this.toggleTheme();
            }
        });
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});
