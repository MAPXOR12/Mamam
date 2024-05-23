const Discord = require("discord.js")

module.exports = {
  name: "vote",
  aliases: ["vote"],
  enabled: true,			    
  memberPermissions: [ "SendMessages" ],			
  botPermissions: [ "SendMessages", "EmbedLinks"],		
  ownerOnly: false,			
  cooldown: 5000,
  run: async (bot, message, args, dev) => {
   let embed = new Discord.EmbedBuilder()
.setDescription (`[DiscordBotlist](https://discord.ly/bobo)- [Topgg](https://top.gg/bot/${bot.user.id}/vote)`)
message.channel.send({embeds: [embed]})
}}
