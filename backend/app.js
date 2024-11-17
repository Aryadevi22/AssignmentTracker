const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  // For generating the JWT token
const User = require('./models/User');  // Assuming User model is in models/User.js
const cors = require('cors');
const cookieParser = require('cookie-parser');  // To handle cookies

const app = express();

// Middleware setup
app.use(cors({
  origin: 'http://127.0.0.1:5500',  // Adjust based on where your frontend is running
  credentials: true,  // Allow sending cookies with requests
}));
app.use(express.json());  // To parse JSON bodies
app.use(cookieParser());  // To parse cookies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
    process.exit(1);  // Exit process with failure
  });

// Sign-up route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user in the database
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route with JWT token and cookie
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Check if the environment is production
      sameSite: 'Strict',
    });

    res.status(200).json({
      message: 'Login successful',
      token, // Return token (for testing or optional usage)
      username: user.username,
    });
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
