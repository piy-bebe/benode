const { Router } = require('express')
const router = Router()
const Order = require('../models/orders')

router.get('/', async (req, res) => {
  res.render('orders', {
    title: 'Orders',
    isOrders: true,
  })
})

router.post('/', async (req, res) => {
  try {
    const user = await req.user.populate('cart.items.courseId').execPopulate()
    const courses = user.cart.items.map((c) => ({
      count: c.count,
      course: c.courseId,
    }))

    console.log(courses)

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      courses,
    })

    await order.save()
    await req.user.clearCart()
    res.redirect('orders')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
