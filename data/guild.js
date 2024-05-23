const schema = new mongoose.Schema({
  guildID: String,
date: { type: Date, default: Date.now()},
  prefix: { type: String, default: "Bo" },
language:{ type: String, default:"en"},
  isPremium: {
    type: String,
    default: false,
  },

  xp: {
    onoff: { type: Boolean, default: true },
    message: {
      type: String,
      default: "Congratulations {user}, your leveled up to {level}!!",
    },
    channel: { type: String, default: null },
    max: { type: Number, default: 3 },
    min: { type: Number, default: 1 },
  },

leaves: {
 type:Array,
 default: []
  },
  joins: {
 type:Array,
 default: []
  },
  plugins: {
    type: Object,
    default: {
      // Plugins data
      welcome: {
        enabled: false, // Whether the welcome messages are enabled
        message: null, // The welcome message
        channel: null, // The channel to send the welcome messages
        welcomeImage: null,
        title: null,
        withImage: null, // Whether the welcome images are enabled
      },
      // Goodbye messages
      goodbye: {
        enabled: false, // Whether the goodbye messages are enabled
        message: null, // The goodbye message
        channel: null, // The channel to send the goodbye messages
        withImage: null, // Whether the goodbye images are enabled
      },
      autorole: {
        enabled: false, // Whether the autorole is enabled
        role: null, // The role to add when a member join the server
      },
      music:{
dj:null,   
      },
      
      warnsSanctions: {
			kick: false, // The number of warns required to kick the user
			ban: false // The number of warns required to ban the user
		},
      logs: {
        enabled: false,
        channelCreate: { enabled: false, color: null, channel: null },
        channelDelete: { enabled: false, color: null, channel: null },
        channelUpdate: {enabled: false, color: null, channel: null, },
        roleDelete: { enabled: false, color: null, channel: null },
        memberUpdate: { enabled: false, channel:null, color: null},
        roleCreate: { enabled: false, color: null, channel: null },
        roleUpdate: { enabled: false, color: null, channel: null },
        banAdd:{ enabled: false, color:null, channel:null},
        banRemove:{enabled: false, color:null, channel: null},
        
      messageUpdate:{
        enabled:false,
        channel:null,
        color:null,
      },
messageDelete:{
          enabled:false,
          channel:null,
          color:null,
   },
kick:{
  enabled:false,
  channel:null,
  color:null,
}
      },
      antis:{
antilinks:{enabled:false},
      },

    },
  },
  // modlgs

  member: {
    type: Object,
    default: {
      user: null,
      mute: false,
      time: null,
      reason: null,
    },
  },

  casesCount: { type: Number, default: 0 },

  whitelist: { type: Array, default: [] },
});
module.exports = mongoose.model("Guild", schema);
