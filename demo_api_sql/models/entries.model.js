const pool = require('../config/db_pgsql'); // Use centralized DB config
const entryQueries = require('../queries/entry.queries'); // Import queries

const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(entryQueries.getEntriesByEmail, [email]); // Use updated query
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// GET
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(entryQueries.getAllEntries); // Use external query
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// CREATE
const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(entryQueries.createEntry, [title, content, email, category]); // Use external query
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// DELETE
const deleteEntry = async (title) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(entryQueries.deleteEntry, [title]); // Use external query
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// UPDATE
const updateEntry = async (entry) => {
    const { title, content, date, email, category, old_title } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(entryQueries.updateEntry, [
            title,
            content,
            date,
            email,
            category,
            old_title
        ]); // Use external query
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

module.exports = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    deleteEntry,
    updateEntry
};