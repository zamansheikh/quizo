
// Import Firebase functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js';
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

// Firebase configuration
const appSettings = {
    databaseURL: "https://quizart-6180f-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(appSettings);
const database = getDatabase(app);
const messageFcontactDB = ref(database, 'formsub');

// Get form elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// Get a reference to the submit button
const submitButton = document.getElementById('f_submit');

// Add an event listener to the submit button
submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    // Get user input
    const userName = nameInput.value;
    const userEmail = emailInput.value;
    const userMessage = messageInput.value;

    // Create a new reference with an auto-generated id
    const newMessageRef = push(messageFcontactDB);

    // Create a new message object
    const messageObject = {
        name: userName,
        email: userEmail,
        message: userMessage
    };

    // Save the new message to Firebase
    set(newMessageRef, messageObject)
        .then(() => {
            console.log('Data written successfully!');
            alert('Your message has been sent successfully!');
        })
        .catch((error) => {
            console.error('Data could not be written:', error);
            alert('An error occurred while sending your message. Please try again later.');
        });

    // Clear the input fields
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
});


const authDatabase = ref(database, 'users');

const ur_name = document.getElementById("signup-name");
const ur_email = document.getElementById("signup-email");
const ur_password = document.getElementById("signup-password");
const ur_cpassword = document.getElementById("signup-cpassword");
const registerButton = document.getElementById('regiser_user');

registerButton.addEventListener('click', function (event) {
    event.preventDefault();

    const userName = ur_name.value;
    const userEmail = ur_email.value;
    const userPassword = ur_password.value;
    const userCPassword = ur_cpassword.value;

    if (userPassword !== userCPassword) {
        alert('Password and Confirm Password do not match!');
        return;
    }

    const newUserRef = push(authDatabase);

    const userObject = {
        name: userName,
        email: userEmail,
        password: userPassword
    };

    set(newUserRef, userObject)
        .then(() => {
            console.log('Data written successfully!');
            alert('You have been registered successfully!');
        })
        .catch((error) => {
            console.error('Data could not be written:', error);
            alert('An error occurred while registering. Please try again later.');
        });

    ur_name.value = '';
    ur_email.value = '';
    ur_password.value = '';
    ur_cpassword.value = '';
});


