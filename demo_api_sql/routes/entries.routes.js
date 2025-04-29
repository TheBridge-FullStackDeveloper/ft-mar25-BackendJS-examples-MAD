const express = require('express');
const entriesController = require("../controllers/entries.controller");
const {
    validateGetEntries,
    validateCreateEntry,
    validateUpdateEntry,
    validateDeleteEntry
} = require('../validations/entries.validation');
const handleValidationErrors = require('../middlewares/handleValidation');

const router = express.Router();

router.get('/:email?', handleValidationErrors, entriesController.getEntries); // Updated to use email as a param
router.post('/', validateCreateEntry, handleValidationErrors, entriesController.createEntry);
router.put('/', validateUpdateEntry, handleValidationErrors, entriesController.updateEntry);
router.delete('/', validateDeleteEntry, handleValidationErrors, entriesController.deleteEntry);

module.exports = router;