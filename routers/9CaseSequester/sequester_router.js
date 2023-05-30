const express = require("express");
const router = express.Router();
const conn = require("../../DB/db");

// full id
router.get("/", (req, res) => {
  const { id } = req.params;

  try {
    conn.query(
      `SELECT id,execute_date,execute_date1,execute_date2,execute_province,execute_brance,
        execute_date_wait,execute_wait_day,execute_date_wait_lastdate,execute_day_wait_lastnow,
        execute_note_late,execute_date_cancel,execute_staff_id,execute_num_map,execute_out_area,
        execute_special_cost1,execute_special_cost2,execute_special_cost3,execute_deed_no,execute_area_no,
        execute_area_province,execute_area_district,execute_area_subdistrict,execute_price1,execute_area_details,
        execute_item,execute_mortgaged,execute_details,execute_map_details,execute_lat,execute_lon
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

// one id
router.get("/single/:id", (req, res) => {
  const { id } = req.params;

  try {
    conn.query(
      `SELECT
      id,
      execute_date,
      execute_date1,
      execute_date2,
      execute_province,
      execute_brance,
      execute_date_wait,
      execute_wait_day,
      execute_date_wait_lastdate,
      execute_day_wait_lastnow,
      execute_note_late,
      execute_date_cancel,
      execute_staff_id,
      execute_num_map,
      execute_out_area,
      execute_special_cost1,
      execute_special_cost2,
      execute_special_cost3,
      execute_deed_no,
      execute_area_no,
      execute_area_province,
      execute_area_district,
      execute_area_subdistrict,
      execute_price1,
      execute_area_details,
      execute_item,
      execute_mortgaged,
      execute_details,
      execute_map_details,
      execute_lat,
      execute_lon
  FROM
      tb_cases
  WHERE
      id = ?`,
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

// update id one
router.patch("/update/:id", (req, res) => {
  const { id } = req.params;
  const {
    execute_date,
    execute_date1,
    execute_date2,
    execute_province,
    execute_brance,
    execute_date_wait,
    execute_wait_day,
    execute_date_wait_lastdate,
    execute_day_wait_lastnow,
    execute_note_late,
    execute_date_cancel,
    execute_staff_id,
    execute_num_map,
    execute_out_area,
    execute_special_cost1,
    execute_special_cost2,
    execute_special_cost3,
    execute_deed_no,
    execute_area_no,
    execute_area_province,
    execute_area_district,
    execute_area_subdistrict,
    execute_price1,
    execute_area_details,
    execute_item,
    execute_mortgaged,
    execute_details,
    execute_map_details,
    execute_lat,
    execute_lon,
  } = req.body;

  try {
    conn.query(
      `UPDATE tb_cases SET
      execute_date = ?,
      execute_date1 = ?,
      execute_date2 = ?,
      execute_province = ?,
      execute_brance = ?,
      execute_date_wait = ?,
      execute_wait_day = ?,
      execute_date_wait_lastdate = ?,
      execute_day_wait_lastnow = ?,
      execute_note_late = ?,
      execute_date_cancel = ?,
      execute_staff_id = ?,
      execute_num_map = ?,
      execute_out_area = ?,
      execute_special_cost1 = ?,
      execute_special_cost2 = ?,
      execute_special_cost3 = ?,
      execute_deed_no = ?,
      execute_area_no = ?,
      execute_area_province = ?,
      execute_area_district = ?,
      execute_area_subdistrict = ?,
      execute_price1 = ?,
      execute_area_details = ?,
      execute_item = ?,
      execute_mortgaged = ?,
      execute_details = ?,
      execute_map_details = ?,
      execute_lat = ?,
      execute_lon = ?
      WHERE id = ?`,
      [
        execute_date,
        execute_date1,
        execute_date2,
        execute_province,
        execute_brance,
        execute_date_wait,
        execute_wait_day,
        execute_date_wait_lastdate,
        execute_day_wait_lastnow,
        execute_note_late,
        execute_date_cancel,
        execute_staff_id,
        execute_num_map,
        execute_out_area,
        execute_special_cost1,
        execute_special_cost2,
        execute_special_cost3,
        execute_deed_no,
        execute_area_no,
        execute_area_province,
        execute_area_district,
        execute_area_subdistrict,
        execute_price1,
        execute_area_details,
        execute_item,
        execute_mortgaged,
        execute_details,
        execute_map_details,
        execute_lat,
        execute_lon,
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
