const express = require("express");
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * POST route for saving an item for a specific user
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("in users products POST, req.body is", req.body);
  // POST route code here
  const queryText = `INSERT INTO users_products ("user_id", "product_id")
                    VALUES ($1, $2)`;
  const queryParams = [req.user.id, req.body.productID];
  pool
    .query(queryText, queryParams)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

router.delete("/:productID", rejectUnauthenticated, (req, res) => {
  console.log("in users products DELETE, req.body is", req.body);
  // POST route code here
  const queryText = `DELETE FROM users_products WHERE user_id = $1 AND product_id = $2`;
  const queryParams = [req.user.id, req.params.productID];
  pool
    .query(queryText, queryParams)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
