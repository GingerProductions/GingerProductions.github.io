async function menuAction(type) {
    const menu = document.getElementById('overlay');
    const title = document.getElementById('title');

    switch (type) {
        case 'ToS':
            fetch('/iFrames/assets/ToS.txt')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('text').innerHTML = data;
                })
                .catch(error => console.error('Error loading the terms of service:', error));
            
            title.innerText = 'Terms of Service';
            menu.style.display = 'flex';
            break;

        case 'Policy':
            fetch('/iFrames/assets/Policy.txt')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('text').innerHTML = data;
                })
                .catch(error => console.error('Error loading the terms of service:', error));
            
            title.innerText = 'Privacy Policy';
            menu.style.display = 'flex';
            break;

        case 'close':
            
            document.getElementById('text').innerHTML = '';
            title.innerText = 'Loading..';
            menu.style.display = 'none';
            break;
    }
}

async function settings(type) {
    switch (type) {
        case 'type':
            const input = document.getElementById('theme');

            console.log(input.checked)
        break;
    }
}