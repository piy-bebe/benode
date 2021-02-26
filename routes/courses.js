const { Router } = require("express");
const router = Router();

router.get("/courses", (req, res) => {
  res.render("courses", {
    title: "Courses",
    isCourses: true,
  });
});

module.exports = router;
