const express = require("express");
const router = express.Router();
const conn = require("../../DB/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = [
  { id: 1, name: "John", refresh: null },
  { id: 2, name: "Tom", refresh: null },
  { id: 3, name: "Chris", refresh: null },
  { id: 4, name: "David", refresh: null },
];

router.post("/login", (req, res) => {
  const { name } = req.body;

  //find user
  const user = users.findIndex((e) => e.name === name);

  if (!name || user < 0) {
    return res.send(400);
  }

  const access_token = jwtGenerate(users[user]);
  const refresh_token = jwtRefreshTokenGenerate(users[user]);

  users[user].refresh = refresh_token;

  res.json({
    access_token,
    refresh_token,
  });
});

const jwtGenerate = (user) => {
  const accessToken = jwt.sign(
    { name: user.name, id: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1m", algorithm: "HS256" }
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
