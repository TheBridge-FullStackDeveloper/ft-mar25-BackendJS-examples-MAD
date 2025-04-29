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

router.get('/:email?', validateGetAuthors, handleValidationErrors, authorsController.getAuthors);
router.post('/', validateCreateAuthor, handleValidationErrors, authorsController.createAuthor);
router.put('/', validateUpdateAuthor, handleValidationErrors, authorsController.updateAuthor);
router.delete('/', validateDeleteAuthor, handleValidationErrors, authorsController.deleteAuthor);

module.exports = router;
