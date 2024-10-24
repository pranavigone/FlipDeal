const express = require('express');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

// Server-side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1

app.get('/cart-total', (req, res) => {
  var newItemPrice = parseFloat(req.query.newItemPrice);
  var cartTotal = parseFloat(req.query.cartTotal);
  var sum = newItemPrice + cartTotal;
  res.send(sum.toString());
});

app.get('/membership-discount', (req, res) => {
  var cartTotal = parseFloat(req.query.cartTotal);
  var isMember = req.query.isMember;

  if (isMember) {
    const discount = (cartTotal * discountPercentage) / 100;
    cartTotal -= discount;
    res.send(cartTotal.toString());
  } else {
    res.send('No discount is applied');
  }
});

app.get('/calculate-tax', (req, res) => {
  var cartTotal = parseFloat(req.query.cartTotal);
  var totalTax = (cartTotal * taxRate) / 100;
  res.send(totalTax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  var shippingMethod = req.query.shippingMethod;
  var distance = parseFloat(req.query.distance);
  var delivery;

  if (shippingMethod === 'standard') {
    delivery = distance / 50;
  } else if (shippingMethod === 'express') {
    delivery = distance / 100;
  }
  res.send(delivery.toString());
});

app.get('/shipping-cost', (req, res) => {
  var weight = parseFloat(req.query.weight);
  var distance = parseFloat(req.query.distance);
  var cost = weight * distance * 0.1;
  res.send(cost.toString());
});

app.get('/loyalty-points', (req, res) => {
  var purchaseAmount = parseFloat(req.query.purchaseAmount);
  var totalPoints = purchaseAmount * 2;
  res.send(totalPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
