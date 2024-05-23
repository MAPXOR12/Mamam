const schema = new mongoose.Schema({
  warns:{ type: Array, default:[]}
})
module.exports = mongoose.model("Warns", schema)
  
  