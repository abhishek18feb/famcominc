var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkauth = require('../middleware/check-auth.js')
const Customer = require('../models/CustomerModel');
/* GET users listing. */
router.get('/', checkauth, function(req, res, next) {
  Customer.find()
  .select('name email mobile address _id')
  .exec()
  .then(result=>{
      const response = {
          count: result.length,
          customer: result.map(result=>{
              return {
                  name: result.name,
                  mobile: result.mobile,
                  email: result.email,
                  address: result.address,
                  _id: result._id,
                  request: {
                      type: 'GET',
                      url: 'http://localhost:3000/customer/'+result._id
                  }
              }
          })
      }
           res.status(200).json({
              message: 'Handling GET request to /customer',
              result: response
          });
  })
  .catch(err=>{
      res.status(500).json({
          error: err
      })
  });
});

router.get('/:id', checkauth, function(req, res, next){
  var id = req.params.id;
  console.log(id);
  Customer.findById({"_id":id})
  .select("name email mobile address _id")
  .exec()
  .then(doc =>{
      console.log(doc)
      if(doc){
          res.status(201).json({
              message: "Handling GET request to /customer/:id",
              customer: doc,
          });
      }else{
          res.status(404).json({
               message: "No valid entry found for this provided id",
          });
      }
  }).catch(err=>{ res.status(500).json({ error:err}); });
})

router.post('/', checkauth, function(req, res, next){
  console.log(req.body)
  console.log(req.userData);
  Customer.find({name: req.body.name, mobile: req.body.mobile})
  .exec()
  .then(customer=>{
      if(customer.length>=1){
          return res.status(409).json({
              message: "You have already added this customer"
          });
      }else{
        const customer = new Customer({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address
        });
        customer.save().then(result => {
            console.log(result)
            res.status(201).json({
                message: "Handling POST request to /products",
                createdBranch: {
                    name: result.name,
                    email: result.email,
                    mobile: result.mobile,
                    address: result.address,
                    _id: result._id
                }
            });
        }).catch(err=>{
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
      }
  });
});

router.patch('/:id', checkauth, function(req, res, next){
  const id = req.params.id;
  console.log(id)
  console.log(req.body)
  Customer.update({"_id":id}, {$set: req.body})
  .exec()
  .then(doc=>{
      res.status(200).json({
          message: "Customer with "+id+" updated",
      })
  })
  .catch(err=>{
      res.status(500).json({
          message: "There was an error in updating the product",
          error: err
      })
  });
});

router.delete('/:id', checkauth, function(req, res, next){
  const id = req.params.id;
  console.log(id);
  Customer.remove({_id: id})
  .exec()
  .then(result=>{
      res.status(200).json({
          message: 'Customer Deleted Successfully',
      });
  })
  .catch(err=>{
      res.status(500).json({
          error: err
      });
  });
});



module.exports = router;
