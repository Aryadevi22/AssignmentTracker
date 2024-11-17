document.addEventListener('DOMContentLoaded', function() {
  // Handle Login Form Submission
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values of the username and password fields
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Send data to the server to authenticate the user
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Login successful') {  // Check for success response
        // Store JWT token in localStorage (or cookie, depending on your preference)
        localStorage.setItem('token', data.token);  // Save token to localStorage
        window.location.href = "NewHome.html"; // Redirect to the homepage (NewHome.html)
      } else {
        // If login fails, show an error message
        alert('Invalid username or password!');
      }
    })
    .catch(error => {
      alert('Login failed!');
      console.error('Error:', error);
    });
  });
});
