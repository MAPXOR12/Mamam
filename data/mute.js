
const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  id: { type: String }, // Discord ID of the user
	guildID: { type: String }, // ID of the guild to which the member is connected
date:{ type:Date, default:Date.now()},
  sanctions: { type: Array, default: [] }, // Array of the member sanctions (mute, ban, kick, etc...)
	mute: { type: Object, default: {// The member mute infos
		muted: false,
		case: null,
		endDate: null
	}},
    
  
  
  
})

module.exports = mongoose.model('Mute',Schema);
