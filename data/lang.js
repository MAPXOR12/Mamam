const schema = mongoose.Schema({ 
  userID: String,
  language: { type: String, default: "english"},
date:{type:Date, default:Date.now()}

});
module.exports = mongoose.model("language", schema)

