const express = require('express');
const entriesController = require("../controllers/entries.controller");
const {
    validateGetEntries,
    validateCreateEntry,
    validateUpdateEntry,
    validateDeleteEntry
} = require('../validations/entries.validation');
const handleValidationErrors = require('../middlewares/handleValidation');
router.use(handleValidationErrors); // Aplicar handleValidationErrors globalmente

const router = express.Router();

router.get('/:email?', entriesController.getEntries); // Updated to use email as a param
router.post('/', validateCreateEntry, entriesController.createEntry);
router.put('/', validateUpdateEntry, entriesController.updateEntry);
router.delete('/', validateDeleteEntry, entriesController.deleteEntry);

module.exports = router;