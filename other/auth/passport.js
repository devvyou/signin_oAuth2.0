// Requiring packages
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../database/models/user');

// Initialize the strategy to implement in passport.js 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:80/google/callback',
    passReqToCallback: true
},
    async (request, accessToken, refreshToken, profile, done) => {

        // 1. Find a matching googleId inside documents in mongodb
        // 2. If there is a matching user we log-in, if not, will be created a new user.

        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
        }

        try {

            // Step 1
            let user = await User.findOne({ googleId: profile.id })

            // Step 2
            if (user) {
                done(null, user)
            } else {
                user = await User.create(newUser)
                done(null, user)
            }

        } catch (error) { // Catch errors
            throw new Error(error);
        }

    }

));


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
})

