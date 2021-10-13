// Load environment variables
require('dotenv').config();

// Requiring packages
const express = require('express'),
    passport = require('passport'),
    app = express(),
    connDb = require('./other/database/connectDb'),
    session = require('express-session'),
    connectMongo = require('connect-mongo');

// Function to connect to mongoose
connDb();

app.set('view engine', 'ejs') // template-engine set to ejs
app.use(express.static('public')) // static files(css, images, js)


// express-session handles sessions 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new connectMongo({ // connect-mongo package to store sessions in the database
        mongoUrl: process.env.MONGO_URI,
        dbName: process.env.DB_NAME
    })
}))

// Requiring the entire passport.js file
require('./other/auth/passport');

// Init passport.js functionalities
app.use(passport.initialize())
app.use(passport.session())


app.use((req, res, next) => {

    // We globally pass this boolean value into the views
    res.locals.authenticated = req.isAuthenticated();
    return next();

})

app.use('/', require('./routes/routes')) // Routes

app.listen(80, () => {
    console.log('server is listening');
})