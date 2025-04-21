const providersController = require('../controllers/providers.controller');
const router = require('express').Router();

/**
 * CRUD Provider - Endpoint 1
 * [GET] http://localhost:3000/api/providers
 * Retorna un objeto con los datos de todos los providers. Retorna un status 200.
 */
router.get("/", providersController.getProviders);

/**
 * CRUD Provider - Endpoint 2
 * [POST] http://localhost:3000/api/providers
 * Se envía en el body los datos del proveedor a crear y retorna un status 201.
 * Payload {message: "proveedor creado", provider:{datos_del_proveedor_creado}}.
 */
router.post("/", providersController.createProvider);

/**
 * CRUD Provider - Endpoint 3
 * [PUT] http://localhost:3000/api/providers
 * Se envía en el body los datos del proveedor a editar y retorna un status 200.
 * Payload {message: "proveedor actualizado: Adidas", provider:{datos_del_proveedor_editado}}.
 */
router.put("/", providersController.updateProvider);

/**
 * CRUD Provider - Endpoint 4
 * [DELETE] http://localhost:3000/api/providers
 * Se envía en el body el título del proveedor a borrar y retorna un status 200.
 * Payload {message: "Se ha borrado el proveedor: Nintendo"}.
 */
router.delete("/", providersController.deleteProvider);

module.exports = router; 