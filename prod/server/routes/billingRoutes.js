const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        let charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '5 Survey Credits for Emaily.com',
            source: req.body.id,
        });

        //the current user model is stored on the req property by passport if the user is signed in
        console.log(charge);
        console.log('///');
        console.log(req);

        req.user.credits += 5;
        //this little bit of user.save() isn't entirely intuitive, but I'm assuming that the user object on the request has a save function?
        // I think I figured it out.
        //passport has a stored object of the Mongoose User model (and specifically the user signed in) and this has the mongoose / mongoDB function save associated with it.
        //genuis.
        const user = await req.user.save();
        res.send(user);
    });
};
