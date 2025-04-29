const pool = require('./config/db_pgsql'); // Use centralized DB config

const seedDatabase = async () => {
    const client = await pool.connect();
    try {
        console.log("Seeding database...");

        // Drop existing tables
        await client.query('DROP TABLE IF EXISTS entries;');
        await client.query('DROP TABLE IF EXISTS authors;');

        // Create authors table
        const createAuthorsTable = `
            CREATE TABLE authors (
                id_author serial NOT NULL PRIMARY KEY, 
                name varchar(45) NOT NULL, 
                surname varchar(45) NOT NULL, 
                email varchar(100) NOT NULL UNIQUE,
                image varchar(255)
            );
        `;
        await client.query(createAuthorsTable);

        // Create entries table
        const createEntriesTable = `
            CREATE TABLE entries (
                id_entry serial NOT NULL PRIMARY KEY, 
                title varchar(100) NOT NULL UNIQUE, 
                content text NOT NULL, 
                date date DEFAULT CURRENT_DATE,
                id_author int,
                category varchar(50),
                FOREIGN KEY (id_author) REFERENCES authors(id_author)
            );
        `;
        await client.query(createEntriesTable);

        // Insert authors
        const authorsQuery = `
            INSERT INTO authors (name, surname, email, image)
            VALUES 
                ('Alejandru', 'Regex', 'alejandru@thebridgeschool.es', 'https://randomuser.me/api/portraits/thumb/men/75.jpg'),
                ('Birja', 'Rivera', 'birja@thebridgeschool.es', 'https://randomuser.me/api/portraits/thumb/men/60.jpg'),
                ('Alvaru', 'Riveru', 'alvaru@thebridgeschool.es', 'https://randomuser.me/api/portraits/thumb/men/45.jpg'),
                ('Muchelle', 'Wuallus', 'muchelle@thebridgeschool.es', 'https://randomuser.me/api/portraits/thumb/women/72.jpg'),
                ('Albertu', 'Henriques', 'albertu@thebridgeschool.es', 'https://randomuser.me/api/portraits/thumb/men/33.jpg'),
                ('Guillermu', 'Develaweyer', 'guillermu@thebridgeschool.es', 'https://randomuser.me/api/portraits/thumb/men/34.jpg'),
                ('Jabier', 'Hespinoza', 'jabier@thebridgeschool.es', 'https://randomuser.me/api/portraits/thumb/men/35.jpg');
        `;
        await client.query(authorsQuery);

        // Insert entries
        const entriesQuery = `
            INSERT INTO entries (title, content, id_author, category)
            VALUES 
                ('Noticia: SOL en Madrid', 'Contenido noticia 1', (SELECT id_author FROM authors WHERE email='alejandru@thebridgeschool.es'), 'Tiempo'),
                ('Noticia: Un panda suelto por la ciudad', 'El panda se comió todas las frutas de una tienda', (SELECT id_author FROM authors WHERE email='birja@thebridgeschool.es'), 'Sucesos'),
                ('El rayo gana la champions', 'Victoria por goleada en la final de la champions', (SELECT id_author FROM authors WHERE email='albertu@thebridgeschool.es'), 'Deportes'),
                ('Amanece Madrid lleno de arena', 'La calima satura Madrid de arena. Pérdidas millonarias', (SELECT id_author FROM authors WHERE email='birja@thebridgeschool.es'), 'Sucesos'),
                ('Descubren el motor de agua', 'Fin de la gasolina. A partir de ahora usaremos agua en nuestros coches', (SELECT id_author FROM authors WHERE email='alvaru@thebridgeschool.es'), 'Ciencia');
        `;
        await client.query(entriesQuery);

        console.log("Database seeded successfully!");
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        client.release();
        pool.end();
    }
};

seedDatabase();
