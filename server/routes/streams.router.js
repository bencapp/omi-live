const express = require("express");
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route for getting all streams and their products
 */
router.get("/", (req, res) => {
  const queryText = `SELECT streams.id, streams.title, streams.description, streams.scheduled, 
                      JSON_AGG(json_build_object('id', "products".id, 'name', "products".name, 'image_url', "products".image_url, 'description', "products".description, 'coupon_code', "products".coupon_code, 'coupon_expiration', "products".coupon_expiration, 'url', "products".url, 'order', "streams_products".order)) AS products
                      FROM "streams" 
                      LEFT JOIN "streams_products" ON streams.id = streams_products.stream_id 
                      LEFT JOIN products ON streams_products.product_id = products.id 
                      GROUP BY streams.id;`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

// GET route for getting one stream and all its products
router.get("/:streamID", (req, res) => {
  const queryText = `SELECT streams.id, streams.title, streams.description, streams.scheduled, 
                      JSON_AGG(json_build_object('id', "products".id, 'name', "products".name, 'image_url', "products".image_url, 'description', "products".description, 'coupon_code', "products".coupon_code, 'coupon_expiration', "products".coupon_expiration, 'url', "products".url, 'order', "streams_products".order)) AS products
                      FROM "streams" 
                      LEFT JOIN "streams_products" ON streams.id = streams_products.stream_id 
                      LEFT JOIN products ON streams_products.product_id = products.id 
                      WHERE streams.id = $1
                      GROUP BY streams.id;`;
  const queryParams = [req.params.streamID];
  // console.log("in get stream by id, id is", req.params.streamID);
  pool
    .query(queryText, queryParams)
    .then((result) => res.send(result.rows[0]))
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

// POST route for adding an empty stream in preparation for the user to edit it
router.post("/", (req, res) => {
  const queryText = `INSERT INTO "streams" ("title") VALUES ('New Stream')`;
  pool
    .query(queryText)
    .then(() => {
      const selectStreamQueryText = `SELECT * FROM "streams" WHERE id = currval('streams_id_seq')`;
      pool.query(selectStreamQueryText).then((result) => {
        res.send(result.rows[0]);
      });
    })
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

// PUT route for updating the title, description, and date of the stream
router.put("/:id", (req, res) => {
  const queryText = `UPDATE "streams" SET title = $1, description = $2, scheduled = $3 WHERE id = $4 `;
  const queryParams = [
    req.body.title,
    req.body.description,
    req.body.scheduled,
    req.params.id,
  ];
  console.log("in update stream info, queryParams is", queryParams);
  pool
    .query(queryText, queryParams)
    .then(() => {
      const selectStreamQueryText = `SELECT streams.id, streams.title, streams.description, streams.scheduled, 
                      JSON_AGG(json_build_object('id', "products".id, 'name', "products".name, 'image_url', "products".image_url, 'description', "products".description, 'coupon_code', "products".coupon_code, 'coupon_expiration', "products".coupon_expiration, 'url', "products".url, 'order', "streams_products".order)) AS products
                      FROM "streams" 
                      LEFT JOIN "streams_products" ON streams.id = streams_products.stream_id 
                      LEFT JOIN products ON streams_products.product_id = products.id 
                      WHERE streams.id = $1
                      GROUP BY streams.id;`;
      const selectStreamQueryParams = [req.params.id];
      pool
        .query(selectStreamQueryText, selectStreamQueryParams)
        .then((result) => {
          res.send(result.rows[0]);
        });
    })
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

// PUT route for updating the order of the stream's products
router.put("/order-change/:streamID", async (req, res) => {
  const connection = await pool.connect();

  try {
    // first get the product that is adjacent to the one selected
    const getQueryText = `SELECT product_id FROM streams_products WHERE "order" = $1 AND stream_id = $2`;
    const newOrder =
      req.body.type == "increase" ? req.body.order - 1 : req.body.order + 1;
    const getQueryParams = [newOrder, req.params.streamID];

    console.log("getQueryParams is", getQueryParams);

    const result = await connection.query(getQueryText, [
      newOrder,
      Number(req.params.streamID),
    ]);

    const otherProductID = result.rows[0].product_id;
    console.log("changing order, other product id is", otherProductID);

    // now set the order of that product
    const setOrderQueryText = `UPDATE streams_products SET "order" = $1 WHERE product_id = $2 AND stream_id = $3`;
    const newOtherProductOrder = req.body.order;
    const firstQueryParams = [
      newOtherProductOrder,
      otherProductID,
      req.params.streamID,
    ];
    console.log("firstQueryParams is", firstQueryParams);

    await connection.query(setOrderQueryText, firstQueryParams);

    // set the order of the first product
    const secondQueryParams = [
      newOrder,
      req.body.productID,
      req.params.streamID,
    ];
    console.log("secondQueryParams is", secondQueryParams);

    await connection.query(setOrderQueryText, secondQueryParams);

    res.sendStatus(204);
  } catch (error) {
    // await connection.query("FAILED STREAM PUT");
    console.log(`Error in stream PUT: `, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

router.delete("/:streamID", (req, res) => {
  const queryText = `DELETE FROM streams WHERE id = $1`;
  const queryParams = [req.params.streamID];
  pool
    .query(queryText, queryParams)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

module.exports = router;
