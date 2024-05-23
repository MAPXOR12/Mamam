const mongoose = require("mongoose");
let hm = new mongoose.Schema({
code: String,
  ownerID: String,
  description:String,
  website: String,
  serverNAME: String,
  icon:String,
  backgroundUrl: String,
});

module.exports = mongoose.model("partner", hm);