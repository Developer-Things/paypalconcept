const express = require('express');
const paypal = require('paypal-rest-sdk');
var app = express()

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id':"AYFHPq6iRpKLUR9crhFZBh97QWd3_GtgOKWLwLAO-4KOdYM4CArqd5wsjyT3_5WTU123Z4btoCWild48"
    // "AWCsU8bbK1WNn9XDa8Vd8hQfSJWyq5VsW_Wlu8InEKIlfK_9YDcg-7rewuONXfyT2nCofSrs_AX10RUp"
    ,'client_secret':"EL9L8zszbZyzV5Z3k38rhmVTeoSadpyJuyHWMPsS4LuHogCFaw8dK25gp-EISaBVG-Joo5ZzV0xyhHU4"
    // "EEfDpykhVxisFenPeWZQ0sKIO8QaLnzeDJ6JtZhvuN7eOkBZFbbJYEYLDjcVAHKpwf1ofulN1GCfXIAv"
});


app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

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
                  "price": "1.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "1.00"
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
              "total": "1.00"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, 
        function (error, payment) {
      if (error) {
          console.log(error.response);
          console.log('err')
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          console.log('success' )
          res.send('Success');
      }
  });
  });


  app.get('/cancel', (req, res) => res.send('Cancelled'));


app.listen(4000, () => console.log('server started'))

// Email ID:
// sb-blgl478597960@business.example.com
// System Generated Password:
// Task@123


// Email ID:
// sb-lkt1m14682189@business.example.com
// System Generated Password:
// H{[=%q?1


