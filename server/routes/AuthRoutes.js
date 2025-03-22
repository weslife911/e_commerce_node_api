require("dotenv").config();

const router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require('passport-google-oidc');
const GoogleUser = require("../models/GoogleUser");
const { registerUser, loginUser } = require("../controllers/AuthController");
const GithubUser = require("../models/GithubUser");
const FacebookUser = require("../models/FacebookUser");
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

// Google Auth

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: 'http://localhost:5173/shop',
    failureRedirect: '/login'
}));
router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

// Github Auth

router.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));
  
router.get('/auth/github/callback', 
passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:5173/shop');
});

// Facebook Auth

router.get('/auth/facebook',
    passport.authenticate('facebook'));
  
router.get('/oauth/facebook/redirect',
passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('http://localhost:5173/shop');
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: [ 'profile' ]
}, function verify(issuer, profile, cb) {
    GoogleUser.findOne({ googleId: profile.id}, function(err, user) {
        if(err) {
            return cb(err);
        }
        if(!user) {
            const newUser = new GoogleUser({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
            })
            newUser.save(function(err) {
                if(err) {
                    return cb(err);
                }
                return cb(null, newUser);
            });
        }
    });
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    GithubUser.findOne({ githubId: profile.id }, (err, user) => {
      if(err) {
        return done(err);
      }
      if(!user) {
        const newUser = new GithubUser({
            githubId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
        });
        newUser.save(function(err) {
            if(err) {
                return cb(err);
            }
            return cb(null, newUser);
        });
      }

    });
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'name', 'emails']
  },
  function(accessToken, refreshToken, profile, cb) {
    FacebookUser.findOne({ facebookId: profile.id }, (err, user) => {
        if(err) {
          return done(err);
        }
        if(!user) {
          const newUser = new FacebookUser({
              facebookId: profile.id,
              name: profile.displayName,
            //   email: profile.emails
          });
          newUser.save(function(err) {
              if(err) {
                  return cb(err);
              }
              return cb(null, newUser);
          });
        }
  
      });
  }
));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user._id, name: user.name });
    });
});
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

module.exports = router;