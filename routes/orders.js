const { Router } = require('express')
const orders = require('../models/orders')
const router = Router()
const Order = require('../models/orders')

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({
      'user.userId': req.user._id,
    }).populate('user.userId')

    console.log(order)
    res.render('orders', {
      title: 'Orders',
      isOrders: true,
      orders: orders.map((o) => ({
        ...o,
        price: o.courses.reduce((total, i) => {
          return (total += i.course.price * i.count)
        }, 0),
      })),
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await req.user.populate('cart.items.courseId').execPopulate()
    const courses = user.cart.items.map((c) => ({
      count: c.count,
      course: c.courseId,
    }))
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
