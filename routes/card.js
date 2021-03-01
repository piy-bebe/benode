const { Router } = require('express')
const router = Router()
const Course = require('../models/course')
const Card = require('../models/card')

router.post('/card/add', async (req, res) => {
  const course = await Course.getById(req.body.id)
})
