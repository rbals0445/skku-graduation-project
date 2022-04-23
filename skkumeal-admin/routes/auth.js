const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const connection = require("../config/dbconfig");

const sendMail = (to, key) => {
  try {
    // 재사용 안되니까 굳이 config로 뺄 필요 없을것 같음.
    const mailConfig = {
      service: "Naver",
      host: "smtp.naver.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PWD,
      },
    };
    let message = {
      from: process.env.EMAIL_ID,
      to,
      subject: "이메일 인증  요청 메일입니다.",
      html: `<b>${key} 를 입력해주세요!</b>`,
    };
    let transporter = nodemailer.createTransport(mailConfig);
    transporter.sendMail(message);
  } catch (error) {
    console.log(error);
  }
};

router.post("/", (req, res) => {
  const to = req.body?.email;
  const key = Math.random().toString(36).slice(2); // 35->z 36 -> 10

  connection.query(
    "select email from user where email = ?",
    [to],
    (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        sendMail(to, key); // 메일전송

        connection.query(
          "select email from auth where email = ?",
          [to],
          (err, results) => {
            if (err) throw err;

            if (results.length) {
              // 이메일이 이미 있는경우
              connection.query("update auth set auth_code = ?", [key]);
            } else {
              // 없는경우
              connection.query("insert into auth values (?,?)", [to, key]);
            }
            return res.json({ result: "true" });
          }
        );
      } else {
        return res.json({ result: "Duplicated Email" });
      }
    }
  );
});

module.exports = router;
