const mongoose = require('mongoose');

//user schema
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String, required: true, uniqe: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
   },
  password: {type:String, required:true}
  
  });

module.exports = mongoose.model('User', userSchema);



