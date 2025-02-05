const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/registerform', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:"));

// Schema & Model
const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'myform.html'));
});

app.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).send("<h1>All fields are required</h1>");
        }

        const newUser = new User({ firstname, lastname, email, password });
        await newUser.save();

        res.send("<h1>Registration Successful</h1>");
    } catch (err) {
        res.status(500).send(`<h1>Error registering user</h1>`);
    }
});

// Start server
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Shut down server after 300 seconds (5 minutes)
setTimeout(() => {
    console.log("Server shutting down after 300 seconds...");
    server.close(() => {
        console.log("Server stopped.");
        mongoose.connection.close(); // Close MongoDB connection
    });
}, 8000000); // 300s = 300000ms
