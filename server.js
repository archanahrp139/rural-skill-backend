const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// Dummy users API
app.get("/users", (req, res) => {
    res.json([
        { name: "Test User", skill: "Demo", location: "India" }
    ]);
});

// Dummy add user
app.post("/add-user", (req, res) => {
    res.json({ message: "User added (dummy)" });
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running...");
});