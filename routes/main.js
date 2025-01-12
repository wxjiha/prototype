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
    const shopData = {
        shopName: "Fraudula",
        items: [
            { month: "January, 2024"},
            { month: "February, 2024"},
            { month: "March, 2024"},
            { month: "April, 2024"},
            { month: "May, 2024"},
            { month: "June, 2024"},
            { month: "July, 2024"},
            { month: "August, 2024"},
            { month: "September, 2024"},
            { month: "October, 2024"},
            { month: "November, 2024"},
            { month: "December, 2024"},
            { month: "January, 2025"},
            { month: "February, 2025"},
        ]
    };

    res.render('home', {
        isLoggedIn: req.session.isLoggedIn || false,
        username: req.session.username || null,
        shopData: shopData,
    });
});


router.get('/', (req, res) => {
    res.render('login', {
        isLoggedIn: req.session.isLoggedIn || false,
    });
});


router.get('/transactions', (req, res) => {
    const month = req.query.month || "Unknown Month";

    res.render('transactions', {
        month: month,
        isLoggedIn: req.session.isLoggedIn || false,
    });
});


router.get('/flagged-cases', (req, res) => {
    res.render('flaggedcases'); // Renders flaggedcases.ejs
});

// About route
router.get('/about', (req, res) => {
    const shopData = {
        shopName: "Fraudula",
    };
    res.render('about', { shopData: shopData });
});

module.exports = router;
