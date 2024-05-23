const Discord = require("discord.js")
const embed =  require("../../util/embed.js")
module.exports = {
  name: "help",
  aliases: ["h"],
  enabled: true,            
  memberPermissions: [ "SendMessages" ],            
  botPermissions: [ "SendMessages", "EmbedLinks" ],        
  ownerOnly: false,            
  cooldown: 10000,
  prime:false,
  run: async (bot, message, args, dev) => {
  
  message.channel.send({content:`${await bot.translate(`You can see full commands in dashboard https://boboworld.tk/commands`, message)}`})
    
  }
}
