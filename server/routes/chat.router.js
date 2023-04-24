const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//import authentication middleware
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require(`../modules/authentication-middleware`);

/**
 * GET route
 *                     WHERE "comments".stream_id = 1
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "comments".id, "comments".text, "comments".timestamp, "users".username FROM "comments"
                    JOIN "users" ON "users".id = "comments".user_id
                    ORDER BY "comments".timestamp ASC`;
  // const queryParams = [req.params.stream_id]
  pool
    .query(queryText)
    // queryParams)
    .then((result) => {
      // console.log("result.rows", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Get comments by id failed in server", err);
      res.sendStatus(500);
    });
});

/**
 * POST route
 */
// "stream_id",
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("in post text, req.body is", req.body);
  const queryText = `INSERT INTO comments ("text", "timestamp", "user_id")
                       VALUES ($1, current_timestamp, $2)`;
  let queryParams = [
    // req.body.payload.stream_id,
    req.body.payload.text,
    req.body.payload.user.id,
  ];
  pool
    .query(queryText, queryParams)
    .then(() => {
      req.io.emit("add_text", req.body.payload.text, req.body.payload.user.id);
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("Failed to execute SQL query:", queryText, " : ", error);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectNonAdminUnauthenticated, (req, res) => {
  const queryText = `
  DELETE from comments
  WHERE id = $1`;
  pool
    .query(queryText, [req.params.id])
    .then((dbRes) => {
      // req.io.emit("")
      req.io.emit("add_text");
      res.sendStatus(203);
    })
    .catch((err) => {
      console.error(error);
      res.sendStatus(500);
    });
});

router.get("/start-demo", rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  const asyncTimeout = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  try {
    const chatQueryText = `
                        INSERT INTO comments ("text", "timestamp", "user_id")
                        VALUES ($1, current_timestamp, $2)`;

    const chatQueryParamArray = [
      ["I love these dryer sheets!", 3],
      ["they dissolve???", 6],
      ["ugh finding this kind of thing can be so hard!!", 3],
      ["so small, doesn't waste space!!", 4],
      ["no plastic in the packaging?", 9],
      ["Get top dollar for your unwanted gold today! Quick cash, no hassle. Click now to learn more and turn your old jewelry into money fast! #cashforgold", 5],
      ["my clothes are so soft after using this!", 8],
    ];

    let ms = 1000;
    for (let param of chatQueryParamArray) {
      await asyncTimeout(ms);
      await connection.query(chatQueryText, param);
      req.io.emit("add_text");
      ms = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

module.exports = router;
