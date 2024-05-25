// Import Firebase functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js';
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

// Firebase configuration
const appSettings = {
    databaseURL: "https://quizart-6180f-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(appSettings);
const database = getDatabase(app);

// Get form elements
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginButton = document.querySelector("#login-form button");

loginButton.addEventListener('click', function(event) {
    event.preventDefault();

    const userEmail = loginEmail.value;
    const userPassword = loginPassword.value;

    const dbRef = ref(database);

    get(child(dbRef, 'users')).then((snapshot) => {
        if (snapshot.exists()) {
            const users = snapshot.val();
            let userFound = false;

            for (let userId in users) {
                const user = users[userId];
                if (user.email === userEmail && user.password === userPassword) {
                    userFound = true;
                    break;
                }
            }

            if (userFound) {
                alert('Login successful!');
                // Redirect to the desired page after successful login
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        } else {
            alert('No users found.');
        }
    }).catch((error) => {
        console.error('Error fetching user data:', error);
        alert('An error occurred while logging in. Please try again later.');
    });

    // Clear the input fields
    loginEmail.value = '';
    loginPassword.value = '';
});
