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
      judgment_date1,
      red_no,
      red_year,
      judge_type,
      fee_return,
      judgment_details,
      judgment_returncost,
      sue_effective_date,
      sue_effective_date2,
      cases_note_judge
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
    judgment_date1,
    red_no,
    red_year,
    judge_type,
    fee_return,
    judgment_details,
    judgment_returncost,
    sue_effective_date,
    sue_effective_date2,
    cases_note_judge,
  } = req.body;

  try {
    conn.query(
      `UPDATE
      tb_cases
        SET
          judgment_date1=?,
          red_no=?,
          red_year=?,
          judge_type=?,
          fee_return=?,
          judgment_details=?,
          judgment_returncost=?,
          sue_effective_date=?,
          sue_effective_date2=?,
          cases_note_judge=?
        WHERE
          id = ? `,
      [
        judgment_date1,
        red_no,
        red_year,
        judge_type,
        fee_return,
        judgment_details,
        judgment_returncost,
        sue_effective_date,
        sue_effective_date2,
        cases_note_judge,
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
