const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello Express.js!");
});

app.get("/about", (req, res) => {
    res.send("<center><h1>Hello from about page</h1></center>");
});

app.get("/contact", (req, res) => {
    res.send("<center><h1>Hello from contact page</h1></center>");
});



app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});