const express = require('express');
const paypal = require('paypal-rest-sdk');
var app = express()

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id':"AY1NKy8yFiCRi0iL8S81TyLE6lo9PBo7XRBDKQHnHD4t3Skp4q_nZ0rlr6nPDxr7_nUvRBjF0BuUyPfg"
    // "AWCsU8bbK1WNn9XDa8Vd8hQfSJWyq5VsW_Wlu8InEKIlfK_9YDcg-7rewuONXfyT2nCofSrs_AX10RUp"
      ,'client_secret':"EIvfRO-QJuphMHrfDbZZdZesZLqnSXw2oQOyIRKB9FRF075yfoabmLyWnqx8A8ZuLB0CRqLwT995qbMW"
    // "EEfDpykhVxisFenPeWZQ0sKIO8QaLnzeDJ6JtZhvuN7eOkBZFbbJYEYLDjcVAHKpwf1ofulN1GCfXIAv"
});

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Hat for the best team ever"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});

app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "25.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});
});

app.get('/cancel', (req, res) => res.send('Cancelled'));

app.listen(3000, () => console.log('Server Started'));

// Email ID:
// sb-blgl478597960@business.example.com
// System Generated Password:
// Task@123


// Email ID:
// sb-lkt1m14682189@business.example.com
// System Generated Password:
// H{[=%q?1


             
//project1 admin
 email=>sb-4z6s115244293@business.example.com
password=>5(*sH$^k
Client ID=>AY1NKy8yFiCRi0iL8S81TyLE6lo9PBo7XRBDKQHnHD4t3Skp4q_nZ0rlr6nPDxr7_nUvRBjF0BuUyPfg
secretid=>EIvfRO-QJuphMHrfDbZZdZesZLqnSXw2oQOyIRKB9FRF075yfoabmLyWnqx8A8ZuLB0CRqLwT995qbMW
             

            
