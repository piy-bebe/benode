const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => {
  res.render('login')
})

module.exports = router
