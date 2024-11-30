// import passport from "passport";
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// import User from "../models/userModel";

// passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: '/auth/google/callback',
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         let user = await User.findOne({ googleId: profile.id });
//         if (!user) {
//           user = await User.create({
//             googleId: profile.id,
//             name: profile.displayName,
//             email: profile.emails[0].value,
//           });
//         }
//         done(null, user);
//       }
//     )
//   );
  
//   passport.serializeUser((user, done) => done(null, user.id));
//   passport.deserializeUser((id, done) => {
//     User.findById(id).then(user => done(null, user));
//   });