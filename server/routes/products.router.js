const express = require("express");
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", async (req, res) => {
  const sqlQuery = `
    SELECT products.*, EXISTS (
      SELECT 1 FROM users_products
      WHERE users_products.user_id = $1 AND users_products.product_id = products.id
    ) AS on_user_wishlist
    FROM products;
  `;
  const sqlValues = [req.user.id];
  try {
    const result = await pool.query(sqlQuery, sqlValues);
    const products = result.rows;
    res.send(products);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  const connection = await pool.connect();

  try {
    const sqlQuery = `
    INSERT INTO products 
      (name, url, description, coupon_code, image_url, coupon_expiration)
    VALUES 
      ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

    const sqlValues = [
      req.body.payload.name,
      req.body.payload.url,
      req.body.payload.description,
      req.body.payload.coupon_code,
      req.body.payload.image_url,
      req.body.payload.coupon_expiration,
    ];
    const postResult = await connection.query(sqlQuery, sqlValues);
    if (req.body.payload.streamID) {
      const getNumberOfProductsQueryText = `SELECT COUNT(*) FROM streams_products WHERE stream_id = $1`;
      const getNumberOfProductsQueryParams = [req.body.payload.streamID];
      const result = await connection.query(
        getNumberOfProductsQueryText,
        getNumberOfProductsQueryParams
      );

      const numberOfProducts = result.rows[0].count;

      const queryText = `INSERT INTO streams_products ("stream_id", "product_id", "order")
                        VALUES ($1, $2, $3)`;
      const queryParams = [
        req.body.payload.streamID,
        postResult.rows[0].id,
        Number(numberOfProducts) + 1,
      ];

      await connection.query(queryText, queryParams);
    }
    const newProduct = postResult.rows[0];
    res.status(201).send(newProduct);
  } catch (error) {
    // await connection.query("FAILED STREAM PUT");
    console.log(`Error in products POST: `, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

// GET route for getting a single product by ID
router.get("/:productID", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT products.*,
                      EXISTS (SELECT FROM users_products WHERE users_products.product_id = $1 AND users_products.user_id = $2) AS on_user_wishlist
                      FROM "products"
                      WHERE products.id = $1;`;
  const queryParams = [req.params.productID, req.user.id];
  pool
    .query(queryText, queryParams)
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

//PUT for updating all product info
router.put("/:id", rejectNonAdminUnauthenticated, (req, res) => {
  const queryText = `UPDATE products 
    SET name = $1,
    image_url = $2, 
    description = $3, 
    coupon_code = $4, 
    coupon_expiration = $5, 
    url = $6
    WHERE id = $7`;
  const queryParams = [
    req.body.name,
    req.body.image_url,
    req.body.description,
    req.body.coupon_code,
    req.body.coupon_expiration,
    req.body.url,
    req.params.id,
  ];
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

// PUT route for changing whether product is public
router.put("/public/:productID", rejectNonAdminUnauthenticated, (req, res) => {
  const queryText = `UPDATE products SET public = $1 WHERE id = $2`;
  const queryParams = [req.body.public, req.params.productID];
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

router.delete("/:productID", rejectNonAdminUnauthenticated, (req, res) => {
  const queryText = `DELETE from products WHERE id = $1`;
  const queryParams = [req.params.productID];
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
