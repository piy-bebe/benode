const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})
app.use(express.static('public'))
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    isHome: true,
  })
})
app.get('/courses', (req, res) => {
  res.render('courses', {
    title: 'Courses',
    isCourses: true,
  })
})
app.get('/add', (req, res) => {
  res.render('add', {
    title: 'Add',
    isAdd: true,
  })
})
app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})
