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
const providersRoutes = require("./routes/providers.routes")
//const entriesRoutes = require("./routes/entries.routes")

// GET http://localhost:3000/ --> Ruta /. La principal
app.get("/", (req, res) => {
  // req: request, res: response
  res.send("Hello World!. Welcome to Backend");
});

/**
 * IMPLEMENTACIÓN DE ENDPOINTS REQUERIDOS
 * 
 * Se han implementado los siguientes endpoints:
 * 
 * 1. CRUD Provider:
 *    - [GET] /api/providers: Retorna todos los providers (status 200)
 *    - [POST] /api/providers: Crea un nuevo provider (status 201)
 *    - [PUT] /api/providers: Actualiza un provider existente (status 200)
 *    - [DELETE] /api/providers: Elimina un provider si no tiene productos asociados (status 200)
 * 
 * 2. CRUD Products:
 *    - [GET] /api/products: Retorna todos los productos con sus providers (status 200)
 *    - [POST] /api/products: Crea un nuevo producto asociado a un provider (status 201)
 *    - [PUT] /api/products: Actualiza un producto existente (status 200)
 *    - [DELETE] /api/products: Elimina un producto por su título (status 200)
 * 
 * NOTA: Para el DELETE de providers, se verifica si el provider tiene productos relacionados.
 * Si tiene productos asociados, se impide la eliminación para mantener la integridad referencial.
 */

// Rutas a habilitar
//API
app.use('/api/books',checkApiKey, booksRoutes); // bloquear todas las rutas con API KEY
app.use('/api/products',productsRoutes);
app.use('/api/providers',providersRoutes);
//app.use('/api/entries',entriesRoutes);

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
