const fs = require("fs");
const Discord = require("discord.js");
//const { Color } = require("../../config.js");

module.exports = {
  name: "resave",
  aliases: ["resave"],
  description: "delete old data and save again",
  usage: [""],  
  category: ["Admin"],
  enabled: true,			
  memberPermissions: [ "ADMINISTRATOR " ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES" ],		
  ownerOnly: false,			
  cooldown: 6000,
  run: async (client, message, dev) => {
  
let data = await Guild.findOne({guildID: message.guild.id})
    
    if(!data) return message.channel.send({content:`I can't find guild Data from database`})
    data.delete();
    message.channel.send({content:` Data deleted you must waiting for 10 seconds for savings data`}).then((msg)=>{
    setTimeout(()=>{ msg.delete()},8000);})
      
    
    setTimeout(()=>{
      
  (new Guild({ guildID: message.guild.id}).save())
      
     return  message.reply({content:`Data saved `});
      
      
      
      
    },10000)
  
  
  
  
  } 
}
