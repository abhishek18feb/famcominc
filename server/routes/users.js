var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkauth = require('../middleware/check-auth.js')
const User = require('../models/UserModel');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next){
  console.log(req.body)

  User.find({email: req.body.email})
  .exec()
  .then(user =>{
      console.log(user);
      if(user.length<1){
          return res.status(401).json({
              message: 'Mail not found, User doesn\'t exist'
          });
      }else{
          bcrypt.compare(req.body.password, user[0].password, function(err, result) {
              if(err){
                  return res.status(401).json({
                      error:"Auth failed"
                  });
              }
              if(result){
                  const token = jwt.sign(
                  {
                      email: user[0].email,
                      userId: user[0]._id
                  },
                  "secret",
                  {
                    expiresIn: "1h"
                  }
                  );
                  return res.status(200).json({
                      message: 'Auth Successful',
                      token: token
                  });
              }
              return res.status(401).json({
                  error:"Auth failed"
              });
          });
      }
  })
  .catch(err=>{
      res.status(500).json({
          error: err
      });
  });
});

router.post('/signup', function(req, res, next){
  console.log(req.body)
  User.find({email:req.body.email})
  .exec()
  .then(user=>{
      if(user.length>=1){
          return res.status(409).json({
              message: "Mail Exists"
          });
      }else{
          bcrypt.hash(req.body.password, 10, function(err, hash) {
             if(err){
                 return res.status(500).json({
                      error: err
                 })
             }
             else{
                 const user = new User({
                                          _id: new mongoose.Types.ObjectId(),
                                          name: req.body.name,
                                          email: req.body.email,
                                          password: hash
                                      });
                  user.save()
                  .then(result => {
                      console.log(result)
                      res.status(201).json({
                          message: "User Created",
                          createdProduct: {
                              email: result.email,
                              password: result.password,
                              _id: result._id,
                              request: {
                                  type: 'GET',
                                  url: 'http://localhost:3000/users/'+result._id
                              }
                          }
                      });
                  })
                  .catch(err=>{
                              console.log(err)
                              res.status(500).json({
                                  error: err
                              });
                          });
             }
          });
      }
  });
});

router.get('/list', checkauth, function(req, res, next){

});
module.exports = router;
