document.addEventListener("DOMContentLoaded", () => {
    const landingPage = document.getElementById("landingPage");
    const queryParams = new URLSearchParams(window.location.search);

    // Extract parameters
    const tokenName = queryParams.get("tokenName");
    const ticker = queryParams.get("ticker");
    const twitter = queryParams.get("twitter");
    const telegram = queryParams.get("telegram");
    const website = queryParams.get("website");
    const background = queryParams.get("background");
    const logo = decodeURIComponent(queryParams.get("logo"));

    // Set background
    if (background) {
        landingPage.style.background = background.startsWith("#") ? background : `url(${background})`;
        landingPage.style.backgroundSize = "cover";
        landingPage.style.backgroundPosition = "center";
    } else {
        landingPage.style.background = "#f9f9f9"; // Default background
    }

    // Generate the landing page content
    landingPage.innerHTML = `
        <div class="content">
            <img src="${logo || 'default-logo.png'}" alt="${tokenName || 'Meme Coin'} Logo" class="logo">
            <h1>${tokenName || 'Meme Coin'} (${ticker || 'TICK'})</h1>
            <p>The future of meme coins starts here!</p>
            <div class="links">
                ${twitter ? `<a href="${twitter}" target="_blank" class="button twitter"><i class="fab fa-twitter"></i> Twitter</a>` : ""}
                ${telegram ? `<a href="${telegram}" target="_blank" class="button telegram"><i class="fab fa-telegram"></i> Telegram</a>` : ""}
                ${website ? `<a href="${website}" target="_blank" class="button website"><i class="fas fa-globe"></i> Website</a>` : ""}
            </div>
            <button id="publishBtn" class="publish-button">Publish</button>
        </div>
    `;

    // Handle Publish Button
    const publishBtn = document.getElementById("publishBtn");
    publishBtn.addEventListener("click", () => {
        const projectName = prompt("Enter a project name (e.g., memecoin1):");
        if (projectName) {
            alert(`Your page will be published as: https://yourusername.github.io/${projectName}`);
            // Save the generated HTML to GitHub Pages
            // (This step involves manual upload or an API, explained below)
        } else {
            alert("Project name is required to publish.");
        }
    });
});
