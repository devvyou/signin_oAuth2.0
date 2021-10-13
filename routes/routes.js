// Requiring packages
const { Router } = require('express');
const passport = require('passport')
const router = Router();



// Function to make sure if you are authenticated
const { ensureLoggedIn } = require('../other/functions/functions')



router.get('/', (req, res) => res.render('home'))

router.get('/success', ensureLoggedIn, (req, res, next) => {
    return res.send('success')
})

router.get('/failure', (req, res) => {
    return res.send('failure')
})



// in this section of code we specify the scopes. So the data that we want to retrieve and work on.
router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/success',
        failureRedirect: '/failure'
    })
);

// logout functionality
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})



// export router to app.js
module.exports = router;