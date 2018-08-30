const User = require('../models/user');
const jwt  = require('jsonwebtoken');

function jwtSignUser (user) {
  const ONE_DAY = 60 * 60 * 24;
  return jwt.sign(user,'secret',{expiresIn:ONE_DAY});
}

module.exports = {
  async register (req,res) {
    try{
      const newUser = await new User({
        email:req.body.email,
        username: req.body.username,
        password:req.body.password,
        friends: [],
        requests: []
      });
      newUser.save();
      res.send(newUser.toJSON());
    } catch(err) {
      res.status(400).send({
        error : "Invaild credentials"
      })
    }
  },
  async login (req,res) {
    try{
      const username = req.body.username;
      const password = req.body.password;
      const user = await User.findOne({username: username});
      if(!user){
        return res.send({
          error: 'The login information is incorrect.'
        });
      }
      const isPasswordValid = password === user.password
      if(!isPasswordValid){
        return res.status(403).send({
          error: 'The login information is incorrect.'
        });
      }
      res.send({
        user: user.toJSON(),
        token: jwtSignUser(user.toJSON())
      });
    } catch(err) {
      res.status(500).send({
        error : "Invaild credentials"
      })
    }
  }
}
