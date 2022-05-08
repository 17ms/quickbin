import passport from "passport"
import passportLocal from "passport-local"
import db from "../configs/db"
import bcrypt from "bcrypt"

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((id, done) => {
  db("users")
    .where({ id })
    .first()
    .then((user) => done(null, user))
    .catch((err) => done(err, null))
})

const LocalStrategy = passportLocal.Strategy

const strategy = new LocalStrategy(
  { usernameField: "email" },
  (email, password, done) => {
    db("users")
      .where({ email })
      .first()
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect email" })
        }

        bcrypt.compare(password, user.hash, (_err, res) => {
          if (res) {
            return done(null, user)
          } else {
            return done(null, false, { message: "Incorrect password" })
          }
        })
      })
      .catch((err) => {
        return done(err)
      })
  }
)

export default strategy
