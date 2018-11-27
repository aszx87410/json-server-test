module.exports = (req, res, next) => {
  if (req.method == 'POST' && req.path == '/login') {
    if (req.body.username === 'user01' && req.body.password === 'user01') {
      res.status(200).json({message: 'success', result: 'success'})
    } else {
      res.status(400).json({message: 'wrong password', result: 'failure'})
    }
  } else {
    next()
  }
}