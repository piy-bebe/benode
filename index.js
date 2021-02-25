const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/about', (req, res) => {
  res.render('about')
})
app.listen(PORT, () => {
  console.log(`[eroir] Server has been started on port ${PORT}...`)
})
