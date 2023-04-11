const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    const queryText =
    `INSERT INTO comments ("user_id", "text", "timestamp")
    VALUES ($1, $2, current_timestamp)`;
    pool.query(queryText, [req.body])
});

module.exports = router;
