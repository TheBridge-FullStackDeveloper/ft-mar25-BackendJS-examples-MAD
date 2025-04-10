const express = require('express');
const entriesController = require("../controllers/entries.controller");
const router = express.Router();

router.get('/', entriesController.getEntries);
router.post('/', entriesController.createEntry);
router.put('/', entriesController.updateEntry);


module.exports = router;

// GET http://localhost:3000/api/entries --> ALL
// GET http://localhost:3000/api/entries?email=hola@gmail.com --> por email
// POST http://localhost:3000/api/entries
/*
{
    "title":"noticia desde Node",
    "content":"va a triunfar esto2",
    "email":"alejandru@thebridgeschool.es",
    "category":"sucesos"
}
    */

// PUT http://localhost:3000/api/entries
/*
{
    "title": "Estamos de Lunes de Back 2",
    "content": "La venganza de Elefante relacional SQL",
    "date":"2024-06-17",
    "email": "guillermu@thebridgeschool.es",
    "category": "Software",
    "old_title":"Estamos de Lunes de Back"
}
*/