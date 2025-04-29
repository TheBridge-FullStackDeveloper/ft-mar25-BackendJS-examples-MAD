const supertest = require("supertest"); // Supertest
const server = require('../index'); // Server express
const request = supertest(server); // Launch server with supertest

afterAll(async () => {
    // Close the express server
    await server.close();
});

describe('Entries API', () => {
    let testEntry = {
        title: "Test Entry",
        content: "This is a test entry.",
        date: "2024-06-17",
        email: "test.author@example.com",
        category: "Test"
    };

    describe('GET /api/entries', () => {
        beforeAll(async () => {
            // Ensure the test author exists
            await request.post('/api/authors').send({
                name: "Test",
                surname: "Author",
                email: testEntry.email,
                image: "https://example.com/image.jpg"
            });
            // Create the test entry
            await request.post('/api/entries').send(testEntry);
        });

        afterAll(async () => {
            // Cleanup: Delete the test entry and author
            await request.delete('/api/entries').send({ title: testEntry.title });
            await request.delete('/api/authors').send({ email: testEntry.email });
        });

        test('should return all entries', async () => {
            const res = await request.get('/api/entries');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length > 0) {
                expect(res.body[0]).toHaveProperty('name');
                expect(res.body[0]).toHaveProperty('surname');
                expect(res.body[0]).toHaveProperty('email');
            }
        });

        test('should return entries by author email', async () => {
            const res = await request.get(`/api/entries/${testEntry.email}`);
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length > 0) {
                expect(res.body[0]).toHaveProperty('name', "Test");
                expect(res.body[0]).toHaveProperty('surname', "Author");
                expect(res.body[0]).toHaveProperty('email', testEntry.email);
            }
        });
    });

    describe('POST /api/entries', () => {
        afterAll(async () => {
            // Cleanup: Delete the test entry
            await request.delete('/api/entries').send({ title: testEntry.title });
        });

        test('should create a new entry', async () => {
            const res = await request.post('/api/entries').send(testEntry);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('items_created', 1);
        });

        test('should return 400 if required fields are missing', async () => {
            const incompleteEntry = { title: "Incomplete Entry" };
            const res = await request.post('/api/entries').send(incompleteEntry);
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('errors');
        });
    });

    describe('PUT /api/entries', () => {
        beforeAll(async () => {
            // Ensure the test entry exists
            await request.post('/api/entries').send(testEntry);
        });

        afterAll(async () => {
            // Cleanup: Delete the updated entry
            await request.delete('/api/entries').send({ title: "Updated Entry" });
        });

        test('should update an existing entry', async () => {
            const updatedEntry = { ...testEntry, title: "Updated Entry", old_title: testEntry.title };
            const res = await request.put('/api/entries').send(updatedEntry);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('items_updated', 1);
        });

        test('should return 400 if old_title is missing', async () => {
            const invalidUpdate = { ...testEntry, title: "Invalid Update" };
            const res = await request.put('/api/entries').send(invalidUpdate);
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('errors');
        });
    });

    describe('DELETE /api/entries', () => {
        beforeAll(async () => {
            // Ensure the test entry exists
            await request.post('/api/entries').send(testEntry);
        });

        test('should delete an entry by title', async () => {
            const res = await request.delete('/api/entries').send({ title: testEntry.title });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('items_deleted', 1);
        });

        test('should return 400 if title is missing', async () => {
            const res = await request.delete('/api/entries').send({});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('errors');
        });
    });
});
