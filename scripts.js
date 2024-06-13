// Function to check if a URL exists
async function urlExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

// Server
async function logout() {
    window.location.href = 'http://api.jaimytuin.com:3000/logout'; // Update with your backend URL
}

async function checkAuthentication() {
    try {
        const response = await fetch('http://api.jaimytuin.com:3000/user', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('User not authenticated');
        }
    } catch (error) {
        console.error('Authentication check failed:', error);
        window.location.href = '/login'; // Redirect to login page
    }
}

async function fetchUserData() {
    try {
        const response = await fetch('http://api.jaimytuin.com:3000/userdata', {
            method: 'GET',
            credentials: 'include' // Include cookies in the request
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        // Update HTML elements with user data
        document.getElementById('accIcon').src = userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : 'default-avatar.png';
        document.getElementById('accDisplayname').textContent = userData.global_name;
        document.getElementById('accName').textContent = `@${userData.username}`;
    } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error (e.g., display an error message)
    }
}

async function fetchGuilds() {
    try {
        const response = await fetch('http://api.jaimytuin.com:3000/user-guilds', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user guilds');
        }

        const guilds = await response.json();

        const dropdownContent = document.querySelector('.dropdown-content');
        dropdownContent.innerHTML = ''; // Clear existing dropdown content

        guilds.sort((a, b) => a.name.localeCompare(b.name)).forEach((guild) => {
            const element = document.createElement('a');
            element.innerText = guild.name;
            element.setAttribute('data-server', guild.name);
            dropdownContent.appendChild(element);
        });

        const dropdownLinks = document.querySelectorAll('.dropdown-content a');
        return dropdownLinks;
    } catch (error) {
        console.error('Error fetching user guilds:', error);
        return []; // Return an empty array or handle error as needed
    }
}

async function updateIframeSrc() {
    checkAuthentication();

    const hash = window.location.hash.substring(1);
    const iframe = document.getElementById('content-frame');
    const pages = {
        '': '/iFrames/html/docs.html',
        'servers': '/iFrames/html/servers.html',
        'docs': '/iFrames/html/docs.html',
        'wmsg': '/iFrames/html/wmsg.html',
        'levels': '/iFrames/html/levels.html',
        'notifications': '/iFrames/html/notifs.html',
        'verification': '/iFrames/html/verify.html',
        'settings': '/iFrames/html/settings.html',
        'logout': '/iFrames/html/logout.html'
    };

    const pageUrl = pages[hash] || '/iFrames/html/overview.html';

    if (await urlExists(pageUrl)) {
        iframe.src = pageUrl;
    } else {
        iframe.src = '/iFrames/html/404.html';
    }
}

function handleDropdownSelection(event) {
    const selectedServer = event.target.getAttribute('data-server');
    localStorage.setItem('selectedServer', selectedServer);

    const links = document.querySelectorAll('.dropdown-content a');
    links.forEach(link => link.classList.remove('selected'));

    event.target.classList.add('selected');
    document.querySelector('.dropbtn .btn-text').textContent = selectedServer;
}

function restoreSelectedServer() {
    const selectedServer = localStorage.getItem('selectedServer');
    if (selectedServer) {
        const links = document.querySelectorAll('.dropdown-content a');
        links.forEach(link => {
            if (link.getAttribute('data-server') === selectedServer) {
                link.classList.add('selected');
            }
        });
        document.querySelector('.dropbtn .btn-text').textContent = selectedServer;
    }
}

async function initialize() {
    await fetchUserData();
    const dropdownLinks = await fetchGuilds();
    dropdownLinks.forEach(link => link.addEventListener('click', handleDropdownSelection));
    updateIframeSrc();
    // restoreSelectedServer();
}

// Initialize the application
initialize();

// Update the iframe source when the hash changes
window.addEventListener('hashchange', updateIframeSrc);

// Call checkAuthentication periodically or as needed
setInterval(checkAuthentication, 60000); // Check every minute
