// Function to get the cookie by name
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([.$?*|{}()[]\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Function to set the cookie
function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        ...options
    };

    if (options.expires) {
        if (typeof options.expires === 'number') {
            const d = new Date();
            d.setTime(d.getTime() + options.expires * 1000);
            options.expires = d;
        }
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Change the text inside the span
    const themeIcon = document.getElementById('theme-toggle');
    themeIcon.textContent = isDarkMode ? 'light_mode' : 'dark_mode';

    // Store the theme in a cookie
    setCookie('theme', isDarkMode ? 'dark' : 'light', { expires: 365 });
}

// Check cookie and apply the stored theme on page load
window.addEventListener('DOMContentLoaded', (event) => {
    const storedTheme = getCookie('theme');
    if (storedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        // Change the text inside the span when dark mode is applied
        document.getElementById('theme-toggle').textContent = 'light_mode';
    }
});

// Add click event to toggle the theme
document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);