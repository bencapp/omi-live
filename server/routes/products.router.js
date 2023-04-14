const express = require("express");
const {
  rejectUnauthenticated,
  rejectNonAdminUnauthenticated,
} = require("../modules/authentication-middleware");
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

router.post("/", (req, res) => {
  const sqlQuery = `
    INSERT INTO products 
      (name, url, description, coupon_code, image_url, coupon_expiration)
    VALUES 
      ($1, $2, $3, $4, $5, $6)
  `;
  //console.log("REQ BODy", req.body);
  const sqlValues = [
    req.body.payload.name,
    req.body.payload.url,
    req.body.payload.description,
    req.body.payload.coupon_code,
    req.body.payload.image_url,
    req.body.payload.coupon_expiration
  ];
  console.log(sqlValues);
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

// GET route for getting a single product by ID
router.get("/:productId", rejectUnauthenticated, (req, res) => {
  console.log("in product get, req.params is", req.params);
  const queryText = `SELECT products.id, products.name, products.coupon_code, products.coupon_expiration, products.description, products.image_url, products.url, 
                      EXISTS (SELECT FROM users_products WHERE users_products.product_id = $1 AND users_products.user_id = $2) AS on_user_wishlist
                      FROM "products"
                      WHERE products.id = $1;`;
  const queryParams = [req.params.productId, req.user.id];
  pool
    .query(queryText, queryParams)
    .then((result) => {
      // console.log("got product by id, result.rows is", result.rows);
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log("Error executing SQL query", queryText, " : ", err);
      res.sendStatus(500);
    });
});

//PUT for updating all product info
router.put("/:id", rejectNonAdminUnauthenticated, (req, res) => {
  const queryText = 
    `UPDATE products 
    SET name = $1,
    image_url = $2, 
    description = $3, 
    coupon_code = $4, 
    coupon_expiration = $5, 
    url = $6
    WHERE id = $7`;
  const queryParams = [req.body.name, req.body.imageUrl, req.body.description, req.body.couponCode, req.body.couponExpiration, req.body.productUrl, req.params.id];
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



module.exports = router;
