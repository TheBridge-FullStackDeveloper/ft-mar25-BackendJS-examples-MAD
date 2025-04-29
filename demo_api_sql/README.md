# Demo API with Express and PostgreSQL

This project is a demonstration of a RESTful API built using **Node.js**, **Express**, and **PostgreSQL**. It includes CRUD operations for managing `authors` and `entries`, with full validation, database seeding, and comprehensive testing.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for creating RESTful APIs.
- **PostgreSQL**: Relational database for storing data.
- **pg**: PostgreSQL client for Node.js.
- **express-validator**: Middleware for validating and sanitizing requests.
- **Jest**: Testing framework for unit and integration tests.
- **Supertest**: HTTP assertions for testing API endpoints.
- **Morgan**: HTTP request logger middleware.
- **Nodemon**: Development tool for automatically restarting the server.

---

## Project Structure

```
demo_api_sql/
├── controllers/       # Business logic for handling requests
│   ├── authors.controller.js
│   ├── entries.controller.js
├── middlewares/       # Middleware for request handling
│   ├── error404.js
│   ├── handleValidation.js
│   ├── morgan.js
├── models/            # Database interaction logic
│   ├── authors.model.js
│   ├── entries.model.js
├── queries/           # SQL queries for database operations
│   ├── author.queries.js
│   ├── entry.queries.js
├── routes/            # API route definitions
│   ├── authors.routes.js
│   ├── entries.routes.js
├── validations/       # Validation rules for API requests
│   ├── authors.validation.js
│   ├── entries.validation.js
├── __test__/          # Test files for API endpoints
│   ├── authors.test.js
│   ├── entries.test.js
├── config/            # Configuration files
│   ├── db_pgsql.js
├── index.js           # Entry point of the application
├── package.json       # Project metadata and dependencies
├── queries.sql        # SQL script for database setup
├── seeder.js          # Script to seed the database
├── .env.example       # Example environment variables
└── README.md          # Documentation
```

---

## Installation and Setup

### Prerequisites

- **Node.js** (v16 or higher)
- **PostgreSQL** (v13 or higher)

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd demo_api_sql
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the PostgreSQL database:
   - Create a database named `postgres`.
   - Run the SQL script in `queries.sql` to create the required tables and insert sample data:
     ```bash
     psql -U <username> -d postgres -f queries.sql
     ```

4. Seed the database with sample data:
   ```bash
   node seeder.js
   ```

5. Start the server:
   - For development (with auto-restart):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

6. The server will run at `http://localhost:3000`.

---

## API Endpoints

### Authors

#### 1. Get All Authors or a Specific Author by Email
- **GET** `/api/authors/:email?`
- **Description**: Fetch all authors or a specific author by email.
- **Example Request**:
  - Fetch all authors:
    ```bash
    curl http://localhost:3000/api/authors
    ```
  - Fetch a specific author:
    ```bash
    curl http://localhost:3000/api/authors/alejandru@thebridgeschool.es
    ```

#### 2. Create a New Author
- **POST** `/api/authors`
- **Description**: Add a new author.
- **Request Body**:
  ```json
  {
    "name": "John",
    "surname": "Doe",
    "email": "john.doe@example.com",
    "image": "https://example.com/image.jpg"
  }
  ```

#### 3. Update an Author
- **PUT** `/api/authors`
- **Description**: Update an existing author.
- **Request Body**:
  ```json
  {
    "name": "John Updated",
    "surname": "Doe Updated",
    "email": "john.doe@example.com",
    "image": "https://example.com/new-image.jpg",
    "old_email": "john.doe@example.com"
  }
  ```

#### 4. Delete an Author
- **DELETE** `/api/authors`
- **Description**: Delete an author by email.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com"
  }
  ```

---

### Entries

#### 1. Get All Entries or Entries by Email
- **GET** `/api/entries`
- **Description**: Fetch all entries or entries by author email.
- **Example Request**:
  - Fetch all entries:
    ```bash
    curl http://localhost:3000/api/entries
    ```
  - Fetch entries by email:
    ```bash
    curl http://localhost:3000/api/entries?email=alejandru@thebridgeschool.es
    ```

#### 2. Create a New Entry
- **POST** `/api/entries`
- **Description**: Add a new entry.
- **Request Body**:
  ```json
  {
    "title": "New Entry Title",
    "content": "This is the content of the new entry.",
    "email": "alejandru@thebridgeschool.es",
    "category": "News"
  }
  ```

#### 3. Update an Entry
- **PUT** `/api/entries`
- **Description**: Update an existing entry.
- **Request Body**:
  ```json
  {
    "title": "Updated Entry Title",
    "content": "Updated content.",
    "date": "2024-06-17",
    "email": "alejandru@thebridgeschool.es",
    "category": "Updated Category",
    "old_title": "Old Entry Title"
  }
  ```

#### 4. Delete an Entry
- **DELETE** `/api/entries`
- **Description**: Delete an entry by title.
- **Request Body**:
  ```json
  {
    "title": "Entry Title to Delete"
  }
  ```

---

## Database Seeding

The `seeder.js` script is used to populate the database with sample data. It performs the following actions:
1. Drops existing `authors` and `entries` tables.
2. Creates new `authors` and `entries` tables.
3. Inserts sample data into both tables.

To run the seeder:
```bash
node seeder.js
```

---

## Testing

This project includes a full test suite for the `authors` and `entries` APIs using **Jest** and **Supertest**.

### Test Structure

- Tests are organized using a **BDD (Behavior-Driven Development)** approach.
- Each endpoint has its own `describe` block with at least two tests:
  - A success case.
  - An edge case (e.g., missing required fields).

### Running Tests

1. Run the tests:
   ```bash
   npm test
   ```

2. The test suite includes:
   - CRUD operations for `authors`.
   - CRUD operations for `entries`.
