// config/session.config.js

// require session - should be installed in git bash
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

  // use session - saved in DB, create - check path against index in folder db
module.exports = app => {
    app.set('trust proxy', 1);

    app.use(
        session({
        secret: process.env.SESS_SECRET,
        resave: true,
        rolling: true, //save the same session local and in DB
        saveUninitialized: false,
        cookie: {
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 60000
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/lab-express-basic-auth'

            // ttl => time to live
            // ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
        })
        })
    );
};