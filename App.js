const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.post("/bfhl", (req, res) => {
    try {
        if (!req.body || !req.body.data || !Array.isArray(req.body.data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        let numbers = [];
        let alphabets = [];

        req.body.data.forEach(item => {
            if (!isNaN(item)) numbers.push(item);
            else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) alphabets.push(item);
        });

        let highest_alphabet = alphabets.length > 0 ? [alphabets.sort().slice(-1)[0]] : [];

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
