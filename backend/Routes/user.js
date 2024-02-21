const express = require('express')
const User = require('../models/user')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      phone: req.body.phone,
      usertype: req.body.usertype
    });

    User.findOne({ email: req.body.email }).then(user1 => {
      if (user1) {
        return res.status(401).json({
          message: "User Already Exist"
        })
      }

      user.save().then(result => {
        if (!result) {
          return res.status(500).json({
            message: "Error Creating User"
          })
        }
        const token = jwt.sign(
          { email: result.email, userId: result._id },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "User created!",
          result: result,
          token: token
        });
      })
    })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });;
  })

});


router.post("/login", (req, res, next) => {
  let fetchedUser;

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(401).json({
        // message: "Auth failed no such user"
        message: "Incorrect mail id / password. Please try again"
      })
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    // console.log(fetchedUser)
    if (!result) {
      return res.status(401).json({
        // message: "Auth failed inccorect password"
        message: "Incorrect mail id / password. Please try again"
      })
    }
    const token = jwt.sign(
      { email: fetchedUser.email, userId: fetchedUser._id },
      "secret_this_should_be_longer",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      expiresIn: "1h",
      userdata: fetchedUser
    });
  })
    .catch(e => {

      console.log(e)

    })
})
module.exports = router