const express = require('express')
const router = express.Router()

router.get('/health', (req, res) => {
  res.json({ alive: true })
})

module.exports = router
