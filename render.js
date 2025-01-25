document.addEventListener("DOMContentLoaded", () => {
    const landingPage = document.getElementById("landingPage");

    const data = JSON.parse(localStorage.getItem("memeCoinData"));

    if (!data) {
        landingPage.innerHTML = "<p>Error: No data found. Please generate the page again.</p>";
        return;
    }

    const { tokenName, ticker, twitter, telegram, website, background, logo } = data;

    // Set background
    if (background) {
        landingPage.style.background = background.startsWith("#") ? background : `url(${background})`;
        landingPage.style.backgroundSize = "cover";
        landingPage.style.backgroundPosition = "center";
    } else {
        landingPage.style.background = "#f9f9f9"; // Default background
    }

    // Generate the landing page content
    const pageContent = `
        <div class="content">
            <img src="${logo || 'default-logo.png'}" alt="${tokenName || 'Meme Coin'} Logo" class="logo">
            <h1>${tokenName || 'Meme Coin'} (${ticker || 'TICK'})</h1>
            <p>The future of meme coins starts here!</p>
            <div class="links">
                ${twitter ? `<a href="${twitter}" target="_blank" class="button twitter"><i class="fab fa-twitter"></i> Twitter</a>` : ""}
                ${telegram ? `<a href="${telegram}" target="_blank" class="button telegram"><i class="fab fa-telegram"></i> Telegram</a>` : ""}
                ${website ? `<a href="${website}" target="_blank" class="button website"><i class="fas fa-globe"></i> Website</a>` : ""}
            </div>
        </div>
    `;
    landingPage.innerHTML = pageContent;

    // Handle Publish Button
    const publishBtn = document.getElementById("publishBtn");
    publishBtn.addEventListener("click", async () => {
        const projectName = prompt("Enter a project name (e.g., memecoin1):");
        if (!projectName) {
            alert("Project name is required to publish.");
            return;
        }

        // GitHub API details
        const GITHUB_USERNAME = "Anthonytesla02";
        const GITHUB_REPO = "meme-generator"; // Repository name
        const TOKEN = "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"; // Replace with your GitHub token

        // Construct the HTML file content
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${tokenName} Landing Page</title>
                <link rel="stylesheet" href="../styles.css">
            </head>
            <body>
                ${pageContent}
            </body>
            </html>
        `;

        // Base64 encode the HTML content
        const base64Content = btoa(unescape(encodeURIComponent(htmlContent)));

        // Upload the file to GitHub
        try {
            const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${projectName}/index.html`, {
                method: "PUT",
                headers: {
                    "Authorization": `token ${TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: `Add landing page for ${tokenName}`,
                    content: base64Content,
                }),
            });

            if (response.ok) {
                alert(`Page published! View it at: https://${GITHUB_USERNAME}.github.io/${projectName}/`);
            } else {
                const error = await response.json();
                console.error("Error uploading file:", error);
                alert("Failed to publish page. Check the console for details.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while publishing the page.");
        }
    });
});

