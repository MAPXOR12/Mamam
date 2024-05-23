const Discord = require("discord.js")
module.exports = {
  name: "support",
  aliases: [],
  enabled: true,
  memberPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  ownerOnly: false,
  cooldown: 3000,
  run: async (bot, message, args, dev) => {

message.channel.send({content: `This is a server support **Bobo** if you need help, enter the server -> \n ${config.support}`});
    } 
}
