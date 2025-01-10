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
        // Save the user session or other logic
        req.session.isLoggedIn = true;

        // Redirect to home
        res.redirect('/home');
    } else {
        res.status(401).send('Invalid credentials');
    }
});


// Add other routes as necessary
router.get('/register', (req, res) => {
    res.render('register'); // Renders register.ejs
});

router.get('/home', (req, res) => {
    res.render('home', {
        isLoggedIn: req.session.isLoggedIn || false,
        username: req.session.username || null,
    });
});

router.get('/', (req, res) => {
    res.render('login', {
        isLoggedIn: req.session.isLoggedIn || false,
    });
});


router.get('/transactions', (req, res) => {
    res.render('transactions'); // Renders transactions.ejs
});

router.get('/flagged-cases', (req, res) => {
    res.render('flaggedcases'); // Renders flaggedcases.ejs
});

module.exports = router;
