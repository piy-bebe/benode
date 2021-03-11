const { Router } = require('express')
const router = Router()
const Order = require('../models/order')

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({
      'user.userId': req.user._id,
    }).populate('user.userId')
    const a = orders.map((o) => {
      return {
        ...o._doc,
        price: o.courses.reduce((total, c) => {
          return (total += c.count * c.course.price)
        }, 0),
      }
    })
    console.log(a)
    res.render('orders', {
      title: 'Orders',
      isOrders: true,
      orders: a,
      // price,
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
      course: { ...c.courseId },
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

    res.redirect('/orders')
  } catch (e) {
    console.log(e)
  }
})

router.post('/remove', async (req, res) => {
  try {
    await Order.deleteOne({
      _id: req.body.id,
    })
    res.redirect('/orders')
  } catch (e) {
    console.log(e)
  }
})
module.exports = router
