const express = require('express');
const authorsController = require("../controllers/authors.controller");
const {
    validateGetAuthors,
    validateCreateAuthor,
    validateUpdateAuthor,
    validateDeleteAuthor
} = require('../validations/authors.validation');

const handleValidationErrors = require('../middlewares/handleValidation'); // Validación de errores de ruta

const router = express.Router();

// Aplicar handleValidationErrors globalmente
router.use(handleValidationErrors);

router.get('/:email?', validateGetAuthors, authorsController.getAuthors);
router.post('/', validateCreateAuthor, authorsController.createAuthor);
router.put('/', validateUpdateAuthor, authorsController.updateAuthor);
router.delete('/', validateDeleteAuthor, authorsController.deleteAuthor);

module.exports = router;
