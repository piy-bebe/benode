const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require('mongoose')
const app = express();

const routerCourses = require("./routes/courses");
const routerHome = require("./routes/home");
const routerAdd = require("./routes/add");
const routerCard = require("./routes/card");

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use("/", routerHome);
app.use("/courses", routerCourses);
app.use("/add", routerAdd);
app.use("/card", routerCard);
const PORT = process.env.PORT || 3000;
const password = "12345";


async function start() {
  try {
    const url = `mongodb+srv://piybebe:${password}@cluster0.yriz1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch(e) {
    console.log(e)
  }
}
start()
