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

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dn5qjgaio/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'memepage-generator';
const BASE_URL = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
//Paystack variables
const PAYSTACK_PUBLIC_KEY = 'pk_live_9841715ba5385787820ba523c0e6315046fc8a9a';
const PAYMENT_AMOUNT = 100; //Amount in kobo
const PAYSTACK_PLAN_CODE = 'PLN_rcanog6vsxeb49w'


generateBtn.addEventListener("click", async () => {
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

    let logoURL = null;
    if (logoInput.files && logoInput.files[0]) {
        const file = logoInput.files[0];
        logoURL = await uploadImageToCloudinary(file);
        if (!logoURL) {
            alert("Failed to upload image to Cloudinary.");
            return;
        }
    }
    const formData = {
        tokenName,
        ticker,
        twitter,
        telegram,
        website,
        background,
        logo: logoURL
    }
    const docRef = await db.collection("memePages").add(formData);
    const shortId = docRef.id;
    // Generate a unique transaction reference
    const transactionRef =  generateTransactionRef(shortId);

    // Create a Paystack payment URL
     const paystackUrl = `https://checkout.paystack.com/pay/${PAYSTACK_PLAN_CODE}`;

    // Redirect the user to Paystack
    const successUrl = `${BASE_URL}generated.html#success?ref=${transactionRef}&id=${shortId}`;
    window.location.href = `${paystackUrl}?reference=${transactionRef}&amount=${PAYMENT_AMOUNT}&callback_url=${successUrl}&email=user@example.com`;
});
async function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            return data.secure_url;
        } else {
            console.error("Cloudinary upload failed:", response.status, await response.text());
            return null;
        }
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
}

function generateTransactionRef(shortId) {
  return `meme_${shortId}_${Date.now()}`;
}
