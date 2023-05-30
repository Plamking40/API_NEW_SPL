const express = require("express");
const router = express.Router();
const conn = require("../../DB/db");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const users = [
  {
    id: 1,
    username: "Palm",
    password: "123456",
    tel: "1123456789",
    ipaddress: "49.0.86.4",
    DateStartLogin: "24-06-2565",
    role: "admin",
    refresh: null,
  },
  {
    id: 2,
    username: "Tom",
    password: "123456",
    tel: "1123456789",
    ipaddress: "49.0.86.4",
    DateStartLogin: "24-06-2565",
    role: "user",
    refresh: null,
  },
];

router.post("/login/check2", (req, res) => {
  const { username, password, pin } = req.body;
  sql = `SELECT
  tb_permission_account.acc_id AS acc_id
FROM
  tb_permission
LEFT JOIN tb_permission_account ON tb_permission.acc_id = tb_permission_account.acc_id
WHERE
  tb_permission_account.username = ':username' AND tb_permission_account.password = ':password'  LIMIT 1 `;
  sql = sql.replace(":username", username);
  sql = sql.replace(":password", password);

  try {
    console.log(sql);
    conn.query(sql, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      // if (username == usernames && password == passwords) {
      //   res.status(200).send({ Message: "ล็อคอินเสร็จสิ้น" });
      // } else {
      //   res.status(400).send({ Message: "กรุณาล็อคอินใหม่อีกครั้ง" });
      // }
      if (results.length > 0) {
        res.status(200).json({
          Message: "ล็อคอินเสร็จสิ้น",
        });
      } else {
        res.status(400).send({ Message: "กรุณาล็อคอินใหม่อีกครั้ง" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post("/login/check", (req, res) => {
  const { username, password, pin } = req.body;

  const user = users.findIndex(
    (e) => e.username === username && e.password === password
  );
  console.log("Test01");
  if (user < 0) {
    console.log("Login User :" + username + " " + password);
    return res.status(400).send({
      Message: "กรุณาล็อคอินใหม่อีกครั้ง",
      MessageUser: user,
    });
  }
  res.status(200).send({
    Message: "ล็อคอินสำเร็จ",
  });
});

router.post("/loginAPI", (req, res) => {
  const { username, password, tel, ipaddress } = req.body;

  //find user
  const user = users.findIndex((e) => e.username === username);
  sql = `SELECT
  tb_permission_account.acc_id AS acc_id
FROM
  tb_permission
LEFT JOIN tb_permission_account ON tb_permission.acc_id = tb_permission_account.acc_id
WHERE
  tb_permission_account.username = ':username' AND tb_permission.token = ':ipaddress' AND tb_permission_account.password = ':password'  LIMIT 1 `;
  sql = sql.replace(":username", username);
  sql = sql.replace(":password", password);
  sql = sql.replace(":ipaddress", ipaddress);
  try {
    conn.query(sql, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ Message: err });
      }
      if (results.length > 0) {
        const access_token = jwtGenerate(results[0]);
        const refresh_token = jwtRefreshTokenGenerate(results[0]);

        results[0].refresh = refresh_token;
        // มีข้อมูล
        console.log("มีข้อมูล");
        res.status(200).json({
          Message: "ล็อคอินเสร็จสิ้น",
          access_token,
          refresh_token,
          acc_id: results[0].acc_id,
        });
      } else {
        // ไม่มีข้อมูล
        console.log("ไม่มีข้อมูล");
        res.status(400).send({ Message: "กรุณาล็อคอินใหม่อีกครั้ง" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }

  // if (user < 0) {
  //   console.log(
  //     "Login User :" + username + " " + password + " " + tel + " " + ipaddress
  //   );
  //   return res.status(400).send({
  //     Message: "กรุณาล็อคอินใหม่อีกครั้ง",
  //     MessageUser: user,
  //   });
  // }

  // if (
  //   users[user].password === password &&
  //   users[user].tel === tel &&
  //   users[user].ipaddress === ipaddress
  // ) {
  //   const access_token = jwtGenerate(users[user]);
  //   const refresh_token = jwtRefreshTokenGenerate(users[user]);

  //   users[user].refresh = refresh_token;
  //   console.log(
  //     "Login Success :" +
  //       username +
  //       " " +
  //       password +
  //       " " +
  //       tel +
  //       " " +
  //       ipaddress
  //   );
  //   return res.json({
  //     MessageLogin: "Login successful",
  //     MessageRole: users[user].role,
  //     MessageToken: "AccessToken",
  //     access_token,
  //     refresh_token,
  //   });
  // } else {
  //   console.log(
  //     "Login Error :" + username + " " + password + " " + tel + " " + ipaddress
  //   );
  //   return res.status(400).send({
  //     Message: "กรุณาล็อคอินใหม่อีกครั้ง",
  //     MessageUser: user,
  //   });
  // }
});

router.post("/login", (req, res) => {
  const { username, password, tel, ipaddress } = req.body;

  //find user
  const user = users.findIndex((e) => e.username === username);

  if (user < 0) {
    console.log(
      "Login User :" + username + " " + password + " " + tel + " " + ipaddress
    );
    return res.status(400).send({
      Message: "กรุณาล็อคอินใหม่อีกครั้ง",
      MessageUser: user,
    });
  }

  if (
    users[user].password === password &&
    users[user].tel === tel &&
    users[user].ipaddress === ipaddress
  ) {
    const access_token = jwtGenerate(users[user]);
    const refresh_token = jwtRefreshTokenGenerate(users[user]);

    users[user].refresh = refresh_token;
    console.log(
      "Login Success :" +
        username +
        " " +
        password +
        " " +
        tel +
        " " +
        ipaddress
    );
    return res.json({
      MessageLogin: "Login successful",
      MessageRole: users[user].role,
      MessageToken: "AccessToken",
      access_token,
      refresh_token,
    });
  } else {
    console.log(
      "Login Error :" + username + " " + password + " " + tel + " " + ipaddress
    );
    return res.status(400).send({
      Message: "กรุณาล็อคอินใหม่อีกครั้ง",
      MessageUser: user,
    });
  }
});

const jwtGenerate = (user) => {
  const accessToken = jwt.sign(
    { name: user.name, id: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5m", algorithm: "HS256" }
  );

  return accessToken;
};

const jwtRefreshTokenGenerate = (user) => {
  const refreshToken = jwt.sign(
    { name: user.name, id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d", algorithm: "HS256" }
  );

  return refreshToken;
};

const jwtValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return res.sendStatus(401);

    const token = req.headers["authorization"].replace("Bearer ", "");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) throw new Error(error);
    });
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

router.get("/:id", jwtValidate, (req, res) => {
  const { id } = req.params;

  try {
    conn.query(
      `SELECT id,contract_number,creditcard_no,contract_date ,amount,limit_day,period ,
        pay_year,installment,pay_day_in_month_id,pay_start_month_id,principle,interest,
        pay_start_year_id,pay_end_date,total,credit_type_id,interest_contract_type,interest_fee_miss,
        last_date_paid,last_amount_paid,guarantee_no,guarantee_date,cases_note
        FROM tb_cases where id=?`,
      [id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

const jwtRefreshTokenValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return res.sendStatus(401);
    const token = req.headers["authorization"].replace("Bearer ", "");

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) throw new Error(error);

      req.user = decoded;
      req.user.token = token;
      delete req.user.exp;
      delete req.user.iat;
    });
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

router.post("/refresh", jwtRefreshTokenValidate, (req, res) => {
  const user = users.find(
    (e) => e.id === req.user.id && e.name === req.user.name
  );

  const userIndex = users.findIndex((e) => e.refresh === req.user.token);

  if (!user || userIndex < 0) return res.sendStatus(401);

  const access_token = jwtGenerate(user);
  const refresh_token = jwtRefreshTokenGenerate(user);
  users[userIndex].refresh = refresh_token;

  return res.json({
    access_token,
    refresh_token,
  });
});

module.exports = router;
