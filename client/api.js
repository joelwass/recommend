const fetch = require('node-fetch')
const endpoint = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/api/v1'
const headers = { 'Content-Type': 'application/json' }

class API {
  setAuthToken (authToken) {
    this.authToken = authToken
    headers['Auth'] = authToken
  }

  createNewUser (body) {
    return fetch(`${endpoint}/user`, { method: 'POST', body: JSON.stringify(body), headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  }

  getUsers () {
    return fetch(`${endpoint}/users`, { method: 'GET', headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  }

  login (body) {
    return fetch(`${endpoint}/user/login`, { method: 'POST', body: JSON.stringify(body), headers })
      .then(res => res.json())
      .then(res => {
        if (res.success) this.setAuthToken(res.sessionId)
        return res
      })
      .catch(err => {
        console.log(err)
      })
  }

  logout () {
    return fetch(`${endpoint}/user/logout`, { method: 'POST', headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  }

  makeRecommendation (body) {
    return fetch(`${endpoint}/recommendation`, { method: 'POST', body: JSON.stringify(body), headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  }

  deleteRecommendation (body) {
    return fetch(`${endpoint}/recommendation`, { method: 'DELETE', body: JSON.stringify(body), headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  }

  updateRecommendation (body) {
    return fetch(`${endpoint}/recommendation`, { method: 'PUT', body: JSON.stringify(body), headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  }

  getRecommendationCategories () {
    return fetch(`${endpoint}/recommendation/categories`, { method: 'GET', headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  }

  getAllRecommendations (body) {
    return fetch(`${endpoint}/recommendation/all`, { method: 'GET', headers })
      .then(res => res.json())
      .catch(err => {
        console.log(err)
      })
  }
}

export default new API()
