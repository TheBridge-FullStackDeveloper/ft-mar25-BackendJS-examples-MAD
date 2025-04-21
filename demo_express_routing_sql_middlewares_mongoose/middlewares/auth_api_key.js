// GET http://localhost:3000/api/books?API_KEY=123abc

const checkApiKey = function (req, res, next) {
    // Comprobar si existe API KEY en BBDD pasada por cliente
    // LLamada al modelo ode users de la BBDD
    // SELECT * FROM users WHERE API_KEY = req.query.API_KEY
    // ...
    if (req.query.API_KEY === "123abc") {
        next(); // Pasa a la siguiente tarea
    } else {
        //Mando mensaje de error
        res.status(401).send("Error. API KEY no proveída o errónea");
    }
}

module.exports = checkApiKey;