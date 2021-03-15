const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const routerCourses = require('./routes/courses')
const routerHome = require('./routes/home')
const routerAdd = require('./routes/add')
const routerCard = require('./routes/card')
const routerOrders = require('./routes/orders')
const routerLogin = require('./routes/auth')

const User = require('./models/user')
const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
})
app.use(async (req, res, next) => {
  try {
    const user = await User.findById('6044e2b7d9650e1454b4bc36')
    req.user = user
    next()
  } catch (e) {
    console.log(e)
  }
})
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use('/', routerHome)
app.use('/courses', routerCourses)
app.use('/add', routerAdd)
app.use('/card', routerCard)
app.use('/orders', routerOrders)
app.use('/auth', routerLogin)

const PORT = process.env.PORT || 3000
const password = '12345'

async function start() {
  try {
    const url = `mongodb+srv://piybebe:${password}@cluster0.yriz1.mongodb.net/shop`
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    const candidate = await User.findOne()
    if (!candidate) {
      const user = new User({
        email: 'bebeA@gmail.com',
        name: 'piybebe',
        cart: { items: [] },
      })

      user.save()
    }
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`)
    })
  } catch (e) {
    console.log(e)
  }
}
start()
