import passport from "passport"
import passportLocal from "passport-local"
import bcrypt from "bcrypt"
import db from "./database"
import { randomUUID } from "crypto"
import signupData from "../types/signupData"
import logger from "../utils/winston"

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
                .returning(["uid", "email", "created_at", "updated_at"])
                .then((data) => {
                  const userData: signupData = data[0] as signupData

                  logger.log(
                    "info",
                    `User [${userData.email}] signed up and logged in successfully`
                  )
                  return done(null, {
                    uid: userData.uid,
                    username: userData.email,
                    createdAt: userData.created_at,
                    editedAt: userData.updated_at
                  })
                })
                .catch((err) => {
                  logger.log("error", `ERROR @signup-strategy: ${err}`)
                  throw err
                })
            }
          })
          .catch((err) => {
            logger.log("error", `ERROR @signup-strategy: ${err}`)
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
                  logger.log("error", "Error when validating password")
                  return done(err)
                }
                if (res) {
                  logger.log(
                    "info",
                    `User [${user.email}] logged in successfully`
                  )
                  return done(null, {
                    uid: user.uid,
                    username: user.email,
                    createdAt: user.created_at,
                    editedAt: user.updated_at
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
            logger.log("error", `ERROR @login-strategy: ${err}`)
            throw err
          })
      }

      loginUser()
    }
  )
)

passport.use(
  "update",
  new LocalStrategy(
    {
      usernameField: "oldPassword",
      passwordField: "newPassword",
      passReqToCallback: true
    },
    (req, oldPassword, newPassword, done) => {
      const updatePassword = async () => {
        const salt = await bcrypt.genSalt()
        const newHash = await bcrypt.hash(newPassword, salt)

        await db("users")
          .where({ email: req.user?.username })
          .first()
          .then((user) => {
            bcrypt.compare(oldPassword, user.hash, async (err, res) => {
              if (err) {
                logger.log("error", "Error when validating password")
                return done(err)
              }
              if (res) {
                await db("users")
                  .where({ email: user.email })
                  .update({ hash: newHash, updated_at: db.fn.now() })
                  .catch((err) => {
                    logger.log("error", `ERROR @update-strategy: ${err}`)
                    throw err
                  })

                logger.log(
                  "info",
                  `User [${user.email}] updated their password successfully`
                )
                return done(null, {
                  uid: user.uid,
                  username: user.email,
                  createdAt: user.created_at,
                  editedAt: user.updated_at
                })
              } else {
                return done(
                  null,
                  false,
                  req.flash("message", "Incorrect password")
                )
              }
            })
          })

        if (req.user) {
        }
      }

      if (!isValidPassword(newPassword)) {
        return done(
          null,
          false,
          req.flash("message", "Please provide valid new password")
        )
      } else {
        updatePassword()
      }
    }
  )
)
