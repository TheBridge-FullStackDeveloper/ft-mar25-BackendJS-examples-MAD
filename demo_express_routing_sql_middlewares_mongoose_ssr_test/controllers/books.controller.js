// CREATE
const createBook = (req, res) => {
  console.log(req.body);
  if (req.body.title && req.body.author) {
    // Lógica para guardar el libro en la BBDD
    // INSERT INTO books (title, author) VALUES (req.body.title, req.body.author)
    //..
    res.status(201).json({
      success: true,
      action: "create",
      title: req.body.title,
      id: Math.floor(Math.random() * (10000 - 1) + 1),
      data: req.body,
    });
  } else {
    res.status(400).send("Petición incorrecta");
  }
};

// READ
const getBook = (req, res) => {
  console.log(req.params.title);

  if (req.params.title) {
    res.status(200).json({
      message: "Has solicitado:" + req.params.title,
      title: req.params.title,
      success: true,
      data: {
        title: "Hamlet",
        author: "Shakespeare",
        pages: 2000,
        year: 1550,
        description: "en un lugar de la mancha...",
      },
    });
  } else {
    res.status(200).json({
      message: "Aquí van tus libros!",
      success: true,
      data: [
        {
          title: "Don Quijote de la Mancha",
          author: "Miguel de Cervantes",
          pages: 2000,
          year: 1550,
          description: "en un lugar de la mancha...",
        },
        {
          title: "Hamlet",
          author: "Miguel de Cervantes",
          pages: 2000,
          year: 1550,
          description: "en un lugar de la mancha...",
        },
        {
          title: "Lazarillo de Tormes",
          author: "Miguel de Cervantes",
          pages: 2000,
          year: 1550,
          description: "en un lugar de la mancha...",
        },
      ],
    });
  }
};

// UPDATE
const editBook = (req, res) => {
  console.log(req.body); // por body se recibe el libro a editar
  if (req.body.title && req.body.author) {
    // Lógica para editar el libro en la BBDD
    // UPDATE books SET title = req.body.title, author = req.body.author WHERE id = req.body.id
    //..

    let book = {
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      pages: 2000,
      year: 1550,
      description: "en un lugar de la mancha...",
    };

    let newBook = { ...book, ...req.body }; // Actualizar el libro con los nuevos datos

    res.status(200).json({
      success: true,
      action: "update",
      title: req.body.title,
      id: Math.floor(Math.random() * (10000 - 1) + 1),
      data: newBook,
    });
  } else {
    res.status(400).send("Petición incorrecta");
  }
};

// DELETE
const deleteBook = (req, res) => {
  console.log(req.query);
  // Lógica para borrar de la bbdd por título y autor
  // DELETE FROM books WHERE title = req.query.title AND author = req.query.author
  res.send(`Libro borrado: ${req.query.title} - ${req.query.author}`);
};

module.exports = {
  createBook,
  getBook,
  editBook,
  deleteBook,
};
