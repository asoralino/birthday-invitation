const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
console.log("Bot Token:", process.env.TELEGRAM_BOT_TOKEN); // Debugging
console.log("Chat ID:", process.env.CHAT_ID); // Debugging
const app = express();
app.use(express.json());
app.use(cors());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/sendMessage", async (req, res) => {
    const { name, attendance } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const message = `🎉 ទិន្នន័យអ្នកចូលរួមនិងមិនចូលរួមn 🎉\n\n📌 ឈ្មោះ: ${name}\n📍 ចម្លើយ: ${attendance}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        const response = await axios.post(url, {
            chat_id: CHAT_ID,
            text: message,
        });
        res.json({ success: true, response: response.data });
    } catch (error) {
        console.error("Telegram API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to send message" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
