const express = require("express");
const router = express.Router();
const connection = require("../config/dbconfig");

/* GET home page. */

// router.get("/menulist/:category", async function (req, res, next) {
//   const { category } = req.params;
//   const getRestaurantListsQuery = "select * from restaurant where category=?";

//   const [rows] = await connection.query(getRestaurantListsQuery, [category]);

//   return res.json(rows);
// });

router.get("/getRestaurant/:name", async (req, res) => {
  const { name } = req.params;
  console.log(name);
  // const searchRestaurant = "select * from restaurant where name like %?%";
  const searchRestaurant = "select * from restaurant where name = ?";
  try {
    const [rows] = await connection.query(searchRestaurant, [name]);
    return res.json(rows);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
