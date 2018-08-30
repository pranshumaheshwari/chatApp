const User = require('../models/user');

module.exports = {
  // async getFriends (req,res) {
  //   try {
  //     const user = await User.findOne({username:req.body.user.username});
  //     if(!user){
  //       res.send({
  //         error: 'There has been an error searching for friends.'
  //       });
  //     } else {
  //       res.send({
  //         friends: user.friends,
  //         requests: user.requests
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     res.send({
  //       error: err
  //     });
  //   }
  // },
  async sendReq (req,res) {
    try {
      const user = await User.findOne({username:req.body.friendUsername});
      if(!user){
        res.send({
          error: "This username doesn't exists. Please try again."
        });
      } else {
          user.requests.push(req.body.myUsername)
          user.save();
          res.send({
            success_msg: 'Friend request sent!'
          });
      }
    } catch (err) {
      console.log(err);
      res.send({
        error: err
      });
    }
  },
  async acceptReq (req,res) {
    try {
      const friendUsername = req.body.friendUsername;
      const myUsername = req.body.myUsername;
      var user = await User.findOne({username:friendUsername});
      if(!user){
        res.send({
          error: "This username doesn't exists anymore."
        });
      } else {
          user.friends.push(req.body.myUsername)
          user.save();
      }
      user = await User.findOne({username:myUsername});
      if(!user){
        res.send({
          error: "This username doesn't exists anymore."
        });
      } else {
          user.friends.push(req.body.friendUsername)
          user.requests.pull(req.body.friendUsername)
          user.save();
      }
      res.send({
        success_msg: "Friend request accepted!"
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: err
      });
    }
  }
}
