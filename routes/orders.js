const { Router } = require('express')
const router = Router()
const Order = require('../models/orders')

router.get('/', async (req, res) => {
  res.render('orders', {
    title: 'Orders',
    isOrders: true,
  })
})

module.exports = router
