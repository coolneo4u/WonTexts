const User = require('../models/user.model')
require('../passport')

const passport = require('passport')

exports.create = (req, res, next) => {
  const { email, password, firstName, lastName } = req.body
  if (!email) return res.status(422).json({ errors: { email: 'is required' } })
  if (!password) return res.status(422).json({ errors: { password: 'is required' } })
  if (!firstName) return res.status(422).json({ errors: { firstName: 'is required' } })
  if (!lastName) return res.status(422).json({ errors: { lastName: 'is required' } })
  const finalUser = new User({ email, password, firstName, lastName })
  finalUser.setPassword(password)
  finalUser.save().then(() => {
    return res.json({ user: finalUser.toAuthJSON() })
  })
}

exports.login = (req, res, next) => {
  const {
    body: { user }
  } = req
  if (!user.email) return res.status(422).json({ errors: { email: 'is required' } })
  if (!user.password) return res.status(422).json({ errors: { password: 'is required' } })
  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) return next(err)
    if (passportUser) {
      const user = passportUser
      user.token = passportUser.generateJWT()
      return res.json({ user: user.toAuthJSON() })
    }
    return status(400).info
  })(req, res, next)
}

exports.current = (req, res, next) => {
  const {
    payload: { id }
  } = req
  return User.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400)
    }
    return res.json({ user: user.toAuthJSON() })
  })
}
