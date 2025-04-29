const express = require("express");
const app = express(); // Initialize server
const port = 3000;

// Import database pool
const pool = require("./config/db_pgsql");

// Import middlewares
const error404 = require("./middlewares/error404");
const morgan = require("./middlewares/morgan");

// Logger
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

// Routes
const entriesRoutes = require("./routes/entries.routes");
const authorsRoutes = require("./routes/authors.routes");

// Pass the pool instance to routes
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use(express.json()); // Enable JSON parsing

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API routes
app.use('/api/entries', entriesRoutes);
app.use('/api/authors', authorsRoutes);

app.use(error404); // Middleware for 404 errors

const server = app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

module.exports = server; // Exportar para los test
