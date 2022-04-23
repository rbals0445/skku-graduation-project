const express = require("express");
const router = express.Router();
const path = require("path");
const connection = require("../config/dbconfig");

let AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + "/../config/awsconfig.json"); // 인증
let s3 = new AWS.S3();

let multer = require("multer");
let multerS3 = require("multer-s3");
let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "skkumeal",
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    acl: "public-read-write",
  }),
});

router.post("/uploadToS3", upload.single("file"), (req, res, next) => {
  res.json({ result: req.file.location });
  //실패하는 경우 체크 필요
});

router.post("/uploadToDB", (req, res, next) => {
  const sql =
    "insert into restaurant(category,name,location,phone_number,open_hour,image) values (?,?,?,?,?,?)";
  connection.query(sql, [
    req.body.category,
    req.body.name,
    req.body.location,
    req.body.pn,
    req.body.openhour,
    req.body.url,
  ]);
  // 중복 검사 필요함..
});

module.exports = router;
