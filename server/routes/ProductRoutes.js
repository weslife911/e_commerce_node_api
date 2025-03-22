const { addProducts, getProducts, getProduct } = require("../controllers/ProductController");

const router = require("express").Router();

router.post("/add_product", addProducts);
router.get("/products", getProducts);
router.get("/product/:id", getProduct);

module.exports = router;