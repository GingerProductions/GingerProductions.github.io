// Mobile hamburger menu
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('menuTarget');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        sidebar.classList.toggle('open');
    });
});

async function urlExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

async function login() {
    window.location.href = 'http://127.0.0.1:3000/login'; // Update with your backend URL
}

async function checkLoginStatus() {
    try {
        const response = await fetch('http://127.0.0.1:3000/user', { credentials: 'include' });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}

// Function to update the iframe source based on the URL hash
async function updateIframeSrc() {
    const isLoggedIn = false // await checkLoginStatus();
    if (isLoggedIn) {
        window.location.href = 'http://127.0.0.1:5500/dashboard.html';
    } else {
        const hash = window.location.hash.substring(1); // Remove the '#' from the hash
        const iframe = document.getElementById('content-frame');
        const pages = {
            '': '/iFrames/html/index.html',
            'home': '/iFrames/html/index.html',
            'dashboard': '/iFrames/html/loginMsg.html',
            'docs': '/iFrames/html/docs.html',
            'settings': '/iFrames/html/settings.html',
            'login': '/iFrames/html/login.html',
        };

        const pageUrl = pages[hash] || '/iFrames/html/404.html';

        iframe.src = pageUrl;
    }
}

// Update the iframe source on page load based on the initial URL hash
updateIframeSrc();

// Update the iframe source when the hash changes
window.addEventListener('hashchange', updateIframeSrc);