const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy

const {User} = require('../db/models')

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.')
} else {
  passport.use(
    new SpotifyStrategy(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: process.env.SPOTIFY_CLIENT_CALLBACK
      },
      function(accessToken, refreshToken, expires_in, profile, done) {
        console.log('spotify PROFILE', profile)
        User.findOrCreate({spotifyId: profile.id}, function(err, user) {
          return done(err, user) //profile instead of user?
        })
      }
    )
  )

  router.get(
    '/',
    passport.authenticate('spotify', {
      scope: ['user-read-email', 'user-read-private'],
      showDialog: true
    })
    // function(req, res) {
    //   // The request will be redirected to spotify for authentication, so this
    //   // function will not be called.
    // }
  )

  router.get(
    '/callback',
    passport.authenticate('spotify', {failureRedirect: '/login'}),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/')
    }
  )

  // ??
  // router.get('/logout', function(req, res) {
  //   req.logout()
  //   res.redirect('/')
  // })
}

module.exports = router
