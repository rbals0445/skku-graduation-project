const express = require("express");
const router = express.Router();
const connection = require("../config/dbconfig");

/* GET home page. */

router.get("/menulist/:category", async function (req, res, next) {
  const { category } = req.params;
  const getRestaurantListsQuery = "select * from restaurant where category=?";

  const [rows] = await connection.query(getRestaurantListsQuery, [category]);

  return res.json(rows);
});

module.exports = router;
