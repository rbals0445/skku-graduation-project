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

// 좋아요
router.post("/like", async (req, res) => {
	// id, name
	const { id, name } = req.body;

	const findList = "select * from favorite where id=? and restaurant_name=?";
	const likeQuery = "insert into favorite values(?,?)";
	try {
		const [rows] = await connection.query(findList, [id, name]);
		if (!rows.length) {
			await connection.query(likeQuery, [id, name]);
		}

		return res.json({ result: true });
	} catch (e) {
		console.log(e);
	}
});

router.post("/dislike", async (req, res) => {
	// id,name 삭제
	const { id, name } = req.body;

	const findList = "select * from favorite where id=? and restaurant_name=?";
	const dislikeQuery = "delete from favorite where id=? and restaurant_name=?";
	try {
		const [rows] = await connection.query(findList, [id, name]);
		if (rows.length) {
			await connection.query(dislikeQuery, [id, name]);
		}

		return res.json({ result: true });
	} catch (e) {
		console.log(e);
	}
});

// 좋아요
router.post("/getLike", async (req, res) => {
	// id, name
	const { id, name } = req.body;

	const findList = "select * from favorite where id=? and restaurant_name=?";
	try {
		const [rows] = await connection.query(findList, [id, name]);
		if (rows.length) {
			return res.json({ return: true });
		}
		return res.json({ result: false });
	} catch (e) {
		console.log(e);
	}
});

router.post("/mypage", async (req, res) => {
	// id
	const { id } = req.body;

	const getLikeList =
		"select * from restaurant as r INNER JOIN favorite as f	on r.name = f.restaurant_name where f.id = ?";

	try {
		const [rows] = await connection.query(getLikeList, [id]);

		return res.json({ rows });
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
