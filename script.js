generateBtn.addEventListener("click", () => {
    const tokenName = document.getElementById("tokenName").value.trim();
    const ticker = document.getElementById("ticker").value.trim();
    const twitter = document.getElementById("twitter").value.trim();
    const telegram = document.getElementById("telegram").value.trim();
    const website = document.getElementById("website").value.trim();
    const background = document.getElementById("background").value.trim();
    const logoInput = document.getElementById("logo");

    // Validate required fields
    if (!tokenName || !ticker) {
        alert("Please fill out both Token Name and Ticker.");
        return;
    }

    if (ticker.length > 5) {
        alert("Ticker should not exceed 5 characters.");
        return;
    }

    const data = {
        tokenName,
        ticker,
        twitter,
        telegram,
        website,
        background,
    };

    // Handle logo upload
    if (logoInput.files && logoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            data.logo = e.target.result; // Save the logo as a base64 string

            // Save data to localStorage and redirect
            localStorage.setItem("memeCoinData", JSON.stringify(data));
            window.location.href = "generated.html";
        };

        reader.readAsDataURL(logoInput.files[0]);
    } else {
        // Proceed without a logo
        data.logo = null;

        // Save data to localStorage and redirect
        localStorage.setItem("memeCoinData", JSON.stringify(data));
        window.location.href = "generated.html";
    }
});
