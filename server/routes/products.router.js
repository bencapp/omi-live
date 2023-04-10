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
    res.status(500);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      image_url,
      description,
      coupon_code,
      coupon_expiration,
      url,
    } = req.body;
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO products (name, image_url, description, coupon_code, coupon_expiration, url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, image_url, description, coupon_code, coupon_expiration, url]
    );
    const newProduct = result.rows[0];
    client.release();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating product" });
  }
});

module.exports = router;
