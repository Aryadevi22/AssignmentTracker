// Handle Signup Form Submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values of the username and password fields
  var username = document.getElementById('signup-username').value;
  var password = document.getElementById('signup-password').value;

  // Check if username and password are not empty
  if (username && password) {
      // Store the username and password in localStorage for future login
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    
      // Redirect to the login page after successful signup
      alert("Signup successful! Please log in.");
      window.location.href = "signin.html"; // Redirect to the login page
  } else {
      // Show an error if the fields are empty
      alert("Please fill out all fields.");
  }
});

// Handle Login Form Submission
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values of the username and password fields
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Retrieve the saved username and password from localStorage
  var storedUsername = localStorage.getItem('username');
  var storedPassword = localStorage.getItem('password');

  // Verify if the entered username and password match the saved credentials
  if (username === storedUsername && password === storedPassword) {
      // If login is successful, redirect to the homepage (e.g., home.html)
      window.location.href = "signin.html"; // Redirect to the homepage
  } else {
      // If login fails, show an error message
      alert("Invalid username or password!");
  }
});
