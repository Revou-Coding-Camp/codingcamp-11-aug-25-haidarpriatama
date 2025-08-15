// Uncomment to automatically trigger welcome message
welcomeSpeech();

/**
 * Prompts the user for their name and displays it in the greeting element.
 * If the user enters a name, it updates the content of the element with id 'user-greeting'.
 * If no name is provided, the greeting remains unchanged.
 */
function welcomeSpeech() {
    let userName = prompt("What is your name?");
    if (userName != '') {
        document.getElementById('user-greeting').textContent = userName;
    }
}

/**
 * Handles the message sending functionality.
 * Retrieves the message from the input field with id 'user-message'.
 * Displays an alert with the message if one is provided,
 * otherwise shows an error message asking the user to enter text.
 */
function sendMessage() {
    let message = document.getElementById('user-message').value;
    if (message != '') {
        alert("Message sent: " + message);
    } else {
        alert("Please enter a message before sending.");
    }
}