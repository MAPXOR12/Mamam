const Discord = require('discord.js')


module.exports = {
  name: "unlock",
  aliases: ["open","unlock"],
  description: "open he current or selected text channels",
  usage: ["unlock","unlock @Channel"],
  category: ["moderation"],
  enabled: true,			  
  memberPermissions: [ "ManageChannels","SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks","ManageRoles" ],		
  ownerOnly: false,			
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {
 
    try{
    let channel = await message.mentions.channels.first() || message.channel
  if(!channel) return message.channel.send({content:`You must mention channel`})
  
  channel
      .permissionOverwrites.edit(message.guild.id, {
        SendMessages: true
      })
      .then(() => {
        message.channel.send({content:`channel unlocked`});
     });
    
    }catch(err){ return message.channel.send({content:` Something went Wrong `})
                }
    
    
   }
}
