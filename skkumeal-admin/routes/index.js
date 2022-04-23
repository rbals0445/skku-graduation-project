const express = require("express");
const router = express.Router();
const connection = require("../config/dbconfig");

/* GET home page. */
router.get("/", (req, res) => {
  console.log(process.env.EMAIL_ID);
  res.send("test");

  // res.send(process.env.EMAIL_ID);
});

router.get("/menulist/:category", function (req, res, next) {
  connection.query(
    "select * from restaurant where category=?",
    [req.params.category],
    (err, rows, fields) => {
      if (err) throw err;

      res.json(rows);
    }
  );
});

module.exports = router;
