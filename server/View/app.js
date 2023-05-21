const mysql = require("mysql")
const express = require("express")
const dotenv = require('dotenv').config();
const cors = require('cors')
const { PORT } = process.env;
const helmet = require('helmet')
const bodyParser = require('body-parser')
const app = express();
const config = require('../Model/config');
const createCustomer = require("../Controller/paymentController");
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(helmet())
app.use(bodyParser())
app.listen(PORT, () => {
    console.log("Server is Started on port %s ", PORT);
})
app.get("/", (request, response) => {
    console.log("Home Route s");
})
app.get("/failed", (request, response) => {
    console.log("Payment Failed");
    response.json({ message: "Payment Failed" }).status(500)
})
app.get("/success", (request, response) => {
    console.log("Payment Successfully Completed");
    response.json({ message: "Payment Success" }).status(202)
})
app.post("/payment", createCustomer)