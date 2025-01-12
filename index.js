// Import required modules
const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');

// Import route handlers
const mainRoutes = require('./routes/main');
const usersRouter = require('./routes/users');
const casesRouter = require('./routes/cases'); 


// Import the database connection
const db = require('./db'); // Ensure `db.js` exists in the root directory

// Create the Express app
const app = express();
const port = 3000;

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up public folder (for CSS and static JS)
app.use(express.static(__dirname + '/public'));

// Configure session
app.use(
    session({
        secret: 'randomstuff', // Replace with a more secure secret
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Use secure: true in production with HTTPS
    })
);

// Middleware to sanitize inputs
app.use(expressSanitizer());

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Add the database connection to all requests
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Set global application data
app.locals.shopData = { shopName: 'Fraudula' };

// Mount routes
app.use('/', mainRoutes);
app.use('/users', usersRouter);
app.use('/cases', casesRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    console.error('Error stack:', err.stack);

    // Send a detailed error message only in development
    if (process.env.NODE_ENV === 'development') {
        res.status(err.status || 500).send(`Error: ${err.message}`);
    } else {
        res.status(err.status || 500).send('Something went wrong! Please try again later.');
    }
});

app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await req.db.query('SELECT 1 + 1 AS result');
        res.send(`Database test successful: ${rows[0].result}`);
    } catch (err) {
        console.error('Database test failed:', err.message);
        res.status(500).send('Database test failed');
    }
});


// Start the server
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
