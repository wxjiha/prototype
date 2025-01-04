const express = require('express');
const router = express.Router();

// Default route to serve the login page
router.get('/', (req, res) => {
    res.render('login'); // Renders login.ejs
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Perform login authentication (mock example)
    if (username === 'admin' && password === 'password') {
        res.redirect('/transactions'); // Redirect to transactions on successful login
    } else {
        res.status(401).send('Invalid credentials');
    }
});


// Add other routes as necessary
router.get('/register', (req, res) => {
    res.render('register'); // Renders register.ejs
});

router.get('/transactions', (req, res) => {
    res.render('transactions'); // Renders transactions.ejs
});

router.get('/flagged-cases', (req, res) => {
    res.render('flaggedcases'); // Renders flaggedcases.ejs
});

module.exports = router;
