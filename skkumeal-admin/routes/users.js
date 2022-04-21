var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  //res.send("respond with a resource");
  res.json({ id: "km" });
});

router.get("/login", function (req, res, next) {
  res.json({ id: "hkm", password: "1234" });
});
// 이번엔 쿠키세션 방식으로 저장하는거 연습해야함

router.get("/last", function (req, res, next) {
  res.send("This is user test");
});

module.exports = router;
