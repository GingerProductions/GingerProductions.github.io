 // Mobile hamburger menu
 document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('menuTarget');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        sidebar.classList.toggle('open');
    });
});

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
    window.location.href = 'http://127.0.0.1:3000/logout'; 
}

async function checkAuthentication() {
    try {
        const response = await fetch('http://127.0.0.1:3000/user', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('User not authenticated');
        }
    } catch (error) {
        console.error('Authentication check failed:', error);
        window.location.href = 'http://127.0.0.1:5500/login.html';
    }
}

async function fetchUserData() {
    try {
        const response = await fetch('http://127.0.0.1:3000/userdata', {
            method: 'GET',
            credentials: 'include' 
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
        const response = await fetch('http://127.0.0.1:3000/user-guilds', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user guilds');
        }

        const data = await response.json();
        const guilds = data.configGuilds;
        const addGuilds = data.addGuilds;

        const dropdownContent = document.querySelector('.dropdown-content');
        dropdownContent.innerHTML = ''; // Clear existing dropdown content

        //Dropdown menu
        guilds.sort((a, b) => a.name.localeCompare(b.name)).forEach((guild) => {
            const element = document.createElement('a');
            element.innerText = guild.name;
            element.setAttribute('data-server', guild.name);
            element.setAttribute('data-serverId', guild.id);
            dropdownContent.appendChild(element);
        });

        // Servers page
        const iframe = document.getElementById('content-frame');
        iframe.onload = function () {
            if (!iframe.src.includes('servers.html')) return

            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

            const serversContainer = iframeDocument.getElementById('servers-container');
            const addServersContainer = iframeDocument.getElementById('addServers-container');
            
            // Config guilds
            if (serversContainer) {
                serversContainer.innerHTML = '';
                
                if (guilds.length == 0) {
                    const serverBox = iframeDocument.createElement('div');
                    serverBox.setAttribute('class', 'server-box');

                    // Title
                    const title = iframeDocument.createElement('h3');
                    title.setAttribute('class', 'server-title');
                    title.innerText = "No servers found";

                    // Add the data
                    serverBox.appendChild(title);
                    serversContainer.appendChild(serverBox);
                }

                guilds.sort((a, b) => a.name.localeCompare(b.name)).forEach((guild) => {
                    // Div
                    const serverBox = iframeDocument.createElement('div');
                    serverBox.setAttribute('class', 'server-box');

                    // Icon
                    let serverIcon = `/media/discord pfp.png`
                    if (guild.icon) { serverIcon = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` }
                    const img = iframeDocument.createElement('img');
                    img.setAttribute('class', 'serverIcon');
                    img.setAttribute('src', serverIcon)

                    // Title
                    const title = iframeDocument.createElement('h3');
                    title.setAttribute('class', 'server-title');
                    title.innerText = guild.name;

                    // Add the data
                    serverBox.appendChild(img);
                    serverBox.appendChild(title);
                    serversContainer.appendChild(serverBox);
                });
            } else {
                console.error('Servers container element not found in iframe.');
            }

            // Add guilds
            if (addServersContainer) {
                addServersContainer.innerHTML = '';

                if (addGuilds.length == 0) {
                    const serverBox = iframeDocument.createElement('div');
                    serverBox.setAttribute('class', 'server-box');

                    // Title
                    const title = iframeDocument.createElement('h3');
                    title.setAttribute('class', 'server-title');
                    title.innerText = "No servers found";

                    // Add the data
                    serverBox.appendChild(title);
                    addServersContainer.appendChild(serverBox);
                }
                
                addGuilds.sort((a, b) => a.name.localeCompare(b.name)).forEach((guild) => {

                    // Div
                    const serverBox = iframeDocument.createElement('div');
                    serverBox.setAttribute('class', 'server-box');
                    serverBox.setAttribute('onclick', 'inv()');

                    // Icon
                    let serverIcon = `/media/discord pfp.png`
                    if (guild.icon) { serverIcon = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` }
                    const img = iframeDocument.createElement('img');
                    img.setAttribute('class', 'serverIcon');
                    img.setAttribute('src', serverIcon)

                    // Title
                    const title = iframeDocument.createElement('h3');
                    title.setAttribute('class', 'server-title');
                    title.innerText = guild.name;

                    // Add the data
                    serverBox.appendChild(img);
                    serverBox.appendChild(title);
                    addServersContainer.appendChild(serverBox);
                });
            }
        }

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
        '': '/iFrames/html/servers.html',
        'home': '/iFrames/html/index.html',
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
    const serverData = {
        serverId: event.target.getAttribute('data-serverId'),
        serverName: event.target.getAttribute('data-server')
    };

    localStorage.setItem('selectedServer', JSON.stringify(serverData));

    const links = document.querySelectorAll('.dropdown-content a');
    links.forEach(link => link.classList.remove('selected'));

    event.target.classList.add('selected');
    document.querySelector('.dropbtn .btn-text').textContent = event.target.getAttribute('data-server');;

    // Reload the iframe to apply new data
    const iframe = document.getElementById('content-frame');
    if (iframe) { iframe.src = iframe.src; }
}

function restoreSelectedServer() {
    const storedServerData = localStorage.getItem('selectedServer');
    const serverData = JSON.parse(storedServerData);

    const selectedServer = serverData.serverId;

    if (selectedServer) {
        const links = document.querySelectorAll('.dropdown-content a');
        links.forEach(link => {
            if (link.getAttribute('data-serverId') === selectedServer) {
                link.classList.add('selected');
            }
        });
        const selectedLink = document.querySelector(`.dropdown-content a[data-serverId="${selectedServer}"]`);
        if (selectedLink) {
            document.querySelector('.dropbtn .btn-text').textContent = selectedLink.getAttribute('data-server');
        }
    }
}

async function initialize() {
    await fetchUserData();
    const dropdownLinks = await fetchGuilds();
    dropdownLinks.forEach(link => link.addEventListener('click', handleDropdownSelection));
    updateIframeSrc();
    restoreSelectedServer();
}

// Initialize the application
initialize();

// Update the iframe source when the hash changes
window.addEventListener('hashchange', updateIframeSrc);

// Call checkAuthentication periodically or as needed
setInterval(checkAuthentication, 60000); // Check every minute
