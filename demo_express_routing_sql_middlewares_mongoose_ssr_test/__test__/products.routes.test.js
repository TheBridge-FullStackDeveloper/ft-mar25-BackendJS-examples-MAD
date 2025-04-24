// Supertest
const supertest = require("supertest");
// Server express
const server = require("../index");
// Conexión mongo. Lanza la BBDD
const mongoose = require("../config/db_mongo");
// Lanzar server con supertest --> npm start
const request = supertest(server);

// beforeEach
// afterEach
// beforeAll
// afterAll

afterAll(async () => {
  // Cierra el servidor express
  await server.close();
  // Cierra conexión de mongoose
  await mongoose.connection.close();
});

it("Probando JEST", () => {
  expect(1).toBe(1);
});

describe("GET all products", () => {
  it("GET test /api/products should return 200", async () => {
    await request.get("/api/products").expect(200);
  });

  it("GET test /api/products should return an array", async () => {
    const response = await request.get("/api/products").expect(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

describe("GET one product", () => {
  it("dame un producto en concreto", async () => {
    const response = await request.get("/api/products/1").expect(200);
    //expect(response.body).not.toEqual([]);
    expect(response.body.length).toBe(1);
  });

  it("dame un producto que no exista", async () => {
    const response = await request
      .get("/api/products/-1") // Devuelve {}?
      .expect(200);
    // 3 Maneras de hacer lo mismo
    expect(response.body).toEqual([]);
    expect(response.res.text).toBe("[]");
    expect(response.body).toEqual(expect.objectContaining([]));
  });
});

describe("POST one product", () => {
    it("Se envia un producto y se espera que se guarde", (done) => {
      request
        .post("/api/products")
        .send({
          id:9,
          title: "Cervezas Miércoles TB "+Math.random(),
          price: 10,
          description: "Vente de tarde y conoce a DS,FS,CYB,DevOps,UXUI,MKT",
          image: "https://i.pravatar.jpg",
          companyName: "La casa de las flores",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
    it("Falla al enviar un producto vacio", (done) => {
      request
        .post("/api/products")
        .send({})
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
    it("Falla al enviar un producto con un campo vacio", (done) => {   
      request
        .post("/api/products")
        .send({
          title: "Cervezas Viernes TB",
          price: 0,
          description: "",
          image: "https://i.pravatar.jpg",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    })

    it("Falla al enviar un producto con tipo de datos incorrectos", (done) => { 
        request
            .post("/api/products")
            .send({
            title: 1,
            price: "0",
            description: 0,
            image: 0,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err, res) => {
            if (err) return done(err);
            return done();
            });
        }); 
    
});
