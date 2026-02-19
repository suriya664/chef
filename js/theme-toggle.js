/**
 * Theme Toggle — Dark Mode / Light Mode
 * Persists user preference via localStorage.
 * Default: light (white) mode.
 */
(function () {
    'use strict';

    // Apply saved theme immediately to avoid FOUC
    var savedTheme = localStorage.getItem('chefer-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    document.addEventListener('DOMContentLoaded', function () {
        var toggleButtons = document.querySelectorAll('.theme-toggle-btn');
        var isDark = document.body.classList.contains('dark-mode');

        // Set initial icon state
        updateIcons(isDark);

        // Attach click handler to all toggle buttons (desktop + mobile)
        toggleButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                isDark = !isDark;
                document.body.classList.toggle('dark-mode', isDark);
                localStorage.setItem('chefer-theme', isDark ? 'dark' : 'light');
                updateIcons(isDark);
            });
        });

        function updateIcons(dark) {
            toggleButtons.forEach(function (btn) {
                var icon = btn.querySelector('i');
                if (icon) {
                    if (dark) {
                        icon.className = 'bi bi-sun-fill';
                    } else {
                        icon.className = 'bi bi-moon-fill';
                    }
                }
            });
        }
    });
})();
