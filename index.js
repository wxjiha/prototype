
// Import express and ejs
const express = require('express');
const ejs = require('ejs');

// Import modules
const mysql = require('mysql2/promise');
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');

// Import route handlers
const mainRoutes = require('./routes/main'); // Ensure this path is correct

// Create the express application object
const app = express();
const port = 3000;

// Set up the body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up public folder (for CSS and static JS)
app.use(express.static(__dirname + '/public'));

// CORS setup
const corsOptions = {
    origin: ['http://localhost:3000', 'https://doc.gold.ac.uk/usr/448/'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true, // Allow cookies
};

// Create a session
app.use(session({
    secret: 'randomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));

// Middleware to sanitize inputs
app.use(expressSanitizer());

// Tell Express to use EJS as the templating engine
app.set('view engine', 'ejs');

// Set up the database connection
let db;
(async () => {
    try {
        db = await mysql.createPool({
            host: 'localhost', // Update with your database host
            user: 'root',      // Update with your database username
            password: '',      // Update with your database password
            database: 'fraudula', // Update with your database name
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection error:', error.message);
    }
})();

// Middleware to ensure the database connection is available
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Define our application-specific data
app.locals.shopData = { shopName: "Fraudula" };

// Mount routes
app.use('/', mainRoutes);

// Middleware to ensure the user is logged in
function redirectLogin(req, res, next) {
    if (!req.session.userId) {
        res.redirect('/login');
    } else {
        next();
    }
}

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error("Error occurred:", err.message);
    console.error("Error Stack:", err.stack);

    // Send a detailed error message only in development
    if (process.env.NODE_ENV === 'development') {
        res.status(err.status || 500).send(`Error: ${err.message}`);
    } else {
        res.status(err.status || 500).send('Something went wrong! Please try again later.');
    }
});

// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
