const router = require('express').Router()
const bodyParser = require('body-parser')
const userModel = require('../user/model.js')
router.post('/', bodyParser.json(), (req, res, next) => {
  let year = req.body.date.split('/')[2]
  let month = req.body.date.split('/')[1] - 1
  let day = req.body.date.split('/')[0] + 2
  userModel.
  insertJob(new Date(year, month, day), req.body.description, req.body.start_time, req.body.end_time, req.body.location)
  .then((x) => {
    res.json({
      message: x
    })
  })
  .catch((err) => {
    res.status(417)
    res.json({
      message: err
    })
  })
})
module.exports = router
