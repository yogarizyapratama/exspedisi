const request = require("supertest");
const app = require("./app");

// TESTING AUTH ENDPOINT
describe("POST /auth/register", () => {
  describe("given msisdn, name, username, and password", () => {
    test("should respond with 201 status code", async () => {
      const response = await request(app).post("/auth/register").send({
        msisdn: "82233445567",
        username: "test username 01",
        name: "test",
        password: "test123",
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("akun berhasil dibuat");
    });
  });
});

let jwtToken;

describe("POST /auth/login", () => {
  describe("given msisdn and password", () => {
    test("should respond with 200 status code and jwt", async () => {
      const response = await request(app).post("/auth/login").send({
        msisdn: "82233445567",
        password: "test123",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("jwt");

      jwtToken = response.body.jwt;
    });
  });
});

describe("GET /auth/user", () => {
  describe("given jwt", () => {
    test("should respond with 200 status code and return user data", async () => {
      const response = await request(app)
        .get("/auth/user")
        .set("Authorization", `Bearer ${jwtToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
    });
  });
});

// TESTNG LOGISTIK ENDPOINT
describe("POST /logistik/kurir-rate", () => {
  describe("given a new data with value logistic_name, amount, destination_name, origin_name, duration", () => {
    test("should respond with 201 status code and ", async () => {
      const response = await request(app)
        .post("/logistik/kurir-rate")
        .send({
          logistic_name: "JNE",
          amount: "10000",
          destination_name: "JAKARTA",
          origin_name: "BANDUNG",
          duration: "2-4",
        })
        .set("Authorization", `Bearer ${jwtToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("data logistik berhasil di tambahkan");
    });
  });
});

describe("GET /logistik/kurir-rate", () => {
  describe("given jwt", () => {
    test("should respond with 200 status code and return logistik data", async () => {
      const response = await request(app)
        .get("/logistik/kurir-rate")
        .set("Authorization", `Bearer ${jwtToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
    });
  });
});

describe("GET /logistik/kurir-rate/params?destination_name=STRING&origin_name=STRING", () => {
  describe("given jwt and query parameters", () => {
    test("should respond with 200 status code and return logistik data", async () => {
      const response = await request(app)
        .get(
          "/logistik/kurir-rate/params?destination_name=JAKARTA&origin_name=BANDUNG"
        )
        .set("Authorization", `Bearer ${jwtToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
    });
  });
});
