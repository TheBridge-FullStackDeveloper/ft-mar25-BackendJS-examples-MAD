const express = require('express') 
const app = express()
const port = 3000

// Rutas
const booksRoutes = require("./routes/books.routes")
const productsRoutes = require("./routes/products.routes")

app.use(express.json()); // Habilito recepción de JSON en servidor

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Rutas
//API
// Todas las peticiones tiene que empezar por 
// http://localhost:3000/api/books
app.use('/api/books',booksRoutes);
app.use('/api/products',productsRoutes);

app.listen(port, () => {
  console.log(`Nos vamos a por tortilla. Funcionando en: http://localhost:${port}`)
})