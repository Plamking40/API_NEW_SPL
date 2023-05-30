const express = require("express");
const router = express.Router();
const conn = require("../../DB/db");

module.exports = router;

router.get("/case/:caseid/:id", (req, res) => {
  const { id, caseid } = req.params;

  sql = `SELECT
  detect_no,
  detect_sdate,
  detect_givedate,
  detect_date_type,
  detect_name,
  detect_idcard,
  detect_income_date,
  detect_income,
  work_at,
  detect_tsp_ownership_date,
  detect_tsp_ownership,
  detect_tsp_ownership_details,
  detect_land_date,
  detect_land,
  detect_land_details,
  detect_note_late,
  detect_note
FROM
  tb_detectitem
WHERE
  id = :id And cases_id = :cases_id`;

  sql = sql.replace(":id", id);
  sql = sql.replace(":cases_id", caseid);

  try {
    conn.query(sql, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      res.status(200).json(results);
      4;
      console.log(sql);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.patch("/update/case/:id", (req, res) => {
  const { id } = req.params;
  const {
    detect_no,
    detect_sdate,
    detect_givedate,
    detect_date_type,
    detect_name,
    detect_idcard,
    detect_income_date,
    detect_income,
    work_at,
    detect_tsp_ownership_date,
    detect_tsp_ownership,
    detect_tsp_ownership_details,
    detect_land_date,
    detect_land,
    detect_land_details,
    detect_note_late,
    detect_note,
    cases_id,
  } = req.body;

  try {
    conn.query(
      `UPDATE
        tb_detectitem
    SET
        detect_no = ?,
        detect_sdate = ?,
        detect_givedate = ?,
        detect_date_type = ?,
        detect_name = ?,
        detect_idcard = ?,
        detect_income_date = ?,
        detect_income = ?,
        work_at = ?,
        detect_tsp_ownership_date = ?,
        detect_tsp_ownership = ?,
        detect_tsp_ownership_details = ?,
        detect_land_date = ?,
        detect_land = ?,
        detect_land_details = ?,
        detect_note_late = ?,
        detect_note = ?
    WHERE
        id = 1 AND cases_id = 12911`,
      [
        detect_no,
        detect_sdate,
        detect_givedate,
        detect_date_type,
        detect_name,
        detect_idcard,
        detect_income_date,
        detect_income,
        work_at,
        detect_tsp_ownership_date,
        detect_tsp_ownership,
        detect_tsp_ownership_details,
        detect_land_date,
        detect_land,
        detect_land_details,
        detect_note_late,
        detect_note,
        id,
        cases_id,
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
