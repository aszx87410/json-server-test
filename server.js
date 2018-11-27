const jsonServer = require('json-server')
const session = require('express-session')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.use((req, res, next) => {
  if (req.method === 'POST' && req.path == '/login') {
    if (req.body.username === 'user01' && req.body.password === 'user01') {
      req.session.user = {
        username: 'user01'
      }
      res.status(200).json({result: 'success', message: 'login success'})
    } else {
      res.status(400).json({result: 'failure', message: 'wrong password'})
    }
  } else {
    next()
  }
})

server.use((req, res, next) => {
  if (req.path == '/me') {
    if (req.session.user) {
      res.status(200).json({result: req.session.user, message: 'success'})
    } else {
      res.status(400).json({result: 'failure', message: 'no user'})
    }    
  } else {
    next()
  }
})

server.use((req, res, next) => {
  if (req.path == '/logout') {
    req.session.user = null
    res.status(200).json({result: 'success', message: 'logout success'})
  } else {
    next()
  }
})

// Use default router
server.use(router)
server.listen(3310, () => {
  console.log('JSON Server is running')
})