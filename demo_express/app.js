const express = require("express");
const app = express(); // crear el servidor
const port = 3000; // puerto donde se ejecuta el servidor

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


// GET http://localhost:3000/books/year?start=1600&end=2000
app.get("/books/year", (req, res) => {
    const start = req.query.start;
    const end = req.query.end;
    console.log(req.query);

    if(start && end){
        const booksFound = books.filter((book) => book.year >= start && book.year <= end);
        res.status(200).json(booksFound);
    }else{
        res.status(404).json({msj: "Falta fecha inicial o final"}); 
    }
});

// GET http://localhost:3000/books
// GET http://localhost:3000/books/Harry Potter
// GET http://localhost:3000/books/year

app.get("/books{/:title}", (req, res) => {
  // las {} indican opicionalidad
//   console.log(req);
  const title = req.params.title; // Harry Potter
//   console.log(title);
//   console.log(req.params);

  // buscar por título
  if (title) {
    const book = books.find((book) => book.title === title); // buscar libro por título
    if (book) { // si el libro existe
      res.status(200).json(book); // devuelve el libro con el título Harry Potter
    } else { // si el libro no existe
      res.status(404).json({msj: "Libro no encontrado"}); // devuelve un mensaje de error
    }
  } else { // devolver todos los libros
    res.status(200).json(books); // devuelve todos los libros
  }
});

// POST http://localhost:3000/books
app.post("/books", (req, res) => {
  res.send("Borrar libro!");
});

// PUT http://localhost:3000/books
app.put("/books", (req, res) => {
  res.send("Editar libro!");
});

// DELETE http://localhost:3000/books
app.delete("/books", (req, res) => {
  res.send("Borrar libro!");
});

// GET http://localhost:3000/authors
app.get("/authors", (req, res) => {
  res.send("Hello Authorssssssss!");
});

// Mi app va a estar escuchand en el puerto 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
