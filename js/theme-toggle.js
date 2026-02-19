/**
 * Theme toggle (dark/light) with persistent localStorage state.
 * Works with all header toggle variants across pages.
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'chefer-theme';
    var DARK_CLASS = 'dark-mode';
    var TOGGLE_SELECTOR = '.theme-toggle-trigger, .theme-toggle-btn, #theme-toggle';

    function readSavedTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (err) {
            return null;
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (err) {
            // Ignore storage errors (private mode / blocked storage)
        }
    }

    function applyTheme(isDark) {
        if (!document.body) {
            return;
        }
        document.body.classList.toggle(DARK_CLASS, isDark);
    }

    function getToggleButtons() {
        return document.querySelectorAll(TOGGLE_SELECTOR);
    }

    function updateIcons(isDark, toggleButtons) {
        toggleButtons.forEach(function (btn) {
            var icon = btn.querySelector('i');
            if (icon) {
                icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
            }
        });
    }

    function initThemeToggle() {
        var isDark = readSavedTheme() === 'dark';
        var toggleButtons = getToggleButtons();

        applyTheme(isDark);
        updateIcons(isDark, toggleButtons);

        toggleButtons.forEach(function (btn) {
            btn.setAttribute('aria-label', 'Toggle dark mode');

            btn.addEventListener('click', function () {
                var nextIsDark = !document.body.classList.contains(DARK_CLASS);
                applyTheme(nextIsDark);
                saveTheme(nextIsDark ? 'dark' : 'light');
                updateIcons(nextIsDark, toggleButtons);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
})();
