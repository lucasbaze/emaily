const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = mongoose.model('users');

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true,
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    console.log('I found the user!');
                    done(null, existingUser);
                } else {
                    new User({ googleId: profile.id }).save().then(newUser => {
                        console.log("I'm creating a new user!");
                        done(null, newUser);
                    });
                }
            });
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: keys.facebookClientID,
            clientSecret: keys.facebookClientSecret,
            callbackURL: '/auth/facebook/callback',
            proxy: true,
            profileFields: ['id', 'displayName', 'profileUrl', 'email'],
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            console.log(profile.emails[0].value);
            User.findOne({ facebookId: profile.id }).then(existingUser => {
                if (existingUser) {
                    console.log('I found the user!');
                    done(null, existingUser);
                } else {
                    console.log("I'm creating a new user!");
                    new User({ facebookId: profile.id })
                        .save()
                        .then(newUser => {
                            done(null, newUser);
                        });
                }
            });
        }
    )
);

passport.serializeUser((user, done) => {
    console.log("I'm serializing the User");
    done(null, user);
});

passport.deserializeUser((id, done) => {
    console.log("I'm deserializing the User");
    User.findById(id).then(user => {
        done(null, user);
    });
});
