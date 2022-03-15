var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

router.get("/user-test", function (req, res, next) {
	res.send("This is user test");
});

router.get("/last", function (req, res, next) {
	res.send("This is user test");
});

module.exports = router;
