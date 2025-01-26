import { randomBytes } from "crypto"; // Use this only for higher randomness if required

export function generateStrongPassword(length = 12) {
    if (length < 4) {
        throw new Error("Password length must be at least 4 characters");
    }

    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?";

    const allCharacters = lowerCase + upperCase + numbers + specialCharacters;

    let password = "";

    // Ensure the password contains at least one character from each category
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

    // Fill the rest of the password with random characters from all categories
    for (let i = 4; i < length; i++) {
        password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    // Shuffle the password to ensure randomness
    password = password.split("").sort(() => 0.5 - Math.random()).join("");

    return password;
}
