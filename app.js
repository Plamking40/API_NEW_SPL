const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

/// json object >> js object
app.use(express.json());

app.listen(3000, () => console.log("Server listening on port 3000"));

/// Mysql Connection
const db = require("./DB/db");

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("MySQL Successfully Connected !!");
});

app.get("/", (req, res) => {
  res.send({ mess: "success" });
});

/// Mysql Connection

/// Router ///
const loginRotuer = require("./routers/LoginTest/Login");
const logintestRotuer = require("./routers/LoginTest/logintest");
const seacrhRouter = require("./routers/Seacrh/seacrh_router");
const informationRouter = require("./routers/1CaseInformation/information_router");
const noticeRouter = require("./routers/2CaseNotice/notice_router");
const sueRouter = require("./routers/3CaseSue/sue_router");
const judgmentRouter = require("./routers/4CaseJudgment/judgment_router");
const appealRouter = require("./routers/5CaseAppeal/appeal_router");
const petitionRouter = require("./routers/6CasePetition/petition_router");
const investigateRouter = require("./routers/7CaseInvestigate/investigate_router");
const expelRouter = require("./routers/8CaseExpel/expel_router");
const sequesterRouter = require("./routers/9CaseSequester/sequester_router");
const seizeRouter = require("./routers/10CaseSeize/seize_router");
const returnbankRouter = require("./routers/11CaseReturnBank/return_bank_router");
const sellingpropertyRouter = require("./routers/12CaseSellingProperty/selling_property_router");
const bankruptcyRouter = require("./routers/13CaseBankruptcy/bankruptcy_router");

app.use("/auth", loginRotuer);
app.use("/authTest", logintestRotuer);
app.use("/seacrh", seacrhRouter); // Seacrh
app.use("/information", informationRouter); //1
app.use("/notice", noticeRouter); //2
app.use("/sue", sueRouter); //3
app.use("/judgment", judgmentRouter); //4
app.use("/appeal", appealRouter); //5
app.use("/petition", petitionRouter); //6
app.use("/investigate", investigateRouter); //7
app.use("/expel", expelRouter); //8
app.use("/sequester", sequesterRouter); //9
app.use("/seize", seizeRouter); //10
app.use("/returnbank", returnbankRouter); //11
app.use("/sellingproperty", sellingpropertyRouter); //12
app.use("/bankruptcy", bankruptcyRouter); //13
/// Router ///

module.exports = app;

// const users = [
//   { id: 1, name: "John", refresh: null },
//   { id: 2, name: "Tom", refresh: null },
//   { id: 3, name: "Chris", refresh: null },
//   { id: 4, name: "David", refresh: null },
// ];

// app.post("/auth/login", (req, res) => {
//   const { name } = req.body;

//   //find user
//   const user = users.findIndex((e) => e.name === name);

//   if (!name || user < 0) {
//     return res.send(400);
//   }

//   const access_token = jwtGenerate(users[user]);
//   const refresh_token = jwtRefreshTokenGenerate(users[user]);

//   users[user].refresh = refresh_token;

//   res.json({
//     access_token,
//     refresh_token,
//   });
// });

// const jwtGenerate = (user) => {
//   const accessToken = jwt.sign(
//     { name: user.name, id: user.id },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: "1m", algorithm: "HS256" }
//   );

//   return accessToken;
// };

// const jwtRefreshTokenGenerate = (user) => {
//   const refreshToken = jwt.sign(
//     { name: user.name, id: user.id },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: "1d", algorithm: "HS256" }
//   );

//   return refreshToken;
// };

// const jwtValidate = (req, res, next) => {
//   try {
//     if (!req.headers["authorization"]) return res.sendStatus(401);

//     const token = req.headers["authorization"].replace("Bearer ", "");

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if (err) throw new Error(error);
//     });
//     next();
//   } catch (error) {
//     return res.sendStatus(403);
//   }
// };

// const conn = require("./DB/db");

// app.get("/:id", jwtValidate, (req, res) => {
//   const { id } = req.params;

//   try {
//     conn.query(
//       `SELECT id,contract_number,creditcard_no,contract_date ,amount,limit_day,period ,
//       pay_year,installment,pay_day_in_month_id,pay_start_month_id,principle,interest,
//       pay_start_year_id,pay_end_date,total,credit_type_id,interest_contract_type,interest_fee_miss,
//       last_date_paid,last_amount_paid,guarantee_no,guarantee_date,cases_note
//       FROM tb_cases where id=?`,
//       [id],
//       (err, results, fields) => {
//         if (err) {
//           console.log(err);
//           return res.status(400).send();
//         }
//         res.status(200).json(results);
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send();
//   }
// });

// const jwtRefreshTokenValidate = (req, res, next) => {
//   try {
//     if (!req.headers["authorization"]) return res.sendStatus(401);
//     const token = req.headers["authorization"].replace("Bearer ", "");

//     jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//       if (err) throw new Error(error);

//       req.user = decoded;
//       req.user.token = token;
//       delete req.user.exp;
//       delete req.user.iat;
//     });
//     next();
//   } catch (error) {
//     return res.sendStatus(403);
//   }
// };

// app.post("/auth/refresh", jwtRefreshTokenValidate, (req, res) => {
//   const user = users.find(
//     (e) => e.id === req.user.id && e.name === req.user.name
//   );

//   const userIndex = users.findIndex((e) => e.refresh === req.user.token);

//   if (!user || userIndex < 0) return res.sendStatus(401);

//   const access_token = jwtGenerate(user);
//   const refresh_token = jwtRefreshTokenGenerate(user);
//   users[userIndex].refresh = refresh_token;

//   return res.json({
//     access_token,
//     refresh_token,
//   });
// });
