
const maintenance = mongoose.Schema({
    server: {type: String, default:null},
    reason: { type:String, default:null},
    message:{type: String, default:null},
    maintenance: {type: String, default: 'maintenance'},
    toggle: {type: String, default: 'false'},
   date:{type: Date, default:Date.now()}
})

module.exports = mongoose.model('maintenance', maintenance)
