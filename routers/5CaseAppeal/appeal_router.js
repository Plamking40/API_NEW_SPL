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
      judgment_date_uton,
      judgment_date_uton_action,
      red_no_uton,
      red_year_uton,
      judgment_details_uton,
      cases_note_judge_uton
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
    judgment_date_uton,
    judgment_date_uton_action,
    red_no_uton,
    red_year_uton,
    judgment_details_uton,
    cases_note_judge_uton,
  } = req.body;

  try {
    conn.query(
      `UPDATE
      tb_cases
        SET
            judgment_date_uton=?,
            judgment_date_uton_action=?,
            red_no_uton=?,
            red_year_uton=?,
            judgment_details_uton=?,
            cases_note_judge_uton=?
        WHERE
        id = ? `,
      [
        judgment_date_uton,
        judgment_date_uton_action,
        red_no_uton,
        red_year_uton,
        judgment_details_uton,
        cases_note_judge_uton,
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
