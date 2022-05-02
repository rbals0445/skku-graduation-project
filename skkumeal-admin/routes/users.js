var express = require("express");
var router = express.Router();
var connection = require("../config/dbconfig");

/* GET users listing. */
router.get("/", function (req, res, next) {
  //res.send("respond with a resource");
  connection.query("select * from user", (err, rows, fields) => {
    if (err) throw err;

    res.json(rows);
  });
});

router.post("/login", async function (req, res, next) {
  const { id, password } = req.body;

  const checkUserInfo = "select * from user where id = ? and pwd = ?";
  try {
    const [rows] = await connection.query(checkUserInfo, [id, password]);

    return rows.length
      ? res.json({ result: true, type: rows[0].type })
      : res.json({ result: false });
  } catch (e) {
    console.log(e);
  }

  res.json({ id: "hkm", password: "1234" });
});
// 이번엔 쿠키세션 방식으로 저장하는거 연습해야함

module.exports = router;
