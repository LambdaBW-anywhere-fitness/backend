const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/userModel');

const router = express.Router();

//register (POST) --> for endpoint beginning --> endpoint with /api/auth
router.post('/register', (req, res) => {
  //add here
  const newUser = req.body;

  //create the hash for 'password' using bcrypt
  const hash = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hash;

  Users.addUser(newUser)
    .then(user => {
      console.log('inside authRouter addUser', user);
      res.status(200).json(user);
    })
    .catch(error => {
      console.log('inside authRouter error', error);
      res.status(500).json({ message: 'Sorry, no new user created on the server', error });
    });
});

//login (POST) --> for endpoint beginning --> endpoing with /api/auth
router.post('/login', (req, res) => {
  //add here
});

//signToken function here

module.exports = router;
