const Discord = require('discord.js')

module.exports = {
  name: "lock",
  aliases: ["close","lock"],
  description: "Locks the current or selected text channels",
  usage: ["lock","lock <@ channel>"],
  category: ["moderation"],
  enabled: true,			  
  memberPermissions: [ "ManageChannels","SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks","ManageRoles" ],		
  ownerOnly: false,			
  cooldown: 6000,
  run: async (bot, message, args, dev) => {
    try{
  let channel = await message.mentions.channels.first() || message.channel
  if(!channel) return message.channel.send({content:`Mention channel first `})
  channel
      .permissionOverwrites.edit(message.guild.id, {
        SendMessages: false
      })
      .then(() => {
        message.channel.send({content:`channel locked`});})
    
    }catch(err){
      return message.channel.send({content:` I can't lock thi channel please check my permission or channel`})
    }
    
     
   }
}
