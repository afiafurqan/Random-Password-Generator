const passwordInput = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const notification = document.getElementById("notification");

// Characters used for generating passwords
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

// Generate random password
function generatePassword() {
    const allCharacters = uppercase + lowercase + numbers + symbols;
    const passwordLength = 16;

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(
            Math.random() * allCharacters.length
        );

        password += allCharacters[randomIndex];
    }

    passwordInput.value = password;
}

// Copy password
async function copyPassword() {
    const password = passwordInput.value;

    if (!password) {
        showNotification("Generate a password first!");
        return;
    }

    try {
        await navigator.clipboard.writeText(password);
        showNotification("Password copied successfully!");
    } catch (error) {
        passwordInput.select();
        const copied = document.execCommand("copy");

        if (copied) {
            showNotification("Password copied successfully!");
        } else {
            showNotification("Please copy the password manually.");
        }
    }
}

// Show notification
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 2500);
}

// Button events
generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
