const express = require("express");
const router = express.Router();
const conn = require("../../DB/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/loginAPI", (req, res) => {
  const { username, password, tel, ipaddress } = req.body;

  sql = `SELECT
  tb_permission.acc_id,user_role,tb_permission.name,tb_permission_account.username,tb_permission_account.password,tb_permission_account.tel
FROM
  tb_permission
LEFT JOIN tb_permission_account ON tb_permission.acc_id = tb_permission_account.acc_id
WHERE
  tb_permission_account.username = ':username' AND tb_permission.token = ':ipaddress' AND tb_permission_account.password = ':password'  LIMIT 1 `;
  sql = sql.replace(":username", username);
  sql = sql.replace(":password", password);
  sql = sql.replace(":ipaddress", ipaddress);
  try {
    console.log("loginAPI : ", sql); //ตรวจสอบ Token อีกครั้งว่ามีการเปลี่ยนแปลงไหม
    conn.query(sql, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ Message: err });
      }
      if (results.length > 0) {
        const access_token = jwtGenerate(results, "2m");
        const refresh_token = jwtRefreshTokenGenerate(results, "1h");

        results.refresh = refresh_token;
        res.json({
          access_token,
          refresh_token,
        });
        console.log("Login User : " + results[0].username);
        res.status(200).send();
      } else {
        // ไม่มีข้อมูล
        console.log(`Login Fail Username : ` + req.body.username + ` `);
        res.status(400).send({
          Message: `Login Fail Username : ` + req.body.username + ` `,
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post("/checkpage", (req, res) => {
  const { username, password, ipaddress } = req.body;
  sql = `SELECT
  tb_permission.acc_id,user_role,tb_permission.name,tb_permission_account.username,tb_permission_account.password,tb_permission_account.tel
FROM
  tb_permission
LEFT JOIN tb_permission_account ON tb_permission.acc_id = tb_permission_account.acc_id
WHERE
  tb_permission_account.username = ':username' AND tb_permission.token = ':ipaddress' AND tb_permission_account.password = ':password'  LIMIT 1 `;
  sql = sql.replace(":username", username);
  sql = sql.replace(":password", password);
  sql = sql.replace(":ipaddress", ipaddress);

  try {
    // console.log("checkpage : ", sql); //ตรวจสอบ Token อีกครั้งว่ามีการเปลี่ยนแปลงไหม
    conn.query(sql, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      if (results.length > 0) {
        const access_token = jwtGenerate(results, "2m");
        const refresh_token = jwtRefreshTokenGenerate(results, "1h");

        results[0].refresh = refresh_token;

        res.status(200).send({
          access_token,
          refresh_token,
        });
        console.log("Login Page User : " + results[0].username);
      } else {
        console.log(`Login Page Fail Username : ` + req.body.username + ` `);
        res.status(400).send({
          Message: `Login Page Fail Username : ` + req.body.username + ` `,
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

/// กำหมดให้ Tokens Start Timeout
const jwtGenerate = (data, time) => {
  const accessToken = jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: time,
    algorithm: "HS256",
  });

  return accessToken;
};

/// กำหมดให้ Tokens Refresh Timeout
const jwtRefreshTokenGenerate = (data, time) => {
  const refreshToken = jwt.sign({ data }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: time,
    algorithm: "HS256",
  });

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

router.get("/", jwtValidate, (req, res) => {
  res.status(200).send("Hello World!");
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
  const { username, password, ipaddress } = req.body;

  sql = `SELECT
  tb_permission.acc_id,user_role,tb_permission.name,tb_permission_account.username,tb_permission_account.password,tb_permission_account.tel
FROM
  tb_permission
LEFT JOIN tb_permission_account ON tb_permission.acc_id = tb_permission_account.acc_id
WHERE
  tb_permission_account.username = ':username' AND tb_permission.token = ':ipaddress' AND tb_permission_account.password = ':password'  LIMIT 1 `;
  sql = sql.replace(":username", username);
  sql = sql.replace(":password", password);
  sql = sql.replace(":ipaddress", ipaddress);

  try {
    console.log(user);
    conn.query(sql, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(401).send();
      }
      if (results.length > 0) {
        const access_token = jwtGenerate(results, "5m");
        const refresh_token = jwtRefreshTokenGenerate(results, "1h");

        results[0].refresh = refresh_token;

        res.status(200).send({
          access_token,
          refresh_token,
        });
        console.log("Login Page User : " + results[0].username);
      } else {
        console.log(`Login Page Fail Username : ` + req.body.username + ` `);
        res.status(400).send({
          Message: `Login Page Fail Username : ` + req.body.username + ` `,
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
