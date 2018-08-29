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
        password:req.body.password
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
      const {email,password} = req.body;
      const user = await User.findOne({email: email});
      if(!user){
        return res.status(403).send({
          error: 'The login information is incorrect.'
        });
      }
      const isPasswordValid = User.comparePassword(password,user.password)
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
