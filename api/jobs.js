const router = require('express').Router()
const bodyParser = require('body-parser')
const userModel = require('../user/model.js')
router.post('/', bodyParser.json(), (req, res, next) => {
  console.log(req.body.date.split('/'));
  let year = req.body.date.split('/')[2]
  let month = req.body.date.split('/')[1]
  let day = req.body.date.split('/')[0]
  console.log(`${year}-${month}-${day}T18:30:00.000Z`);
  let date = new Date(`${year}-${month}-${day}T18:30:00.000Z`)
  console.log(req.body.start_time);
  console.log(req.body.end_time);
  console.log(parseInt(req.body.start_time) != parseInt(req.body.end_time));
  if (date.getDay() < 5 || parseInt(req.body.start_time) != parseInt(req.body.end_time)) {
  userModel.
  insertJob(date, req.body.description, req.body.start_time, req.body.end_time, req.body.location)
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
} else {
  if (parseInt(req.body.start_time) == parseInt(req.body.end_time)) {
   res.json({
     message:'start and end time is same'
   })
  } else{
  res.json({
    message: 'it is weekend enjoy'
  })
  }
}
})
module.exports = router
