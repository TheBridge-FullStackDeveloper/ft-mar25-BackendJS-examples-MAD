const productsController = require('../controllers/products.controller');
const router = require('express').Router();

/**
 * CRUD Products - Endpoint 1
 * [GET] http://localhost:3000/api/products 
 * Retorna un objeto con los datos de todos los productos. Retorna un status 200.
 * Usar populate() para que traiga los datos del proveedor de cada producto.
 */
router.get("/", productsController.getProduct);

/**
 * CRUD Products - Endpoint 2
 * [POST] http://localhost:3000/api/products 
 * Se envía en el body los datos del producto a crear y retorna un status 201.
 * Payload {message: "producto creado", product:{datos_del_producto_creado}.
 * Primero tendréis que traer los datos del proveedor para obtener el ID_provider.
 * Después se podrá crear el producto.
 */
router.post("/", productsController.createProduct);

/**
 * CRUD Products - Endpoint 3
 * [PUT] http://localhost:3000/api/products 
 * Se envía en el body los datos del producto a editar y retorna un status 200.
 * Payload {message: "producto actualizado: zapatos", product:{datos_del_producto_editado}}
 */
router.put("/", productsController.editProduct);

/**
 * CRUD Products - Endpoint 4
 * [DELETE] http://localhost:3000/api/products 
 * Se envía en el body el título del producto a borrar y retorna un status 200.
 * Payload {message: "Se ha borrado el producto: zapatos".
 */
router.delete("/", productsController.deleteProduct);

module.exports = router;