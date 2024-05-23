const fs = require("fs");
const Discord = require("discord.js");
const m = "<:Bobocash:897148836567457862>"

module.exports = {
  name: "balance",
  aliases: ["balance", "credit", "credits","cash"],
  description: "To now your credits",
  usage: ["credit", "credit @user"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 10000,
  run: async (client, message, args, dev, dev2) => {
    if (args[2]) return;
    let member = message.mentions.users.first();
      
    if (member) {
      let autho = await User.findOne({ userID: member.id });
if(!autho){
 return message.channel.send({content:`This user mot have data please use anycommand to save data`})
  
  
  
}
      message.channel.send({
        content:`
          🏦 **${member.username}**, credits balance is __${autho.money.toLocaleString() ||"0"}__ ${m}`
      });
    }
    if (!member) {
      let author = await User.findOne({ userID: message.author.id });
      message.reply({
        content: `🏦 **${message.author.username}**, Your credits balance is:  __\`${author.money.toLocaleString()||"0"}\`__${m}
      `});
    }
  }
};
