const express = require("express"); // importar express
const app = express(); // crear el servidor --> Objeto de la clase express
const port = 3000; // puerto donde se ejecuta el servidor

app.use(express.json()); // middleware para parsear el body a JSON

// En el futuro esto será mi "base de datos"
const books = [
  { title: "Harry Potter", author: "J.K. Rowling", year: 1997 },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    year: 1967,
  },
  { title: "El señor de los anillos", author: "J.R.R. Tolkien", year: 1954 },
  { title: "El principito", author: "Antoine de Saint-Exupéry", year: 1943 },
  {
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    year: 1605,
  },
];

// GET http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Trabajando con query params
// GET http://localhost:3000/books/year?start=1600&end=2000
app.get("/books/year", (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  console.log(req.query);

  if (start && end) {
    const booksFound = books.filter(
      (book) => book.year >= start && book.year <= end
    );
    res.status(200).json(booksFound);
  } else {
    res.status(404).json({ msj: "Falta fecha inicial o final" });
  }
});

// GET http://localhost:3000/books
// GET http://localhost:3000/books/Harry Potter
// GET http://localhost:3000/books/queso
// GET http://localhost:3000/books/343dflkdjfdh
// GET http://localhost:3000/books/year
// Los {} indican que es un parámetro opcional
// app.get("/books/:title?", (req, res) => { // Para express 4.x
app.get("/books{/:title}", (req, res) => {
  // Para express 5.x
  // las {} indican opicionalidad
  //   console.log(req);
  const title = req.params.title; // Harry Potter
  //   console.log(title);
  //   console.log(req.params);

  // buscar por título
  if (title) {
    const book = books.find((book) => book.title === title); // buscar libro por título
    if (book) {
      // si el libro existe
      res.status(200).json(book); // devuelve el libro con el título Harry Potter
    } else {
      // si el libro no existe
      res.status(404).json({ msj: "Libro no encontrado" }); // devuelve un mensaje de error
    }
  } else {
    // devolver todos los libros
    res.status(200).json(books); // devuelve todos los libros
  }
});

// POST http://localhost:3000/books
// Body: { title: "Hamlet", author: "Shakespeare", year: 1600 }
app.post("/books", (req, res) => {
  console.log(req.body); // Body recibido
  const book = req.body;

  if (book.title && book.author && book.year) {
    // Guardar en la base de datos
    // Crear en bbdd un registro nuevo
    // INSERT INTO books (title, author, year) VALUES ("Hamlet", "Shakespeare", 1600)
    //..
    books.push(book); // Agregar el libro al array
    res.status(201).json({ sucess: true, ...book });
  } else {
    res.status(400).json({ msj: "Petición incorrecta" });
  }
});

// PUT http://localhost:3000/books
app.put("/books", (req, res) => {
  console.log(req.body);

  // UPDATE books SET title = "Hamlet", author = "Shakespeare", year = 1600 WHERE title = "Hamlet"

  const book = req.body; // busqueda por título
  if (book.title) {
    // buscar el libro por título
    const index = books.findIndex((b) => b.title === book.title);
    books[index] = book; // actualizar el libro
    res.status(200).json({ updated: true, ...book });
  } else {
    res
      .status(400)
      .json({ msj: "Petición incorrecta. Manda título para la búsqueda" });
  }
});

// DELETE http://localhost:3000/books/Harry Potter
// DELETE http://localhost:3000/books/Hamlet
// DELETE http://localhost:3000/books/Don Quijote
// DELETE http://localhost:3000/books -- > NO
app.delete("/books/:title", (req, res) => {
  const title = req.params.title; // Harry Potter

  // DELETE FROM books WHERE title = "Harry Potter"

  // busca libro y devuelve el index
  const index = books.findIndex((b) => b.title === title);
  if (index != -1) {
    // borra  el libro de books
    const book = books.splice(index, 1); // Libro borrado
    res.status(200).json({ deleted: true, ...book });
  }
  else{
     // si el libro no existe
     res.status(404).json({ msj: "Libro no encontrado" }); // devuelve un mensaje de error
  }

});

// GET http://localhost:3000/authors
app.get("/authors", (req, res) => {
  res.send("Hello Authors!");
});

// Mi app va a estar escuchand en el puerto 3000
// Lanzar el servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
