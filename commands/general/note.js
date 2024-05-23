const captcha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const moment = require('moment');

const Discord = require("discord.js");


module.exports = {
  name: "note",
  aliases: ["note"],
  description: "give us your notes",
  usage: [""],
  category: ["general"],
  enabled: true,
  memberPermissions: ["SendMessages"],
  botPermissions: ["EmbedLinks", "SendMessages"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args) => {
    let data = await User.findOne({userID: message.author.id})

let ID ="";
		let name;
		let note;
		let filter = m => m.author.id === message.author.id;
		for (var m = 0; m < 8; m++) {
		ID += captcha.charAt(Math.floor(Math.random() * captcha.length))
		}
  
  message.channel.send({content:'📜 **| Give a name to your note... ✏ **'}).then(async(msg) => {
				message.channel.awaitMessages({filter:filter, 
                  max: 1,
                  time: 90000,
                  errors: ['time']
                }).then(collected => {
                  collected.first().delete();
       
					name = collected.first().content;
					if(name == `cancel`) {
						msg.edit({content:`**Successfully cancelled.**`}).then(hello => {setTimeout(()=>{hello.delete()},3000)})
					}else{
					if(name.length > 18 || name.length < 3) {
						msg.edit({content:`**The length of the name shouldn\'t be shorter than \`3\` or longer than \`18\`.**`}).then(msg => {setTimeout(()=>{msg.delete()},5000)})
					}else{
						
		msg.edit({content:`📝 **| Now, Type your note... ✏**`}).then(msg => {
                message.channel.awaitMessages({filter:filter, 
                  max: 1,
                  time: 90000,
                  errors: ['time']
                }).then(collected => {
                  collected.first().delete();
               
                    note = collected.first().content;
                    if(note == `cancel`) {
                        msg.edit({content:`**Successfully cancelled.**`}).then(hello => {setTimeout(()=>{hello.delete()},3000)})
                    }else{
		msg.edit({content:`✅ **| Successfully saved your note check your dm **`})
                      msg.author.send({content:`👍 **| Successfully saved tour note  /n ID: ${ID}**`}).catch(()=>{})
if(!data){return message.channel.send({content:`**${message.author.tag}** You are not have data`})}
			data.data.note.push({
        
					ID:ID,
					NAME:name,
					DATE:Date.now(),//moment(message.createdTimestamp).format ('DD/MM/YYYY hh:mm'),
					MSG:note
	
      
      })
                      data.save()

                    }})})}}})})}}