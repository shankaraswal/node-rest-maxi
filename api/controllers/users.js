const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


//post controller for user registraion/signup
exports.userSignup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => { 
      if (user.length >= 1) {
        return res.status(409).json({
          msg: 'user email already created'
        })
      } else { 
        bcrypt.hash(req.body.password, 10, (err, hash) => { 
          if (err) {
            return res.status(500).json({
              msg: 'got error'
            })
          } else { 
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user.save()
              .then(result => {
                console.log(user);
                res.status(200).json({
                  msg: 'user created'
                })
              })
              .catch(err => { 
                console.log(err);
                res.status(500).json({
                  msg:'got an arror'
                })
              });
          }
        })
      }
    })
    .catch()
}

exports.userList = (req, res) => {
  User.find()
    .select('email')
    .then(users => { 
      res.status(200).json({
        users:users
      })
    }).catch(err => { 
      res.status(200).json({
        error:err
      })
    });
}

exports.userDelete = (req, res, next) => { 
  console.log(req.params.userid)
  User.remove({_id: req.params.userid })
    .then(data => { 
      res.status(200).json({
        msg: "user deleted successfully",
        data:data
      })
    })
    .catch(err => { 
      res.status(500).json({
        error: "Not able to delte this user",
        err:err
      })
    })

}

exports.userLogin = (req, res, next) => { 
  User.find({ email: req.body.email })
    .exec()
    .then(user => { 
      //if user does not exist
      if (user.length < 1) {
        res.status(404).json({
          msg: 'user/email does not found'
        });
      }
      //if user exist
      else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          //
          if (err) {
            return res.status(400).json({
              msg: 'login failed'
            })
          }
          else if (result) {
            const token = jwt.sign({
              email: user[0].email,
              userid: user[0]._id
            },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              },
            );

            return res.status(200).json({
              msg: 'login successful',
              token:token
            })
          }
          else {
            res.status(401).json({
              msg: 'login failed outer'
            })
          }
        })
    }


    })
    .catch(err => { 
      res.status(500).json({
        error: "Error in login",
        err:err
      })
    })
}

