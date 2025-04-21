const express = require("express"); // Importamos el paquete express
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor

// Importar middlewares
const manage404 = require("./middlewares/manage404");
const checkApiKey = require("./middlewares/auth_api_key");
const morgan = require("./middlewares/morgan");

// Logger
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));


app.use(express.json()); // Middleware para parsear el body de las peticiones

// Rutas
const booksRoutes = require("./routes/books.routes")
const productsRoutes = require("./routes/products.routes")
const entriesRoutes = require("./routes/entries.routes")

// GET http://localhost:3000/ --> Ruta /. La principal
app.get("/", (req, res) => {
  // req: request, res: response
  res.send("Hello World!. Welcome to Backend");
});

// Rutas a habilitar
//API
app.use('/api/books',checkApiKey, booksRoutes); // bloquear todas las rutas con API KEY
app.use('/api/products',productsRoutes);
app.use('/api/entries',entriesRoutes);

// GET http://localhost:3000/perros/toby
// GET http://localhost:3000/perros/mordisquitos
// GET http://localhost:3000/perros/bolita
// GET http://localhost:3000/perros/23
// GET http://localhost:3000/perros --> devuelve todos los perros

app.get("/perros/:name?",checkApiKey, (req, res) => {
  // ? indica que el parametro es opcional
  const name = req.params.name; // leer el parametro name
  //Habría que sustitur las siguientes líneas (28-35) por una llamada a mi BBDD SQL
  // select * from perros where name = name
  //perros.model.getPerrosByName(name)
  const perros = [
    { name: "mordisquitos", age: 2 },
    { name: "toby", age: 3 },
    { name: "peluson5", age: 5 },
    { name: "bob", age: 3 },
  ];
  if (name) {
    const perro = perros.find((perro) => perro.name === name);

    perro // perro encontrado????
      ? res.status(200).json(perro) // si lo encuentra, devuelvo el perro
      : res.status(404).json({ message: name + " no encontrado" }); // sino, objeto con un mensaje
  } else {
    res.status(200).json(perros); // devuelve todos los perros
  }
});

// Para ruta no existente
app.use("*", manage404);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
