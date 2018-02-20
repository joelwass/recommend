const fetch = require('node-fetch')
const endpoint = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/api/v1'

module.exports = {
  login: (body) => {
    return fetch(`${endpoint}/user/login`, { method: 'POST', body })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  },
  logout: (body) => {
    fetch(`${endpoint}/user/logout`, { method: 'POST', body, headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  },
  makeRecommendation: (body) => {
    fetch(`${endpoint}/recommendation`, { method: 'POST', body, headers })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  deleteRecommendation: (body) => {
    fetch(`${endpoint}/recommendation`, { method: 'DELETE', body, headers })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  updateRecommendation: (body) => {
    fetch(`${endpoint}/recommendation`, { method: 'PUT', body, headers })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
  createNewUser: (body) => {
    fetch(`${endpoint}/user`, { method: 'POST', body })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },
}
