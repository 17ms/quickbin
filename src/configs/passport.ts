import passport from "passport"
import passportLocal from "passport-local"
import bcrypt from "bcrypt"
import db from "./database"
import { randomUUID } from "crypto"
import signupData from "../types/signupData"

const isValidEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

const isValidPassword = (password: string) => {
  /* Require min. 8 char password with at least 
  a symbol, upper and lower case letters and a number. */
  return password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
}

const LocalStrategy = passportLocal.Strategy

passport.serializeUser((user: Express.User, done) => {
  done(null, user)
})

passport.deserializeUser((user: Express.User, done) => {
  done(null, user)
})

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      const signupUser = async () => {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password, salt)

        await db("users")
          .where({ email })
          .first()
          .then((user) => {
            if (user) {
              return done(
                null,
                false,
                req.flash("message", "Email already registered")
              )
            } else {
              db("users")
                .insert({
                  uid: randomUUID(),
                  email,
                  hash
                })
                .returning(["uid", "email", "created_at"])
                .then((data) => {
                  const userData: signupData = data[0] as signupData
                  console.log(userData)

                  console.log(
                    `User [${userData.email}] signed up and logged in successfully`
                  )
                  return done(null, {
                    uid: userData.uid,
                    username: userData.email,
                    createdAt: userData.created_at
                  })
                })
                .catch((err) => {
                  console.log(`ERROR @signup-strategy: ${err}`)
                  throw err
                })
            }
          })
          .catch((err) => {
            console.log(`ERROR @signup-strategy: ${err}`)
            throw err
          })
      }

      if (!isValidEmail(email)) {
        return done(
          null,
          false,
          req.flash("message", "Please provide valid email")
        )
      } else if (!isValidPassword(password)) {
        return done(
          null,
          false,
          req.flash("message", "Please provide valid password")
        )
      } else {
        signupUser()
      }
    }
  )
)

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, email, password, done) => {
      const loginUser = async () => {
        await db("users")
          .where({ email })
          .first()
          .then((user) => {
            if (!user) {
              return done(
                null,
                false,
                req.flash("message", "Incorrect username or password")
              )
            } else {
              bcrypt.compare(password, user.hash, (err, res) => {
                if (err) {
                  console.log("Error when validating password")
                  return done(err)
                }
                if (res) {
                  console.log(`User [${user.email}] logged in successfully`)
                  return done(null, {
                    uid: user.uid,
                    username: user.email,
                    createdAt: user.created_at
                  })
                } else {
                  return done(
                    null,
                    false,
                    req.flash("message", "Incorrect username or password")
                  )
                }
              })
            }
          })
          .catch((err) => {
            console.log(`ERROR @login-strategy: ${err}`)
            throw err
          })
      }

      loginUser()
    }
  )
)

// TODO: add update password -strategy (passport)
