const express = require("express");

const product = require("./products")


const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("<center><h1>Home Page</h1></center>");
});

app.get("/product{/:id}", (req, res) => {
    let product_id = req.params.id
    let category = req.query.category
    let min_price = req.query.min_price
    let max_price = req.query.max_price
    let product_list = []


    //get product by product id
    if (product_id !== undefined) {
        product_list = product.getProductById(product_id)
    }

    //get product by category
    if (category !== undefined) {
        product_list = product.getProductByCategory(category)
    }

    //get product by min and max price
    if (min_price !== undefined && max_price !== undefined) {
        product_list = product.getProductByPriceRange(min_price, max_price)
    }

    if (product_id === undefined && category === undefined && min_price === undefined && max_price === undefined) {
        product_list = product.product_list
    }


    res.status(200).json({
            status: "success",
            data: product_list
        }
    )
});

app.post("/create-product", (req, res) => {
    let new_product = req.body
    console.log(new_product)
    res.send("product has been create")
})

app.put("/update-product", (req, res) => {
    let new_product = req.body
    console.log(new_product)
    res.send("product has been update")
})

app.delete("/delete-product", (req, res) => {
    let product_id = req.body
    console.log(product_id)
    res.send("product has been delete")
})




app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});