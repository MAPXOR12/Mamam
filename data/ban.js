let hm = new mongoose.Schema({
user: String,
  reason: String,
  date:{ type: String, default:Date.now()},
  moderator: String,
  
});

module.exports = mongoose.model("ban", hm);
