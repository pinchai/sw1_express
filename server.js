const express = require("express");
const mysql = require("mysql2/promise");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

const app = express();
app.use(express.json());

app.use("/api/v1", productRoutes);
app.use("/api/auth", authRoutes);

// 404 - Not Found
app.use((req, res) => {
    const filePath = path.join(__dirname, "public", "404.html");
    res.sendFile(filePath);
});

// 500 - Global Error Handler
app.use((err, req, res, next) => {
    const filePath = path.join(__dirname, "public", "500.html");
    res.sendFile(filePath);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});