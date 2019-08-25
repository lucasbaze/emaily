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
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                console.log('I found the user!');
                return done(null, existingUser);
            }

            const newUser = await new User({ googleId: profile.id }).save();
            console.log("I'm creating a new user!");
            done(null, newUser);
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
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            console.log(profile.emails[0].value);
            const existingUser = await User.findOne({ facebookId: profile.id });

            if (existingUser) {
                console.log('I found the user!');
                return done(null, existingUser);
            }

            console.log("I'm creating a new user!");
            const newUser = await new User({ facebookId: profile.id }).save();

            done(null, newUser);
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
