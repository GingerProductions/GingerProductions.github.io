// Server utility
document.addEventListener("DOMContentLoaded", () => {
    const serverList = document.getElementById("serverList");
    const socials = document.getElementById("socials");

    // Mobile
    const mobileServerList = document.getElementById("mobileServerList");
    const mobileSocials = document.getElementById("mobileSocials");

    // Server data
    const serverDetails = {
        "GingerProductions.jpeg": {
            title: "Ginger Productions",
            description: "The main discord server featuring pretty much all projects, here you will find sneak peeks, code support, early feature testing and more!",
            serverURL: "https://discord.gg/XeqteUmBen"
        },
        "SpudServerIcon.png": {
            title: "Spud Support",
            description: "A server specially for my discord bots, this server features information, links, beta features and more!",
            serverURL: "https://discord.gg/D8ZcY8SJdy"
        }
    };

    // Show server information
    serverList.addEventListener("click", (event) => {
        if (event.target.tagName === "IMG") {
            const imageName = event.target.src.split("/").pop();
            const details = serverDetails[imageName];

            if (details) {
                let infoBox = document.getElementById("serverInfo");
                if (!infoBox) return console.log("No infoBox found")

                infoBox.innerHTML = `<h3>${details.title}</h3><p>${details.description}</p><a href="${details.serverURL}">Join Now</a>`; // <span class="external material-symbols-outlined">open_in_new</span>
            }
        }
    });

    mobileServerList.addEventListener("click", (event) => {
        if (event.target.tagName === "IMG") {
            const imageName = event.target.src.split("/").pop();
            const details = serverDetails[imageName];

            if (details) {
                let mobileInfoBox = document.getElementById("mobileServerInfo");
                if (!mobileInfoBox) return console.log("No mobileInfoBox found")

                mobileInfoBox.innerHTML = `<h3>${details.title}</h3><p>${details.description}</p><a href="${details.serverURL}">Join Now</a>`; // <span class="external material-symbols-outlined">open_in_new</span>
            }
        }
    });

    // Hide server information
    document.addEventListener("click", (event) => {
        if (!socials.contains(event.target)) {
            const infoBox = document.getElementById("serverInfo");
            if (infoBox) {
                infoBox.innerHTML = "";
            }
        }

        if (!mobileSocials.contains(event.target)) {
            const mobileInfoBox = document.getElementById("mobileServerInfo");
            if (mobileInfoBox) {
                mobileInfoBox.innerHTML = "";
            }
        }
    });
});