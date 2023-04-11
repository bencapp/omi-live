const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * POST route for saving an item for a specific user
 */
router.post("/", (req, res) => {
  console.log("in users products POST, req.body is", req.body);
  // POST route code here
  const queryText = `INSERT INTO users_products ("user_id", "product_id")
                    VALUES ($1, $2)`;
  const queryParams = [req.body.userID, req.body.productID];
  pool
    .query(queryText, queryParams)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
