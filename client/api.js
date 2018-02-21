const fetch = require('node-fetch')
const endpoint = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/api/v1'
const headers = { 'Content-Type': 'application/json' }

module.exports = {
  login: (body) => {
    return fetch(`${endpoint}/user/login`, { method: 'POST', body: JSON.stringify(body), headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  },
  logout: (body) => {
    return fetch(`${endpoint}/user/logout`, { method: 'POST', body: JSON.stringify(body), headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  },
  makeRecommendation: (body) => {
    return fetch(`${endpoint}/recommendation`, { method: 'POST', body: JSON.stringify(body), headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  },
  deleteRecommendation: (body) => {
    return fetch(`${endpoint}/recommendation`, { method: 'DELETE', body: JSON.stringify(body), headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  },
  updateRecommendation: (body) => {
    return fetch(`${endpoint}/recommendation`, { method: 'PUT', body: JSON.stringify(body), headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  },
  getAllRecommendations: (body) => {
    return fetch(`${endpoint}/recommendation/all`)
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  },
  createNewUser: (body) => {
    return fetch(`${endpoint}/user`, { method: 'POST', body: JSON.stringify(body), headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  },
}
