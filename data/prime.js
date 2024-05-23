const mongoose = require('mongoose');

const guildConfigSchema = mongoose.Schema({

code: {type: String, default: null},

expiresAt: {type:String, default: Date.now() + 2592000000},

plan: {type:String, default: null},


  

});

module.exports = mongoose.model('premium-code', guildConfigSchema);
