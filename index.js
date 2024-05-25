
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

