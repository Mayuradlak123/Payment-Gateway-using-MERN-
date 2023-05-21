const dotenv = require('dotenv').config()
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(helmet());
const { STRIPE_SECRET_KEY } = process.env
const configureStripe = require('stripe');
const stripe = configureStripe(STRIPE_SECRET_KEY);

const postStripeCharge = (res) => (stripeErr, stripeRes) => {
    if (stripeErr) {
        res.status(500).json({ error: stripeErr })
        console.log(stripeErr);
    } else {
        res.status(200).json({ success: stripeRes })
    }
}
const createCustomer = (req, res) => {
    stripe.customers.create({
            email: "mayuradlak030@gmail.com",
            source: req.body.body.source,
            name: 'Gourav Hammad',
            address: {
                line1: 'TC 9/4 Old MES colony',
                postal_code: '452331',
                city: 'Indore',
                state: 'Madhya Pradesh',
                country: 'India',
            },
        })
        .then(async(customer) => {
            console.log("This is Customer Id : " + customer);
            const paymentMethods = await stripe.paymentMethods.list({
                customer: customer.id,
                type: 'card',
            });
            stripe.charges.create({
                amount: 2500, // Charging Rs 25
                description: 'Web Development Product',
                currency: 'INR',
                payment_method: 'pm_card_visa',
                customer: customer.id
            });
            console.log("Payment Successfully Completed ");;
        })
        .then((charge) => {
            res.json({ message: "Payment Successfully Completed " }).status(202)
                // If no error occurs
            console.log("Payment Successfully Completed 0", { message: charge });
        })
        .catch((err) => {

            res.json({ message: "Payment Failed " }).status(500)
        });
}
const paymentController = async(request, response) => {
    try {
        stripe.charges.create(request.body, postStripeCharge(response));
        console.log(request.body);
    } catch (err) {
        console.log("Payment Failed ");
        response.json({ error: err })
    }
}
module.exports = createCustomer;