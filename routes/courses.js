const { Router } = require('express')
const router = Router()
const course = require('../models/course')

router.get('/', async (req, res) => {
  const courses = await course.getAll()
  res.render('courses', {
    title: 'Courses',
    isCourses: true,
    courses,
  })
})

module.exports = router
