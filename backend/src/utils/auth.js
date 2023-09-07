const express = require("express");
const app = express();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/model").User;
const bcrypt = require("bcrypt");


const initGoogleAuth = () => {
  //use gg auth
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_App_ID,
                clientSecret: process.env.GOOGLE_App_Secret,
                callbackURL:"/auth/google/callback",
            },
            async function (accessToken, refreshToken, profile, cb) {
                let authID = "google " + profile.id;
                try {
                    let u = await Account.findOne({ id: authID });
                    if (u) {
                        return cb(null, u);
                    } else {
                        let u = new Account({
                            id: authID,
                            name: profile.displayName,
                        });
                        u.save();
                        cb(null, u);
                    }
                } catch (err) {
                    cb(err, null);
                }
            }
        )
    );
};
const initAuth = () => {
    //use JWT auth
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_Key
    }, async (jwtPayload, done) => {
        try {
            const user = await User.findById(jwtPayload._id);
            if (!user) {
                return done(null, false, { message: 'User not found.' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
}

const authMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error.' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized.' });
      }

      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden.' });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
const authMiddlewareAdmin = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error.' });
      }
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized.' });
      }

      if (user.role === 'admin') {
        req.user = user;
        next();
      }
      return res.status(403).json({ message: 'Forbiden.' });

    })(req, res, next);
  };
  
module.exports = { initAuth, initGoogleAuth,authMiddleware, authMiddlewareAdmin };
