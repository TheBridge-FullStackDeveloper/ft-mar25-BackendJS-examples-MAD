const pool = require('../config/db_pgsql'); // Use centralized DB config
const authorQueries = require('../queries/author.queries'); // Import queries

// GET all authors
const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(authorQueries.getAllAuthors); // Use external query
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// GET author by email
const getAuthorByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(authorQueries.getAuthorByEmail, [email]); // Use external query
        result = data.rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// CREATE author
const createAuthor = async (author) => {
    const { name, surname, email, image } = author;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(authorQueries.createAuthor, [name, surname, email, image]); // Use external query
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// UPDATE author
const updateAuthor = async (author) => {
    const { name, surname, email, image, old_email } = author;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(authorQueries.updateAuthor, [name, surname, email, image, old_email]); // Use external query
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// DELETE author
const deleteAuthor = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(authorQueries.deleteAuthor, [email]); // Use external query
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
    getAllAuthors,
    getAuthorByEmail,
    createAuthor,
    updateAuthor,
    deleteAuthor
};
