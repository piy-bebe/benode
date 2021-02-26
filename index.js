const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const routerHome = require('./routes/home')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})
app.use(express.static('public'))
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(routerHome)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})
