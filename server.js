const express = require("express");
const path = require("path");
const product = require("./products")


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "public", "home.html");
    res.sendFile(filePath);
});
app.get("/api/products", (req, res) => {
    res.status(200).json(product.product_list);
});
app.get("/api/product/:id", (req, res) => {

    let product_id = req.params.id;
    let product_list = []
    //get product by product id
    if (product_id !== undefined) {
        product_list = product.getProductById(product_id)
    }
    res.status(200).json(product_list);
});
app.post("/api/products", (req, res) => {
    let product = req.body;

    res.status(200).json({
        status: "product has been create successfully",
        product: product
    });
})
app.put("/api/product/:id", (req, res) => {
    let product_id = req.params.id;

    let product_list = []
    //get product by product id
    if (product_id !== undefined) {
        product_list = product.getProductById(product_id)
    }

    res.status(200).json({
        status: "product has been update successfully",
        product: product_list
    });
})
app.delete("/api/product/:id", (req, res) => {
    let product_id = req.params.id;

    let product_list = []
    //get product by product id
    if (product_id !== undefined) {
        product_list = product.getProductById(product_id)
    }

    res.status(200).json({
        status: "product has been delete successfully",
        product: product_list
    });
})


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});