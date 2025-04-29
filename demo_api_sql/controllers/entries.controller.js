const entry = require("../models/entries.model");

const getEntries = async (req, res) => {
    const { email } = req.params; // Get email from URL parameter
    try {
        const entries = email 
            ? await entry.getEntriesByEmail(email) 
            : await entry.getAllEntries();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

const createEntry = async (req, res) => {
    const newEntry = req.body; // {title,content,email,category}
    if (
        "title" in newEntry &&
        "content" in newEntry &&
        "email" in newEntry &&
        "category" in newEntry
    ) {
        try {
            const response = await entry.createEntry(newEntry);
            res.status(201).json({
                items_created: response,
                data: newEntry,
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
};

const updateEntry = async (req, res) => {
    const modifiedEntry = req.body; // {title,content,date,email,category,old_title}
    if (
        "title" in modifiedEntry &&
        "content" in modifiedEntry &&
        "date" in modifiedEntry &&
        "email" in modifiedEntry &&
        "category" in modifiedEntry &&
        "old_title" in modifiedEntry
    ) {
        try {
            const response = await entry.updateEntry(modifiedEntry);
            res.status(201).json({
                items_updated: response,
                data: modifiedEntry,
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
};

const deleteEntry = async (req, res) => {
    const { title } = req.body; // {title}
    if (title) {
        try {
            const response = await entry.deleteEntry(title);
            res.status(200).json({
                items_deleted: response,
                title: title,
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Falta el título de la entrada a eliminar" });
    }
};

module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry
};
