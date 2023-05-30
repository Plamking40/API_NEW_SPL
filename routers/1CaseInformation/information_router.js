const express = require("express");
const router = express.Router();
const conn = require("../../DB/db");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  const { id } = req.params;

  try {
    conn.query(
      `SELECT partition_rec,customer_id,status_id,received_date,branch,area_id,
      region_id,guaranty_type_id,contract_number,creditcard_no,contract_date,amount,
      limit_day,period,pay_year,installment,pay_day_in_month_id,pay_start_month_id,
      principle,interest,pay_start_year_id,pay_end_date,total,credit_type_id,
      interest_contract_type,interest_fee_miss,last_date_paid,last_amount_paid,
      guarantee_no,guarantee_date,cases_note
      FROM tb_cases `,
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

router.get("/case/:id", (req, res) => {
  const { id } = req.params;
  const token = req.headers["authorization"].replace("Bearer ", "");
  console.log(req.headers["authorization"].replace("Bearer ", ""));
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) throw new Error(error);
    });
    conn.query(
      `SELECT id,partition_rec,customer_id,status_id,received_date,branch,area_id,region_id,guaranty_type_id FROM tb_cases where id = ?`,
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

router.get("/contract/:id", (req, res) => {
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

router.patch("/update/case/:id", (req, res) => {
  const { id } = req.params;
  const {
    partition_rec,
    customer_id,
    status_id,
    received_date,
    branch,
    area_id,
    region_id,
    guaranty_type_id,
  } = req.body;

  try {
    conn.query(
      `UPDATE tb_cases SET partition_rec=?,customer_id=?,status_id=?,received_date=?,branch=?,area_id=?,region_id=?,guaranty_type_id=? WHERE id = ?`,
      [
        partition_rec,
        customer_id,
        status_id,
        received_date,
        branch,
        area_id,
        region_id,
        guaranty_type_id,
        id,
      ],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          req.status(400).send();
        }
        res.status(200).json({ message: "Cases Update successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.patch("/update/contract/:id", (req, res) => {
  const { id } = req.params;
  const {
    contract_number,
    creditcard_no,
    contract_date,
    amount,
    limit_day,
    period,
    pay_year,
    installment,
    pay_day_in_month_id,
    pay_start_month_id,
    principle,
    interest,
    pay_start_year_id,
    pay_end_date,
    total,
    credit_type_id,
    interest_contract_type,
    interest_fee_miss,
    last_date_paid,
    last_amount_paid,
    guarantee_no,
    guarantee_date,
  } = req.body;

  try {
    conn.query(
      `UPDATE
      tb_cases
  SET
      contract_number=?,
      creditcard_no=?,
      contract_date=?,
      amount=?,
      limit_day=?,
      period=?,
      pay_year=?,
      installment=?,
      pay_day_in_month_id=?,
      pay_start_month_id=?,
      principle=?,
      interest=?,
      pay_start_year_id=?,
      pay_end_date=?,
      total=?,
      credit_type_id=?,
      interest_contract_type=?,
      interest_fee_miss=?,
      last_date_paid=?,
      last_amount_paid=?,
      guarantee_no=?,
      guarantee_date=?,
  WHERE
      id = ?;`,
      [
        contract_number,
        creditcard_no,
        contract_date,
        amount,
        limit_day,
        period,
        pay_year,
        installment,
        pay_day_in_month_id,
        pay_start_month_id,
        principle,
        interest,
        pay_start_year_id,
        pay_end_date,
        total,
        credit_type_id,
        interest_contract_type,
        interest_fee_miss,
        last_date_paid,
        last_amount_paid,
        guarantee_no,
        guarantee_date,
        id,
      ],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          req.status(400).send();
        }
        res.status(200).json({ message: "Cases Update successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
