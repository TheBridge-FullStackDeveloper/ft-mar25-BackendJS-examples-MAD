const supertest = require("supertest"); // Supertest
const server = require('../index'); // Server express
const request = supertest(server); // Launch server with supertest

afterAll(async () => {
    // Close the express server
    await server.close();
});

describe('Authors API', () => {
    let testAuthor = {
        name: "Test",
        surname: "Author",
        email: "test.author@example.com",
        image: "https://example.com/image.jpg"
    };

    describe('GET /api/authors', () => {
        beforeAll(async () => {
            // Ensure the test author exists
            await request.post('/api/authors').send(testAuthor);
        });

        afterAll(async () => {
            // Cleanup: Delete the test author
            await request.delete('/api/authors').send({ email: testAuthor.email });
        });

        test('should return all authors', async () => {
            const res = await request.get('/api/authors');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length > 0) {
                expect(res.body[0]).toHaveProperty('name');
                expect(res.body[0]).toHaveProperty('surname');
                expect(res.body[0]).toHaveProperty('email');
            }
        });

        test('should return a specific author by email', async () => {
            const res = await request.get(`/api/authors/${testAuthor.email}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('name', "Test");
            expect(res.body).toHaveProperty('surname', "Author");
            expect(res.body).toHaveProperty('email', testAuthor.email);
        });
    });

    describe('POST /api/authors', () => {
        afterAll(async () => {
            // Cleanup: Delete the test author
            await request.delete('/api/authors').send({ email: testAuthor.email });
        });

        test('should create a new author', async () => {
            const res = await request.post('/api/authors').send(testAuthor);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('items_created', 1);
        });

        test('should return 400 if required fields are missing', async () => {
            const incompleteAuthor = { name: "Incomplete" };
            const res = await request.post('/api/authors').send(incompleteAuthor);
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('errors');
        });
    });

    describe('PUT /api/authors', () => {
        beforeAll(async () => {
            // Ensure the test author exists
            await request.post('/api/authors').send(testAuthor);
        });

        afterAll(async () => {
            // Cleanup: Delete the test author
            await request.delete('/api/authors').send({ email: "updated.author@example.com" });
        });

        test('should update an existing author', async () => {
            const updatedAuthor = { ...testAuthor, name: "Updated", email: "updated.author@example.com", old_email: testAuthor.email };
            const res = await request.put('/api/authors').send(updatedAuthor);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('items_updated', 1);
        });

        test('should return 400 if old_email is missing', async () => {
            const invalidUpdate = { ...testAuthor, name: "Invalid Update" };
            const res = await request.put('/api/authors').send(invalidUpdate);
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('errors');
        });
    });

    describe('DELETE /api/authors', () => {
        beforeAll(async () => {
            // Ensure the test author exists
            await request.post('/api/authors').send(testAuthor);
        });

        test('should delete an author by email', async () => {
            const res = await request.delete('/api/authors').send({ email: testAuthor.email });
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('items_deleted', 1);
        });

        test('should return 400 if email is missing', async () => {
            const res = await request.delete('/api/authors').send({});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('errors');
        });
    });
});
