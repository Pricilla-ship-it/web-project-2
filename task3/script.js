// script.js

// Simulate a backend service to track requests
let lastRequestTime = localStorage.getItem('lastRequestTime');
let dailyLimitReached = false;

// Function to check if the user can request a reset
function canRequestReset() {
    const now = new Date().getTime();
    const lastRequest = lastRequestTime ? parseInt(lastRequestTime) : 0;

    // If 24 hours have passed since the last request, allow a new one
    if (now - lastRequest > 24 * 60 * 60 * 1000) {
        dailyLimitReached = false;
    } else {
        dailyLimitReached = true;
    }
}

// Function to handle password reset request
function requestPasswordReset() {
    canRequestReset();

    const email = document.getElementById('resetEmail').value;
    const phone = document.getElementById('resetPhone').value;

    if (dailyLimitReached) {
        document.getElementById('warningMessage').style.display = 'block';
        return;
    }

    // Check if at least one of email or phone is entered
    if (email || phone) {
        // Simulate sending a request to the backend to reset the password
        console.log(`Reset request for ${email || phone}`);
        
        // Store the last reset time in localStorage
        localStorage.setItem('lastRequestTime', new Date().getTime());
        document.getElementById('warningMessage').style.display = 'none';
        document.getElementById('statusMessage').textContent = 'A password reset link has been sent to your email/phone!';
    } else {
        document.getElementById('statusMessage').textContent = 'Please enter an email or phone number.';
    }
}

// Function to generate a random password
function generateRandomPassword() {
    const password = generateRandomString(12);
    document.getElementById('generatedPassword').value = password;
}

// Helper function to generate random password (only lowercase and uppercase letters)
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

