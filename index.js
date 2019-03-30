const cookieParser = require('cookie-parser')
const config = require('@femto-host/config')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const express = require('express')

const app = express()
const port = config.get('port')
mongoose.connect(config.get('mongo.uri'), { useNewUrlParser: true })

app.use(express.static('public'))
app.set('view engine', 'pug')
app.use(cookieParser(config.get('cookie.secret') || 'CHANGE_ME'))
app.use(session({
  secret: config.get('session.secret') || 'CHANGE_ME',
  cookie: { maxAge: config.get('cookie.maxAge') },
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: true,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  console.log(req.session)

  req.session.count = ++req.session.count || 1

  next()
})

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', user: { name: 'Popey' } })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
