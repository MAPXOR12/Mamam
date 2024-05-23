schema = mongoose.Schema({
    guildID: String,
  antislogs:{type: String, default:null},
  enabled:{type:Boolean, default:false},
        ban: {
        enabled: { type: Boolean, default: false},
        limit: { type: Number, default: null}
   },
    kick: {
        enabled: { type: Boolean, default: false},
        limit: { type: Number, default: null}
    },
    channelC: {
        enabled: { type: Boolean, default:false },
        limit: { type: Number, default: null}
     },
channelD: {
        enabled: { type: Boolean, default:false },
        limit: { type: Number, default: null}
     },

    channelU: {
        enabled: { type: Boolean, default: false},
        limit: { type: Number, default: null}
     },
    roleC: {
        enabled: { type: Boolean, default: false},
        limit: { type: Number, default: null}
     },
roleD: {
        enabled: { type: Boolean, default: false},
        limit: { type: Number, default: null}
     },

    roleU: {
        enabled: { type: Boolean, default: false},
        limit: { type: Number, default: null}
     },
    guildU: {
        enabled: { type: Boolean, default: false},
        limit : { type: Number, default: null}
     },
    spam: {
        enabled: { type: Boolean, default:null}      
    },
    bot: {
        enabled: { type: Boolean, default:false}
    },
    link: {
        enabled: { type: Boolean, default:false}      
    },
    ping: {
        enabled: { type: Boolean, default: false}      
    },
    punishment: { type: String, default:null},
    whitelist: { type: Array, default: [] },
    time: { type: Number, default: 30 },
  date:{type:Date, default:new Date()}


});
module.exports = mongoose.model("Anti", schema)
