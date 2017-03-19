const mongoose = require('mongoose')
const normalTime = require('../helper/time.js').normalTime
const schema = new mongoose.Schema({
  job_at: {
    type: Date,
    required: true
  },
  jobs:[{
    description: {
      type: String,
      required: true
    },
    start_time: {
      type: Number,
      required: true,
      min: 9,
      max: 18
    },
    end_time:{
      type: Number,
      required: true,
      min: 9,
      max: 18
    },
    location: {
      type: String,
      required: true
    }
  }]
})
//mongoose.connect("mongodb://balaji:anvena@ds145208.mlab.com:45208/glargo")
const model = mongoose.model('jobs', schema)
/*
  check timing takes date and duration as
  parameter. it resolve total duration
  of particular day
*/
/*const checkTotalDuration = (date) => {
  return new Promise((resolve, reject) => {
    model
    .aggregate([
      {'$match':{'job_at':date}},
      {'$unwind':'$jobs'},
      {'$group':{'_id':null,'occupiedDuraion':{'$sum':'$jobs.duration'}}}
    ])
    .exec((err, data) => {
      if (err) {
        reject(err)
      } else {
        if (data.length != 0) {
          resolve(data[0].occupiedDuraion)
        } else {
          resolve(0)
        }
      }
    })
  })
}
*/
/*
 insertJob function take date, description and duration as a
 parameter. it insert job into db if there is any available
 slot in that respective date
*/

const insertJob = (date, description, start_time, end_time, location) => {
  return new Promise(function(resolve, reject) {
    checkSlot(date, start_time, end_time).
    then((slots) => {
      if (slots.length == 0) {
        getJobs({
          job_at: date
        })
        .then((x) => {
          if (x.length == 0) {
            let temp = new model({
              job_at: date,
              jobs: [{
                description: description,
                start_time: start_time,
                end_time: end_time,
                location: location
              }]
            })
            temp.save((err,data) => {
              if (err) {
                reject('something went wrong with database')
              } else {
                resolve('slot assigned')
              }
            })
          } else {
            model.update({
              job_at: date},
              {'$push': {'jobs': {description: description, start_time: start_time, end_time: end_time, location: location}}
              }).exec((err, data) => {
              if (err) {
                reject('something wrong with db')
              } else {
                resolve('slot assigned')
              }
            })
          }
        })
        .catch((err) => {
          reject(err)
        })
      } else {
        checkTiming(date, start_time, end_time)
        .then((x) => {
          resolve(x)
        })
        .catch((err) => {
          reject(err)
        })
      }
    })
    .catch((err) => {
      reject(err)
    })
  })
}
/*
  checkSlot take date, start_time and end_time as parameter
  and return any slot lies between that time
 */
const checkSlot = (date , start_time, end_time) => {
  return new Promise(function(resolve, reject) {
    model.
    find({
      'job_at': date,
      '$or': [
        {
          '$and': [
            {
              'jobs.start_time':{
                '$lte': start_time
              }
            },
            {
              'jobs.end_time': {
                '$gt': start_time
              }
            }
          ]
        },
        {
          '$and': [
            {
              'jobs.start_time': {
                '$lt': end_time
              }
            },
            {
              'jobs.end_time': {
                '$gte': end_time
              }
            }
          ]
        }
      ]
  }).
  exec((err, data) => {
    if (err) {
      reject('something went wrong')
    } else {
      resolve(data)
    }
  })
  })
}
/*
  getJobs as mongodb query as a parameter
  and returns data on jobs schema
*/
const getJobs = (query) => {
  return new Promise(function(resolve, reject) {
    model.find(query)
    .exec((err, data) => {
      if (err) {
        reject('something went wrong')
      } else {
        resolve(data)
      }
    })
  })
}

/*
  checkTiming will find time slot based on your
  requirement
*/
const checkTiming = (date, start_time, end_time) => {
  return new Promise(function(resolve, reject) {
    getJobs({job_at: date})
    .then((data) => {
      data = data[0]
      data.jobs.sort((a, b) => a.start_time-b.start_time)
      let durationNeeded = end_time - start_time
      let occupiedDuraion = data.jobs.reduce((acc, val) => {
        return acc + (val.end_time - val.start_time)
      }, 0)
      if ((9 - occupiedDuraion) < durationNeeded ) {
        resolve('sorry you don\'t have any free slot try on diffrent date')
      } else {
        for (var i = 0; i < data.jobs.length; i++) {
          if (!(i+1 == data.jobs.length)) {
            if(data.jobs[i+1].start_time-data.jobs[i].end_time >= durationNeeded) {
              resolve(`you have free slots between ${normalTime(data.jobs[i].end_time)} and ${normalTime(data.jobs[i+1].start_time)}`)
              break
            }
          } else {
            resolve(`you have slots after ${normalTime(data.jobs[i].end_time)}`)
            break
          }
        }
      }
    })
    .catch((err) => {
      reject(err)
    })
  })
}

/*
checkSlot(new Date(2017,02,11), 9.5, 12)
.then((x) => {
  console.log(x);
} )
*/
exports.insertJob = insertJob
exports.getJobs = getJobs
exports.checkTiming = checkTiming
exports.getJobs = getJobs
exports.checkSlot = checkSlot
exports.insertJob = insertJob
