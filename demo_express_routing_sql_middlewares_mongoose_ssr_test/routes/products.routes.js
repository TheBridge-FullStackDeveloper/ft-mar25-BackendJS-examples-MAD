const productsController = require('../controllers/products.controller');
const router = require('express').Router();

router.get("/:id?", productsController.getProduct);
/*
POST http://localhost:3000/api/products

A enviar por Body:
{
    "id":8,
    "title": "Producto super nuevo!",
    "price": 695,
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "companyName": "La casa de las flores"
}
*/
router.post("/", productsController.createProduct);
router.put("/", productsController.editProduct);
router.delete("/:id?", productsController.deleteProduct);

module.exports = router;