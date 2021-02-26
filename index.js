const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

const routerCourses = require("./routes/courses");
const routerHome = require("./routes/home");
const routerAdd = require("./routes/add");

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}))
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use("/", routerHome);
app.use("/courses", routerCourses);
app.use("/add", routerAdd);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
