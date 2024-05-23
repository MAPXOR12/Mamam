const mongoose = require('mongoose');

const SlayBotSchema = mongoose.Schema({
  news: {
    type: String
  },
  tag:{
    type:String
  },    
 time:{
  type:String}

});

module.exports = mongoose.model('News', SlayBotSchema);
