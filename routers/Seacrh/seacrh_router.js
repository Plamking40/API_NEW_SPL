const express = require("express");
const router = express.Router();
const conn = require("../../DB/db");

router.get("/", function (req, res) {
  const {
    contract_number,
    area_id,
    black_year,
    black_no,
    red_no,
    red_year,
    cases_id,
    sue_lawyer_id,
    customer_id,
  } = req.body;

  /// การค้นหา เหลือการเปลี่ยนให้  ? ,[ req.body ] ใส่เพิ่ม
  sql = `SELECT  a.id , b.name  as status_name , l.name as lawname , ls.name as lawsname  
            FROM tb_cases a , tb_status b , tb_lawyer l , tb_lawyer ls 
            WHERE (a.sue_lawyer_id = ls.id AND a.lawyer_id = l.id) AND a.status_id = b.id `;
  if (contract_number) {
    sql = sql + "AND a.contract_number LIKE %':contract_number'%";
    sql = sql.replace(":contract_number", contract_number);
  }
  if (area_id) {
    sql = sql + "AND a.area_id = :area_id ";
    sql = sql.replace(":area_id", area_id);
  }
  if (black_year) {
    sql = sql + "AND a.black_year = :black_year ";
    sql = sql.replace(":black_year", black_year);
  }
  if (black_no) {
    sql = sql + "AND a.black_no LIKE %':black_no'% ";
    sql = sql.replace(":black_no", black_no);
  }
  if (red_no) {
    sql = sql + "AND a.red_no LIKE %':red_no'% ";
    sql = sql.replace(":red_no", red_no);
  }
  if (red_year) {
    sql = sql + "AND a.red_year = :red_year";
    sql = sql.replace(":red_year", red_year);
  }
  if (cases_id) {
    sql = sql + " AND a.id IN (:sue_lawyer_id)";
    sql = sql.replace(":sue_lawyer_id", cases_id);
  }
  if (sue_lawyer_id) {
    sql = sql + " AND a.sue_lawyer_id = :sue_lawyer_id";
    sql = sql.replace(":sue_lawyer_id", sue_lawyer_id);
  }
  if (customer_id) {
    sql = sql + " AND a.customer_id = :customer_id";
    sql = sql.replace(":customer_id", customer_id);
  }
  sql = sql + " GROUP BY a.id";

  console.log(sql);
  try {
    conn.query(sql, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      res.status(200).json(results);
      console.log(sql);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
