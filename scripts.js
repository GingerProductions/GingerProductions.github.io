// Function to check if a URL exists
async function urlExists(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

// Function to update the iframe source based on the URL hash
async function updateIframeSrc() {
    const hash = window.location.hash.substring(1); // Remove the '#' from the hash
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

    // Check if the page exists
    if (await urlExists(pageUrl)) {
        iframe.src = pageUrl;
    } else {
        iframe.src = '/iFrames/html/404.html';
    }
}

// Function to handle dropdown selection and marking the selected server
function handleDropdownSelection(event) {
    const selectedServer = event.target.getAttribute('data-server');
    localStorage.setItem('selectedServer', selectedServer);

    const links = document.querySelectorAll('.dropdown-content a');
    links.forEach(link => link.classList.remove('selected'));

    event.target.classList.add('selected');
    document.querySelector('.dropbtn .btn-text').textContent = selectedServer;
}

// Function to restore the selected server from localStorage
function restoreSelectedServer() {
    const selectedServer = localStorage.getItem('selectedServer');
    if (selectedServer) {
        const links = document.querySelectorAll('.dropdown-content a');
        links.forEach(link => {
            if (link.getAttribute('data-server') === selectedServer) {
                link.classList.add('selected');
            }
        });
        if (selectedServer == null) selectedServer = "Server select"
        document.querySelector('.dropbtn .btn-text').textContent = selectedServer;
    }
}

// Update the iframe source on page load based on the initial URL hash
updateIframeSrc();
restoreSelectedServer();

// Update the iframe source when the hash changes
window.addEventListener('hashchange', updateIframeSrc);

// Add event listener for dropdown menu selection
const dropdownLinks = document.querySelectorAll('.dropdown-content a');
dropdownLinks.forEach(link => link.addEventListener('click', handleDropdownSelection));
