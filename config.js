module.exports = {
  port: 3000,
  session: {
    secret: 'CHANGE_ME'
  },
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 52, // 1 year
    secret: 'CHANGE_ME'
  },
  mongo: {
    uri: 'mongodb://localhost:27017/authentication'
  }
}