const { Router } = require('express')
const router = Router()
const Course = require('../models/course')

router.get('/', (req, res) => {
  res.render('add', {
    title: 'add',
    isAdd: true,
  })
})

router.post('/', (req, res) => {
  const course = new Course(req.body.title, req.body.price, req.body.image)
  course.save()
  res.redirect('/courses')
})

module.exports = router
