var mongoose = require('mongoose');
// var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
  username:{
    type: String,
    index: true
  },
  password:{
    type: String
  },
  email:{
    type: String
  },
  name:{
    type: String
  },
  friends:{
    type: [String]
  },
  requests:{
    type: [String]
  }
});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser){
  // newUser.save(callBack);
  bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(newUser.password,salt,function(err,hash){
      newUser.password = salt;
      newUser.save();
    });
  });
};
module.exports.getUserByUsername = function(username,callBack){
  var q = {username:username};
  User.findOne(q,callBack);
};
module.exports.comparePassword = function(givenPassword,hash,callBack){
  if(givenPassword === hash)
    callBack(null,true);
  else
    callBack(null,false);
  // bcrypt.compare(givenPassword,hash,function(err,isMatch){
  //   if(err)
  //     throw err;
  //   callBack(null,isMatch);
  // });
};
module.exports.getUserById = function(id,callBack){
  User.findById(id,callBack);
};
