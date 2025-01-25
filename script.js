generateBtn.addEventListener("click", () => {
    const tokenName = document.getElementById("tokenName").value.trim();
    const ticker = document.getElementById("ticker").value.trim();
    const twitter = document.getElementById("twitter").value.trim();
    const telegram = document.getElementById("telegram").value.trim();
    const website = document.getElementById("website").value.trim();
    const background = document.getElementById("background").value.trim();
    const logoInput = document.getElementById("logo");

    if (!tokenName || !ticker) {
        alert("Please fill out both Token Name and Ticker.");
        return;
    }

    if (ticker.length > 5) {
        alert("Ticker should not exceed 5 characters.");
        return;
    }

    if (logoInput.files && logoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const logoDataURL = e.target.result;
            const queryParams = new URLSearchParams({
                tokenName,
                ticker,
                twitter,
                telegram,
                website,
                background,
                logo: encodeURIComponent(logoDataURL),
            });
            window.location.href = `generated.html?${queryParams.toString()}`;
        };

        reader.readAsDataURL(logoInput.files[0]);
    } else {
        const queryParams = new URLSearchParams({
            tokenName,
            ticker,
            twitter,
            telegram,
            website,
            background,
        });
        window.location.href = `generated.html?${queryParams.toString()}`;
    }
});