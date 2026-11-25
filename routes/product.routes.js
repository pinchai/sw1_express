const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const authenticate = require("../middleware/auth.middleware");

router.get("/product{/:id}", async (req, res) => {
    let product_id = req.params.id
    let category = req.query.category
    let min_price = req.query.min_price
    let max_price = req.query.max_price
    let product_list = []


    //get product by product id
    if (product_id !== undefined) {
        try {
            const [rows] = await pool.query(
                `SELECT *
                 FROM product
                 WHERE id = ?`,
                [product_id]
            );

            res.status(200).json(rows);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Database error"
            });
        }
    }


    //get product by min and max price
    if (min_price !== undefined && max_price !== undefined) {
        try {
            const [rows] = await pool.query(
                `SELECT *
                 FROM product
                 WHERE price BETWEEN ? and ?`,
                [min_price, max_price]
            );

            res.status(200).json(rows);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Database error"
            });
        }
    }

    if (
        product_id === undefined
        && category === undefined
        && min_price === undefined
        && max_price === undefined) {

        try {
            const [rows] = await pool.query(
                "SELECT * FROM product"
            );

            res.status(200).json(rows);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Database error"
            });
        }
    }


    res.status(200).json({
            status: "success",
            data: product_list
        }
    )
});

router.post("/create-product", authenticate, async (req, res) => {
    let form = req.body
    const [result] = await pool.query(
        "INSERT INTO product (name, cost, price) VALUES (?, ?, ?)",
        [form.name, form.cost, form.price]
    );

    res.status(201).json({
        id: result.insertId,
        name: form.name,
        cost: form.cost,
        price: form.price
    });
})

router.put("/update-product", async (req, res) => {
    let form = req.body

    const [result] = await pool.query(
        "UPDATE product set `name` = ?, cost = ?, price = ? WHERE id = ?",
        [form.name, form.cost, form.price, form.id]
    );

    res.status(201).json({
        id: form.id,
        name: form.name,
        cost: form.cost,
        price: form.price
    });
})

router.delete("/delete-product", async (req, res) => {
    let form = req.body
    console.log(form)
    const [result] = await pool.query(
        "DELETE FROM product WHERE id = ?",
        [form.id]
    );

    res.status(201).json({
        "status": `product has been delete success Rows: ${result.affectedRows}`,
    });
})

module.exports = router;