//Determine Credentials

if (process.env.NODE_ENV === 'production') {
    //in production need prod keys
    module.exports = require('./prod.js');
} else {
    //can you dev keys
    module.exports = require('./dev.js');
}
