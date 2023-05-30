const express = require("express");
const router = express.Router();
const conn = require("../../DB/db");

router.get("/case/:id", (req, res) => {
  const { id } = req.params;

  try {
    conn.query(
      `SELECT
      id,
      notice_no,
      notice_date,
      notice_last_date,
      notice_date2,
      lawyer_id,
      principle,
      interest,
      total,
      total_date,
      limit_day,
      notice_type,
      limit_day_contract,
      other_fee,
      other_insurance,
      cases_note_notice
  FROM
      tb_cases
  WHERE
      id=?`,
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
    notice_no,
    notice_date,
    notice_last_date,
    notice_date2,
    lawyer_id,
    principle,
    interest,
    total,
    total_date,
    limit_day,
    notice_type,
    limit_day_contract,
    other_fee,
    other_insurance,
    cases_note_notice,
  } = req.body;

  try {
    conn.query(
      `UPDATE
      tb_cases
  SET
      notice_no=?,
      notice_date=?,
      notice_last_date=?,
      notice_date2=?,
      lawyer_id=?,
      principle=?,
      interest=?,
      total=?,
      total_date=?,
      limit_day=?,
      notice_type=?,
      limit_day_contract=?,
      other_fee=?,
      other_insurance=?,
      cases_note_notice=?
  WHERE
      id = ?`,
      [
        notice_no,
        notice_date,
        notice_last_date,
        notice_date2,
        lawyer_id,
        principle,
        interest,
        total,
        total_date,
        limit_day,
        notice_type,
        limit_day_contract,
        other_fee,
        other_insurance,
        cases_note_notice,
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
