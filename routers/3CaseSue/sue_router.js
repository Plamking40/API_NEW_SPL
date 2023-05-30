const express = require("express");
const router = express.Router();
const conn = require("../../DB/db");

router.get("/case/:id", (req, res) => {
  const { id } = req.params;

  try {
    conn.query(
      `SELECT
    id,
    contract_number,
    sue_no,
    sue_date,
    court,
    black_no,
    black_year,
    sue_lawyer_id,
    sue_givename,
    sue_date_first,
    sue_date_last,
    sue_date_sum,
    sue_date_chk_cr,
    sue_amount,
    sue_interest,
    sue_netamount_chk,
    sue_interest_chk,
    sue_netamount,
    sue_netamount2,
    sue_interest_2,
    sue_fee,
    sue_fee_cr,
    sue_checker,
    sue_checker2,
    sue_details,
    sue_date_wait,
    sue_date_cancel,
    sue_day_wait_lastnow,
    sue_note_cancel,
    cases_note_sue
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
    sue_no,
    sue_date,
    court,
    black_no,
    black_year,
    sue_lawyer_id,
    sue_givename,
    sue_date_first,
    sue_date_last,
    sue_date_sum,
    sue_date_chk_cr,
    sue_amount,
    sue_interest,
    sue_netamount_chk,
    sue_interest_chk,
    sue_netamount,
    sue_netamount2,
    sue_interest_2,
    sue_fee,
    sue_fee_cr,
    sue_checker,
    sue_checker2,
    sue_details,
    sue_date_wait,
    sue_date_cancel,
    sue_day_wait_lastnow,
    sue_note_cancel,
    cases_note_sue,
  } = req.body;

  try {
    conn.query(
      `UPDATE
tb_cases
  SET
  sue_no=?,
  sue_date=?,
  court=?,
  black_no=?,
  black_year=?,
  sue_lawyer_id=?,
  sue_givename=?,
  sue_date_first=?,
  sue_date_last=?,
  sue_date_sum=?,
  sue_date_chk_cr=?,
  sue_amount=?,
  sue_interest=?,
  sue_netamount_chk=?,
  sue_interest_chk=?,
  sue_netamount=?,
  sue_netamount2=?,
  sue_interest_2=?,
  sue_fee=?,
  sue_fee_cr=?,
  sue_checker=?,
  sue_checker2=?,
  sue_details=?,
  sue_date_wait=?,
  sue_day_wait_lastnow=?,
  sue_date_cancel=?,
  sue_note_cancel=?,
  cases_note_sue=?
  WHERE
    id = ? `,
      [
        sue_no,
        sue_date,
        court,
        black_no,
        black_year,
        sue_lawyer_id,
        sue_givename,
        sue_date_first,
        sue_date_last,
        sue_date_sum,
        sue_date_chk_cr,
        sue_amount,
        sue_interest,
        sue_netamount_chk,
        sue_interest_chk,
        sue_netamount,
        sue_netamount2,
        sue_interest_2,
        sue_fee,
        sue_fee_cr,
        sue_checker,
        sue_checker2,
        sue_details,
        sue_date_wait,
        sue_day_wait_lastnow,
        sue_date_cancel,
        sue_note_cancel,
        cases_note_sue,
        id,
      ],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          req.status(400).send();
        }
        console.log();
        res.status(200).json({ message: "Cases Update successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
