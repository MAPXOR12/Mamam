const fs = require("fs");
const Discord = require("discord.js");
//const { Color } = require("../../config.js");

module.exports = {
  name: "clear",
  aliases: ["prune"],
  description: "To clear the text channel",
  usage: ["s!clear [0/100]"],  
  category: ["Moderation"],
  enabled: true,			
  memberPermissions: [ "MANAGE_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES" ],		
  ownerOnly: false,			
  cooldown: 6000,
  run: async (client, message, dev) => {
   message.delete();
   let args = message.content.split(" ").slice(1);
    let messagecount = parseInt(args) + 1;
    if (args > 100) {
      args === 100
    }
    if (!messagecount) args = "100";
    message.channel.bulkDelete(args)
    message.channel
      .send({embeds:[new Discord.EmbedBuilder().setColor(config.embed.Color).setDescription(`I have cleared **${args}** messages.`)]})
      .then(messages => messages.delete({timeout : 500}));
     } 
}
