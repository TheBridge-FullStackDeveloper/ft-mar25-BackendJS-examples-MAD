const author = require("../models/authors.model");

// GET all authors or author by email
const getAuthors = async (req, res) => {
    const { email } = req.params;

    try {
        if (email) {
            const authorData = await author.getAuthorByEmail(email);
            res.status(200).json(authorData);
        } else {
            const authors = await author.getAllAuthors();
            res.status(200).json(authors);
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

// CREATE author
const createAuthor = async (req, res) => {
    const newAuthor = req.body; // {name, surname, email, image}
    if ("name" in newAuthor && "surname" in newAuthor && "email" in newAuthor && "image" in newAuthor) {
        try {
            const response = await author.createAuthor(newAuthor);
            res.status(201).json({
                items_created: response,
                data: newAuthor,
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en el autor" });
    }
};

// UPDATE author
const updateAuthor = async (req, res) => {
    const modifiedAuthor = req.body; // {name, surname, email, image, old_email}
    if (
        "name" in modifiedAuthor &&
        "surname" in modifiedAuthor &&
        "email" in modifiedAuthor &&
        "image" in modifiedAuthor &&
        "old_email" in modifiedAuthor
    ) {
        try {
            const response = await author.updateAuthor(modifiedAuthor);
            res.status(200).json({
                items_updated: response,
                data: modifiedAuthor,
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en el autor" });
    }
};

// DELETE author
const deleteAuthor = async (req, res) => {
    const { email } = req.body; // {email}
    if (email) {
        try {
            const response = await author.deleteAuthor(email);
            res.status(200).json({
                items_deleted: response,
                email: email,
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Falta el email del autor a eliminar" });
    }
};

module.exports = {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
};
