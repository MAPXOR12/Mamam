const mongoose = require('mongoose');
const  config  = require('../config.json')

const guildConfigSchema = mongoose.Schema({

  guildID: {
    type: String,
    required: true,
    unique: true
  },

  
  reactionDM: {
    type: Boolean,
    default: true
    },

  reactionLogs: {
      type: String,
      default: null,
      required: false,
    },

});

module.exports = mongoose.model('reactionroles', guildConfigSchema);