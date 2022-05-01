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
      subject: "이메일 인증요청 메일입니다.",
      html: `<b>${key}를 입력해주세요!</b>`,
    };
    let transporter = nodemailer.createTransport(mailConfig);
    transporter.sendMail(message);
  } catch (error) {
    console.log(error);
  }
};

// 이메일 전송
router.post("/", async (req, res) => {
  const to = req.body?.email;
  const key = Math.random().toString(36).slice(2); // 35->z 36 -> 10

  const checkEmailQuery = "select email from user where email = ?";
  const isEmailRegisteredQuery = "select email from auth where email = ?"; // 이메일이 auth에 등록되어있는지 확인
  const updateAuthCodeQuery = "update auth set auth_code = ? where email = ?";
  const insertAuthCodeQuery = "insert into auth values (?,?)";

  try {
    const [rows] = await connection.query(checkEmailQuery, [to]);

    if (!rows.length) {
      // 이메일 없는경우
      sendMail(to, key);
      const [rows] = await connection.query(isEmailRegisteredQuery, [to]);

      rows.length
        ? await connection.query(updateAuthCodeQuery, [key, to])
        : await connection.query(insertAuthCodeQuery, [to, key]);

      return res.json({ result: "true" });
    } else {
      // 이메일 있는경우
      return res.json({ result: "Duplicated Email" });
    }
  } catch (e) {
    console.log(e);
  }
});

// 코드 확인
router.post("/checkAuthCode", async (req, res) => {
  const email = req.body?.email;
  const code = req.body?.code;

  const checkAuthCodeQuery = "select auth_code from auth where email = ?";

  try {
    const [rows] = await connection.query(checkAuthCodeQuery, [email]);

    return rows[0].auth_code === code
      ? res.json({ result: true })
      : res.json({ result: false });
  } catch (e) {
    console.log(e);
  }
});

// ID 중복확인
router.post("/checkDuplicatedId", async (req, res) => {
  const id = req.body?.id;

  const checkDuplicatedId = "select id from user where id=?";

  try {
    const [rows] = await connection.query(checkDuplicatedId, [id]);

    return rows.length
      ? res.json({ result: true })
      : res.json({ result: false });
  } catch (e) {
    console.log(e);
  }
});

// 회원가입
router.post("/signup", async (req, res) => {
  const { email, id, password } = req.body;

  const addUser = "insert into user values(?,?,?,?)"; // pwd 암호화 필요

  try {
    const [rows] = await connection.query(addUser, [id, password, email, 1]);

    return rows.length
      ? res.json({ result: true })
      : res.json({ result: false });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
