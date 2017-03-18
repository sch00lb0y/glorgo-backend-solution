const server = require('../server.js')
const jobModel = require('../user/model.js')
const chai = require('chai')
const request = require('request')
describe('job model test', () => {
	it('checkTiming', () => {
		jobModel.checkTiming('01/02/2015',9,10).
		then((res) => {
			chai.expect(res).to.be.a('string')
		})
	})
	it('getJobs', () => {
		jobModel.getJobs({},(res) => {
			chai.expect(res).to.be.a('object')
		})
	})
	it('checkSlot', () => {
		chai.expect(jobModel.checkSlot(new Date(2017,03,01), 9, 10)).to.be.a('promise')
		jobModel.checkSlot(new Date(2017,03,01), 9, 10)
		.then((res) => {
			chai.expect(res).to.be.a('string')
		})
	})
	it('insertJob', () => {
		chai.expect(jobModel.insertJob(new Date(2017, 02, 01),'sdf',9,10,'jurong')).to.be.a('promise')
		jobModel.insertJob(new Date(2017,03,01),'sdf',9,10)
		.then((res) => {
			chai.expect(res).to.be.a('string')
		})
	})
})

describe('API TEST', () => {
	it('/job POST', () => {
		request.post({
			url: 'http://127.0.0.1:2000/v1/jobs/',
			json: {
				date: '01/02/2017',
				description: 'sadf',
				start_time: 9,
				end_time: 10,
				location: 'asdf' 
			}
		},(err, res, body) => {
			chai.expect(body).to.be.a('object')
		})
	})
})