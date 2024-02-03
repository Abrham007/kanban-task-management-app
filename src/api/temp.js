import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "tasks",
  password: "a1b2r3h4",
  port: 5432,
});
db.connect();

app.use(bodyParser.json({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

async function listUsers() {
  const users = await db.query("SELECT * FROM users ");
  return users.rows;
}

async function checkVisisted(id) {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE users_id = $1", [id]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return [countries];
}
app.get("/", async (req, res) => {
  const countries = await checkVisisted(currentUserId);
  const users = await listUsers();
  const currentUser = await db.query("SELECT * FROM users WHERE id = $1", [currentUserId]);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
    currentUser: currentUser.rows[0],
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  currentUserId = req.body.currentUserId;

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query("INSERT INTO visited_countries (country_code, users_id) VALUES ($1, $2)", [
        countryCode,
        currentUserId,
      ]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  if (req.body.user) {
    const id = req.body.user;
    currentUserId = id;
    res.redirect("/");
  } else if (req.body.add) {
    res.render("new.ejs");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  const name = req.body.name;
  const color = req.body.color;

  try {
    await db.query("INSERT INTO users (name, color) VALUES ($1, $2)", [name, color]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
