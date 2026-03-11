require("dotenv").config()
require("./db")

const express = require("express")
const cors = require("cors")
const db = require("./db")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/health", (req, res) => {
    res.json({ status: "ok" })
})

app.post("/products", async (req, res) => {

    const { name, brand, category, price, image, description, attributes } = req.body

    const result = await db.run(
        "INSERT INTO products (name, brand, category, price, image, description, attributes) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, brand, category, price, image, description, JSON.stringify(attributes)]
    )

    res.json({
        id: result.lastID
    })

})

app.get("/products", async (req, res) => {

    const products = await db.all(
        "SELECT * FROM products"
    )

    res.json(products)

})

app.get("/product/:id", async (req, res) => {

    const product = await db.get(
        "SELECT * FROM products WHERE id = ?",
        [req.params.id]
    )

    res.json(product)

})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log("Servidor rodando em http://localhost:" + PORT)
})