const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", async (req, res) => {
  const sqlQuery = "SELECT * FROM products";
  try {
    const result = await pool.query(sqlQuery);
    const products = result.rows;
    console.log("products", products);
    res.send(products);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// router.get("/", (req, res) => {
//   const sqlQuery = `
//   SELECT * FROM products
//   ;`;
//   pool
//     .query(sqlQuery)
//     .then((result) => {
//       //console.log("show:", result.rows);
//       res.send(result.rows);
//     })
//     .catch((error) => {
//       console.error("ERROR", error);
//       res.sendStatus(500);
//     });
// });

router.post("/", (req, res) => {
  const sqlQuery = `
    INSERT INTO products 
      (name, url, description, coupon_code ,image_url)
    VALUES 
      ($1, $2, $3, $4, $5)
  `;
  //console.log("REQ BODy", req.body);
  const sqlValues = [
    req.body.payload.name,
    req.body.payload.productUrl,
    req.body.payload.description,
    req.body.payload.couponCode,
    req.body.payload.imageUrl,
  ];
  console.log("SEE IFIT WORKSD", sqlValues);
  pool
    .query(sqlQuery, sqlValues)
    .then((result) => {
      const newProduct = result.rows[0];
      res.status(201).send(newProduct);
    })
    .catch((error) => {
      console.error("Error in post", error);
      res.sendStatus(500);
    });
});

/**
 * GET route for getting all products by stream id
 */
// router.get("/:streamID", (req, res) => {
//   const queryText = `SELECT * FROM "products" JOIN "streams_products" ON products.id = streams_products.product_id WHERE stream_id = $1`;
//   const queryParams = [req.params.streamID];
//   pool
//     .query(queryText, queryParams)
//     .then((response) => res.send(response.rows))
//     .catch((err) => {
//       console.log("Error executing SQL query", queryText, " : ", err);
//       res.sendStatus(500);
//     });
// });

module.exports = router;
