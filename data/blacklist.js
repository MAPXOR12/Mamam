const schema = mongoose.Schema({
    Guild: String,
   userID: String,
  type: {
    type: String,

  },
  isBlacklisted: {
    type: Boolean,
  
  },
  reason: {
    type: String,
  
  },
   length: {
     type: Date,
   },
  date:{ type:Date, default: Date.now()}
  
});
module.exports = mongoose.model("Black", schema)
