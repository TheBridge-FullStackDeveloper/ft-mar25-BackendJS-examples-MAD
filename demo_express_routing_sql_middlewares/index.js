const express = require("express");
const app = express(); // Inicializar servidor
const port = 3000;

// Importar middlewares
const error404 = require("./middlewares/error404");
const morgan = require("./middlewares/morgan");

// Logger
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Rutas
const booksRoutes = require("./routes/books.routes")
const productsRoutes = require("./routes/products.routes")
const entriesRoutes = require("./routes/entries.routes")

app.use(express.json()); // Habilito recepción de JSON en servidor

app.get("/", (req, res) => {
  res.send("Hello Wodffdrld let's go for cofedfd!");
});

// Rutas
//API
app.use('/api/books',booksRoutes);
app.use('/api/products',productsRoutes);
app.use('/api/entries',entriesRoutes);

app.use(error404); // Middleware gestiona error 404
//app.use("*",error404);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
