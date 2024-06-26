const schema = new mongoose.Schema({
    guildID: String,
    userID: String,
    
    channelD: { type: Number, default: 0 },
    channelC: { type: Number, default: 0 },
    channelU: { type: Number, default: 0 },
    roleD: { type: Number, default: 0 },
    roleC: { type: Number, default: 0 },
    roleU: { type: Number, default: 0 },
    guildU: { type: Number, default: 0 },
    ban: { type: Number, default: 0 },
    kick: { type: Number, default: 0 },
    warn: { type: Number, warn: 0 }
});
module.exports = mongoose.model("Raider", schema)
