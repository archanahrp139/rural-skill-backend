const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Create DB
const db = new sqlite3.Database("./users.db");

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    skill TEXT,
    location TEXT,
    phone TEXT
  )
`);

// API 1: Add User
app.post("/add-user", (req, res) => {
    const { name, skill, location, phone } = req.body;

    db.run(
        "INSERT INTO users (name, skill, location, phone) VALUES (?, ?, ?, ?)",
        [name, skill, location, phone],
        function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            res.send({ message: "User added successfully" });
        }
    );
});

// API 2: Get Users
app.get("/users", (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(rows);
    });
});


// Start server
app.listen(process.env.PORT || 5000, () => {
    console.log("Server running....");
});