
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


