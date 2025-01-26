// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC7aI4WnfBagNk_PBg9LA49s79WzMQ7N8g",
  authDomain: "memepage-3d626.firebaseapp.com",
  projectId: "memepage-3d626",
  storageBucket: "memepage-3d626.firebasestorage.app",
  messagingSenderId: "1034023281600",
  appId: "1:1034023281600:web:eb34e7bc2089c62d665e25",
  measurementId: "G-K8VTWD9EXV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", async () => {
    const landingPage = document.getElementById("landingPage");
    const hash = window.location.hash.substring(1); // Remove the '#'
    if (!hash) {
        landingPage.innerHTML = `<div class="content"><h1>Error: Invalid URL. Please generate a new page from the index page.</h1></div>`;
        return;
    }

    try {
        const doc = await db.collection("memePages").doc(hash).get();
        if (!doc.exists) {
            landingPage.innerHTML = `<div class="content"><h1>Error: Page not found. Please generate a new page from the index page.</h1></div>`;
             return;
        }
        const formData = doc.data();
        const { tokenName, ticker, twitter, telegram, website, background, logo } = formData;
        const buyMeACoffeeURL = `https://www.buymeacoffee.com/memepage/e/364445`;


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
                 <a href="${buyMeACoffeeURL}" target="_blank" class="publish-button">Support Us!</a>
                  <p><strong>After completing your payment, return <a href="${window.location.href}">here</a> to view your page.</strong></p>
            </div>
        `;
    } catch(error){
        console.error("Error fetching document:", error);
        landingPage.innerHTML = `<div class="content"><h1>Error: Failed to load the page data. Please try again or generate a new page.</h1></div>`;
    }
});
