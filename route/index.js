const router = require('express').Router()
const user = require('../user/model.js')
const dateformat = require('dateformat')
const normalTime = require('../helper/time.js').normalTime
router.get('/', (req, res, next) => {
  user.getJobs({})
  .then((data) => {
  	res.render('index', {data : data, dateformat: dateformat, normalTime:normalTime})
  })
})
module.exports = router
