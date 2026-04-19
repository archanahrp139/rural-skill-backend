const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); // allow all origins
app.use(express.json());

// In-memory database
let users = [
    { name: "Test User", skill: "Demo", location: "India" }
];

// ✅ GET all users
app.get("/users", (req, res) => {
    res.json(users);
});

// ✅ ADD new user
app.post("/add-user", (req, res) => {
    const newUser = req.body;

    // basic validation (optional but good)
    if (!newUser.name || !newUser.skill || !newUser.location) {
        return res.status(400).json({ message: "Missing fields" });
    }

    users.push(newUser);

    res.json({
        message: "User added successfully",
        user: newUser
    });
});

// ✅ PORT FIX (important for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});