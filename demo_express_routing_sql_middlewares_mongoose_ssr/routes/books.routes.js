const router = require('express').Router(); // crea un objeto router
const booksController = require('../controllers/books.controller'); // importa el controlador

// CRUD --> CREATE, READ, UPDATE, DELETE

// Params:
// http://localhost:3000/api/books/quijote
// http://localhost:3000/api/books/
// http://localhost:3000/api/books/celestina

router.get("/:title?", booksController.getBook);

//router.get("/book_old", booksController.getOldBook);

/*
{
  "title": "Don Quijote de la Mancha",
  "author":"Miguel de Cervantes",
  "pages": 2000,
  "year":1550,
  "description": "en un lugar de la mancha..."
}
*/
// POST http://localhost:3000/api/books
router.post("/", booksController.createBook);

// PUT http://localhost:3000/api/books
router.put("/",  booksController.editBook);

// DELETE http://localhost:3000/api/books/quijote
router.delete("/:title?", booksController.deleteBook);

//router.patch("/", booksController.patchBook);

// exporta el objeto router que es el conjunto de rutas declaradas
module.exports = router; 