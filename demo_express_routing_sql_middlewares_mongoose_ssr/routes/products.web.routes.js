const productsWebController = require('../controllers/products.web.controller');
const router = require('express').Router();

// GET http://localhost:3000/products
// GET http://localhost:3000/products/6
router.get("/:id?", productsWebController.getProduct);


module.exports = router;